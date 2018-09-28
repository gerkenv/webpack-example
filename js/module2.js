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