# email-alerts
[![npm version](https://badge.fury.io/js/email-alerts.svg)](https://badge.fury.io/js/email-alerts)

This plugin is a wrapper around the `sendgrid` npm module that allows for
urgent alerts to be emailed to you if you want a quick and dirty hack for
a project. It's super easy to use.

## Setup
```
npm install --save email-alerts
```

## API

### require('email-alerts')(options)
Creates an `email-alerts` object.

#### Arguments:
  - `options`: An object that can have the following fields specified:
    - `fromEmail`: optional, allows you to customize the email domain that you
    will receive alerts from if you want to filter the emails.
    - `toEmail`: required, specifies the email that alerts will be sent to.
    - `apiKey`: required, specifies the [Sendgrid](http://sendgrid.com/) API Key. Obtain one [here](http://sendgrid.com/). (You get 100k emails free).
    - `subject`: optional, allows you to specify the subject header of the
    alert email.

#### Returns:
An email-alerts object that you can use to call the following methods.

#### Example Usage:
```javascript
var emailAlerts = require('email-alerts')({
  fromEmail: 'alert@yourdomain.com',
  toEmail: 'youremail@domain.com',
  apiKey: 'YOUR_KEY_HERE',
  subject: 'ALERT HOLY S***'
});
```
It is recommended to store your SendGrid API key in an environment variable
and pass it using `process.env.SENDGRID_API_KEY`.


### emailAlerts.errorCatcher(fn, [onError])
Wraps a function with a `try...catch` that will send an email if an exception
was caught.

#### Arguments:
  - `fn`: the function to be executed.
  - `[onError]`: the function to be run if an exception was caught while
  running `fn`. The caught exception will be passed to this function.

#### Returns:
`undefined`

#### Example Usage:
```javascript
emailAlerts.errorCatcher(someFn);
// If someFn errors during execution, then an alert email will be sent.

emailAlerts.errorCatcher(someFn, function(error) {
  doSomethingWith(error);
});
// If someFn errors during execution, then an alert email will be sent.
// doSomethingWith(error) will be executed with the error that was caught
// during the execution of someFn.

emailAlerts.errorCatcher(function() {
  throw new Error('donald trump is running for president!');
}, function(error) {
  console.log(error);
});
// In this case, an alert email containing 'donald trump is running for
// president' will be sent to you, and then it will be logged to the console.
```


### emailAlerts.errorHandler([callback])
Returns a function that can be passed as a error callback. If no callback was
specified, then the function returned will take one argument, an error. If a
callback was specified, then this will wrap the callback with a handler that
sends an email if there was an error.

#### Arguments:
  - `[callback]`: optional, a callback that will be wrapped by the error
  handler.

#### Returns:
A callback function that can be used as an error callback.

#### Example Usage:
```javascript
asynchronousFn1(emailAlerts.errorHandler);
// If asynchronousFn1 passes an error to the errorHandler, then an alert email
// will be sent containing that error.

asynchronousFn2(emailAlerts.errorHandler(function(error, data) {
  if (error) {
    console.warn(error);
  } else {
    doSomethingWith(data);
  }
}));
// If asynchronousFn2 passes an error to the errorHandler, then an alert email
// will be sent in addition to it being logged in the console. If no error was
// passed, then everything will proceed as normal and the data will be
// processed.
```
