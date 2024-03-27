import { Physics, Scene, Math as P_Math } from 'phaser';
import { CENTER } from '..';
import { PlayerArcade } from '../entities/player/playerArcade';
import { PlayerControlsArcade } from '../entities/player/playerControlsArcade';
import { DefaultBullet, DefaultBulletGroup, DirVector } from '../entities/projectiles/defaultBullet';
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

    laserGroup: DefaultBulletGroup;

    bulletGroup: any;

    // reticle = {
    //     x: 0,
    //     y: 0,
    // };

    preload() {
        this.load.image('background', 'assets/Starfield-7.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('gumiak', 'assets/gumiak.png');
        this.load.image('ghost', 'assets/ghost.png');
        this.load.image('bullet', 'assets/bullet.png');
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

        // this.laserGroup = new DefaultBulletGroup(this);
        this.bulletGroup = this.physics.add.group({ classType: DefaultBullet, runChildUpdate: true });

        this.physics.add.collider(this.platforms, this.bulletGroup, (platforms, projectile) => {
            projectile.destroy();
        });

        // this.input.on('pointermove', (pointer: any) => {
        //     this.reticle.x = this.player.x;
        //     this.reticle.y = this.player.y;
        //     // console.log(this.reticle, pointer.x, pointer.y);
        //     // console.log(this.input.activePointer.worldX);

        //     // this.reticle.x += pointer.x;
        //     // this.reticle.y += pointer.y;
        // });

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

    fireBullet() {
        this.cameras.main.shake(200, 0.001);
        // const mouseVector: DirVector = { x: this.input.mousePointer.position.x, y: this.input.mousePointer.position.x };
        // this.laserGroup.fireLaser(this.player.x, this.player.y, mouseVector);

        const bullet: DefaultBullet = this.bulletGroup.get().setActive(true).setVisible(true);
        if (bullet) {
            const shooter = { x: this.player.x, y: this.player.y };
            // the problem is with the target, because it has pageX and pageY not scene.x scene.y
            const target = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };
            // const angle = P_Math.Angle.BetweenPoints(shooter, target);
            // console.log(shooter, target, angle);
            // console.log(mouseVector);
            bullet.fire(shooter, target);
        }
    }
}
