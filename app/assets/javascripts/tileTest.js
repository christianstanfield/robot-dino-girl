// this.load.image('tileset', 'assets/tiles1.jpg');
// this.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });


// function preload() {

//     game.load.tilemap('map', 'assets/csv_map.csv', null, Phaser.Tilemap.CSV);
//     game.load.image('tiles', 'assets/tiles.jpg');

// }

// var map;
// var layer;
// var cursors;

// function create() {

//     //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
//     map = game.add.tilemap('map', 16, 16);

//     //  Now add in the tileset
//     map.addTilesetImage('tiles');

//     //  Create our layer
//     layer = map.createLayer(0);

//     //  Resize the world
//     layer.resizeWorld();

//     //  Allow cursors to scroll around the map
//     cursors = game.input.keyboard.createCursorKeys();

//     var help = game.add.text(16, 16, 'Arrows to scroll', { font: '14px Arial', fill: '#ffffff' });
//     help.fixedToCamera = true;

// }
