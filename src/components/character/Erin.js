const Erin = (scene) => {
    let npc = scene.physics.add.sprite(690, 270, "dude");
    npc.setImmovable(true);
    return npc;
};

export default Erin;
