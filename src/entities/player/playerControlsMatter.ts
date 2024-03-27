import { Scene, Input } from 'phaser';
import { PlayerMatter } from './playerMatter';

interface ControlKeys {
    left: any;
    right: any;
    jump: any;
    sprint: any;
}

export class PlayerControlsMatter {
    cursors: any;
    player: PlayerMatter;

    currentSpeed: number;

    controlKeys: ControlKeys;

    spacebarJustPressed: boolean;

    constructor(scene: Scene, player: PlayerMatter) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.player = player;
        // maybe should be in player class?
        this.player.setFixedRotation();

        this.controlKeys = {
            left: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.D),
            jump: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SPACE),
            sprint: scene.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SHIFT),
        };
    }

    handleControls() {
        this.spacebarJustPressed = Input.Keyboard.JustDown(this.controlKeys.jump);
        // console.log(this.spacebarJustPressed);
        this.player.setAwake();
        if (this.controlKeys.sprint.isDown) {
            this.currentSpeed = this.player.sprintSpeed | 10;
        } else {
            this.currentSpeed = this.player.speed | 5;
        }

        if (this.controlKeys.left.isDown) {
            this.player.setVelocityX(-this.currentSpeed);
            this.player.flipX = true;
        } else if (this.controlKeys.right.isDown) {
            this.player.flipX = false;

            this.player.setVelocityX(this.currentSpeed);
        } else {
            this.player.setVelocityX(0);
        }
        // && (this.player.body!.touching.down || this.isOnWall
        if (this.controlKeys.jump.isDown && this.spacebarJustPressed) {
            this.player.setVelocityY(-10);
        }
    }

    get isOnWall() {
        // return this.player.body?.blocked.right || this.player.body?.blocked.left;
        return true;
    }
}
