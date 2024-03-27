import { Physics, Scene } from 'phaser';
import { PlayerResources } from '../resources/resources';
import { Weapon, Weapon01 } from '../weapons/weapon01';

export class PlayerArcade extends Physics.Arcade.Sprite {
    health = 100;
    sprintSpeed = 260;
    speed = 160;
    // reload milliseconds
    reload = 200;
    // scene: any;
    resources: PlayerResources;

    weapons: Weapon[] = [];

    currentWeapon: Weapon;

    canShoot = true;

    constructor(public scene: any, x = 0, y = 0, texture = 'gumiak') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.resources = new PlayerResources();

        this.weapons.push(new Weapon01('energy', 200, 100, 200));
        this.weapons.push(new Weapon01('physical', 200, 100, 600));
        this.weapons.push(new Weapon01('physical', 20, 1000, 1000));
        this.weapons.push(new Weapon01('energy', 500, 20, 100));

        this.currentWeapon = this.weapons[0];
    }

    shoot() {
        // console.log('shoot');
        if (typeof this.scene['fireBullet'] === 'function') {
            if (this.canShoot) {
                this.scene.fireBullet();

                this.canShoot = false;
                setTimeout(() => (this.canShoot = true), this.currentWeapon.reloadTime);
            }
        }
        // console.log(this.scene);
    }

    switchWeapon(to: number) {
        this.currentWeapon = this.weapons[to];
        // console.log('weapon switched to: ', this.currentWeapon);
    }
}
