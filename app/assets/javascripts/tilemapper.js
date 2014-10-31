var TileMapper = function(game, csvMap, tileSheet) {
  this.game = game
  this.csvMap = csvMap
  this.sheet = tileSheet
}

TileMapper.prototype.loadAssets = function() {
  this.game.load.image('tiles', this.sheet);
  this.game.load.tilemap('map', this.csvMap, null, Phaser.Tilemap.CSV);
}

// Input an array of index ranges (i.e. (2,10)) for which you would like the layer to collide.

TileMapper.prototype.createTiles = function(collision_ranges) {
  this.map = this.game.add.tilemap('map', 30, 30)
  this.map.addTilesetImage('tileImage', 'tiles', 31, 31);
  this.layer = this.map.createLayer(0);
  for (i = 0; i < collision_ranges.length; i++) {
    this.map.setCollisionBetween(collision_ranges[i][0],collision_ranges[i][1])
  }
}

// Input an array of objects with which you would like the layer to collide.
// Make sure to set any #touch methods to #blocked methods in #update

TileMapper.prototype.updateTiles = function(collision_objects){
  for (i = 0; i < collision_objects.length; i++) {
    game.physics.arcade.collide(collision_objects[i], this.layer)
  }
}
