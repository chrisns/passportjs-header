/* global describe, it, expect */

var Strategy = require('../lib/strategy');

describe('Strategy', function () {

  var strategy = new Strategy(function () {
  });

  it('should be named local', function () {
    expect(strategy.name).to.equal('Header');
  });

  it('should throw if constructed without a verify callback', function () {
    expect(function () {
      var s = new Strategy();
    }).to.throw(TypeError, 'HeaderStrategy requires a verify callback');
  });

});
