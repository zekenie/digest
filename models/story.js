module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define('Story',
    {
      title:DataTypes.STRING,
      body:DataTypes.STRING,
      url:{
        type:DataTypes.STRING,
        validate:{
          isUrl:true
        }
      },
      clicks:DataTypes.ARRAY(DataTypes.INTEGER)
    },

    {
      classMethods:{
        associate:function(models) {
          Story.hasMany(models.Tag)
               .hasMany(models.Vote)
               .hasMany(models.Recommendation)
               .belongsTo(models.User)
        }
      }
    })

  return Story
}