// Used to load graph model from save file
var fs = require('fs');
var xmldom = require('./xmldom/dom-parser');
var mxgraph = require('./mxgraph');
// Used to run tests
var constants = require('./constants');
var context = require('./context').ExecutionContext;
var helpers = require('./helpers');
var windows = require('./windows');

exports.RunGraphWithInputs = function(fileName, inputs) {
  // Set inputs in context
  for (var i = 0; i < inputs.length; ++i) {
    context.setInputVariable(i, inputs[i]);
  }

  // Create graph
  var graph = {model: LoadGraphModelFromSaveFile(fileName)};
  var cell = helpers.GetStartCell(graph);
  var numSteps = constants.MAX_EXECUTABLE_CELLS;
  
  // Run graph
  context.setIsRunning(true);
  while (cell !== null && numSteps > 0) {
    if (cell.f2cCompiled === constants.SYNTAX_ERROR_TAG) {
      return;
    }
    cell = helpers.RunProgramSegmentAndGetNext(cell);
    numSteps--;
  }
  context.setIsRunning(false);

  return windows.Output;
};

var LoadGraphModelFromSaveFile = function(fileName) {
  var data = fs.readFileSync(fileName, 'utf8');
  var parsed = new xmldom.DOMParser().parseFromString(data);
  var encoded = parsed.childNodes[0];
  encoded.documentElement = encoded;
  
  // Need to change some behavior of xmldom returning empty string when attr doesn't exist
  var elementProto = Object.getPrototypeOf(encoded);
  var elementGetAttribute = elementProto.getAttribute;
  elementProto.getAttribute = function(attr) {
    return elementGetAttribute.call(this, attr) || null;
  };

  var model = new mxgraph.mxGraphModel();
  var decoder = new mxgraph.mxCodec(encoded);
  decoder.decode(encoded, model);

  return model;
};
