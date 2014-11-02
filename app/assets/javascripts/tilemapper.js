var TileMapper = function(game, csvMap, tileSheet) {
  this.game = game;
  this.csvMap = csvMap;
  this.sheet = tileSheet;
}

TileMapper.prototype.loadAssets = function(tileSheetName, mapName) {
  this.game.load.image(tileSheetName, this.sheet);
  this.game.load.tilemap(mapName, this.csvMap, null, Phaser.Tilemap.CSV);
}

// Input an array of index ranges (i.e. (2,10)) for which you would like the layer to collide.

TileMapper.prototype.createTiles = function(mapName, tileImageName, tileSheetName, collisionRanges) {
  this.map = this.game.add.tilemap(mapName, 30, 30);
  this.map.addTilesetImage(tileImageName, tileSheetName, 31, 31);
  this.layer = this.map.createLayer(0);
  this.layer.resizeWorld();
  for (i = 0; i < collisionRanges.length; i++) {
    this.map.setCollisionBetween(collisionRanges[i][0],collisionRanges[i][1]);
  }
}

// Input an array of objects with which you would like the layer to collide.
// Make sure to set any #touch methods to #blocked methods in #update

TileMapper.prototype.updateTiles = function(collisionObjects){
  for (i = 0; i < collisionObjects.length; i++) {
    game.physics.arcade.collide(collisionObjects[i], this.layer);
  }
}
