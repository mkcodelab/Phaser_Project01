import { World } from 'matter';
import { Physics, Scene } from 'phaser';

export class PlayerMatter extends Physics.Matter.Sprite {
    health = 100;
    sprintSpeed = 20;
    speed = 10;

    // constructor(scene: Scene, x = 0, y = 0, texture = 'gumiak') {
    //     super(scene, x, y, texture);
    //     scene.add.existing(this);
    //     scene.physics.add.existing(this);
    // }
    constructor(matter: any, x = 0, y = 0, texture = 'gumiak') {
        super(matter.world, x, y, texture);
        // matter.add.sprite(x, y, texture);
    }

    shoot() {
        console.log('shoot');
    }
}
