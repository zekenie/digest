module.exports = function(sequelize, DataTypes) {
  var Recommendation = sequelize.define('Recommendation',
    {
      
    },

    {
      classMethods:{
        associate:function(models) {
          Recommendation
              .hasOne(models.User, {as:'recommender'})
              .hasOne(models.User, {as:'recommendee'})
              .hasOne(models.Story)
        }
      }
    })
}