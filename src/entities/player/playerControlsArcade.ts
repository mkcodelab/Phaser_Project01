import { Scene, Input, Math as PMath } from 'phaser';
import { PlayerArcade } from './playerArcade';
import { Events } from 'phaser';

type Key = Input.Keyboard.Key | undefined;

interface ControlKeys {
    left: Key;
    right: Key;
    jump: Key;
    sprint: Key;
    inventory: Key;
}

interface WeaponSlotKeys {
    slot0: Key;
    slot1: Key;
    slot2: Key;
    slot3: Key;
}

export const controlsEvents = new Events.EventEmitter();

export class PlayerControlsArcade {
    currentSpeed: number;

    controlKeys: ControlKeys;

    weaponSlotKeys: WeaponSlotKeys;

    constructor(public scene: Scene, public player: PlayerArcade) {
        this.controlKeys = {
            left: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.D),
            jump: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SPACE),
            sprint: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SHIFT),
            inventory: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.I),
        };

        this.weaponSlotKeys = {
            slot0: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.ONE),
            slot1: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.TWO),
            slot2: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.THREE),
            slot3: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.FOUR),
        };
    }

    handleControls() {
        if (this.controlKeys.sprint!.isDown) {
            this.currentSpeed = this.player.sprintSpeed;
        } else {
            this.currentSpeed = this.player.speed;
        }

        if (this.controlKeys.left!.isDown) {
            this.player.setVelocityX(-this.currentSpeed);
            this.player.flipX = true;
        } else if (this.controlKeys.right!.isDown) {
            this.player.setVelocityX(this.currentSpeed);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
            // this.player.setVelocityX(PMath.Linear(this.currentSpeed, 0, 0.1));
            // this.player.setVelocityX(PMath.Interpolation.SmoothStep(0.5, this.currentSpeed, 0));
        }
        if (this.controlKeys.jump!.isDown && (this.player.body!.touching.down || this.isOnWall)) {
            this.player.setVelocityY(-330);
        }

        if (Input.Keyboard.JustDown(this.controlKeys.inventory!)) {
            controlsEvents.emit('inventoryToggle');
        }
    }

    handleMouseInput() {
        if (this.scene.input.mousePointer.leftButtonDown()) {
            this.player.shoot();
        }
    }

    // add switchWeapon method to the player class and operate there...
    handleWeaponSwitch() {
        if (Input.Keyboard.JustDown(this.weaponSlotKeys.slot0!)) {
            this.player.switchWeapon(0);
        } else if (Input.Keyboard.JustDown(this.weaponSlotKeys.slot1!)) {
            this.player.switchWeapon(1);
        } else if (Input.Keyboard.JustDown(this.weaponSlotKeys.slot2!)) {
            this.player.switchWeapon(2);
        } else if (Input.Keyboard.JustDown(this.weaponSlotKeys.slot3!)) {
            this.player.switchWeapon(3);
        }
    }

    handlePlayerInput() {
        this.handleControls();
        this.handleMouseInput();
        this.handleWeaponSwitch();
    }

    get isOnWall() {
        return this.player.body?.blocked.right || this.player.body?.blocked.left;
    }
}
