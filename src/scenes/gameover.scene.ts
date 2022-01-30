import { Scene } from "phaser"


export default class GameOverScene extends Scene {
    private type: number = 1;

    constructor() {
        super("GameOverScene");
    }

    init(data: any) {
        this.type = data.type;
    }

    create() {
        this.add.image(0, 0, this.type === 1 ? "gameover" : "gameover2").setOrigin(0);
    }


}