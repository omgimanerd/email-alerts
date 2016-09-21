/**
 * @fileoverview Unit Tests for email-alerts.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var expect = require('expect.js');

describe('fail if required options not specified', function() {
  describe('leaving out the toEmail option', function() {
    it('should throw an error', function() {
      expect(function() {
        var emailAlerts = require('../email-alerts')({
          apiKey: process.env.SENDGRID_API_KEY
        });
      }).to.throwError();
    });
  });

  describe('leaving out the apiKey option', function() {
    it('should throw an error', function() {
      expect(function() {
        var emailAlerts = require('../email-alerts')({
          toEmail: 'blah'
        });
      }).to.throwError();
    });
  });

  describe('properly passing all required options', function() {
    it('should not throw an error', function() {
      expect(function() {
        var emailAlerts = require('../email-alerts')({
          toEmail: 'blah',
          apiKey: process.env.SENDGRID_API_KEY
        });
      }).to.not.throwError();
    });
  });
});

describe('test the module methods', function() {
  var emailAlerts = require('../email-alerts')({
    toEmail: 'alvin.lin.dev@gmail.com',
    apiKey: process.env.SENDGRID_API_KEY
  });

  describe('test the alert() method', function() {
    it('should send me an email', function(done) {
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
      emailAlerts.errorHandler(function(error, arg1, arg2) {
        expect(error).to.be(true);
        expect(arg1).to.be('your mom');
        expect(arg2).to.be('your dad');
        done();
      })(true, 'your mom', 'your dad');
    });

    it('should not send me an email', function(done) {
      emailAlerts.errorHandler(function(error, arg1, arg2) {
        expect(error).to.be(false);
        expect(arg1).to.be('fuck');
        expect(arg2).to.be('gay');
        done();
      })(false, 'fuck', 'gay');
    });
  });
});
