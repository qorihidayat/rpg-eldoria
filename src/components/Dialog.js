let dialogTypingInterval = null;

export const showDialog = (dialog, speaker, camera, text,npcName, isPlayer = false) => {
    hideDialog(dialog, speaker);

    let i = 0;
    dialog.box.setVisible(true);
    dialog.text.setVisible(true);
    dialog.text.setText("");

    // Hitung posisi karakter berdasarkan teks
    const characterX = isPlayer ? window.innerWidth / 5: window.innerWidth / 1.3;
    const characterY = window.innerHeight - 150;
    console.log(`Posisi karakter X = ${characterX}, Posisi karakter Y = ${characterY}`);

    
    // Set gambar karakter
    dialog.characterImage.setTexture(isPlayer ? "frinky" : npcName);
    dialog.characterImage.setPosition(characterX, characterY).setAlpha(1).setVisible(true);

    

    dialogTypingInterval = setInterval(() => {
        if (i < text.length) {
            dialog.text.setText(dialog.text.text + text[i]);
            i++;
        } else {
            clearInterval(dialogTypingInterval);
        }
    }, 50);

    speaker.setVelocityX(0);
};


export const hideDialog = (dialog, npc) => {
    dialog.box.setVisible(false);
    dialog.text.setVisible(false);
    // Reset posisi karakter sebelum disembunyikan
    dialog.characterImage.setPosition(0, 0).setAlpha(0);
    dialog.text.setText("");

    if (dialogTypingInterval) {
        clearInterval(dialogTypingInterval);
        dialogTypingInterval = null;
    }
    npc.anims.play(`turn_${npc.texture.key}`, true);
    // npc.setVelocityX(50);
};
