module.exports = function(db) {
	return {
		index:function(req,res,next) {
      req.model.findAll().complete();
    },
		view:function(req,res,next) {},
		update:function(req,res,next) {},
		create:function(req,res,next) {},
		delete:function(req,res,next) {}
	};
}