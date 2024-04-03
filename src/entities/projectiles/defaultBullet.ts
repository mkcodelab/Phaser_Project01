import { Physics, Scene, Math as P_Math } from 'phaser';

export type Bullet = 'default' | 'energy' | 'laser' | 'kinetic';

export type DirVector = {
    x: number;
    y: number;
};

export class DefaultBullet extends Physics.Arcade.Sprite {
    speed: number;
    angleBetweenShooter: number;
    spriteAngle: number;
    constructor(scene: Scene, x: number, y: number, textureName: string = 'bullet') {
        super(scene, x, y, textureName);

        // this.angle - angle of the sprite
        this.angleBetweenShooter = 0;
        // rotate sprite at random angle
        this.spriteAngle = Math.random() * 360;
        this.speed = 700;
    }

    fire(shooter: DirVector, target: DirVector, bulletSpeed?: number) {
        this.setPosition(shooter.x, shooter.y);
        // returns angle in radians
        this.angleBetweenShooter = P_Math.Angle.BetweenPoints(shooter, target);
        // this.setAngle(this.spriteAngle);
        this.scene.physics.velocityFromRotation(
            this.angleBetweenShooter,
            bulletSpeed ?? this.speed,
            this.body?.velocity
        );
    }
}

export class KineticBullet extends DefaultBullet {
    constructor(scene: Scene, x: number, y: number, textureName: string = 'kineticBullet') {
        super(scene, x, y, textureName);

        // this.speed = 900;
    }
    fire(shooter: DirVector, target: DirVector, bulletSpeed?: number) {
        super.fire(shooter, target, bulletSpeed);
        // change radians to degrees
        const projectileAngle = P_Math.RadToDeg(this.angleBetweenShooter);
        // rotate sprite to the target
        this.setAngle(projectileAngle - 90);
    }
}

export class EnergyBullet extends DefaultBullet {
    constructor(scene: Scene, x: number, y: number, textureName: string = 'energyBullet') {
        super(scene, x, y, textureName);
        // this.speed = 500;
        this.setScale(0.5);
        // turn off gravity for this class
    }
}

//
//
export class DefaultBulletGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);
        this.runChildUpdate = true;
        this.defaultKey = 'bullet';

        this.createMultiple({
            classType: DefaultBullet,
            active: false,
            visible: false,
            key: 'bullet',
        });
    }
}

export class KineticBulletGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);
        this.runChildUpdate = true;
        this.defaultKey = 'kineticBullet';

        this.createMultiple({
            classType: KineticBullet,
            active: false,
            visible: false,
            key: 'kineticBullet',
        });
    }
}

export class EnergyBulletGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);

        this.runChildUpdate = true;
        this.defaultKey = 'energyBullet';

        this.createMultiple({
            classType: EnergyBullet,
            active: false,
            visible: false,
            key: 'energyBullet',
        });
    }
}
