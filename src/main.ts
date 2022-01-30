import { Game } from "phaser";
import BootloaderScene from "./scenes/bootloader.scene";
import GameOverScene from "./scenes/gameover.scene";
import MainScene from "./scenes/main.scene";
import StartScene from "./scenes/start.scene";

new Game({
  width: 480,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  scene: [
    BootloaderScene,
    StartScene,
    MainScene,
    GameOverScene
  ]
})