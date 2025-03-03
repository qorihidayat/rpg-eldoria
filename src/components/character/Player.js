const createPlayer = (x, y, scene, dude) => {
    const playerObj = scene.physics.add.sprite(x, y, dude); 
    // playerObj.setBounce(0);
    // playerObj.setCollideWorldBounds(true);
    AnimationPlayer(scene, dude);
    return playerObj;
}

export const setWalkArcadeVersion = (scene, cursors, keyA, keyD, keyW) => {
    if(cursors.left.isDown || keyA.isDown){
        scene.setVelocityX(-160);
        scene.anims.play(`left_${scene.texture.key}`, true);
    }else if (cursors.right.isDown || keyD.isDown) {
        scene.setVelocityX(160);
        scene.anims.play(`right_${scene.texture.key}`, true);

    }else{
        scene.setVelocityX(0);
        scene.anims.play(`turn_${scene.texture.key}`, true);
    }

    if (cursors.up.isDown && scene.body.touching.down || keyW.isDown && scene.body.touching.down){
        scene.setVelocityY(-330);
    }
}

export const setWalkRPGVersion = ({ player, cursors, keyA, keyD, keyW, keyS, keyShift }) => {
    let speed = keyShift.isDown ? 150 : 50;

    // Reset kecepatan setiap frame
    player.setVelocity(0);

    // Gerak kiri & kanan
    if (cursors.left.isDown || keyA.isDown) {
        player.setVelocityX(-speed);
        player.anims.play(`left_${player.texture.key}`, true);
    } else if (cursors.right.isDown || keyD.isDown) {
        player.setVelocityX(speed);
        player.anims.play(`right_${player.texture.key}`, true);
    }else if(cursors.up.isDown || keyW.isDown){
        player.setVelocityY(-speed);
        player.anims.play(`top_${player.texture.key}`, true);
    }else if (cursors.down.isDown || keyS.isDown) {
        player.setVelocityY(speed);
        player.anims.play(`bot_${player.texture.key}`, true);
    }else{
        player.setVelocityX(0);
        player.anims.play(`turn_${player.texture.key}`, true);
    }

    // Gerak atas & bawah
    if (cursors.up.isDown || keyW.isDown) {
        player.setVelocityY(-speed);
    } else if (cursors.down.isDown || keyS.isDown) {
        player.setVelocityY(speed);
    }
}

export const AnimationPlayer = (scene, dude) => {
    scene.anims.create({
        key: `left_${dude}`,
        frames: scene.anims.generateFrameNumbers(dude, { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: `right_${dude}`,
        frames: scene.anims.generateFrameNumbers(dude, { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: `turn_${dude}`,
        frames: [{ key: dude, frame: 2 }],
        frameRate: 20
    });

    scene.anims.create({
        key: `top_${dude}`,
        frames: scene.anims.generateFrameNumbers(dude, { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: `bot_${dude}`,
        frames: scene.anims.generateFrameNumbers(dude, { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
};


export default createPlayer;
