Repositories are basically Models (if you're used to the MVC paradigm). They contain every methods that manipulates data.

ThinAir is using [MongoDB](http://www.mongodb.org/) as data storage. So any MongoDB query is going to work straight away with the framework and every basic Node.js MongoDB driver's methods are available.

## Code
```javascript
var ThinAir = require('../../libs/thinair');

// createRepository returns a repository object
// the first argument specifies which collection to use.
module.exports = ThinAir.createRepository("lists", {
    // in repositories, you can define any methods you want
    // these will be available from controllers
    getAll: function(callback) {
        // you can use MongoDB driver's methods
        // this gets all objects
        this.find().toArray(function(err, lists) {
            if (err) console.error(err);
            return callback(lists ? lists : null);
        });
    },

    // this method use the baseFindOne method which gets a single object
    getOneByCode: function(code, callback) {
        // this will get the first object that has the _code_ property equals to the argument.
        this.baseFindOne({ code: code }, function(list) {
            // it directly returns the object
            callback(list);
        })
    },
    
    save: function(list, callback) {
        // slugify is a simple helper that converts strings to slugs.
        list.code = ThinAir.slugify(list.name);

        // baseSave save a new or updates an existing object
        this.baseSave(list, function(savedList, validationErrors) {
            // and then it returns the saved object from the collection
            // the errors argument is for validation errors.
            return callback(savedList, validationErrors);
        });
    },

    delete: function(code, callback) {
        // baseDelete, removes an object from the collection
        // based on first argument's conditions.
        this.baseDelete({ code: code }, function(err) {
            // returns an error if there's one
            callback((err) ? err : true);
        });
    }
});
```

### Repository's methods

#### isNew
```javascript
if (isNew(object)) { [...] 
```
Checks if the object is new or existing. Returns a _boolean_.

#### baseFindOne
```javascript
this.baseFindOne({ conditions }, function(object) { [...]
```
Fetches an object, based on the specified conditions. Returns _null_ if nothing is found.

#### baseDelete
```javascript
this.baseDelete({ conditions }, function(error) { [...]
```
Checks if the object exist and then deletes an object, based on the specified conditions. Returns an error 

#### baseSave
```javascript
this.baseSave(object, function(object, validationErrors) { [...]
```
Tries to validate the object before saving (based on [[Validators]]) and then save or updates an object. Then it fetches the object back from the collection and returns it.

***

&laquo; [[Controllers]] | [[Home]] | [[Validators]] &raquo;