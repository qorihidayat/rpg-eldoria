let dialogTypingInterval = null;

export const showDialog = (dialog, speaker, camera, text, isPlayer = true) => {
    hideDialog(dialog, speaker);

    let i = 0;
    dialog.box.setVisible(true);
    dialog.text.setVisible(true);
    dialog.text.setText("");

    // Hitung posisi karakter berdasarkan teks
    const characterX = isPlayer ? camera.centerX * 0.8 : camera.centerX * 2;
    // const characterX = window.innerWidth;
    const characterY = camera.centerY * 1.6;
    
    // Set gambar karakter
    dialog.characterImage.setTexture(isPlayer ? "frinky" : "dude");
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


export const hideDialog = (dialog, speaker) => {
    dialog.box.setVisible(false);
    dialog.text.setVisible(false);
    // Reset posisi karakter sebelum disembunyikan
    dialog.characterImage.setPosition(3000, 3000).setAlpha(0);
    dialog.text.setText("");

    if (dialogTypingInterval) {
        clearInterval(dialogTypingInterval);
        dialogTypingInterval = null;
    }

    speaker.setVelocityX(50);
};

