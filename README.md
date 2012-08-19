## Goal
When developing one of my project, I wanted to make a website with my GitHub project's wiki integrated into it.

This tool is made to serve a GitHub's Gollum wikis. The final goal is to support all components of Gollum RedCarpet markdown syntax.

You can define a header and a footer, so the wiki will look as a part of your website.

This **won't** support editing, that's what [Gollum](https://github.com/github/gollum/) is made for. This is simply to provide a way of integrating your GitHub project's wiki into your existing website.

## Usage
First, install the package:
`npm install node-gollum`

Then, clone your project's wiki:
`git clone https://github.com/your-user/your-project.wiki.git`

Finally use it like this:
```javascript
var gollum = require('node-gollum'),
    path = require('path');

var wikiDirectory = path.join(__dirname, 'your-project.wiki');

// directory, port
gollum(wikiDirectory, 3000);
```

## Left to be done:
- HTML header/footer support
- support for multiple snippets languages