import { Physics } from 'phaser';
import { TResource } from '../resources';

export class BaseCollectible extends Physics.Arcade.Sprite {
    constructor(scene: any, x: number, y: number, texture: string, public resourcetype: TResource) {
        super(scene, x, y, texture);
    }
}
