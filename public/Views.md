Views are the HTML templates you're going to send to the client. Those are using [Handlebars](http://handlebarsjs.com) template engine based on Mustache.

**Views** are located in _'app/views/'_ and must have a _.html_ extension.

## Partials
Partials are little snippets of re-usable template code that gets loaded by the app at startup.

Those are located in _'app/views/partials/'_. Every _.html_ files that are located there will be loaded at startup and will be usable in templates like this:

```
{{> partialFileNameWithoutTheExtension }}
```

### Example
Let's say we have _header.html_ and _footer.html_ in _app/views/partials_. This is how we're going to call them:
```
{{> header}}

Hello World!

{{> footer}}
```

***

&laquo; [[Validators]] | [[Home]] | [[Reactive Methods]] &raquo;