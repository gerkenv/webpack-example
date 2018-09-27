# Webpack tutorial
Easy way to show how `Webpack` can make life simpler.
Tutorial source:



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
