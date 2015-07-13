/**
 * CarTypeController
 *
 * @description :: Server-side logic for managing cartypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	count: function(req, res){
        var count = CarType.count(function(err, num){
            res.json(num);
        });
    }
};

