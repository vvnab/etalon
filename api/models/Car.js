/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    plateNumber: {
        type: 'string',
        required: true
    },
    carType: {
        model: 'carType',
        index: true
    },
    user: {
        model: 'user',
        index: true
    }
  }
};

