/**
 * @fileoverview This npm module is a wrapper around the sendgrid module
 * meant for quick and easy email/alert sending. This functions as a quick
 * and easy way to set up simple projects.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var sendgrid = require('sendgrid');

module.exports = function(options) {
  var fromEmail = options.fromEmail || 'alert@email-alerts.com';
  var toEmail = options.toEmail;
  var apiKey = options.apiKey;
  var subject = options.subject || 'Alert from email-alerts';

  if (!toEmail) {
    throw new Error('toEmail not specified!');
  }
  if (!apiKey) {
    throw new Error('apiKey not specified!');
  }

  var alert = function(subject, content, callback) {
    var helper = sendgrid.mail;
    var mail = new helper.Mail(new helper.Email(fromEmail), subject,
                               new helper.Email(toEmail),
                               new helper.Content('text/plain', content));
    sendgrid(apiKey).API(sendgrid(apiKey).emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    }), callback);
  };

  var errorCatcher = function(fn, callback) {
    try {
      fn();
    } catch (error) {
      alert(subject, error, function() {
        callback(error);
      });
    }
  };

  var errorHandler = function(callback) {
    return function(error) {
      if (error) {
        alert(subject, error);
      }
      if (typeof(callback) == 'function') {
        callback.apply(null, arguments);
      }
    }
  };

  return {
    alert: alert,
    errorCatcher: errorCatcher,
    errorHandler: errorHandler
  };
};
