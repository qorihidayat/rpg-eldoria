const map1 = (scene) => {
    const platforms = scene.physics.add.staticGroup();
    // jarak  berdekatan beda 35px
    platforms.create(1200, 180, 'ground').setScale(6,2).refreshBody();
    platforms.create(1400, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 720, 'ground');
    platforms.create(350, 620, 'gr3');
    platforms.create(0, 200, 'gr4');

    return platforms;
}

export default map1;