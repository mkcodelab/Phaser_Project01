import { GameObjects, Scene } from 'phaser';

export class Explosion extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        this.play('explode');
    }
}
