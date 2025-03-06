import Phaser from "phaser";
import loadAssets from "./Assets";
import createPlayer, { AnimationPlayer, setWalkRPGVersion } from "./character/Player";
import createMap from "./map/Home";
import { showDialog, hideDialog } from "./Dialog";
import { NPC } from "./character/Npc";

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.playerCanMove = true;
        this.touchingNPC = false;
        this.isDialogVisible = false;
    }
    

    preload() {
        loadAssets(this.load);
    }

    create() {
        // Tentukan batas koordinat
        this.minX = 100;   // Batas kiri
        this.maxX = 2650;  // Batas kanan (sesuaikan dengan map)
        this.minY = 0;   // Batas atas
        this.maxY = 2050;  // Batas bawah (sesuaikan dengan map)
        this.camera = this.cameras.main;
        createMap(this);
        this.player = createPlayer(window.innerWidth, window.innerHeight, this, "frinky");
        this.npcSankara = NPC(this, 290, 270, "sankara");
        this.npcSankara.setVelocityX(50);
        this.npcSankara.anims.play(`right_${this.npcSankara.texture.key}`, true);
        this.setupCollider();
        this.setupInput();
        this.camera.startFollow(this.player, true, 0.5, 0.5);
        this.camera.setBounds(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
        this.physics.world.setBounds(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);        
        // this.camera.setZoom(0.5);
        this.setupDialogBox();
        console.log(`Window X : ${window.innerWidth}, Window Y : ${window.innerHeight}`);
        this.leftArrow = this.add.image(window.innerWidth / 1.2, 550, 'arrow').setInteractive().setScrollFactor(0).setScale(0.8);
    
        this.leftArrow.on('pointerdown', () => {
            this.player.setVelocityX(-200);
        });
    }

    update() {
        // console.log(`Player X : ${this.player.x}, Player Y : ${this.player.y}`);
        if (this.touchingNPC && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            if (!this.isDialogVisible) {
                showDialog(this.dialog, this.npcSankara, this.camera, `Halo, Namaku Sankara! Ada yang bisa kubantu?`, "sankara");
                this.player.setVelocity(0, 0);
                this.npcSankara.setVelocity(0,0);
                this.playerCanMove = false;
            } else {
                this.dialog.setText("");
                hideDialog(this.dialog, this.npcSankara);
                this.npcSankara.setVelocityX(50);
                this.npcSankara.anims.play(`right_${this.npcSankara.texture.key}`, true);
                this.playerCanMove = true;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            hideDialog(this.dialog, this.npcSankara);
            this.playerCanMove = true;
            this.npcSankara.setVelocityX(50);
                this.npcSankara.anims.play(`right_${this.npcSankara.texture.key}`, true);
        }

        if (this.playerCanMove) {
            setWalkRPGVersion(this);
        }

        if (this.npcSankara.body.blocked.right) {
            this.npcSankaraDirection = -1;
            this.npcSankara.setVelocityX(-50);
            this.npcSankara.anims.play(`left_${this.npcSankara.texture.key}`, true);
        } else if (this.npcSankara.body.blocked.left) {
            this.npcSankaraDirection = 1;
            this.npcSankara.setVelocityX(50);
            this.npcSankara.anims.play(`right_${this.npcSankara.texture.key}`, true);
        }
    
        this.touchingNPC = false;
    }

    setupInput(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    setupCollider(){
        this.physics.add.collider(this.player, this.pagar);
        this.physics.add.collider(this.player, this.object);
        this.physics.add.collider(this.npcSankara, this.pagar);
        this.physics.add.collider(this.player, this.houses);
        this.physics.add.collider(this.player, this.pintuSekolah, () => console.log("Player menyentuh pintu sekolah!"));
        this.physics.add.collider(this.player, this.pintuRumah, () => console.log("Player menyentuh pintu rumah!"));
        this.physics.add.collider(this.player, this.npcSankara, () => {
            this.touchingNPC = true;
            console.log("Player menyentuh NPC Erin");
        });
    }

    setupDialogBox(){
        const dialogWidth = this.camera.width * 0.8;
        const dialogHeight = 200;
        const borderRadius = 20; // Atur seberapa melengkung sudutnya

        // Buat grafik untuk rounded rectangle
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1); // Warna hitam dengan transparansi
        graphics.fillRoundedRect(
            this.camera.centerX - dialogWidth / 2, 
            this.camera.centerY + this.camera.height / 2 - dialogHeight / 2, 
            dialogWidth, 
            dialogHeight, 
            borderRadius
        );
        graphics.setScrollFactor(0).setDepth(10).setVisible(false); // Agar tidak bergerak dengan kamera

        this.dialog = {
            box: graphics, // Menggunakan graphics sebagai box
            text: this.add.text(
                this.camera.centerX - dialogWidth / 2 + 20, // Mulai dari kiri box
                this.camera.centerY + this.camera.height / 2 - dialogHeight / 2 + 20, // Sedikit ke atas agar rapi
                "", 
                { fontSize: "18px", fill: "#ffffff", wordWrap: { width: dialogWidth - 40 } } // Word wrap sesuai lebar box
            ).setScrollFactor(0).setDepth(11).setVisible(false),
            characterImage: this.add.image(0, 0, "frinky").setVisible(false).setScale(5).setDepth(9).setScrollFactor(0)
        };
    }
}

export default GameScene;
