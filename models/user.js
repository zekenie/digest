module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User',
    {
      email:DataTypes:STRING,
      admin:DataTypes.BOOLEAN
    },

    {
      classMethods:{
        associate:function(models) {
          User.hasMany(models.Story)
              .hasMany(models.Recommendation, {as:'recommendationsForUser'})
              .hasMany(models.Recommendation, {as:'recommendationsByUser'})
              .hasMany(models.Vote)
        }
      }
    })
}