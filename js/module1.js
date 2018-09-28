// example module #1
var $ = require('jquery');

setTimeout(() => {
    $('h1').html('New title');
}, 3000);

console.log('Module #1 is loaded');