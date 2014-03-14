module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag',
    {
      name:DataTypes.STRING,
    },

    {
      classMethods:{
        associate:function(models) {
          Tag.hasMany(models.Story)
        }
      }
    })

  return Tag
}