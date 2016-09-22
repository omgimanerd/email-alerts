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
    apiKey: process.env.SENDGRID_API_KEY,
    subject: 'email-alerts unit test'
  });

  describe('the alert() method (async)', function() {
  //   it('should send me an email', function(done) {
  //     var date = new Date();
  //     var content = 'Unit test run at ' + date;
  //     emailAlerts.alert('email-alerts unit test', content, function(error) {
  //       expect(error).to.not.be.ok();
  //       done();
  //     });
  //   });
  // });
  //
  // describe('the alert() method (sync)', function() {
  //   it('should send me an email', function() {
  //     var date = new Date();
  //     var content = 'Unit test run at ' + date;
  //     emailAlerts.alert('email-alerts unit test', content);
  //   });
  // });

  describe('the errorCatcher() method', function() {
    it('should catch thrown errors', function() {
      expect(function() {
        emailAlerts.errorCatcher(function() {
          throw new Error('errorCatcher() thrown error caught');
        });
      }).to.not.throwError();
    });

    it('should pass the error to a callback', function(done) {
      emailAlerts.errorCatcher(function() {
        throw new Error('errorCatcher() thrown error to callback');
      }, function(error) {
        expect(error.message).to.be(
            'errorCatcher() thrown error to callback');
        done();
      });
    });
  });

  // describe('the errorHandler() method', function() {
  //   it('should work with a callback function to wrap', function(done) {
  //     emailAlerts.errorHandler(function(error, arg1, arg2) {
  //       expect(error).to.be.ok();
  //       expect(arg1).to.be('your mom');
  //       expect(arg2).to.be('your dad');
  //       done();
  //     })({
  //       error: true,
  //       message: 'errorHandler() with callback'
  //     }, 'your mom', 'your dad');
  //   });
  //
  //   it('should work with no callback function to wrap', function() {
  //     expect(function() {
  //       emailAlerts.errorHandler()({
  //         error: true,
  //         message: 'errorHandler() without callback'
  //       });
  //     }).to.not.throwError();
  //   });

    it('should not send an email when there is no error', function(done) {
      emailAlerts.errorHandler(function(error, arg1, arg2) {
        expect(error).to.not.be.ok();
        expect(arg1).to.be('fuck');
        expect(arg2).to.be('fuck2');
        done();
      })(false, 'fuck', 'fuck2');
    });
  });
});
