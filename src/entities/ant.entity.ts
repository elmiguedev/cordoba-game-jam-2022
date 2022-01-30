import { Scene } from "phaser";

export default class Ant extends Phaser.Physics.Arcade.Sprite {

    private onBottomListener!: Function;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "ant");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.anims.play("ant_walk");
        this.setFlipY(true);
    }

    update() {
        if (this.y >= 800) {
            if (this.onBottomListener) {
                this.onBottomListener();
                this.kill();
            }
        }
        else if (this.x < 0 || this.x > 500) {
            this.kill();
        }


    }

    setOnBottomListener(callback: Function) {
        this.onBottomListener = callback;
    }

    kill() {
        console.log("me mataste wacho");
        this.destroy();
    }


}