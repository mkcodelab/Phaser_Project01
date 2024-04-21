import { Animations, GameObjects, Physics, Scene } from 'phaser';

// just a sprite without collision
export class Explosion extends GameObjects.Sprite {
    radius: number;
    constructor(scene: Scene, x: number, y: number, radius: number) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);

        this.radius = radius;
        this.play('explode');
        this.once(Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        });
    }
}

// sprite with collision in arcade physics
export class ExplosionCollision extends Physics.Arcade.Sprite {
    radius: number;
    constructor(scene: Scene, x: number, y: number, radius: number) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.radius = radius;

        this.play('explode');
        this.once(Animations.Events.ANIMATION_COMPLETE, () => {
            // this.active = false;
            // this.visible = false;
            this.destroy();
        });
    }
}

export class ExplosionsGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);
        this.runChildUpdate = true;
        this.defaultKey = 'explosion';

        this.createMultiple({
            classType: ExplosionCollision,
            active: false,
            visible: false,
            key: 'explosion',
        });
    }
}
