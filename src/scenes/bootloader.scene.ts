import { Scene } from "phaser"
import AntPng from "../assets/img/ant.png";
import PlantsPng from "../assets/img/plants-sheet.png";
import GoodPng from "../assets/img/happy.png";
import BadPng from "../assets/img/bad.png";
import ProblemPng from "../assets/img/problem.png";
import StartMessagePng from "../assets/img/start_message.png";
import StartMessage2Png from "../assets/img/start_message_2.png";
import GameOver1Png from "../assets/img/gameover_1.png";
import GameOver2Png from "../assets/img/gameover_2.png";


export default class BootloaderScene extends Scene {
    constructor() {
        super("BootloaderScene");
    }

    preload() {

        this.load.spritesheet("ant", AntPng, {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("plants", PlantsPng, {
            frameWidth: 960,
            frameHeight: 360
        });

        this.load.image("good", GoodPng);
        this.load.image("bad", BadPng);
        this.load.image("problem", ProblemPng);
        this.load.image("start", StartMessagePng);
        this.load.image("start2", StartMessage2Png);
        this.load.image("gameover", GameOver1Png);
        this.load.image("gameover2", GameOver2Png);

        this.load.on("complete", () => {
            this.scene.start("StartScene");
        })
    }

}