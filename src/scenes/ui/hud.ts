import { GameObjects, Scene } from 'phaser';
import { playerEvents } from '../../entities/player/playerArcade';
import { controlsEvents } from '../../entities/player/playerControlsArcade';

interface HudProperties {
    currentWeapon: GameObjects.Text;
    playerHealth: GameObjects.Text;
    ammo: GameObjects.Text;
}

export class HUD extends Scene implements HudProperties {
    currentWeapon: GameObjects.Text;
    playerHealth: GameObjects.Text;
    ammo: GameObjects.Text;

    inventoryOpen = false;

    inventory: GameObjects.Text;

    constructor() {
        super({ key: 'hud', active: true });
    }

    preload() {}

    create() {
        this.currentWeapon = this.add.text(20, 20, 'weapon: ');
        this.playerHealth = this.add.text(20, 40, 'health: ');
        this.ammo = this.add.text(20, 60, 'ammo: ');

        this.inventory = this.add.text(20, 80, 'inventory');
        this.inventory.visible = this.inventoryOpen;

        playerEvents.on('ammo', this.updateAmmoCount, this);
        playerEvents.on('currentWeapon', this.updateCurrentWeapon, this);
        controlsEvents.on('inventoryToggle', this.toggleInventory, this);
    }

    updateAmmoCount(value: number) {
        this.ammo.text = 'ammo ' + value.toString();
    }

    updateCurrentWeapon(weaponName: string) {
        this.currentWeapon.text = 'weapon: ' + weaponName;
    }

    toggleInventory() {
        console.log('inventory toggled');
        this.inventoryOpen = !this.inventoryOpen;
        this.inventory.setVisible(this.inventoryOpen);
    }
}
