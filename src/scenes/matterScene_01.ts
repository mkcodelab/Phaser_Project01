// import { World } from 'matter';
import { Scene } from 'phaser';
import { CENTER } from '..';
import { PlayerControlsMatter } from '../entities/player/playerControlsMatter';
import { PlayerMatter } from '../entities/player/playerMatter';
import { Vector } from 'matter';
export class MatterScene01 extends Scene {
    constructor() {
        super();
    }
    image: any;
    ambientLightColor = 0x444444;
    light: any;

    playerControls: PlayerControlsMatter;

    player: any;

    preload() {
        this.load.image('background', 'assets/Starfield-7.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('gumiak', 'assets/gumiak.png');
    }

    create() {
        this.image = this.add.image(CENTER.w, CENTER.h, 'background').setPipeline('Light2D');

        this.lights.enable().setAmbientColor(this.ambientLightColor);
        this.light = this.lights.addLight(100, 100, 128).setIntensity(3);
        // this.player = new PlayerMatter(this, 0, 0);
        // this.playerControls = new PlayerControlsMatter(this, this.player);

        const box = this.matter.add.image(600, 500, 'ground');
        this.boxes();
        box.setVelocity(-5, -10);

        this.player = this.matter.add.sprite(100, 100, 'gumiak');
        // this.player = new PlayerMatter(this.matter, 100, 100, 'gumiak');
        this.playerControls = new PlayerControlsMatter(this, this.player);

        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.playerControls.handleControls();
        this.light.x = this.player.x;
        this.light.y = this.player.y;
    }

    boxes() {
        for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * 1000);
            const y = Math.floor(Math.random() * 1000);
            const dir: Vector = {
                x: Math.random() * 10,
                y: Math.random() * 10,
            };
            const box = this.matter.add.image(x, y, 'ground', undefined, { isStatic: true }).setScale(2);
            box.setVelocity(dir.x, dir.y);
        }
    }
}
