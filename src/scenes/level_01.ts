import { Physics, Scene, Math as P_Math } from 'phaser';
import { CENTER } from '..';
import { PlayerArcade } from '../entities/player/playerArcade';
import { PlayerControlsArcade } from '../entities/player/playerControlsArcade';
import {
    Bullet,
    DefaultBullet,
    DefaultBulletGroup,
    DirVector,
    EnergyBullet,
    EnergyBulletGroup,
    KineticBulletGroup,
} from '../entities/projectiles/defaultBullet';
import { PlayerResources } from '../entities/resources/resources';

export class Level01 extends Scene {
    constructor() {
        super('level01');
    }

    image: any;
    platforms: any;
    platformsCount = 200;
    player: PlayerArcade;

    cursors: any;

    playerControls: PlayerControlsArcade;

    ambientLightColor = 0x444444;
    light: any;

    cursor: any;

    // groups
    bulletGroup: DefaultBulletGroup;
    kineticBulletGroup: KineticBulletGroup;
    energyBulletGroup: EnergyBulletGroup;

    preload() {
        this.load.image('background', 'assets/Starfield-7.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('gumiak', 'assets/gumiak.png');
        this.load.image('ghost', 'assets/ghost.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('kineticBullet', 'assets/kineticBullet.png');
        this.load.image('energyBullet', 'assets/energyBullet.png');
    }
    create() {
        // this.add.text(100, 100, 'onomatopeja');
        this.image = this.add.image(CENTER.w, CENTER.h, 'background').setPipeline('Light2D');
        // static group
        this.platforms = this.physics.add.staticGroup();

        this.createPlatforms(this.platformsCount);
        this.createFloor();

        this.lights.enable().setAmbientColor(this.ambientLightColor);
        this.light = this.lights.addLight(100, 100, 128).setIntensity(3);

        this.player = new PlayerArcade(this, 20, 20, 'gumiak');

        this.player.setBounce(0.2);

        this.physics.add.collider(this.player, this.platforms);

        this.playerControls = new PlayerControlsArcade(this, this.player);

        // camera follow player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);

        this.input.setDefaultCursor('url(assets/ghost.png), pointer');

        this.bulletGroup = new DefaultBulletGroup(this);
        this.kineticBulletGroup = new KineticBulletGroup(this);
        this.energyBulletGroup = new EnergyBulletGroup(this);

        // destroy bullets on contact
        this.physics.add.collider(this.platforms, this.bulletGroup, (platforms, projectile) => {
            projectile.destroy();
        });

        this.physics.add.collider(this.platforms, this.kineticBulletGroup, (platforms, projectile) => {
            projectile.destroy();
        });

        this.player.resources.addResource('lightPoints', 20);
        console.log(this.player.resources.getResource('lightPoints'));
    }
    update() {
        this.playerControls.handleControls();
        this.playerControls.handleMouseInput();
        this.playerControls.handleWeaponSwitch();

        // this.image.rotation += 0.005;a

        this.light.x = this.player.x;
        this.light.y = this.player.y;
    }

    createPlatforms(quantity: number) {
        for (let i = 0; i < quantity; i++) {
            const coords = {
                x: Math.floor(Math.random() * 1000),
                y: Math.floor(Math.random() * 1000),
            };
            // set pipeline adds lightning rendering
            this.platforms.create(coords.x, coords.y, 'ground').setPipeline('Light2D');
        }
    }
    createFloor() {
        for (let i = 0; i < 100; i++) {
            this.platforms.create(32 * i, 800, 'ground').setPipeline('Light2D');
        }
    }

    // updateCursor(pointer: any) {
    //     this.cursor.x
    // }

    fireBullet(bulletType: Bullet, shakeIntensity = 0.001) {
        // this.cameras.main.shake(time, intensity)
        // this.cameras.main.shake(time, )
        this.cameras.main.shake(200, shakeIntensity);

        let bullet: any;
        switch (bulletType) {
            case 'default':
                bullet = this.bulletGroup.get().setActive(true).setVisible(true);
                break;
            case 'kinetic':
                bullet = this.kineticBulletGroup.get().setActive(true).setVisible(true);
                break;
            case 'energy':
                bullet = this.energyBulletGroup.get().setActive(true).setVisible(true);
        }

        // const bullet: DefaultBullet = this.bulletGroup.get().setActive(true).setVisible(true);
        if (bullet) {
            const shooter = { x: this.player.x, y: this.player.y };
            // x, y coordinates of pointer in world space
            const target = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };

            bullet.fire(shooter, target);
        }
    }
}
