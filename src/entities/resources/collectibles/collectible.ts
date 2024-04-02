import { Physics, Scene } from 'phaser';
import { TResource } from '../resources';

export class BaseCollectible extends Physics.Arcade.Sprite {
    quantity: number;
    resourceType: TResource;
    constructor(scene: any, x: number, y: number, texture: string, resourceType: TResource) {
        super(scene, x, y, texture);
        this.resourceType = resourceType;
        scene.add.existing(this);
    }

    addResource() {
        console.log('resourceType: ', this.resourceType);
    }

    collect() {
        console.log('collected');
        this.destroy();
    }
}

export class BaseCollectibleGroup extends Physics.Arcade.Group {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);
        this.runChildUpdate = true;
        // this.defaultKey = 'defaultCollectible';

        // this.createMultiple({
        //     classType: BaseCollectible,
        //     quantity: 20,
        //     active: true,
        //     visible: true,
        //     setXY: {
        //         stepX: 50,
        //     },

        //     setDepth: { z: 5 },

        //     key: 'defaultCollectible',
        // });
    }
    // spreadRandomly() {
    //     this.children.entries.forEach((entry) => {
    //         // entry.body!.position.x = Math.random() * 1000;
    //         // entry.body!.position.y = Math.random() * 1000;
    //     });
    // }
}
