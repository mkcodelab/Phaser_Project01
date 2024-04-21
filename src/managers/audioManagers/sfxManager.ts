import { Scene, Sound } from 'phaser';

type AudioSound = Sound.HTML5AudioSound | Sound.WebAudioSound | Sound.NoAudioSound;

export class SfxManager {
    constructor(private scene: Scene) {}

    pistolSfx: AudioSound;
    rifleSfx: AudioSound;
    shotgunSfx: AudioSound;
    minigunSfx: AudioSound;
    weaponSwitchSfx: AudioSound;
    bellSfx: AudioSound;
    explosionSfx: AudioSound;

    initSFX() {
        this.pistolSfx = this.scene.sound.add('pistol');
        this.rifleSfx = this.scene.sound.add('rifle');
        this.shotgunSfx = this.scene.sound.add('shotgun');
        this.minigunSfx = this.scene.sound.add('minigun');
        this.weaponSwitchSfx = this.scene.sound.add('weaponSwitch');
        this.bellSfx = this.scene.sound.add('bell');
        this.explosionSfx = this.scene.sound.add('explosion');
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

    playSound(sound: string) {
        (this as any)[sound].play();
    }
}
