type AmmunitionType = 'energy' | 'kinetic' | 'default';
type AmmunitionSound = 'pistol' | 'rifle' | 'shotgun' | 'minigun' | 'default' | undefined;

// todo:
// add bullet speed here, not for the bullet class

/**
 * @param reloadTime - reload time in milliseconds
 * @param recoil - camera shake i.e. 0.001
 */
export interface Weapon {
    name: string;
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;
    bulletSpeed?: number;
}

// export class Weapon01 implements Weapon {
//     constructor(
//         public ammunitionType: AmmunitionType,
//         public ammunitionQuantity: number,
//         public baseDamage: number,
//         public reloadTime: number,
//         public recoil: number,
//         public sound: AmmunitionSound,
//         public name: string
//     ) {}
// }

export class Weapon02 implements Weapon {
    name: string;
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;
    bulletSpeed?: number;

    constructor(weaponConfig: Weapon) {
        this.ammunitionType = weaponConfig.ammunitionType;
        this.ammunitionQuantity = weaponConfig.ammunitionQuantity;
        this.baseDamage = weaponConfig.baseDamage;
        this.reloadTime = weaponConfig.reloadTime;
        this.recoil = weaponConfig.recoil;
        this.sound = weaponConfig.sound;
        this.name = weaponConfig.name;
        this.bulletSpeed = weaponConfig.bulletSpeed;
    }
}

export const rifle: Weapon = new Weapon02({
    name: 'rifle',
    ammunitionType: 'kinetic',
    ammunitionQuantity: 20,
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
    baseDamage: 10,
    reloadTime: 40,
    recoil: 0.001,
    sound: 'minigun',
});

export const fireball: Weapon = new Weapon02({
    name: 'fireball',
    ammunitionType: 'default',
    ammunitionQuantity: 100,
    baseDamage: 60,
    reloadTime: 600,
    recoil: 0.005,
    sound: 'shotgun',
});
