## Project Structure

```
/app
    /controllers
    /repositories
    /validations
    /views
        /partials
    /routes.js
/libs
    /validators
/public
    /css
    /img
    /js
/config.js
```

### /app
This directory is where all your server-side development will take place. 

It contains 4 sub-directories:

**IMPORTANT:** Every file contained by these directories will get automatically loaded, always remember that there shouldn't be any _require_ between these.

#### /controllers
Directory where [[Controllers]] files will go, **format** should be _potato.js_

#### /repositories
Directory where [[Repositories]] files will go, **format** should be _Potatoes.js_

#### /validations
Directory where [[Validators]] files will go, **format** should be _potatoes.validations.json_

#### /views & /partials
Directories where [[Views]] files will go, any format can be used.

#### /routes.js
File where all your [[Routes]] should be.

***

### /libs
This is where all the magic takes place, almost every ThinAir-related files are there.

#### /validators
Directory that contains the [[Validators]].

***

### /public
This directory is the root directory that is accessible from the browser.

#### /css
Contains CSS stylesheets.

#### /img
Contains images. (default directory)

#### /js
Contains client-side JavaScript files.

***

### /config.js
This file is a short config file containing settings for application port and mongodb connection informations.

***

« [[Home]] | [Table of contents](https://github.com/tbergeron/ThinAir/wiki) | [[Routes]] »