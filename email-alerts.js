/**
 * @fileoverview This npm module is a wrapper around the sendgrid module
 * meant for quick and easy email/alert sending. This functions as a quick
 * and easy way to set up simple projects.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var deasync = require('deasync');
var sendgrid = require('sendgrid');

module.exports = function(options) {
  var fromEmail = options.fromEmail || 'alert@email-alerts.com';
  var toEmail = options.toEmail;
  var apiKey = options.apiKey;
  var sg = sendgrid(apiKey);
  var subject = options.subject || 'Alert from email-alerts';

  if (!toEmail) {
    throw new Error('toEmail not specified!');
  }
  if (!apiKey) {
    throw new Error('apiKey not specified!');
  }

  var alert = function(subject, content, callback) {
    var helper = sendgrid.mail;
    subject = JSON.stringify(subject).replace(/^\"|\"$/g, '');
    content = JSON.stringify(content).replace(/^\"|\"$/g, '');
    var mail = new helper.Mail(new helper.Email(fromEmail), subject,
                               new helper.Email(toEmail),
                               new helper.Content('text/plain', content));
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    if (typeof(callback) === 'function') {
      sg.API(request, callback);
    } else {
      var done = false;
      sg.API(request, function(error, results) {
        if (error) {
          throw new Error(error);
        }
        done = true;
      });
      deasync.loopWhile(function() {
        return !done;
      });
    }
  };

  var errorCatcher = function(fn, callback) {
    try {
      fn();
    } catch (error) {
      if (typeof(callback) === 'function') {
        alert(subject, error.message, function() {
          callback(error);
        });
      } else {
        alert(subject, error.message);
      }
    }
  };

  var errorHandler = function(callback) {
    return function(error) {
      var args = arguments;
      if (error) {
        if (typeof(callback) === 'function') {
          alert(subject, error, function() {
            callback.apply(null, args);
          });
        } else {
          alert(subject, error);
        }
      } else if (typeof(callback) === 'function') {
        callback.apply(null, args);
      }
    }
  };

  return {
    alert: alert,
    errorCatcher: errorCatcher,
    errorHandler: errorHandler
  };
};
