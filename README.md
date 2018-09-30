# Webpack tutorial
Easy way to show how `Webpack` can make life simpler.
Tutorial source: https://www.youtube.com/watch?v=9kJVYpOqcVU



### Project structure
Let's make an easiest example, where we have an `./index.html` page which depends on `./js/script.js` which has to be a unified version of modules `./js/module1.js` and  `./js/module2.js`. Let's say that `module1` has to be loaded before `module2`. That's it for now.

### Way to import files in Node.js
Technically it is a `Common.js Module System` which node.js uses. So let's put following statements into `./js/script.js`.
```js
require('../js/module1');
require('../js/module2');
```
But this way will not work in the browser.
So we have to transform our code in something that can be used by a browser.

### Installing Webpack
First let's install webpack locally and globaly. Open console and go to project root.
```
npm init
npm install -s webpack
npm install -s webpack-cli
npm install -g webpack
npm install -g webpack-cli 
```

### Webpack Configuration File
Now we need to set up the webpack configuration file, it has to be located in project root and called `webpack.config.js`. So now we can fill it up with example configuration:
```js
var debug = process.env.NODE_ENV || "development"; // "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    mode: debug,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/script.js",
    output: {
        path: __dirname + "/js",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
```
As you see, now our entry point is `./js/script.js`, so it will be taken as a source and "compiled" (or transformed)
to our output file `.js/script.min.js`.

### Running Webpack
To compile the sources to target file we should open console then go to the root of the project and run:
```
webpack
```
Now if we open `index.html` in a browser we will see in development tools console that both our modules were loaded;

### Module Scope
Each module loaded in our main file will be enclosed in its own scope.
Let's install `jquery` to our project and `lodash`, also known as `underscore.js`.
Run from the root of the project:
```
npm install -s jquery
npm install -s lodash
```
Now replace code in `module1.js` with this one:
```js
// example module #1
var $ = require('jquery'); 

setTimeout(() => {
    $('h1').html('New title');
}, 3000);

console.log('Module #1 is loaded');
```
So now if you rebuild a project with the `webpack` and try to check if the `jquery` exists in the global scope of the browser...
```js
$.fn.jquery
```
...you will get an exception.
So right `jquery` exists only where it needs to exist. If you want add a `jquery` to another module - it is fine, code of `jquery` will not be duplicated, it will enclosed in separated hidden module and included in places, where it is required.

### Lodash
Now let's add the `lodash` to our second module, also we will add an array of objects with people and try to filter all females and get an amount of them. So you can replace code in `module2` as follows:
```js
// example module #2
var _ = require('lodash');

var people = [
    {
        "id": 1,
        "gender": "male",
        "age": 31
    },
    {
        "id": 2,
        "gender": "female",
        "age": 32
    },
    {
        "id": 3,
        "gender": "male",
        "age": 33
    },
    {
        "id": 4,
        "gender": "female",
        "age": 34
    },
    {
        "id": 5,
        "gender": "female",
        "age": 35
    }
];

var countFemales = 
    _.filter(people, {"gender": "female"}).length;

setTimeout(() => {
    alert("Count of females is " + countFemales);
}, 5000);

console.log('Module #2 is loaded');
```

### Conclusion
So it was a basic example of what `webpack` can do for you, if you want to know everything - go to `webpack` web page and check the examples over there.
