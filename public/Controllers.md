Controllers contain _actions_ which are what gets executed by the [[Routes]]. It normally parses the request, execute what's have to be done and sends a response (most of the time renders a [[Views]]).

***

### Here's a basic controller:
```javascript
// it's important to always include the framework
var ThinAir = require('../../libs/thinair');

// createController returns a controller object
module.exports = ThinAir.createController({
    // declaring a property for the Projects model.
    Projects: null,

    // setup is a function that gets called when the app starts
    // this is a good place to put stuff that needs to be executed at the app startup.
    setup: function(done) {
        // loading the model in the property
        this.Projects = this.repositories.Projects;

        // never forget to tell when the controller has finished setup
        // this tells the framework to initialize the next component
        done();
    },

    // this is an action
    index: function(req, res, params) {
        // this sends the index (app/views/index.html) view
        this.sendTemplate(req, res, 'index');
    }
});
```

After reading the preceding code, you should already have a good idea on how controllers work.

### Controllers' methods
Controllers have several little helper methods.

#### isGet
```javascript
if (isGet(req)) { [...]
```
Checks if the current request's method is **GET**. Returns a _boolean_.

#### isPost
```javascript
if (isPost(req)) { [...]
```
Checks if the current request's method is **POST**. Returns a _boolean_.

#### isXHR
```javascript
if (isXHR(req)) { [...]
```
Checks if the current request's headers are using **XMLHttpRequest**. Returns a _boolean_.

#### sendTemplate
```javascript
// from inside an action
this.sendTemplate(req, res, 'viewName');
```
Sends a view that is located in _'app/views/'_ directory. If you need to send a view from _'app/views/pages/'_ you're going to use _'pages/index'_ to get it.

#### sendJson
```javascript
// from inside an action
this.sendJson(req, res, { test: 'this is an object' });
```
Sends a **JavaScript object** as a JSON string.

#### sendHtml
```javascript
// from inside an action
this.sendHtml(req, res, '<strong>this is nice</strong>');
```
Sends a HTML string.

***

« [[Routes]] | [Table of contents](https://github.com/tbergeron/ThinAir/wiki) | [[Repositories]] »