exports.CELL_TYPE_INPUT = 0;
exports.CELL_TYPE_OUTPUT = 1;
exports.CELL_TYPE_IF = 2;
exports.CELL_TYPE_OP = 3;
exports.CELL_TYPE_HUB = 4;
exports.CELL_TYPE_DEBUG = 5;
exports.CELL_TYPE_START = 6;
exports.CELL_TYPE_END = 7;
exports.CELL_TYPE_COUNT = 8;

/* UI LOOK AND FEEL CONSTANTS */

exports.CELL_NAMES = [
  'Input', 'Output', 'Condition', 'Operation', 'Hub', 'Debug', 'Start', 'End'
];

exports.CELL_SIZES = [
  {w: 100, h: 50},
  {w: 100, h: 35},
  {w: 160, h: 50},
  {w: 100, h: 35},
  {w: 20, h: 20},
  {w: 100, h: 35},
  {w: 80, h: 25},
  {w: 80, h: 25}
];

exports.CELL_ICONS = [
  'img/input.svg',
  'img/output.svg',
  'img/decision.svg',
  'img/process.svg',
  'img/hub.svg',
  'img/debug.svg',
  '',
  'img/end.svg'
];

exports.CELL_STYLES = [
  'shape=parallelogram;fillColor=white;strokeColor=#8d94b0;spacingTop=8;labelBackgroundColor=#e6e6e6;labelBorderColor=#d5dae6;',
  'shape=flippedParallelogram;fillColor=white;strokeColor=#8d94b0;',
  'shape=southHexagon;fillColor=#a3b4ec;strokeColor=#a3b4ec;fontColor=white;',
  'shape=rectangle;fillColor=white;strokeColor=#8d94b0;',
  'shape=ellipse;fillColor=white;strokeColor=#8d94b0;editable=0;',
  'shape=flippedParallelogram;dashed=1;fillColor=white;strokeColor=#8d94b0;',
  'shape=rectangle;rounded=1;fillColor=#79efad;strokeColor=#79efad;fontColor=white;deletable=0;editable=0;',
  'shape=rectangle;rounded=1;fillColor=#f9566e;strokeColor=#f9566e;fontColor=white;editable=0;'
];

exports.TEXT_COLOR = '#212c3f';

exports.COMMENT_NAME = 'Comment';
exports.COMMENT_INITIAL = 'Comment';
exports.COMMENT_DISTANCE = 100;
exports.COMMENT_WIDTH = 100;
exports.COMMENT_HEIGHT = 50;
exports.COMMENT_STYLE = 'fillColor=white;strokeColor=white;fontSize=13;spacingTop=5;spacingLeft=5;fontStyle=2;';
exports.COMMENT_LEFT_ALIGN_STYLE = 'align=left;';
exports.COMMENT_RIGHT_ALIGN_STYLE = 'align=right;';
exports.CONNECTOR_STYLE = 'shape=ellipse;fillColor=white;strokeColor=#8ce2dc;strokeWidth=3;';
exports.CONNECTOR_EDGE_STYLE = 'strokeColor=#8ce2dc;strokeWidth=3;edgeStyle=;endArrow=';
exports.CONNECTOR_EDGE_STYLE2 = exports.CONNECTOR_EDGE_STYLE + 'oval;';
exports.CONNECTOR_SIZE = 8;

exports.GRID_SIZE = 10;

exports.PARALLELOGRAM_LEAN = 0.1;
exports.RECTANGLE_ROUNDING = 0.5;

exports.INNER_WINDOW_HEIGHT = 175;

exports.GRAPH_MIN_SCALE = 0.34;
exports.GRAPH_MAX_SCALE = 2.5;

/* UI BEHAVIOR CONSTANTS */

exports.INPUT_VARIABLE_PREFIX = 'input';
exports.STARTING_INPUT_VALUE = '';

exports.IF_TRUE_LABEL = 'true';
exports.IF_FALSE_LABEL = 'false';
exports.OPERAND_REPLACEMENTS = [
  ['and', '&&'],
  ['or', '||'],
  [/([\s\w])=+/g, '$1 ==']
];

exports.SYNTAX_ERROR_COLOR = '#FF0000';
exports.RUNTIME_ERROR_COLOR = '#FF9900';
exports.ACTIVE_CELL_COLOR = '#00FF00';

exports.MAX_EXECUTABLE_CELLS = 1000;

exports.SYNTAX_ERROR_TAG = '##SYNTAX_ERROR##';

exports.OUTPUT_TYPE_LOG = 0;
exports.OUTPUT_TYPE_OUT = 1;
exports.OUTPUT_TYPE_DBG = 2;
exports.OUTPUT_TYPE_COUNT = 3;

exports.END_PROGRAM_MESSAGE = 'Program finished';

exports.ONE_LINE_EXPECTED_ERROR = 'Only one line is expected in this cell';
exports.NO_VARIABLE_NAMED_INPUT_ERROR = 'You cannot name a variable starting with \''
  + exports.INPUT_VARIABLE_PREFIX + '\'';
exports.VARIABLE_DOESNT_EXIST_ERROR = 'This variable does not exist: ';
exports.NOT_A_NUMBER_ERROR = 'You must enter a number in the input cell';
exports.CANT_RUN_SYNTAX_ERROR = 'Cannot run graph as there are syntax errors';
exports.SINGLE_OUTGOING_ERROR = 'Only one outgoing connection allowed from the ';
exports.NO_OUTGOING_FROM_END_ERROR = 'No outgoing connections allowed from the '
  + exports.CELL_NAMES[exports.CELL_TYPE_END];
exports.TWO_OUTGOING_FROM_IF_ERROR = 'The ' + exports.CELL_NAMES[exports.CELL_TYPE_IF]
  + ' must have two outgoing connections';
exports.NO_INCOMING_TO_START_ERROR = 'No incoming connections allowed to the '
  + exports.CELL_NAMES[exports.CELL_TYPE_START];
exports.END_PROGRAM_ERROR = 'Program encountered an error';
