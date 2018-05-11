import * as models from "./Models";
import { BBConfig } from "./config.model";
import { BuffOptions } from "./Models";
const robot = require("robot-js");
const au = require("autoit");
const config: BBConfig = require("./config.json");

const CategoryY = config.pixelMap.buffBuilder.categoryLocations;
const BuffY: BuffOptions = config.pixelMap.buffBuilder.optionLocations;
const AcceptButton = config.pixelMap.buffBuilder.acceptButton;
const ClearButton = config.pixelMap.buffBuilder.clear;
const _X = config.pixelMap.buffBuilder.xOffset;

const BuffOrder = [
  { cat: "trader", props: ["assembly", "amazing", "sampling"] },
  { cat: "armor", props: ["elem", "energy", "kinetic"] },
  {
    cat: "misc",
    props: ["xp", "harvest", "healer", "resilience", "flow", "secondChance"]
  },
  { cat: "combat", props: ["acr", "crit", "chr", "glance"] },
  { cat: "attrib", props: ["agl", "con", "luck", "prec", "stam", "str"] }
];

export class BuildBuff {
  private recipient: string;
  private buff: models.BuffOptions;

  private pixelColor;

  private windowHandle;
  private gameWindow;

  constructor() {
    au.Init();
    au.AutoItSetOption("MouseClickDelay", 30);
    au.AutoItSetOption("SendKeyDelay", 30);
    au.AutoItSetOption("MouseCoordMode", 2); //1=absolute, 0=relative, 2=client
    this.gameFocused();
    this.windowHandle = au.WinGetHandle("Star Wars Galaxies");
    this.gameWindow = robot.Window.getActive();
  }

  gameFocused() {
    au.WinActivate("Star Wars Galaxies");
    au.WinWaitActive("Star Wars Galaxies");
  }

  buildBuff(recipient: string, buff: models.BuffOptions): boolean {
    this.gameFocused();
    this.recipient = recipient;
    this.buff = buff;
    au.Send(`/insp ${this.recipient}{ENTER}`);
    au.Sleep(1500);
    // Add the buff points
    BuffOrder.map(step => {
      this.doCategory(CategoryY[step.cat], step.props);
    });
    return this.acceptBuff();
  }

  acceptBuff(): boolean {
    this.pixelColor = this.readHeaderPixelColor();
    // Accept The Buff
    au.MouseClick("left", AcceptButton.x, AcceptButton.y, 1);
    au.Sleep(1000);
    //Check Captcha and report to main bot
    return this.readHeaderPixelColor() !== this.pixelColor;
  }

  WaitForWindowClose(): string {
    let count = 0;
    let windowColor = this.readHeaderPixelColor();
    while (windowColor === this.pixelColor) {
      au.Sleep(3000);
      count++;
      windowColor = this.readHeaderPixelColor();
      if(count>10){
        break;
      }
    }
    return "Buff Window Closed";
  }

  readHeaderPixelColor(): string {
   const offset = this.getClientOffset();
    return au.PixelGetColor(120+offset.left, 5+offset.top);
  }

  getClientOffset(){
    const bounds = this.gameWindow.getClient();
    return {top:bounds.y,left:bounds.x};

  }

  doCategory(category, props) {
    au.MouseClick("left", _X.cat, category, 1);
    props.map(p => {
      if (this.buff[p] > 0) {
        au.MouseClick("left", _X.prop, BuffY[p], 1);
        au.Sleep(100);
        au.MouseClick("left", _X.prop, BuffY[p], 2 * this.buff[p]);
        au.Sleep(100);
      }
    });
    au.Sleep(100);
  }
}
