import { AnimationPlayer } from "./Player";

export const NPC = (scene, x, y, name) => {
    let npc = scene.physics.add.sprite(x, y, name);
    npc.setImmovable(true);
    AnimationPlayer(scene, name);
    return npc;
};