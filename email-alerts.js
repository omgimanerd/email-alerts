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
  if (!toEmail) {
    throw new Error('toEmail not specified!');
  }
  if (!apiKey) {
    throw new Error('apiKey not specified!');
  }

  var _sendMail = function(subject, content) {
    var helper = sendgrid.mail;
    var mail = new helper.Mail(new helper.Email(fromEmail), subject,
                               new helper.Email(toEmail),
                               new helper.Content('text/plain', content));
    sendgrid(apiKey).API(sendgrid(apiKey).emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    }));
  };

  var errorAlertAsync = function(callback) {

  };

  var errorCallback = function(error) {
    if (error) {

    }
  };

  return {
    _sendMail: _sendMail,
    errorAlertAsync: errorAlertAsync,
    errorCallback: errorCallback
  };
};
