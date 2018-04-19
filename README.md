# Kuzzle-Mailer

This Kuzzle plugins works in adequation with [nodemailer](https://nodemailer.com/about/). It's simply a wrapper to be able to send emails from kuzzle without having to code anything.

Just configuration.

# How to install
 TODO

# How to use :
 Add the right below for each role that might need to send an email
```
"kuzzle-mailer/mailController": {
    "actions": {
        "sendEmail": true
    }
}
```
This allows your users to send emails from the API, WS or from another plugin

# Add configuration to your .kuzzlerc about the mailer configuration
The configuration inside the parameter `transporter` is mandatory. This is what `nodemailer` need to be able to send emails. 

You can find the configuration [here](https://nodemailer.com/smtp/)

Example for Gmail: 
`.kuzzlerc`
```
{
    "plugins": {
        "kuzzle-mailer": {
            "transporter": {
                "service": "gmail",
                "auth": {
                    "user": "username",
                    "pass": "password"
                },
                "connectionTimeout": 5000
            }
        }
    }
}
```

It's also possible to use a string, as stated from the nodemail configuration
```
{
    "plugins": {
        "kuzzle-mailer": {
            "transporter": "smtps://username:password@smtp.gmail.com"
        }
    }
}
```
# Supported transports 
- Basic SMTP
