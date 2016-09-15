/**
 * @fileoverview This file contains unit tests for this project.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var expect = require('expect.js');

describe('if not correctly initialized', function() {
  it('should throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        apiKey: process.env.SENDGRID_API_KEY
      });
    }).to.throwError();

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

describe('Email sending test', function() {
  it('should send me an email', function(done) {
    var emailAlerts = require('../email-alerts')({
      toEmail: 'alvin.lin.dev@gmail.com',
      apiKey: process.env.SENDGRID_API_KEY
    });
    emailAlerts.errorHandler('error', done);
  });
});
