module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define('Story',
    {
      title:DataTypes:STRING,
      body:DataTypes.STRING,

    },

    {
      classMethods:{
        associate:function(models) {
          Story.hasMany(models.Tag)
               .hasMany(models.Vote)
               .hasMany(models.Recommendation)
               .hasOne(models.User)
        }
      }
    })
}