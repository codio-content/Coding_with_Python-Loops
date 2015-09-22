
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/fibonacci.js', [{
    inputs: [8],
    outputs: [0,1,1,2,3,5,8,13,21],
  }, {
    inputs: [10],
    outputs: [0,1,1,2,3,5,8,13,21,34,55],
  }, {
    inputs: [0],
    outputs: [0],
    message: 'Your code does not handle the scenario where "0" is input.'  
  }, {
    inputs: [1],
    outputs: [0,1],
    message: 'Your code does not handle the scenario where "1" is input.'  
  }, {
    inputs: [-3],
    outputs: [],
    message: 'Your code does not handle the scenario where a negative number is given.'  
  }
]);
