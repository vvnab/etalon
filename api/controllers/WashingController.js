/**
 * WashingController
 *
 * @description :: Server-side logic for managing washings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	count: function(req, res){
        var count = Washing.count(function(err, num){
            res.json(num);
        });
    }
};

