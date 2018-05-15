import { Logger } from "./console";
// const robot = require('robotjs');

import * as BuffModels from "./Models";
import * as admin from "firebase-admin";
import * as gCloud from "@google-cloud/storage";

import { BuildBuff } from "./BuildBuff";
import { CaptchaResponder } from "./CaptchaResponder";

const serviceAccount = require("../secrets/ent-assist-firebase-adminsdk-q7uz8-819d9c2b0b");
const log = new Logger();

enum BotState {
  Offline = "Offline",
  Loading = "Loading",
  Loaded = "Loaded",
  Idle = "Idle",
  Buffing = "Buffing",
  Captcha = "Captcha",
  Waiting = "Waiting"
}
interface QueueItem {
  docId: string;
  buff: BuffModels.BuffQueueItem;
}

interface StatusDoc {
  status: string;
  state: BotState;
  captchaUrl: string;
}

const DefaultStateMessages = {
  Offline: "Offline",
  Loading: "Loading",
  Loaded: "Loaded",
  Idle: "Ready to buff",
  Buffing: "Buffing",
  Captcha: "Captcha",
  Waiting: "Waiting on ..."
};

export class BuffBot {
  private captcha = new CaptchaResponder();
  private BuffBuilder: BuildBuff = new BuildBuff();

  private state: BotState = BotState.Offline;
  private db: admin.firestore.Firestore;
  private bucket: gCloud.Bucket;
  private statusDoc: FirebaseFirestore.DocumentReference;
  private capAnsDoc: FirebaseFirestore.DocumentReference;

  private status: StatusDoc = {
    status: DefaultStateMessages.Offline,
    state: BotState.Offline,
    captchaUrl: null
  };

  private pendingList: QueueItem[] = [];
  private activeBuff: QueueItem;

  constructor() {
    log.log("Starting Buff Bot");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://ent-assist.appspot.com"
    });

    this.db = admin.firestore();
    this.bucket = admin.storage().bucket();

    this.statusDoc = this.db.doc(`status/status`);
    this.capAnsDoc = this.db.doc(`status/captcha`);
    this.capAnsDoc.onSnapshot(snapshot => {
      const data = snapshot.data();
      if (this.state == BotState.Captcha) {
        if (data.answer !== "") {
          this.handleCaptcha(data.answer);
          this.capAnsDoc.update({ answer: "" });
        }
      }
    });

    this.db
      .collection("buffs")
      .orderBy("time", "asc")
      .where("status", "==", BuffModels.BuffStatus.Pending)
      .onSnapshot(snapshot => {
        const newList: QueueItem[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as BuffModels.BuffQueueItem;
          newList.push({
            docId: doc.id,
            buff: doc.data() as BuffModels.BuffQueueItem
          });
        });
        this.pendingList = newList;
        this.run();
      });

    this.determineState();
  }

  run() {
    if (this.state == BotState.Idle) {
      if (this.pendingList.length) {
        this.handleBuff(this.pendingList[0]);
      } else {
        setTimeout(() => this.run, 60000); //Keep alive?
      }
    }
  }

  handleBuff(order: QueueItem) {
    if (
      this.activeBuff &&
      this.activeBuff.docId &&
      order.docId == this.activeBuff.docId
    ) {
      return;
    }

    this.activeBuff = order;
    this.db
      .doc(`buffs/${order.docId}`)
      .update({ status: BuffModels.BuffStatus.Active });
    this.state = BotState.Buffing;
    this.updateStatusDocument(`Buffing ${order.buff.avatar}`);
    try {
      const isCaptchaOpen = this.BuffBuilder.buildBuff(
        order.buff.avatar,
        order.buff.buff
      );
      this.captchaLogic(isCaptchaOpen);
    } catch (e) {
      console.log(e);
    }
  }

  captchaLogic(isCaptchaOpen: boolean) {
    if (isCaptchaOpen) {
      this.uploadCaptcha();
    } else {
      this.db
        .doc(`buffs/${this.activeBuff.docId}`)
        .update({ status: BuffModels.BuffStatus.Done });
      this.finishBuff();
    }
  }

  async uploadCaptcha() {
    this.state = BotState.Captcha;
    this.status.captchaUrl = await this.captcha.getCaptchaRegion(
      this.BuffBuilder.getClientOffset()
    );
    this.updateStatusDocument();
  }

  handleCaptcha(number) {
    if (number !== "0") {
      const gaveRightAnswer = this.captcha.AnswerCaptcha(
        number,
        this.BuffBuilder.getClientOffset()
      );
      let isCaptchaOpen = false;
      if (!gaveRightAnswer) {
        console.log("accept buff again");
        isCaptchaOpen = this.BuffBuilder.acceptBuff();
      }
      this.captchaLogic(isCaptchaOpen);
    } else {
      this.finishBuff();
    }
  }

  finishBuff() {
    this.status.captchaUrl = null;
    this.state = BotState.Waiting;
    this.updateStatusDocument(`Waiting on ${this.activeBuff.buff.avatar}`);
    const done = this.BuffBuilder.WaitForWindowClose();
    //back to Idle?
    this.state = BotState.Idle;
    this.updateStatusDocument();
    this.run();
  }

  updateStatusDocument(statusMessage?) {
    log.overwrite(`State: ${this.state}, Queue: ${this.pendingList.length}`);
    this.status.state = this.state;
    this.status.status = statusMessage || DefaultStateMessages[this.state];
    this.statusDoc.update(this.status).catch(e => log.log("\n\n" + e + "\n\n"));
  }

  determineState() {
    this.state = BotState.Idle;
    this.updateStatusDocument();
    this.run();
  }
}
