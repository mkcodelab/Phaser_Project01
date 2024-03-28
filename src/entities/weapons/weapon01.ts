type AmmunitionType = 'energy' | 'kinetic' | 'default';

/**
 * @param reloadTime - reload time in milliseconds
 * @paramm recoil -
 */
export interface Weapon {
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
    recoil: number;
}

export class Weapon01 implements Weapon {
    constructor(
        public ammunitionType: AmmunitionType,
        public ammunitionQuantity: number,
        public baseDamage: number,
        public reloadTime: number,
        public recoil: number
    ) {}
}
