import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Config from './components/config';

function App() {
    useEffect(() => {
        const game = new Phaser.Game(Config);
        // return () => game.destroy();
    }, []);

    return <div id="game-container" />;
}

export default App;
