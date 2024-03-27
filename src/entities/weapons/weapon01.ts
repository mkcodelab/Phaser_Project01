type AmmunitionType = 'energy' | 'physical';

/**
 * @param reloadTime - reload time in milliseconds
 */
export interface Weapon {
    ammunitionType: AmmunitionType;
    ammunitionQuantity: number;
    baseDamage: number;
    reloadTime: number;
}

export class Weapon01 implements Weapon {
    constructor(
        public ammunitionType: AmmunitionType,
        public ammunitionQuantity: number,
        public baseDamage: number,
        public reloadTime: number
    ) {}
}
