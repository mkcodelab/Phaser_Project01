type AmmunitionType = 'energy' | 'kinetic' | 'default';
type AmmunitionSound = 'pistol' | 'rifle' | 'shotgun' | 'minigun' | 'default' | undefined;

/**
 * @param reloadTime - reload time in milliseconds
 * @param recoil - camera shake i.e. 0.001
 */
export interface Weapon {
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;
}

export class Weapon01 implements Weapon {
    constructor(
        public ammunitionType: AmmunitionType,
        public ammunitionQuantity: number,
        public baseDamage: number,
        public reloadTime: number,
        public recoil: number,
        public sound: AmmunitionSound
    ) {}
}

export class Weapon02 implements Weapon {
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
    sound: AmmunitionSound;

    constructor(weaponConfig: Weapon) {
        this.ammunitionType = weaponConfig.ammunitionType;
        this.ammunitionQuantity = weaponConfig.ammunitionQuantity;
        this.baseDamage = weaponConfig.baseDamage;
        this.reloadTime = weaponConfig.reloadTime;
        this.recoil = weaponConfig.recoil;
        this.sound = weaponConfig.sound;
    }
}
