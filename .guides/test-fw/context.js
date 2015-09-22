var constants = require('./constants');
var windows = require('./windows');

exports.ExecutionContext = {
  isRunning: false,
  variables: {},
  inputVariables: [],
  inputVariablesInitial: [],
  
  // Called by user-generated code

  get: function(variable) {
    if (this.isInputVariable(variable)) {
      var inputVariableId = this.getInputVariableId(variable);
      if (inputVariableId < this.inputVariables.length) {
        return this.inputVariables[inputVariableId];
      }
    } else if (typeof this.variables[variable] !== 'undefined') {
      return this.variables[variable];
    }
    throw constants.VARIABLE_DOESNT_EXIST_ERROR + variable;
  },

  set: function(variable, value) {
    if (this.isInputVariable(variable)) {
      var inputVariableId = this.getInputVariableId(variable);
      if (inputVariableId < this.inputVariables.length) {
        this.inputVariables[inputVariableId] = value;
      }
    } else {
      this.variables[variable] = value;
    }
  },

  // Variable operations

  clearVariables: function() {
    for (var variable in this.variables) {
      if (this.variables.hasOwnProperty(variable)) {
        delete this.variables[variable];
      }
    }
  },

  resetVariables: function() {
    for (var variable in this.variables) {
      if (this.variables.hasOwnProperty(variable)) {
        this.variables[variable] = undefined;
      }
    }
  },

  printBlankVariables: function() {
    windows.SetVariableList(this.variables, false);
    windows.SetInputVariableList(this.inputVariablesInitial);
  },

  printVariables: function() {
    windows.SetVariableList(this.variables, true);
    windows.SetInputVariableList(this.inputVariables);
  },

  // Input variable operations
  
  isInputVariable: function(variable) {
    return variable.indexOf(constants.INPUT_VARIABLE_PREFIX) !== -1;
  },

  getInputVariableId: function(variable) {
    return parseInt(variable.replace(constants.INPUT_VARIABLE_PREFIX, ''));
  },

  getInputVariable: function(id) {
    return this.inputVariablesInitial[id];
  },

  setInputVariable: function(id, value) {
    this.inputVariablesInitial[id] = value;
    this.inputVariables[id] = value;
    windows.SetInputVariableList(this.inputVariablesInitial);
  },

  resetInputVariables: function() {
    for (var i = 0; i < this.inputVariablesInitial.length; ++i) {
      var inputVariable = this.inputVariablesInitial[i];
      this.inputVariables[i] = Array.isArray(inputVariable) ? inputVariable.slice() : inputVariable;
    }
  },
  
  // State operations

  setIsRunning: function(isRunning) {
    if (this.isRunning !== isRunning) {
      this.isRunning = isRunning;
      this.resetVariables();
      if (isRunning) {
        windows.SetWindowVisibility(true);
        this.resetInputVariables();
        this.printBlankVariables();
        windows.ClearOutput();
      }
    }
  }
};