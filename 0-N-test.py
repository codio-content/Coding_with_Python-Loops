
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/0-N.js', [{
    inputs: [3],
    outputs: [0,1,2,3],
  }, {
    inputs: [7],
    outputs: [0,1,2,3,4,5,6,7],
  }, {
    inputs: [-1],
    outputs: [],
    message: 'Your code does not handle the scenario where a negative number is given.'  
  }                                                          
]);
