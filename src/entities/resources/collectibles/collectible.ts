import { Physics, Scene } from 'phaser';
import { TResource } from '../resources';
import { PlayerArcade } from '../../player/playerArcade';

export class BaseCollectible extends Physics.Arcade.Sprite {
    quantity: number;
    resourceType: TResource;
    constructor(
        scene: any,
        public player: PlayerArcade,
        x: number,
        y: number,
        texture: string,
        resourceType: TResource
    ) {
        super(scene, x, y, texture);
        this.resourceType = resourceType;
        scene.add.existing(this);
    }

    addResource() {
        console.log('resourceType: ', this.resourceType);
    }

    collect() {
        this.player.resources.addResource(this.resourceType, 1);
        this.destroy();
    }
}

export class BaseCollectibleGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);
        this.runChildUpdate = true;
    }
}
