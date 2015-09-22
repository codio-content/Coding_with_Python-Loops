
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/squared.js', [{
    inputs: [5],
    outputs: [55],
  }, {
    inputs: [2],
    outputs: [5],
  }, {
    inputs: [-2],
    outputs: [0],
    message: 'Your code does not handle the scenario where a negative number is given.'                                                         
  }, {
    inputs: [0],
    outputs: [0,1],
    message: 'Your code does not handle the scenario when "1" is input.'  
  }, {
    inputs: [1],
    outputs: [0,1],
    message: 'Your code does not handle the scenario when "1" is input.'  
  }                                                          
]);
