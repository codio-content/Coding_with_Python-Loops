
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/xy.js', [{
    inputs: [1,1],
    outputs: [1],
  }, {
    inputs: [1,2],
    outputs: [1],
  }, {
    inputs: [2],
    outputs: [4],
  }, {
    inputs: [3,5],
    outputs: [243],
  }                                                          
]);
