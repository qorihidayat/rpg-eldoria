import GameScene from "./GameScene";

const Config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    // backgroundColor: '#2F8136',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true
        },
    },
    scene: [ GameScene ]
};

export default Config;
