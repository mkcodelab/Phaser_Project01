import { Scene, Sound, GameObjects } from 'phaser';
import { CENTER } from '..';
import { PlayerArcade } from '../entities/player/playerArcade';
import { PlayerControlsArcade } from '../entities/player/playerControlsArcade';
import {
    Bullet,
    DefaultBulletGroup,
    EnergyBulletGroup,
    KineticBulletGroup,
} from '../entities/projectiles/defaultBullet';

type AudioSound = Sound.HTML5AudioSound | Sound.WebAudioSound | Sound.NoAudioSound;

export class Level01 extends Scene {
    constructor() {
        super('level01');
    }

    backgroundImage: GameObjects.Image;
    platforms: any;
    platformsCount = 200;
    player: PlayerArcade;

    cursors: any;

    playerControls: PlayerControlsArcade;

    ambientLightColor = 0x444444;
    light: GameObjects.Light;

    // groups
    bulletGroup: DefaultBulletGroup;
    kineticBulletGroup: KineticBulletGroup;
    energyBulletGroup: EnergyBulletGroup;

    // audio

    pistolSfx: AudioSound;
    rifleSfx: AudioSound;
    shotgunSfx: AudioSound;
    minigunSfx: AudioSound;

    weaponSwitchSfx: AudioSound;

    preload() {
        this.load.image('background', 'assets/Starfield-7.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('gumiak', 'assets/gumiak.png');
        this.load.image('ghost', 'assets/ghost.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('kineticBullet', 'assets/kineticBullet.png');
        this.load.image('energyBullet', 'assets/energyBullet.png');
        this.load.image('crosshair', 'assets/crosshair.png');

        this.load.audio('pistol', 'assets/audio/pistol.ogg');
        this.load.audio('rifle', 'assets/audio/rifle.ogg');
        this.load.audio('shotgun', 'assets/audio/shotgun.ogg');
        this.load.audio('minigun', 'assets/audio/minigun.ogg');
        this.load.audio('weaponSwitch', 'assets/audio/weapswitch.ogg');
    }
    create() {
        this.input.setDefaultCursor('url(assets/crosshair.png), pointer');

        this.pistolSfx = this.sound.add('pistol');
        this.rifleSfx = this.sound.add('rifle');
        this.shotgunSfx = this.sound.add('shotgun');
        this.minigunSfx = this.sound.add('minigun');
        this.weaponSwitchSfx = this.sound.add('weaponSwitch');

        this.backgroundImage = this.add.image(CENTER.w, CENTER.h, 'background').setPipeline('Light2D');
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

        this.light.x = this.player.x;
        this.light.y = this.player.y;
    }

    createPlatforms(quantity: number) {
        for (let i = 0; i < quantity; i++) {
            const coords = {
                x: Math.floor(Math.random() * 1500),
                y: Math.floor(Math.random() * 1500),
            };
            // set pipeline adds lightning rendering
            this.platforms
                .create(coords.x, coords.y, 'ground')
                .setPipeline('Light2D')
                .setScale(Math.random() * 2 + 0.5)
                .refreshBody();
        }
    }
    createFloor() {
        for (let i = 0; i < 100; i++) {
            this.platforms.create(32 * i, 1500, 'ground').setPipeline('Light2D');
        }
    }

    fireBullet(bulletType: Bullet, shakeIntensity = 0.001, bulletSound: string) {
        // this.cameras.main.shake(time, intensity)
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

        if (bullet) {
            const shooter = { x: this.player.x, y: this.player.y };
            // x, y coordinates of pointer in world space
            const target = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };

            bullet.fire(shooter, target);
            this.playBulletSound(bulletSound);
        }
    }

    playBulletSound(bulletSound: string) {
        switch (bulletSound) {
            case 'pistol':
                this.pistolSfx.play();
                break;
            case 'rifle':
                this.rifleSfx.play();
                break;
            case 'shotgun':
                this.shotgunSfx.play();
                break;
            case 'minigun':
                this.minigunSfx.play();
                break;
            default:
                this.weaponSwitchSfx.play();
                break;
        }
    }
}
