var constants = require('./constants');
var context = require('./context').ExecutionContext;
var windows = require('./windows');

/* Math helpers */

exports.Clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

/* Vertex helpers */

var GetVertexCellsOfType = function(graph, type) {
  return graph.model.filterDescendants(function(cell) {
    return cell.f2cType === type;
  });
};

exports.GetStartCell = function(graph) {
  var startCell = GetVertexCellsOfType(graph, constants.CELL_TYPE_START);
  // There is only one start cell
  return startCell.length ? startCell[0] : null;
};

exports.GetInputCells = function(graph) {
  return GetVertexCellsOfType(graph, constants.CELL_TYPE_INPUT);
};

exports.GetCellById = function(graph, id) {
  return graph.model.filterDescendants(function(cell) {
    return cell.id == id;
  });
};

/* Edge helpers */

exports.GetSiblingEdge = function(edge) {
  var edges = edge.source.edges;
  for (var i = 0; i < edges.length; ++i) {
    var sibling = edges[i];
    if (sibling !== edge && sibling.source === edge.source) {
      return sibling;
    }
  }
  return null;
};

/* Graph helpers */

exports.GetGraphBounds = function(graph) {
  var minx = 0, miny = 0, maxx = 0, maxy = 0;
  graph.model.filterDescendants(function(cell) {
    var geo = cell.geometry;
    if (geo) {
      if (geo.x < minx) {
        minx = geo.x;
      } else if (geo.x + geo.width > maxx) {
        maxx = geo.x + geo.width;
      }
      if (geo.y < miny) {
        miny = geo.y;
      } else if (geo.y + geo.height > maxy) {
        maxy = geo.y + geo.height;
      }
    }
  });
  return new mxRectangle(minx, miny, maxx - minx, maxy - miny);
};

/* Constants helpers */

var GetArrayValue = function(array, index) {
  if (index >= 0 && index < array.length) {
    return array[index];
  }
  return 'INVALID';
};

exports.GetCellName = function(type) {
  return GetArrayValue(constants.CELL_NAMES, type);
};

exports.GetCellStyle = function(type) {
  return GetArrayValue(constants.CELL_STYLES, type);
};

exports.GetCellSize = function(type) {
  return GetArrayValue(constants.CELL_SIZES, type);
};

exports.GetCellIcon = function(type) {
  return GetArrayValue(constants.CELL_ICONS, type);
};

/* Execution helpers */

exports.RunProgramSegmentAndGetNext = function(cell) {
  delete cell.f2cError;
  
  try {
    var returnValue = null;
    switch (cell.f2cType) {
      case constants.CELL_TYPE_OP: {
        new Function(cell.f2cCompiled).call(context);
        if (context.isRunning) {
          context.printVariables();
        }
        break;
      } case constants.CELL_TYPE_IF: {
        returnValue = new Function(cell.f2cCompiled).call(context);
        break;
      } case constants.CELL_TYPE_DEBUG: {
        var output = new Function(cell.f2cCompiled).call(context)
        if (context.isRunning) {
          windows.UpdateOutput(output, constants.OUTPUT_TYPE_DBG);
        }
        break;
      } case constants.CELL_TYPE_OUTPUT: {
        var output = new Function(cell.f2cCompiled).call(context);
        if (context.isRunning) {
          windows.UpdateOutput(output, constants.OUTPUT_TYPE_OUT);
        }
        break;
      }
    }
    return GetNextCell(cell, returnValue);
  } catch (e) {
    windows.UpdateOutput(e);
    cell.f2cError = e.toString();
    return null;
  }
};

var GetNextCell = function(current, ifResult) {
  var edges = current.edges;
  var nextCell1 = null;
  var nextCell2 = null;

  if (edges) {
    for (var i = 0; i < edges.length; ++i) {
      var edge = edges[i];
      var next = edge.target;
      if (next !== current) {
        if (!edge.value || edge.value === 'true') {
          nextCell1 = next;
        } else {
          nextCell2 = next;
        }
      }
    }
  }

  if (current.f2cType !== constants.CELL_TYPE_IF) {
    return nextCell1;
  } else if (nextCell1 && nextCell2) {
    if (ifResult) {
      return nextCell1;
    }
    return nextCell2;
  }
  
  throw constants.TWO_OUTGOING_FROM_IF_ERROR;
};