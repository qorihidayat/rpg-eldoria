import loadAssets from '../components/Assets';
import createPlayer, { setWalk, setWalkTopDownVersion } from '../components/character/Player';
import map1 from './platforms';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#4ae4ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 1000 },
            debug: false
        },
    },
    scene: { preload, create, update }
};

function preload() {
    loadAssets(this.load);
}

function create() {
    this.camera1 = this.cameras.main;
    this.camera2 = this.cameras.add(0, 0, window.innerWidth, window.innerHeight);

    this.platforms = map1(this);
    this.player = createPlayer(200, this, 'dude');
    this.player2 = createPlayer(1400, this, 'dude3');
    
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player2, this.platforms);
    this.physics.add.collider(this.player, this.player2, () => {
        console.log('Player 1 dan Player 2 bersentuhan!');
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
}

function update() {
    setWalk(this.player, this.cursors, this.keyA, this.keyD, this.keyW);
    setWalk(this.player2, this.cursors, this.keyD, this.keyA, this.keyW);
}

export default config;
