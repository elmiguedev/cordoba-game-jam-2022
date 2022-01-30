import { Scene } from "phaser"


export default class StartScene extends Scene {

    private ready: boolean = false;

    constructor() {
        super("StartScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x6abe30);

        const img = this.add.image(0, 0, "start").setOrigin(0, 0);
        this.input.on("pointerdown", () => {
            if (!this.ready) {
                img.setTexture("start2");
                this.ready = true;
            } else {
                this.scene.start("MainScene");

            }
        })
    }


}