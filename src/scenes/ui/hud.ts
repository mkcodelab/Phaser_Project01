import { GameObjects, Scene } from 'phaser';
import { playerEvents } from '../../entities/player/playerArcade';

interface HudProperties {
    currentWeapon: GameObjects.Text;
    playerHealth: GameObjects.Text;
    ammo: GameObjects.Text;
}

export class HUD extends Scene implements HudProperties {
    currentWeapon: GameObjects.Text;
    playerHealth: GameObjects.Text;
    ammo: GameObjects.Text;

    constructor() {
        super({ key: 'hud', active: true });
    }

    preload() {}

    create() {
        this.currentWeapon = this.add.text(20, 20, 'weapon: ');
        this.playerHealth = this.add.text(20, 40, 'health: ');
        this.ammo = this.add.text(20, 60, 'ammo: ');

        playerEvents.on('ammo', this.updateAmmoCount, this);
        playerEvents.on('currentWeapon', this.updateCurrentWeapon, this);
    }

    updateAmmoCount(value: number) {
        this.ammo.text = 'ammo ' + value.toString();
    }

    updateCurrentWeapon(weaponName: string) {
        this.currentWeapon.text = 'weapon: ' + weaponName;
    }

    // changeValue(property: , value) {
    //     if (this.hasOwnProperty(property)) {
    //         this[property] = value
    //     }
    // }
}
