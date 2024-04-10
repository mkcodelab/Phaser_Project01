import { Animations, GameObjects, Scene } from 'phaser';

export class Explosion extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.play('explode');
        this.once(Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        });
    }
}
