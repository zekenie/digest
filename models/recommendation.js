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
              .belongsTo(models.User, {as:'recommender'})
              .belongsTo(models.User, {as:'recommendee'})
              .belongsTo(models.Story)
        }
      }
    })
  return Recommendation
}