
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/N-0.js', [{
    inputs: [3],
    outputs: [3,2,1,0],
  }, {
    inputs: [10],
    outputs: [10,9,8,7,6,5,4,3,2,1,0],
  }, {
    inputs: [-1],
    outputs: [],
    message: 'Your code does not handle the scenario where a negative number is given.'  
  }                                                          
]);
