/**
 * @fileoverview This file contains unit tests for this project.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

describe('Error throwing if not correctly initialized', function() {
  it('should throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        apiKey: process.env.SENDGRID_API_KEY
      });
    }).toThrow();

    expect(function() {
      var emailAlerts = require('../email-alerts')({
        toEmail: 'blah'
      });
    }).toThrow();
  });
  it('should not throw an error', function() {
    expect(function() {
      var emailAlerts = require('../email-alerts')({
        toEmail: 'blah',
        apiKey: process.env.SENDGRID_API_KEY
      });
    }).not.toThrow();
  });
});

describe('Error if not correctly used', function() {
  it('should ')
});
