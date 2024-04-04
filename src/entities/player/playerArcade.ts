import { Physics, Scene } from 'phaser';
import { PlayerResources } from '../resources/resources';
import { Weapon, blaster, fireball, minigun, rifle } from '../weapons/weapon01';

import { Events } from 'phaser';
import { Level01 } from '../../scenes/level_01';

export const playerEvents = new Events.EventEmitter();

export class PlayerArcade extends Physics.Arcade.Sprite {
    maxHealth = 100;
    currentHealth = 100;
    sprintSpeed = 260;
    speed = 160;
    lightIntensity = 3;

    resources: PlayerResources;

    weaponsHotbar: Weapon[] = [];

    currentWeapon: Weapon;

    canShoot = true;

    constructor(public scene: Level01, x = 0, y = 0, texture = 'gumiak') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.resources = new PlayerResources();

        this.addWeapon(rifle);
        this.addWeapon(blaster);
        this.addWeapon(minigun);
        this.addWeapon(fireball);

        this.currentWeapon = this.weaponsHotbar[0];

        scene.light = scene.lights.addLight(100, 100, 128).setIntensity(this.lightIntensity);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        this.scene.light.x = this.x;
        this.scene.light.y = this.y;
    }

    shoot() {
        // typeof this.scene['fireBullet'] === 'function'
        if (this.scene.fireBullet) {
            if (this.canShoot && this.currentWeapon.ammunitionQuantity > 0) {
                this.scene.fireBullet(
                    this.currentWeapon.ammunitionType,
                    this.currentWeapon.recoil,
                    this.currentWeapon.sound || '',
                    this.currentWeapon.baseDamage,
                    this.currentWeapon.bulletSpeed
                );
                this.currentWeapon.ammunitionQuantity--;

                // emit event, passing current ammo data
                playerEvents.emit('ammo', this.currentWeapon.ammunitionQuantity);

                this.canShoot = false;
                setTimeout(() => (this.canShoot = true), this.currentWeapon.reloadTime);
            }
        }
    }

    switchWeapon(id: number) {
        // check if index of weapon exist
        if (typeof this.weaponsHotbar[id] !== 'undefined') {
            this.scene.weaponSwitchSfx.play();
            this.currentWeapon = this.weaponsHotbar[id];
            playerEvents.emit('currentWeapon', this.currentWeapon.name);
        }
    }

    addWeapon(weapon: Weapon) {
        this.weaponsHotbar.push(weapon);
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
        playerEvents.emit('ammo', this.currentWeapon.ammunitionQuantity);
    }
}
