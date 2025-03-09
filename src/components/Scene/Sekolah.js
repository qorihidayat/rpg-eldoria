class Sekolah extends Phaser.Scene {
    constructor() {
        super({ key: 'Sekolah' });
    }

    create() {
        this.add.text(100, 100, "Ini Scene 2 - Dalam Rumah", { fontSize: '20px', fill: '#fff' });
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
            console.log("Kembali ke luar rumah...");
            this.scene.start('GameScene'); // Kembali ke Scene1
        }
    }
}

export default Sekolah;
