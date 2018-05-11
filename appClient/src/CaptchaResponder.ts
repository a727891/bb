import { BBConfig } from "./config.model";

const screenshot = require("screenshot-desktop");
const Jimp = require("jimp");
const config: BBConfig = require("./config.json");

const inputBox = config.pixelMap.captcha.input;
const okBtn = config.pixelMap.captcha.ok;
const clip = config.pixelMap.captcha.clip;

const aBtn = config.pixelMap.buffBuilder.acceptButton;
const cBtn = config.pixelMap.buffBuilder.clear;

const au = require("autoit");

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export class CaptchaResponder {
  constructor() {

  }

  AnswerCaptcha(answer: string, clientOffset:{top:number,left:number}): boolean {
    au.MouseClick("left", inputBox.x, inputBox.y);
    au.Send(answer);
    au.MouseClick("left", okBtn.x, okBtn.y);
    au.Sleep(2000);
    //check that accept button is still disabled
    return (
      au.PixelGetColor(aBtn.x+clientOffset.left, aBtn.y+clientOffset.top) !== au.PixelGetColor(cBtn.x+clientOffset.left, cBtn.y+clientOffset.top)
    );
  }

  async getCaptchaRegion(clientOffset:{top:number,left:number}): Promise<any> {
    const img = await screenshot();
    const image = await Jimp.read(img);
    image.crop(clip.x+clientOffset.left, clip.y + clientOffset.top, clip.w, clip.h);
    return new Promise((resolve, reject)=>{
      image.getBase64(Jimp.MIME_PNG, (e, d) => {
        resolve("" + d);
      });
    })

  }
}