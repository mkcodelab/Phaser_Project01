import { Physics, Scene } from 'phaser';
import { PlayerResources } from '../resources/resources';
import { Weapon, Weapon01, Weapon02 } from '../weapons/weapon01';

// move them somewhere else later
const rifle: Weapon = new Weapon02({
    ammunitionType: 'kinetic',
    ammunitionQuantity: 200,
    baseDamage: 100,
    reloadTime: 600,
    recoil: 0.001,
    sound: 'rifle',
});

const blaster: Weapon = new Weapon02({
    ammunitionType: 'energy',
    ammunitionQuantity: 200,
    baseDamage: 50,
    reloadTime: 300,
    recoil: 0.001,
    sound: 'pistol',
});

export class PlayerArcade extends Physics.Arcade.Sprite {
    maxHealth = 100;
    currentHealth = 100;
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

        // this.weapons.push(new Weapon01('energy', 200, 100, 200, 0.001, 'shotgun'));
        // this.weapons.push(new Weapon01('kinetic', 200, 100, 600, 0.001, undefined));
        // this.weapons.push(new Weapon01('default', 20, 1000, 1000, 0.01, 'rifle'));
        // this.weapons.push(new Weapon01('kinetic', 500, 20, 100, 0.0005, 'pistol'));

        // this.weapons.push(rifle);
        this.addWeapon(rifle);
        this.addWeapon(blaster);

        this.currentWeapon = this.weapons[0];
    }

    shoot() {
        // console.log('shoot');
        if (typeof this.scene['fireBullet'] === 'function') {
            if (this.canShoot) {
                this.scene.fireBullet(
                    this.currentWeapon.ammunitionType,
                    this.currentWeapon.recoil,
                    this.currentWeapon.sound
                );

                this.canShoot = false;
                setTimeout(() => (this.canShoot = true), this.currentWeapon.reloadTime);
            }
        }
        // console.log(this.scene);
    }

    switchWeapon(id: number) {
        // check if index of weapon exist
        if (typeof this.weapons[id] !== 'undefined') {
            // console.log('switched to: ', id);
            this.scene.weaponSwitchSfx.play();
            this.currentWeapon = this.weapons[id];
        }
    }

    addWeapon(weapon: Weapon) {
        this.weapons.push(weapon);
    }

    applyDamage(value: number) {
        if (value < this.currentHealth) {
            this.currentHealth -= value;
        } else {
            this.currentHealth = 0;
        }
    }

    heal(value: number) {
        if (this.currentHealth < this.maxHealth) {
            // if value exceeds max health, heal to full
            if (this.currentHealth + value > this.maxHealth) {
                this.currentHealth = this.maxHealth;
            } else {
                this.currentHealth += value;
            }
        }
    }
}
