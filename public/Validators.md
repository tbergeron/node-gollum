Validators are being executed when an object saves.

## How does it work?
JSON files are used to define objects validations. Those are located in _app/validations/_.

Here's an example, let's say it's called _users.validations.json_:
```javascript
[{
    "name": [{
        "minimumLength": 5
    }],
    "email": [{
        "isEmail": true,
        "maximumLength": 255
    }],
}]
```

We can see that it checks if the name has at least 5 characters and that the email is valid and has 255 characters max.

So every time a project gets created or updated, these validations are going to be executed. If any validations errors happen, the second argument of [[Repositories]]' baseSave method will return an array of errors.

***

&laquo; [[Repositories]] | [[Home]] | [[Views]] &raquo;