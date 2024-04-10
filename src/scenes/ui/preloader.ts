import { Scene } from 'phaser';

const audioPath = 'assets/audio/';

const imagePath = 'assets/';

class AudioAsset {
    public url: string;
    constructor(public name: string, public filename: string) {
        this.url = audioPath + filename;
    }
}

class ImageAsset {
    public url: string;
    constructor(public name: string, public filename: string) {
        this.url = imagePath + filename;
    }
}

const audio = [
    new AudioAsset('pistol', 'pistol.ogg'),
    new AudioAsset('rifle', 'rifle.ogg'),
    new AudioAsset('shotgun', 'shotgun.ogg'),
    new AudioAsset('minigun', 'minigun.ogg'),
    new AudioAsset('weaponSwitch', 'weapswitch.ogg'),
    new AudioAsset('bell', 'bell_02.ogg'),
    new AudioAsset('explosion', 'explosion.ogg'),
];

const images = [
    new ImageAsset('background', 'Starfield-7.png'),
    new ImageAsset('ground', 'ground.png'),
    new ImageAsset('gumiak', 'gumiak.png'),
    new ImageAsset('ghost', 'ghost.png'),
    new ImageAsset('bullet', 'bullet.png'),
    new ImageAsset('kineticBullet', 'kineticBullet.png'),
    new ImageAsset('energyBullet', 'energyBullet.png'),
    new ImageAsset('crosshair', 'crosshair.png'),
    new ImageAsset('defaultCollectible', 'defaultCollectible.png'),
];

export class Preloader {
    constructor(private scene: Scene) {}

    loadAudio() {
        for (let sound of audio) {
            this.scene.load.audio(sound.name, sound.url);
        }
    }

    loadImages() {
        for (let image of images) {
            this.scene.load.image(image.name, image.url);
        }
    }
}
