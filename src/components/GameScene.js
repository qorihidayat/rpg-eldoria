import Phaser from "phaser";
import loadAssets from "./Assets";
import createPlayer, { setWalkRPGVersion } from "./character/Player";
import createMap from "./map/Home";
import { showDialog, hideDialog } from "./Dialog";
import Erin from "./character/erin";

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
        this.npcErin = Erin(this);
        this.setupCollider();
        this.setupInput();
        this.camera.startFollow(this.player, true, 0.5, 0.5);
        this.camera.setBounds(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
        this.physics.world.setBounds(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);        
        // this.camera.setZoom(0.5);
        this.dialog = {
            box: this.add.rectangle(400, 550, 700, 100, 0x000000, 0.8).setOrigin(0.5).setVisible(false),
            text: this.add.text(150, 530, "", { fontSize: "18px", fill: "#ffffff" }).setVisible(false),
        };
        this.npcErin.setVelocityX(50);
        console.log(`Window X : ${window.innerWidth}, Window Y : ${window.innerHeight}`);

    }

    update() {
        console.log(`Player X : ${this.player.x}, Player Y : ${this.player.y}`);
        if (this.touchingNPC && Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            if (!this.isDialogVisible) {
                showDialog(this.dialog, this.npcErin, "Halo, Namaku Erin! Ada yang bisa kubantu?");
                this.player.setVelocity(0, 0);
                this.playerCanMove = false; 
            } else {
                hideDialog(this.dialog, this.npcErin);  
                this.playerCanMove = true;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            hideDialog(this.dialog, this.npcErin);
            this.playerCanMove = true;
        }

        if (this.playerCanMove) {
            setWalkRPGVersion(this);
        }

        if (this.npcErin.body.blocked.right) {
            this.npcErinDirection = -1;
            this.npcErin.setVelocityX(-50);
        } else if (this.npcErin.body.blocked.left) {
            this.npcErinDirection = 1;
            this.npcErin.setVelocityX(50);
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
        this.physics.add.collider(this.npcErin, this.pagar);
        this.physics.add.collider(this.player, this.houses);
        this.physics.add.collider(this.player, this.pintuSekolah, () => console.log("Player menyentuh pintu sekolah!"));
        this.physics.add.collider(this.player, this.pintuRumah, () => console.log("Player menyentuh pintu rumah!"));
        this.physics.add.collider(this.player, this.npcErin, () => {
            this.touchingNPC = true;
            console.log("Player menyentuh NPC Erin");
        });
    }
}

export default GameScene;
