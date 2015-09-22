
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/factorial.js', [{
    inputs: [4],
    outputs: [24],
  }, {
    inputs: [10],
    outputs: [3628800],
  }, {
    inputs: [-1],
    outputs: [1],
    message: 'Your code does not handle the scenario where a negative number is given.'                                                         
  }, {
    inputs: [1],
    outputs: [1],
    message: 'Your code does not handle the scenario when "1" is input.'  
  }                                                          
]);
