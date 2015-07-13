/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	date: function(req, res){
        var bgn = new Date(req.param('bgn'));
        var end = new Date(req.param('end'));
        Order
		.find({datetime: {'>=': bgn, '<=': end}})
		.sort('datetime ASC')
		.populate('user')
		.populate('car')
		.populate('box')
		.exec(function(err, data){
            res.json(data);
        });
    }
};



