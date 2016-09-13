/**
 * @fileoverview This is an npm module that allows functions to be wrapped
 * with a handler that will send email alerts on error.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var sendgrid = require('sendgrid');

module.exports = function(options) {
  var fromEmail = options.fromEmail || 'email-alerts';
  var toEmail = options.toEmail;
  var apiKey = options.apiKey;
  var subject = options.subject || 'email-alerts error'

  if (!toEmail) {
    throw new Error('toEmail not specified!');
  }
  if (!apiKey) {
    throw new Error('apiKey not specified!');
  }

  var _sendMail = function(content, callback) {
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

  var errorHandler = function(error, callback) {
    if (error) {
      _sendMail(error, callback);
    } else {
      callback();
    }
  };

  var errorCallbackWrapper = function(errorCallback) {
    return function(error) {
      if (error) {
        _sendMail(error);
      }
      errorCallback(arguments);
    };
  };

  return {
    errorHandler: errorHandler,
    errorCallbackWrapper: errorCallbackWrapper
  };
};
