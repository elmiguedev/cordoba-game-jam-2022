import { Scene } from "phaser"
import Ant from "../entities/ant.entity";
import { Swipe } from 'phaser3-rex-plugins/plugins/gestures.js';



export default class MainScene extends Scene {

    private ants!: Phaser.Physics.Arcade.Group;
    private isAngry: boolean = true;
    private face!: Phaser.GameObjects.Image;
    private antSpeed: number = 200;
    private plantsLife: number = 12;
    private plants!: Phaser.GameObjects.Image;


    constructor() {
        super("MainScene");
    }

    update() {

    }

    create() {
        this.createBackground();
        this.createAnimations();
        this.createAnts();
        this.createSwipe();

        this.time.addEvent({
            repeat: -1,
            delay: 1000,
            callback: () => {
                this.createAnt();
            }
        })

        this.time.addEvent({
            repeat: -1,
            delay: 5000,
            callback: () => {
                this.antSpeed += 40
            }

        })

        this.createPlants();
        this.createPersonality();
    }

    createPersonality() {
        this.face = this.add.image(240, 100, "bad")
            .setOrigin(0.5);

        this.time.addEvent({
            repeat: -1,
            delay: 5000,
            callback: () => {
                const prob = Phaser.Math.Between(1, 5);
                if (prob <= 2) {
                    this.changePersonality();
                }
            }
        })
    }

    createPlants() {
        this.plants = this.add.image(0, 600, "plants").setDepth(4);
    }

    createSwipe() {
        const swipe = new Swipe(this, {
            enable: true,
            bounds: undefined,
            threshold: 10,
            velocityThreshold: 1000,
            dir: 'left&right',
        });

        swipe.on("swipe", (swipe: any) => {
            console.log("le swipe", swipe.dragVelocity, swipe.left, swipe.right);
            this.blowAnts(swipe.dragVelocity * (swipe.left ? -1 : 1));
        })
    }

    createBackground() {
        this.cameras.main.setBackgroundColor(0x5ab552);
    }

    createAnimations() {
        this.anims.create({
            key: "ant_walk",
            defaultTextureKey: "ant",
            frames: this.anims.generateFrameNumbers("ant", {
                frames: [0, 1, 2]
            }),
            frameRate: 12,
            repeat: -1
        })
    }

    createAnts() {
        this.ants = this.physics.add.group({
            classType: Ant,
            runChildUpdate: true
        });
    }

    createAnt() {
        const x = Phaser.Math.Between(100, 400);
        const y = 0;

        const ant = <Ant>this.ants.get(x, y);
        ant.setInteractive({ cursor: "pointer" });
        ant.on("pointerdown", () => {

            ant.kill();
            if (!this.isAngry) {
                this.scene.start("GameOverScene", { type: 1 });
            }
        })
        ant.setVelocityY(this.antSpeed);
        ant.setDepth(2);
        ant.setOnBottomListener(() => {
            this.hurtPlants();
        })
    }

    blowAnts(velocity: number) {

        for (let i = 0; i < this.ants.getChildren().length; i++) {
            const ant = <Ant>this.ants.getChildren()[i];
            if (ant.y > 300) {
                ant.setVelocityX(velocity);
            }
        }

    }

    changePersonality() {
        this.isAngry = !this.isAngry;
        this.face.setTexture(this.isAngry ? "bad" : "good");
    }

    hurtPlants() {
        this.plantsLife--;
        switch (this.plantsLife) {
            case 12: this.plants.setFrame(0); break;
            case 11: this.plants.setFrame(0); break;
            case 10: this.plants.setFrame(1); break;
            case 9: this.plants.setFrame(1); break;
            case 8: this.plants.setFrame(2); break;
            case 7: this.plants.setFrame(2); break;
            case 6: this.plants.setFrame(3); break;
            case 5: this.plants.setFrame(3); break;
            case 4: this.plants.setFrame(4); break;
            case 3: this.plants.setFrame(4); break;
            case 2: this.plants.setFrame(5); break;
            case 1: this.plants.setFrame(5); break;
            case 0: this.plants.setFrame(5); break;
            default: this.plants.setFrame(5); break;
        }
        if (this.plantsLife <= 0) {
            this.scene.start("GameOverScene", { type: 2 });
        }
    }

}