/**
 * @fileoverview Unit Tests for email-alerts.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var expect = require('expect.js');

describe('test for required options', function() {
  it('should throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        apiKey: process.env.SENDGRID_API_KEY
      });
    }).to.throwError();
  });

  it('should throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        toEmail: 'blah'
      });
    }).to.throwError();
  });

  it('should not throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        toEmail: 'blah',
        apiKey: process.env.SENDGRID_API_KEY
      });
    }).to.not.throwError();
  });
});

describe('test the alert() method', function() {
  it('should send me an email', function(done) {
    var emailAlerts = require('../email-alerts')({
      toEmail: 'alvin.lin.dev@gmail.com',
      apiKey: process.env.SENDGRID_API_KEY
    });
    var date = new Date();
    var content = 'Unit test run at ' + date;
    emailAlerts.alert('email-alerts unit test', content, function(error) {
      expect(error).to.not.be.ok();
      done();
    });
  });
});

describe('test the errorHandler() method', function() {
  it('should send me an email', function(done) {
    var emailAlerts = require('../email-alerts')({
      toEmail: 'alvin.lin.dev@gmail.com',
      apiKey: process.env.SENDGRID_API_KEY
    });
    emailAlerts.errorHandler(function(error, data, data2) {
      expect(error).to.be(true);
      expect(data).to.be('your mom');
      expect(data2).to.be('your dad');
      done();
    })(true, 'your mom', 'your dad');
  });
});
