
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/times-table.js', [{
    inputs: [6],
    outputs: [6,12,18,24,30,36,42,48,54,60,66,72],
  }, {
    inputs: [1],
    outputs: [1,2,3,4,5,6,7,8,9,10,11,12],
  }, {
    inputs: [-1],
    outputs: [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12],
    message: 'Your code does not handle the scenario where a negative number is given.'  
  }                                                          
]);
