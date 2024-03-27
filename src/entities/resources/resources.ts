interface IResources {
    lightPoints: number;
    crystals: number;
    darkGlobes: number;
    greenCrystals: number;
}

export type TResource = 'lightPoints' | 'crystals' | 'darkGlobes' | 'greenCrystals';

export class PlayerResources {
    resources: IResources = {
        lightPoints: 0,
        crystals: 0,
        darkGlobes: 0,
        greenCrystals: 0,
    };

    addResource(resource: TResource, quantity: number) {
        this.resources[resource] += quantity;
    }

    removeResources(resource: TResource, quantity: number) {
        this.resources[resource] -= quantity;
    }

    getResource(resource: TResource): number {
        return this.resources[resource];
    }
}
