import { Physics, Scene } from 'phaser';

export class EnemyGhost extends Physics.Arcade.Sprite {
    health = 100;
    currentHealth = 100;

    constructor(public scene: Scene, x = 0, y = 0, texture = 'ghost') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //@ts-ignored
        this.body.setAllowGravity(false);
    }

    applyDamage(value: number) {
        this.currentHealth -= value;
        console.log('ouch', value, 'remaining: ', this.currentHealth);
        if (this.currentHealth <= 0) {
            //maybe pool them instead
            this.destroy();
        }
    }
}
