module.exports = function(sequelize, DataTypes) {
  var Recommendation = sequelize.define('Recommendation',
    {
      message:DataTypes.STRING,
      clickedAt:DataTypes.DATE
    },

    {
      instanceMethods:{
        click:function() {
          this.clickedAt = Date.now()
        }
      },
      classMethods:{
        associate:function(models) {
          Recommendation
              .hasOne(models.User, {as:'recommender'})
              .hasOne(models.User, {as:'recommendee'})
              .hasOne(models.Story)
        }
      }
    })
  return Recommendation
}