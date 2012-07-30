## What's a Route?
To define what a route is, it's simply what's handle the HTTP requests and tells the app what it has to execute.

## How to use them?
Routes are located in the root of your _app/_ folder. (_app/routes.js_)

### Let's begin with some code:

```javascript
module.exports = function(router, getAction) {
    // syntax: URI, Controller, Action, Parameters
    router.add('/', getAction('home', 'index'));

    // this request accepts a URI parameter called "page_name"
    // which will be received in the "params" argument of the controller's action.
    router.add('/pages/:page_name', getAction('pages', 'show'));
};
```

### Syntax
```javascript
router.add('/uri/with/:parameters', getAction('controllerName', 'actionName', { aParameter: 'not mandatory' });
```

### getAction
Returns the action's object once parameters have been processed.

***

« [[General Overview]] | [Table of contents](https://github.com/tbergeron/ThinAir/wiki) | [[Controllers]] »