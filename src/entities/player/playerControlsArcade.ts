import { Scene, Input } from 'phaser';
import { PlayerArcade } from './playerArcade';

type Key = Input.Keyboard.Key | undefined;

interface ControlKeys {
    left: Key;
    right: Key;
    jump: Key;
    sprint: Key;
}

interface WeaponSlotKeys {
    slot0: Key;
    slot1: Key;
    slot2: Key;
    slot3: Key;
}

// interface MouseButons {
//     lmb: any;
//     rmb: any;
// }

export class PlayerControlsArcade {
    cursors: any;
    // player: PlayerArcade;

    currentSpeed: number;

    controlKeys: ControlKeys;

    weaponSlotKeys: WeaponSlotKeys;

    // mouseButtons: MouseButons;

    constructor(public scene: Scene, public player: PlayerArcade) {
        // this.player = player;

        this.controlKeys = {
            left: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.D),
            jump: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SPACE),
            sprint: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SHIFT),
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
        }
        if (this.controlKeys.jump!.isDown && (this.player.body!.touching.down || this.isOnWall)) {
            this.player.setVelocityY(-330);
        }
    }

    handleMouseInput() {
        if (this.scene.input.mousePointer.leftButtonDown()) {
            this.player.shoot();
        }
    }

    // add switchWeapon method to the player class and operate there...
    handleWeaponSwitch() {
        if (this.weaponSlotKeys.slot0!.isDown) {
            this.player.switchWeapon(0);
        } else if (this.weaponSlotKeys.slot1!.isDown) {
            this.player.switchWeapon(1);
        } else if (this.weaponSlotKeys.slot2!.isDown) {
            this.player.switchWeapon(2);
        } else if (this.weaponSlotKeys.slot3!.isDown) {
            this.player.switchWeapon(3);
        }
    }

    get isOnWall() {
        return this.player.body?.blocked.right || this.player.body?.blocked.left;
    }
}
