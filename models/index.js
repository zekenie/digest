var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash');

module.exports = function(config) {
  var sequelize = new Sequelize(config.db.db, config.db.user, config.db.password,{
    dialect:  'postgres',
    protocol: 'postgres',
    port:config.db.port,
    host:config.db.host,
    logging:console.log
  }),
  db        = {}

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      console.log(path.join(__dirname, file))
      var model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  return lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db)
}