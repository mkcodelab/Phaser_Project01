import { Scene } from 'phaser';

export class Scene01 extends Scene {
    constructor() {
        super('scene01');
    }

    preload() {}

    create() {
        this.add.text(20, 20, 'Loading game...');
    }

    update() {}
}
