module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User',
    {
      email:DataTypes.STRING,
      admin:DataTypes.BOOLEAN
    },

    {
      instanceMethods:{
        email:function() {},
        reccomend:function(user,story,cb) {
          sequelize.model('Recommendation').create({story:story,user:user}).complete(cb);
        },
        vote:function(story,cb) {
          sequelize.model('Vote').create({story:story,user:this}).complete(cb);
        },
        tagSubscribe:function(tag,cb) {
          this.addTag(tag).complete(cb);
        },
        tagUnsubscribe:function(tag,cb) {
          this.removeTag(tag).complete(cb)
        }
      },
      classMethods:{
        associate:function(models) {
          User.hasMany(models.Story)
              .hasMany(models.Recommendation, {as:'recommendationsForUser'})
              .hasMany(models.Recommendation, {as:'recommendationsByUser'})
              .hasMany(models.Vote)
              .hasMany(models.Tag)
        }
      }
    })

  return User
}