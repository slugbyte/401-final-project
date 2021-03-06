'use strict';

const debug = require('debug')('ht:user-mock');
const User = require('../../model/user');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('create mock user');
  let username = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let password = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let email = lorem({count: 2, units: 'word'}).split(' ').join('-');
  let exampleUser = {
    username,
    password,
    email: `${email}@ht.com`,
  };
  this.tempPassword = password;
  new User(exampleUser)
  .generatePasswordHash(exampleUser.password)
  .then( user => user.save())
  .then( user => {
    this.tempUser = user;
    return user.generateToken();
  })
  .then( token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
