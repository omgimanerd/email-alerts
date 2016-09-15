# email-alerts
This plugin is a wrapper around the `sendgrid` npm module that allows for
urgent alerts to be emailed to you if you want a quick and dirty hack for
a project. It's super easy to use.

## Setup
```
npm install --save email-alerts
```

## API

### require('email-alerts')(options)

#### Arguments:
  - `options`: An object that can have the following fields specified:
    - `fromEmail`: optional, allows you to customize the email domain that you
    will receive alerts from if you want to filter the emails.
    - `toEmail`: required, specifies the email that alerts will be sent to.
    - `apiKey`: required, specifies the [Sendgrid](http://sendgrid.com/) API Key. Obtain one [here](http://sendgrid.com/). (You get 100k emails free).
    - `subject`: optional, allows you to specify the subject header of the
    alert email.

#### Example Usage:
```javascript
var emailAlerts = require('email-alerts')(
  fromEmail: 'alert@yourdomain.com',
  toEmail: 'youremail@domain.com',
  apiKey: 'YOUR_KEY_HERE',
  subject: 'ALERT HOLY S***'
);
```

### emailAlerts.errorCallback(error, [callback])

#### Arguments:
  - `error`:
  - `callback`:

```javascript
someFunction(someParam, emailAlerts.errorCallback);

someFunction2(someParam, emailAlerts.errorCallbackWrapper(function(error) {
  // wrapped callback function
}));
```
