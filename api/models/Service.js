/**
* Service.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: false
    },
    class: {
        type: 'integer',
        required: true
    },
    cost: {
        type: 'integer',
        required: true
    },
    duration: {
        type: 'integer',
        required: true
    },
    durationFast: {
        type: 'integer',
        required: true
    }
  }
};

