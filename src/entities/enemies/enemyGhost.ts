import { Physics } from 'phaser';

export class EnemyGhost extends Physics.Arcade.Sprite {
    constructor(public scene: any, x = 0, y = 0, texture = 'ghost') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // this.scene = scene;

        // this.resources = new PlayerResources();
    }
}
