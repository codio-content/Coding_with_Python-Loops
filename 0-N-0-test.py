
var test = require('./test-fw.js');

test.tests('/home/codio/workspace/0-N-0.js', [{
    inputs: [3],
    outputs: [3,2,1],
  }, {
    inputs: [-3],
    outputs: [-3,-2,-1],
  }, {
    inputs: [6],
    outputs: [6,5,4,3,2,1],
  }                                                         
]);
