/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    datetime: {
        type: 'datetime',
        required: true
    },
    operator: {
        type: 'string',
        required: true
    },
    user: {
        model: 'user',
    },
    car: {
        model: 'car',
    },
    box: {
        model: 'box',
    },
    services: {
        type: 'array',
        required: true
    },
    duration: {
        type: 'integer'
    },
    state: {
        type: 'string',
        defaultsTo: '539f15766ee884700afc6287'
    }
  }
};

