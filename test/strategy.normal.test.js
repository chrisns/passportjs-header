/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function () {

  describe('handling a request with valid credentials', function () {
    var strategy = new Strategy(function (userid, done) {
      if (userid == 'test@example.com') {
        return done(null, {id: '1234'}, {scope: 'read'});
      }
      return done(null, false);
    });

    var user
      , info;

    before(function (done) {
      chai.passport(strategy)
        .success(function (u, i) {
          user = u;
          info = i;
          done();
        })
        .req(function (req) {
          req.headers.http_email = "test@example.com";
        })
        .authenticate();
    });

    it('should supply user', function () {
      expect(user).to.be.an.object;
      expect(user.id).to.equal('1234');
    });

    it('should supply info', function () {
      expect(info).to.be.an.object;
      expect(info.scope).to.equal('read');
    });
  });

  describe('handling a request without any credentials', function () {
    var strategy = new Strategy(function (userid, done) {
      throw new Error('should not be called');
    });

    var info, status;

    before(function (done) {
      chai.passport(strategy)
        .fail(function (i, s) {
          info = i;
          status = s;
          done();
        })
        .authenticate();
    });

    it('should fail with info and status', function () {
      expect(info).to.be.an.object;
      expect(info.message).to.equal('Missing credentials');
      expect(status).to.equal(400);
    });
  });
});
