import dude from "/src/assets/dude.png";
import frinky from "/src/assets/frinky.png";
import sankara from "/src/assets/sankara.png";
import tileset from "/src/assets/tile/tileset.png";
import houses from "/src/assets/Houses.png";
import arrow from "/src/assets/arrow.png";
import tilemap from "/src/assets/tile/tilemap1.json";


const loadAssets = (scene) =>{
       scene.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
       scene.spritesheet('frinky', frinky, { frameWidth: 32, frameHeight: 32 });
       scene.spritesheet('sankara', sankara, { frameWidth: 32, frameHeight: 32 });
       scene.tilemapTiledJSON('home', tilemap);
       scene.image('tiles', tileset);
       scene.image('Houses', houses);
       scene.image('arrow', arrow);
}

export default loadAssets;
