/**
* Washing.js
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
    addr: {
        type: 'string',
        required: true
    },
    location: {
        type: 'array',
        defaultsTo: [0, 0]
    },
    phone: {
        type: 'string',
        required: true
    },
    schedule: {
        type: 'json',
        defaultsTo: [
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            },
            {
                bgn: '8:00',
                end: '20:00'
            }
        ]
    }
  }
};

