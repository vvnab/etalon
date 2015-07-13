/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
        type: 'email',
        unique: true,
        required: true
    },
    addr: {
        type: 'string'
    },
    phone: {
        type: 'string'
    },
    passwd: {
        type: 'string'
    },
    fullName: {
        type: 'string',
        required: true
    },
    groups: {
        type: 'array',
        defaultsTo: []
    },
    washings: {
        type: 'array',
        defaultsTo: []
    },
    status: {
        type: 'integer',
        defaultsTo: 0
    },
    enb: {
        type: 'boolean'
    }
  }
};

