type AmmunitionType = 'energy' | 'kinetic' | 'default';
type AmmunitionSound = 'pistol' | 'rifle' | 'shotgun' | 'minigun' | 'default' | undefined;
type ShotType = 'single' | 'spread';
// todo:
// add fireType = 'single' | 'spread'
// rename to ProjectileWeapon or BaseWeapon
/**
 * @param reloadTime - reload time in milliseconds
 * @param recoil - camera shake i.e. 0.001
 */
export interface Weapon {
    name: string;
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    shotType: ShotType;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;
    bulletSpeed?: number;
}

export interface SpreadWeapon {
    spreadValue: number;
    bulletsPerSpread: number;
}

export class Weapon02 implements Weapon {
    name: string;
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    shotType: ShotType;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;
    bulletSpeed?: number;

    constructor(weaponConfig: Weapon) {
        // standard
        // this.ammunitionType = weaponConfig.ammunitionType;
        // this.ammunitionQuantity = weaponConfig.ammunitionQuantity;
        // this.shotType = weaponConfig.shotType;
        // this.baseDamage = weaponConfig.baseDamage;
        // this.reloadTime = weaponConfig.reloadTime;
        // this.recoil = weaponConfig.recoil;
        // this.sound = weaponConfig.sound;
        // this.name = weaponConfig.name;
        // this.bulletSpeed = weaponConfig.bulletSpeed;

        // this works also
        // ({
        //     ammunitionType: this.ammunitionType,
        //     ammunitionQuantity: this.ammunitionQuantity,
        //     shotType: this.shotType,
        //     baseDamage: this.baseDamage,
        //     reloadTime: this.reloadTime,
        //     recoil: this.recoil,
        //     sound: this.sound,
        //     name: this.name,
        //     bulletSpeed: this.bulletSpeed,
        // } = weaponConfig);

        // but this is super short
        Object.assign(this, weaponConfig);
    }
}

export const rifle: Weapon = new Weapon02({
    name: 'rifle',
    ammunitionType: 'kinetic',
    ammunitionQuantity: 20,
    shotType: 'single',
    baseDamage: 100,
    reloadTime: 1000,
    recoil: 0.001,
    sound: 'rifle',
    bulletSpeed: 1600,
});

export const blaster: Weapon = new Weapon02({
    name: 'blaster',
    ammunitionType: 'energy',
    ammunitionQuantity: 200,
    shotType: 'single',
    baseDamage: 50,
    reloadTime: 300,
    recoil: 0.001,
    sound: 'pistol',
    bulletSpeed: 500,
});

export const minigun: Weapon = new Weapon02({
    name: 'minigun',
    ammunitionType: 'kinetic',
    ammunitionQuantity: 500,
    shotType: 'single',
    baseDamage: 10,
    reloadTime: 40,
    recoil: 0.001,
    sound: 'minigun',
});

export const fireball: Weapon = new Weapon02({
    name: 'fireball',
    ammunitionType: 'default',
    ammunitionQuantity: 100,
    shotType: 'spread',
    baseDamage: 60,
    reloadTime: 600,
    recoil: 0.005,
    sound: 'shotgun',
});
