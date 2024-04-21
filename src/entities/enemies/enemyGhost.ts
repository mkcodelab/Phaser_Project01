import { Physics, Scene } from 'phaser';

export class EnemyGhost extends Physics.Arcade.Sprite {
    health = 100;
    currentHealth = 100;
    canChangeDirection = true;
    changeDirectionTime: number;
    movementVector = { x: 0, y: 0 };

    constructor(public scene: Scene, x = 0, y = 0, texture = 'ghost') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(2);

        //@ts-ignored
        this.body.setAllowGravity(false);

        this.changeDirectionTime = Math.random() * 1000 + 100;
        setInterval(() => (this.canChangeDirection = true), this.changeDirectionTime);
    }

    public applyDamage(value: number) {
        this.currentHealth -= value;
        if (this.currentHealth <= 0) {
            //maybe pool them instead
            // spawn some items upon death
            this.destroy();
        }
    }

    protected movement() {
        if (this.canChangeDirection) {
            this.movementVector = this.createMovementVector();
            this.canChangeDirection = false;
        }
        this.setVelocity(this.movementVector.x, this.movementVector.y);
    }

    protected createMovementVector(): { x: number; y: number } {
        const x = Math.random() * 50 + 50 * (Math.random() > 0.5 ? -1 : 1);
        const y = Math.random() * 50 + 50 * (Math.random() > 0.5 ? -1 : 1);
        return { x: x, y: y };
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.movement();
    }
}
