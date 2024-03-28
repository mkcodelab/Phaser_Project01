// import Phaser from 'phaser';
// import * as Phaser from 'phaser';

import { Game } from 'phaser';
// import { Scene01 } from './scenes/scene_01';
import { Level01 } from './scenes/level_01';
import { MatterScene01 } from './scenes/matterScene_01';

export const CENTER = {
    w: window.innerWidth / 2,
    h: window.innerHeight / 2,
};

const config = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    // zoom: 2,
    pixelart: true,

    scene: [Level01],
    // scene: [MatterScene01],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 500 },
            debug: false,
        },
    },

    // physics: {
    //     default: 'matter',
    //     matter: {
    //         enableSleeping: true,
    //         gravity: {
    //             x: 0,
    //             y: 2,
    //         },
    //         setBounds: {
    //             left: true,
    //             right: true,
    //             bottom: true,
    //         },
    //         debug: {
    //             showBody: true,
    //             showStaticBody: true,
    //         },
    //     },
    // },
};

const game = new Game(config);

// let inventoryOpened = false;

window.document.addEventListener('keydown', (event) => {
    if (event.key === 'i') {
        openInventory();
    }
});

const inventory: HTMLElement = window.document.createElement('div');
inventory.classList.add('inventory', 'closed');
document.body.appendChild(inventory);
// const inventory: HTMLElement | null = document.querySelector('inventory');

function openInventory() {
    if (inventory) {
        inventory.classList.toggle('closed');
    }
}
