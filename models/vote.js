module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote',
    {

    },

    {
      classMethods:{
        associate:function(models) {
          Vote.hasOne(models.User)
              .hasOne(models.Story)
        }
      }
    })

  return Vote
}