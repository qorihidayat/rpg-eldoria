export const showDialog = (dialog,npc, text) => {
    dialog.text.setText(text).setVisible(true);
    dialog.box.setVisible(true);
    npc.setVelocityX(0);
};

export const hideDialog = (dialog, npc) => {
    dialog.text.setVisible(false);
    dialog.box.setVisible(false);
    npc.setVelocityX(50);
};
