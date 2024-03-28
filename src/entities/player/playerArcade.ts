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

const minigun: Weapon = new Weapon02({
    ammunitionType: 'kinetic',
    ammunitionQuantity: 500,
    baseDamage: 10,
    reloadTime: 50,
    recoil: 0.001,
    sound: 'minigun',
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

        this.addWeapon(rifle);
        this.addWeapon(blaster);
        this.addWeapon(minigun);

        this.currentWeapon = this.weapons[0];
    }

    shoot() {
        // console.log('shoot');
        if (typeof this.scene['fireBullet'] === 'function') {
            if (this.canShoot && this.currentWeapon.ammunitionQuantity > 0) {
                // pass this data to some kind of player HUD
                console.log(this.currentWeapon.ammunitionQuantity);

                this.scene.fireBullet(
                    this.currentWeapon.ammunitionType,
                    this.currentWeapon.recoil,
                    this.currentWeapon.sound
                );
                this.currentWeapon.ammunitionQuantity--;

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

    addAmmunition(quantity: number, ammoType?: string) {
        this.currentWeapon.ammunitionQuantity += quantity;
    }
}
