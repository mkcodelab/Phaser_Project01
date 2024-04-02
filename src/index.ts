import { Game } from 'phaser';
import { Level01 } from './scenes/level_01';
import { HUD } from './scenes/ui/hud';

export const CENTER = {
    w: window.innerWidth / 2,
    h: window.innerHeight / 2,
};

const config = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelart: true,

    scene: [Level01, HUD],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 500 },
            debug: false,
        },
    },
};

const game = new Game(config);
