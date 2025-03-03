const createMap = (scene) => {
    const map = scene.make.tilemap({ key: "home" });

    const tiles = map.addTilesetImage(map.tilesets[0].name, "tiles");
    const tilesHouse = map.addTilesetImage(map.tilesets[1].name, "Houses");

    scene.ground = map.createLayer("Ground", tiles, 100, 0);
    console.log("Ground Layer Position:");
console.log("X:", scene.ground.x, "Y:", scene.ground.y);
console.log("Width (tiles):", map.width, "Height (tiles):", map.height);
console.log("Width (pixels):", map.widthInPixels, "Height (pixels):", map.heightInPixels);
    scene.object = map.createLayer("Object", tiles, 0, 0);
    scene.pagar = map.createLayer("Pagar", tiles, 0, 0);
    scene.groundHouses = map.createLayer("Ground_House", tilesHouse, 100, 0);
    scene.houses = map.createLayer("Sekolah/Houses", tilesHouse, 100, 0);
    scene.pintuSekolah = map.createLayer("Sekolah/Pintu_Sekolah", tilesHouse, 100, 0);
    scene.pintuRumah = map.createLayer("Sekolah/Pintu_Rumah", tilesHouse, 100, 0);
    scene.water = map.createLayer("Water", tiles, 1100, 0);
    scene.pagar.setCollisionBetween(1, 1000);
    scene.object.setCollisionBetween(1, 1000);
    scene.houses.setCollisionBetween(1, 1000);
    scene.pintuSekolah.setCollisionBetween(1, 1000);
    scene.pintuRumah.setCollisionBetween(1, 1000);

    scene.pagar.setPosition(100, 0);
    scene.object.setPosition(300, 0);
};

export default createMap;
