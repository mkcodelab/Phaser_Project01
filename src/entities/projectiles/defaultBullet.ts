import { Physics, Scene, Math as P_Math } from 'phaser';

export type DirVector = {
    x: number;
    y: number;
};

export class DefaultBullet extends Physics.Arcade.Sprite {
    speed = 600;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
        this.angle = 0;
    }

    fire(shooter: DirVector, target: DirVector) {
        this.setPosition(shooter.x, shooter.y);
        this.angle = P_Math.Angle.BetweenPoints(shooter, target);
        this.scene.physics.velocityFromRotation(this.angle, this.speed, this.body?.velocity);
    }

    // onCollision() {
    //     console.log('collision');
    //     this.destroy();
    // }
}

//
//
export class DefaultBulletGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: DefaultBullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet',
        });
    }

    fireLaser(x: number, y: number, direction: DirVector) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, direction);
        }
    }
}
