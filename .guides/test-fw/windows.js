// Dummy library that replaces the console and variable windows used by the regular flode app

var constants = require('./constants');

exports.Output = [];

exports.UpdateOutput = function(output, type) {
  if (type === constants.OUTPUT_TYPE_OUT) {
    exports.Output.push(output);
  }
};

exports.SetVariableList = function() {
  // do nothing
};

exports.SetInputVariable = function() {
  // do nothing
};

exports.SetInputVariableList = function() {
  // do nothing
};

exports.SetWindowVisibility = function() {
  // do nothing
};

exports.ClearOutput = function() {
  // do nothing
};