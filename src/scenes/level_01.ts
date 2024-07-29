import { Scene, GameObjects, Physics } from 'phaser';
import { CENTER } from '..';
import { PlayerArcade } from '../entities/player/playerArcade';
import { PlayerControlsArcade } from '../entities/player/playerControlsArcade';
import {
    Bullet,
    BulletClassType,
    DefaultBullet,
    DefaultBulletGroup,
    EnergyBulletGroup,
    KineticBullet,
    KineticBulletGroup,
} from '../entities/projectiles/defaultBullet';
import { BaseCollectible, BaseCollectibleGroup } from '../entities/resources/collectibles/collectible';
import { EnemyGhost } from '../entities/enemies/enemyGhost';
import { ExplosionsGroup } from '../entities/vfx/explosion/explosion';
import { Preloader } from './ui/preloader';
import { SfxManager } from '../managers/audioManagers/sfxManager';
import { Weapon } from '../entities/weapons/weapon01';

// type AudioSound = Sound.HTML5AudioSound | Sound.WebAudioSound | Sound.NoAudioSound;

export class Level01 extends Scene {
    constructor(key: string, private preloader: Preloader) {
        super(key);

        this.preloader = preloader;

        // this.sfxManager = new SfxManager(this);
        this.sfxManager = new SfxManager(this);
    }

    // preloader: Preloader;
    sfxManager: SfxManager;

    backgroundImage: GameObjects.Image;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    platformsCount = 200;
    player: PlayerArcade;

    // cursors: any;

    playerControls: PlayerControlsArcade;

    ambientLightColor = 0x333333;
    light: GameObjects.Light;

    // groups
    bulletGroup: DefaultBulletGroup;
    kineticBulletGroup: KineticBulletGroup;
    energyBulletGroup: EnergyBulletGroup;
    defaultCollectibleGroup: BaseCollectibleGroup;

    explosionsGroup: ExplosionsGroup;

    enemyGhostGroup: Physics.Arcade.Group;
    piesel: any;

    preload() {
        this.preloader.loadImages(this);
        this.preloader.loadAudio(this);

        this.load.spritesheet('explosion', 'assets/boom3.png', { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('piesel', 'assets/pieselspritesheet.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.input.setDefaultCursor('url(assets/crosshair.png), pointer');

        this.piesel = this.add.sprite(50, 50, 'piesel');

        this.initAnimations();
        this.sfxManager.initSFX();

        this.piesel.play('pieselrun');

        this.createWorld();

        this.lights.enable().setAmbientColor(this.ambientLightColor);
        // this.player.resources.addResource('lightPoints', 20);

        // player
        this.initPlayer();

        // groups
        this.initGroups();
        // after group exists, we can add coliders to it
        this.initPhysics();
    }

    update() {
        this.playerControls.handlePlayerInput();
    }

    // move to world generator
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
                .setScale(Math.random() * 2 + 0.8)
                .refreshBody();
        }
    }
    createFloor() {
        for (let i = 0; i < 100; i++) {
            this.platforms.create(32 * i, 1500, 'ground').setPipeline('Light2D');
        }
    }

    fireBullet(currentWeapon: Weapon) {
        let shotType = 'spread';

        this.cameras.main.shake(200, currentWeapon.recoil);
        type GroupType = DefaultBulletGroup | KineticBulletGroup | EnergyBulletGroup;
        let bullet: BulletClassType | undefined = undefined;
        let group: GroupType | undefined = undefined;

        switch (currentWeapon.ammunitionType) {
            case 'default':
                group = this.bulletGroup;
                break;
            case 'kinetic':
                group = this.kineticBulletGroup;
                break;
            case 'energy':
                group = this.energyBulletGroup;
                break;
            default:
                group = this.bulletGroup;
        }
        bullet = group.get().setActive(true).setVisible(true);

        if (bullet) {
            const shooter = { x: this.player.x, y: this.player.y };
            // x, y coordinates of pointer in world space
            const target = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };

            // it does not spread and shoot multiple bullets, because of the single entity returned by group.get()
            if (shotType === 'single') {
                bullet.fire(shooter, target, currentWeapon.baseDamage, currentWeapon.bulletSpeed);
            } else if (shotType === 'spread') {
                const spreadValue = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
                const spreadTarget = { x: target.x, y: target.y + spreadValue };
                bullet.fire(shooter, spreadTarget, currentWeapon.baseDamage, currentWeapon.bulletSpeed);
            }
            if (currentWeapon.sound) {
                this.sfxManager.playBulletSound(currentWeapon.sound);
            }
        }
    }

    addCollectiblesToGroup(group: GameObjects.Group, quantity: number) {
        for (let i = 0; i < quantity; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;

            const collectible = new BaseCollectible(this, this.player, x, y, 'defaultCollectible', 'crystals');

            if (group) {
                group.add(collectible);
            }
        }
    }

    addEnemies() {
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;

            const enemy = new EnemyGhost(this, x, y, 'ghost');
            this.enemyGhostGroup.add(enemy);
        }
    }

    initAnimations() {
        this.anims.create({
            key: 'explode',
            frames: 'explosion',
            frameRate: 60,
            repeat: 0,
        });

        this.anims.create({
            key: 'pieselrun',
            frames: 'piesel',
            frameRate: 10,
            repeat: -1,
        });
    }

    createExplosion(x: number, y: number): void {
        // const explosion = new Explosion(this, x, y, 40);

        // const explosion = this.explosionsGroup.get() as Explosion;
        const explosion = this.explosionsGroup.get();
        explosion.body.allowGravity = false;
        explosion.setAngle(Math.random() * 360);
        explosion.setActive(true).setVisible(true).setPosition(x, y).setCircle(40, 16, 64);
        this.sfxManager.playSound('explosionSfx');

        this.cameras.main.shake(200, 0.002);
    }

    initPlayer() {
        // maybe use DI here as well...
        this.player = new PlayerArcade(this, 20, 20, 'gumiak');
        this.player.setBounce(0.2);
        this.playerControls = new PlayerControlsArcade(this, this.player);
        this.physics.add.collider(this.player, this.platforms);

        // camera follow player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);
    }

    initGroups() {
        // bullet groups
        this.bulletGroup = new DefaultBulletGroup(this);
        this.kineticBulletGroup = new KineticBulletGroup(this);
        this.energyBulletGroup = new EnergyBulletGroup(this);
        this.explosionsGroup = new ExplosionsGroup(this);
        // collectible group
        this.defaultCollectibleGroup = new BaseCollectibleGroup(this);
        this.addCollectiblesToGroup(this.defaultCollectibleGroup, 20);

        // enemies
        this.enemyGhostGroup = this.physics.add.group({
            allowGravity: false,
        });

        this.addEnemies();
    }

    initPhysics() {
        this.physics.add.collider(this.defaultCollectibleGroup, this.platforms);

        this.physics.add.overlap(this.defaultCollectibleGroup, this.player, (player, collectible) => {
            const col = collectible as BaseCollectible;
            col.collect();
            this.sfxManager.playSound('bellSfx');
        });

        // destroy bullets on contact, add explosion
        this.physics.add.collider(this.platforms, this.bulletGroup, (platforms, projectile) => {
            projectile.destroy();

            const proj = projectile as DefaultBullet;
            this.createExplosion(proj.x, proj.y);
        });

        this.physics.add.collider(this.platforms, this.kineticBulletGroup, (platforms, projectile) => {
            projectile.destroy();
        });

        this.physics.add.overlap(this.explosionsGroup, this.enemyGhostGroup, (explosion, enemy) => {
            const ghost = enemy as EnemyGhost;
            ghost.setTint(0xff0000);
            ghost.applyDamage(200);
        });

        this.physics.add.overlap(this.enemyGhostGroup, this.bulletGroup, (ghost, projectile) => {
            const enemy = ghost as EnemyGhost;
            const defaultProjectile = projectile as DefaultBullet;
            enemy.applyDamage(defaultProjectile.damage);
            this.createExplosion(defaultProjectile.x, defaultProjectile.y);
            defaultProjectile.destroy();
        });

        this.physics.add.overlap(this.enemyGhostGroup, this.kineticBulletGroup, (ghost, projectile) => {
            const enemy = ghost as EnemyGhost;
            const kineticProjectile = projectile as KineticBullet;
            enemy.applyDamage(kineticProjectile.damage);
            kineticProjectile.destroy();
        });

        this.physics.add.collider(this.enemyGhostGroup, this.platforms);
    }

    createWorld() {
        this.platforms = this.physics.add.staticGroup();

        this.backgroundImage = this.add.image(CENTER.w, CENTER.h, 'background').setPipeline('Light2D');

        this.createPlatforms(this.platformsCount);
        this.createFloor();
    }
}
