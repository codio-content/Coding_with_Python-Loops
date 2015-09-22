// Shortened mxGraph library used solely to create a graph model from a save file

var window = {};
var document = {};

var mxClient = {};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
var mxObjectIdentity =
{
	/**
	 * Class: mxObjectIdentity
	 * 
	 * Identity for JavaScript objects and functions. This is implemented using
	 * a simple incrementing counter which is stored in each object under
	 * <FIELD_NAME>.
	 * 
	 * The identity for an object does not change during its lifecycle.
	 * 
	 * Variable: FIELD_NAME
	 * 
	 * Name of the field to be used to store the object ID. Default is
	 * <code>mxObjectId</code>.
	 */
	FIELD_NAME: 'mxObjectId',

	/**
	 * Variable: counter
	 * 
	 * Current counter.
	 */
	counter: 0,

	/**
	 * Function: get
	 * 
	 * Returns the ID for the given object or function.
	 */
	get: function(obj)
	{
		if (obj[mxObjectIdentity.FIELD_NAME] == null)
		{
			if (typeof obj === 'object')
			{
				var ctor = mxUtils.getFunctionName(obj.constructor);
				obj[mxObjectIdentity.FIELD_NAME] = ctor + '#' + mxObjectIdentity.counter++;
			}
			else if (typeof obj === 'function')
			{
				obj[mxObjectIdentity.FIELD_NAME] = 'Function#' + mxObjectIdentity.counter++;
			}
		}
		
		return obj[mxObjectIdentity.FIELD_NAME];
	},

	/**
	 * Function: clear
	 * 
	 * Deletes the ID from the given object or function.
	 */
	clear: function(obj)
	{
		if (typeof(obj) === 'object' || typeof obj === 'function')
		{
			delete obj[mxObjectIdentity.FIELD_NAME];
		}
	}

};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxPoint
 *
 * Implements a 2-dimensional vector with double precision coordinates.
 * 
 * Constructor: mxPoint
 *
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 */
function mxPoint(x, y)
{
	this.x = (x != null) ? x : 0;
	this.y = (y != null) ? y : 0;
};

/**
 * Variable: x
 *
 * Holds the x-coordinate of the point. Default is 0.
 */
mxPoint.prototype.x = null;

/**
 * Variable: y
 *
 * Holds the y-coordinate of the point. Default is 0.
 */
mxPoint.prototype.y = null;

/**
 * Function: equals
 * 
 * Returns true if the given object equals this point.
 */
mxPoint.prototype.equals = function(obj)
{
	return obj != null && obj.x == this.x && obj.y == this.y;
};

/**
 * Function: clone
 *
 * Returns a clone of this <mxPoint>.
 */
mxPoint.prototype.clone = function()
{
	// Handles subclasses as well
	return mxUtils.clone(this);
};


/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxRectangle
 *
 * Extends <mxPoint> to implement a 2-dimensional rectangle with double
 * precision coordinates.
 * 
 * Constructor: mxRectangle
 *
 * Constructs a new rectangle for the optional parameters. If no parameters
 * are given then the respective default values are used.
 */
function mxRectangle(x, y, width, height)
{
	mxPoint.call(this, x, y);

	this.width = (width != null) ? width : 0;
	this.height = (height != null) ? height : 0;
};

/**
 * Extends mxPoint.
 */
mxRectangle.prototype = new mxPoint();
mxRectangle.prototype.constructor = mxRectangle;

/**
 * Variable: width
 *
 * Holds the width of the rectangle. Default is 0.
 */
mxRectangle.prototype.width = null;

/**
 * Variable: height
 *
 * Holds the height of the rectangle. Default is 0.
 */
mxRectangle.prototype.height = null;

/**
 * Function: setRect
 * 
 * Sets this rectangle to the specified values
 */
mxRectangle.prototype.setRect = function(x, y, w, h)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
};

/**
 * Function: getCenterX
 * 
 * Returns the x-coordinate of the center point.
 */
mxRectangle.prototype.getCenterX = function ()
{
	return this.x + this.width/2;
};

/**
 * Function: getCenterY
 * 
 * Returns the y-coordinate of the center point.
 */
mxRectangle.prototype.getCenterY = function ()
{
	return this.y + this.height/2;
};

/**
 * Function: add
 *
 * Adds the given rectangle to this rectangle.
 */
mxRectangle.prototype.add = function(rect)
{
	if (rect != null)
	{
		var minX = Math.min(this.x, rect.x);
		var minY = Math.min(this.y, rect.y);
		var maxX = Math.max(this.x + this.width, rect.x + rect.width);
		var maxY = Math.max(this.y + this.height, rect.y + rect.height);
		
		this.x = minX;
		this.y = minY;
		this.width = maxX - minX;
		this.height = maxY - minY;
	}
};

/**
 * Function: grow
 *
 * Grows the rectangle by the given amount, that is, this method subtracts
 * the given amount from the x- and y-coordinates and adds twice the amount
 * to the width and height.
 */
mxRectangle.prototype.grow = function(amount)
{
	this.x -= amount;
	this.y -= amount;
	this.width += 2 * amount;
	this.height += 2 * amount;
};

/**
 * Function: getPoint
 * 
 * Returns the top, left corner as a new <mxPoint>.
 */
mxRectangle.prototype.getPoint = function()
{
	return new mxPoint(this.x, this.y);
};

/**
 * Function: rotate90
 * 
 * Rotates this rectangle by 90 degree around its center point.
 */
mxRectangle.prototype.rotate90 = function()
{
	var t = (this.width - this.height) / 2;
	this.x += t;
	this.y -= t;
	var tmp = this.width;
	this.width = this.height;
	this.height = tmp;
};

/**
 * Function: equals
 * 
 * Returns true if the given object equals this rectangle.
 */
mxRectangle.prototype.equals = function(obj)
{
	return obj != null && obj.x == this.x && obj.y == this.y &&
		obj.width == this.width && obj.height == this.height;
};

/**
 * Function: fromRectangle
 * 
 * Returns a new <mxRectangle> which is a copy of the given rectangle.
 */
mxRectangle.fromRectangle = function(rect)
{
	return new mxRectangle(rect.x, rect.y, rect.width, rect.height);
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
var mxUtils =
{
	/**
	 * Class: mxUtils
	 * 
	 * A singleton class that provides cross-browser helper methods.
	 * This is a global functionality. To access the functions in this
	 * class, use the global classname appended by the functionname.
	 * You may have to load chrome://global/content/contentAreaUtils.js
	 * to disable certain security restrictions in Mozilla for the <open>,
	 * <save>, <saveAs> and <copy> function.
	 * 
	 * For example, the following code displays an error message:
	 * 
	 * (code)
	 * mxUtils.error('Browser is not supported!', 200, false);
	 * (end)
	 * 
	 * Variable: errorResource
	 * 
	 * Specifies the resource key for the title of the error window. If the
	 * resource for this key does not exist then the value is used as
	 * the title. Default is 'error'.
	 */
	errorResource: (mxClient.language != 'none') ? 'error' : '',
	
	/**
	 * Variable: closeResource
	 * 
	 * Specifies the resource key for the label of the close button. If the
	 * resource for this key does not exist then the value is used as
	 * the label. Default is 'close'.
	 */
	closeResource: (mxClient.language != 'none') ? 'close' : '',

	/**
	 * Variable: errorImage
	 * 
	 * Defines the image used for error dialogs.
	 */
	errorImage: mxClient.imageBasePath + '/error.gif',
	
	/**
	 * Function: removeCursors
	 * 
	 * Removes the cursors from the style of the given DOM node and its
	 * descendants.
	 * 
	 * Parameters:
	 * 
	 * element - DOM node to remove the cursor style from.
	 */
	removeCursors: function(element)
	{
		if (element.style != null)
		{
			element.style.cursor = '';
		}
		
		var children = element.childNodes;
		
		if (children != null)
		{
	        var childCount = children.length;
	        
	        for (var i = 0; i < childCount; i += 1)
	        {
	            mxUtils.removeCursors(children[i]);
	        }
	    }
	},

	/**
	 * Function: getCurrentStyle
	 * 
	 * Returns the current style of the specified element.
	 * 
	 * Parameters:
	 * 
	 * element - DOM node whose current style should be returned.
	 */
	getCurrentStyle: function()
	{
		if (mxClient.IS_IE)
		{
			return function(element)
			{
				return (element != null) ? element.currentStyle : null;
			};
		}
		else
		{
			return function(element)
			{
				return (element != null) ?
					window.getComputedStyle(element, '') :
					null;
			};
		}
	}(),

	/**
	 * Function: setPrefixedStyle
	 * 
	 * Adds the given style with the standard name and an optional vendor prefix for the current
	 * browser.
	 * 
	 * (code)
	 * mxUtils.setPrefixedStyle(node.style, 'transformOrigin', '0% 0%');
	 * (end)
	 */
	setPrefixedStyle: function()
	{
		var prefix = null;
		
		if (mxClient.IS_OT)
		{
			prefix = 'O';
		}
		else if (mxClient.IS_SF || mxClient.IS_GC)
		{
			prefix = 'Webkit';
		}
		else if (mxClient.IS_MT)
		{
			prefix = 'Moz';
		}
		else if (mxClient.IS_IE && document.documentMode >= 9 && document.documentMode < 10)
		{
			prefix = 'ms';
		}

		return function(style, name, value)
		{
			style[name] = value;
			
			if (prefix != null && name.length > 0)
			{
				name = prefix + name.substring(0, 1).toUpperCase() + name.substring(1);
				style[name] = value;
			}
		};
	}(),
	
	/**
	 * Function: hasScrollbars
	 * 
	 * Returns true if the overflow CSS property of the given node is either
	 * scroll or auto.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node whose style should be checked for scrollbars.
	 */
	hasScrollbars: function(node)
	{
		var style = mxUtils.getCurrentStyle(node);

		return style != null && (style.overflow == 'scroll' || style.overflow == 'auto');
	},
	
	/**
	 * Function: bind
	 * 
	 * Returns a wrapper function that locks the execution scope of the given
	 * function to the specified scope. Inside funct, the "this" keyword
	 * becomes a reference to that scope.
	 */
	bind: function(scope, funct)
	{
		return function()
		{
			return funct.apply(scope, arguments);
		};
	},
	
	/**
	 * Function: eval
	 * 
	 * Evaluates the given expression using eval and returns the JavaScript
	 * object that represents the expression result. Supports evaluation of
	 * expressions that define functions and returns the function object for
	 * these expressions.
	 * 
	 * Parameters:
	 * 
	 * expr - A string that represents a JavaScript expression.
	 */
	eval: function(expr)
	{
		var result = null;

		if (expr.indexOf('function') >= 0)
		{
			try
			{
				eval('var _mxJavaScriptExpression='+expr);
				result = _mxJavaScriptExpression;
				// TODO: Use delete here?
				_mxJavaScriptExpression = null;
			}
			catch (e)
			{
				mxLog.warn(e.message + ' while evaluating ' + expr);
			}
		}
		else
		{
			try
			{
				result = eval(expr);
			}
			catch (e)
			{
				mxLog.warn(e.message + ' while evaluating ' + expr);
			}
		}
		
		return result;
	},
	
	/**
	 * Function: findNode
	 * 
	 * Returns the first node where attr equals value.
	 * This implementation does not use XPath.
	 */
	findNode: function(node, attr, value)
	{
		if (node.nodeType == mxConstants.NODETYPE_ELEMENT)
		{
			var tmp = node.getAttribute(attr);
	
			if (tmp != null && tmp == value)
			{
				return node;
			}
		}
		
		node = node.firstChild;
		
		while (node != null)
		{
			var result = mxUtils.findNode(node, attr, value);
			
			if (result != null)
			{
				return result;
			}
			
			node = node.nextSibling;
		}
		
		return null;
	},

	/**
	 * Function: getFunctionName
	 * 
	 * Returns the name for the given function.
	 * 
	 * Parameters:
	 * 
	 * f - JavaScript object that represents a function.
	 */
	getFunctionName: function(f)
	{
		var str = null;

		if (f != null)
		{
			if (f.name != null)
			{
				str = f.name;
			}
			else
			{
				var tmp = f.toString();
				var idx1 = 9;
				
				while (tmp.charAt(idx1) == ' ')
				{
					idx1++;
				}
				
				var idx2 = tmp.indexOf('(', idx1);
				str = tmp.substring(idx1, idx2);
			}
		}
		
		return str;
	},

	/**
	 * Function: indexOf
	 * 
	 * Returns the index of obj in array or -1 if the array does not contain
	 * the given object.
	 * 
	 * Parameters:
	 * 
	 * array - Array to check for the given obj.
	 * obj - Object to find in the given array.
	 */
	indexOf: function(array, obj)
	{
		if (array != null && obj != null)
		{
			for (var i = 0; i < array.length; i++)
			{
				if (array[i] == obj)
				{
					return i;
				}
			}
		}
		
		return -1;
	},

	/**
	 * Function: remove
	 * 
	 * Removes all occurrences of the given object in the given array or
	 * object. If there are multiple occurrences of the object, be they
	 * associative or as an array entry, all occurrences are removed from
	 * the array or deleted from the object. By removing the object from
	 * the array, all elements following the removed element are shifted
	 * by one step towards the beginning of the array.
	 * 
	 * The length of arrays is not modified inside this function.
	 * 
	 * Parameters:
	 * 
	 * obj - Object to find in the given array.
	 * array - Array to check for the given obj.
	 */
	remove: function(obj, array)
	{
		var result = null;
		
		if (typeof(array) == 'object')
		{
			var index = mxUtils.indexOf(array, obj);
			
			while (index >= 0)
			{
				array.splice(index, 1);
				result = obj;
				index = mxUtils.indexOf(array, obj);
			}
		}

		for (var key in array)
		{
			if (array[key] == obj)
			{
				delete array[key];
				result = obj;
			}
		}
		
		return result;
	},
	
	/**
	 * Function: isNode
	 * 
	 * Returns true if the given value is an XML node with the node name
	 * and if the optional attribute has the specified value.
	 * 
	 * This implementation assumes that the given value is a DOM node if the
	 * nodeType property is numeric, that is, if isNaN returns false for
	 * value.nodeType.
	 * 
	 * Parameters:
	 * 
	 * value - Object that should be examined as a node.
	 * nodeName - String that specifies the node name.
	 * attributeName - Optional attribute name to check.
	 * attributeValue - Optional attribute value to check.
	 */
	 isNode: function(value, nodeName, attributeName, attributeValue)
	 {
	 	if (value != null && !isNaN(value.nodeType) && (nodeName == null ||
	 		value.nodeName.toLowerCase() == nodeName.toLowerCase()))
 		{
 			return attributeName == null ||
 				value.getAttribute(attributeName) == attributeValue;
 		}
	 	
	 	return false;
	 },
	
	/**
	 * Function: isAncestorNode
	 * 
	 * Returns true if the given ancestor is an ancestor of the
	 * given DOM node in the DOM. This also returns true if the
	 * child is the ancestor.
	 * 
	 * Parameters:
	 * 
	 * ancestor - DOM node that represents the ancestor.
	 * child - DOM node that represents the child.
	 */
	 isAncestorNode: function(ancestor, child)
	 {
	 	var parent = child;
	 	
	 	while (parent != null)
	 	{
	 		if (parent == ancestor)
	 		{
	 			return true;
	 		}

	 		parent = parent.parentNode;
	 	}
	 	
	 	return false;
	 },

	/**
	 * Function: getChildNodes
	 * 
	 * Returns an array of child nodes that are of the given node type.
	 * 
	 * Parameters:
	 * 
	 * node - Parent DOM node to return the children from.
	 * nodeType - Optional node type to return. Default is
	 * <mxConstants.NODETYPE_ELEMENT>.
	 */
	getChildNodes: function(node, nodeType)
	{
		nodeType = nodeType || mxConstants.NODETYPE_ELEMENT;
		
		var children = [];
		var tmp = node.firstChild;
		
		while (tmp != null)
		{
			if (tmp.nodeType == nodeType)
			{
				children.push(tmp);
			}
			
			tmp = tmp.nextSibling;
		}
		
		return children;
	},

	/**
	 * Function: importNode
	 * 
	 * Cross browser implementation for document.importNode. Uses document.importNode
	 * in all browsers but IE, where the node is cloned by creating a new node and
	 * copying all attributes and children into it using importNode, recursively.
	 * 
	 * Parameters:
	 * 
	 * doc - Document to import the node into.
	 * node - Node to be imported.
	 * allChildren - If all children should be imported.
	 */
	importNode: function(doc, node, allChildren)
	{
		if (mxClient.IS_IE && (document.documentMode == null || document.documentMode < 10))
		{
			switch (node.nodeType)
			{
				case 1: /* element */
				{
					var newNode = doc.createElement(node.nodeName);
					
					if (node.attributes && node.attributes.length > 0)
					{
						for (var i = 0; i < node.attributes.length; i++)
						{
							newNode.setAttribute(node.attributes[i].nodeName,
								node.getAttribute(node.attributes[i].nodeName));
						}
						
						if (allChildren && node.childNodes && node.childNodes.length > 0)
						{
							for (var i = 0; i < node.childNodes.length; i++)
							{
								newNode.appendChild(mxUtils.importNode(doc, node.childNodes[i], allChildren));
							}
						}
					}
					
					return newNode;
					break;
				}
				case 3: /* text */
			    case 4: /* cdata-section */
			    case 8: /* comment */
			    {
			      return doc.createTextNode(node.value);
			      break;
			    }
			};
		}
		else
		{
			return doc.importNode(node, allChildren);
		}
	},

	/**
	 * Function: createXmlDocument
	 * 
	 * Returns a new, empty XML document.
	 */
	createXmlDocument: function()
	{
		var doc = null;
		
		if (document.implementation && document.implementation.createDocument)
		{
			doc = document.implementation.createDocument('', '', null);
		}
		else if (window.ActiveXObject)
		{
			doc = new ActiveXObject('Microsoft.XMLDOM');
	 	}
	 	
	 	return doc;
	},

	/**
	 * Function: parseXml
	 * 
	 * Parses the specified XML string into a new XML document and returns the
	 * new document.
	 * 
	 * Example:
	 * 
	 * (code)
	 * var doc = mxUtils.parseXml(
	 *   '<mxGraphModel><root><MyDiagram id="0"><mxCell/></MyDiagram>'+
	 *   '<MyLayer id="1"><mxCell parent="0" /></MyLayer><MyObject id="2">'+
	 *   '<mxCell style="strokeColor=blue;fillColor=red" parent="1" vertex="1">'+
	 *   '<mxGeometry x="10" y="10" width="80" height="30" as="geometry"/>'+
	 *   '</mxCell></MyObject></root></mxGraphModel>');
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * xml - String that contains the XML data.
	 */
	parseXml: function()
	{
		if (window.DOMParser)
		{
			return function(xml)
			{
				var parser = new DOMParser();
				
				return parser.parseFromString(xml, 'text/xml');
			};
		}
		else // IE<=9
		{
			return function(xml)
			{
				var result = mxUtils.createXmlDocument();
				
				result.async = 'false';
				result.loadXML(xml);
				
				return result;
			};
		}
	}(),

	/**
	 * Function: clearSelection
	 * 
	 * Clears the current selection in the page.
	 */
	clearSelection: function()
	{
		if (document.selection)
		{
			return function()
			{
				document.selection.empty();
			};
		}
		else if (window.getSelection)
		{
			return function()
			{
				window.getSelection().removeAllRanges();
			};
		}
		else
		{
			return function() { };
		}
	}(),

	/**
	 * Function: getPrettyXML
	 * 
	 * Returns a pretty printed string that represents the XML tree for the
	 * given node. This method should only be used to print XML for reading,
	 * use <getXml> instead to obtain a string for processing.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the XML for.
	 * tab - Optional string that specifies the indentation for one level.
	 * Default is two spaces.
	 * indent - Optional string that represents the current indentation.
	 * Default is an empty string.
	 */
	getPrettyXml: function(node, tab, indent)
	{
		var result = [];
		
		if (node != null)
		{
			tab = tab || '  ';
			indent = indent || '';
			
			if (node.nodeType == mxConstants.NODETYPE_TEXT)
			{
				result.push(node.value);
			}
			else
			{
				result.push(indent + '<'+node.nodeName);
				
				// Creates the string with the node attributes
				// and converts all HTML entities in the values
				var attrs = node.attributes;
				
				if (attrs != null)
				{
					for (var i = 0; i < attrs.length; i++)
					{
						var val = mxUtils.htmlEntities(attrs[i].value);
						result.push(' ' + attrs[i].nodeName +
							'="' + val + '"');
					}
				}

				// Recursively creates the XML string for each
				// child nodes and appends it here with an
				// indentation
				var tmp = node.firstChild;
				
				if (tmp != null)
				{
					result.push('>\n');
					
					while (tmp != null)
					{
						result.push(mxUtils.getPrettyXml(
							tmp, tab, indent + tab));
						tmp = tmp.nextSibling;
					}
					
					result.push(indent + '</'+node.nodeName+'>\n');
				}
				else
				{
					result.push('/>\n');
				}
			}
		}
		
		return result.join('');
	},
	
	/**
	 * Function: removeWhitespace
	 * 
	 * Removes the sibling text nodes for the given node that only consists
	 * of tabs, newlines and spaces.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node whose siblings should be removed.
	 * before - Optional boolean that specifies the direction of the traversal.
	 */
	removeWhitespace: function(node, before)
	{
		var tmp = (before) ? node.previousSibling : node.nextSibling;
		
		while (tmp != null && tmp.nodeType == mxConstants.NODETYPE_TEXT)
		{
			var next = (before) ? tmp.previousSibling : tmp.nextSibling;
			var text = mxUtils.getTextContent(tmp);
			
			if (mxUtils.trim(text).length == 0)
			{
				tmp.parentNode.removeChild(tmp);
			}
			
			tmp = next;
		}
	},
	
	/**
	 * Function: htmlEntities
	 * 
	 * Replaces characters (less than, greater than, newlines and quotes) with
	 * their HTML entities in the given string and returns the result.
	 * 
	 * Parameters:
	 * 
	 * s - String that contains the characters to be converted.
	 * newline - If newlines should be replaced. Default is true.
	 */
	htmlEntities: function(s, newline)
	{
		s = s || '';
		
		s = s.replace(/&/g,'&amp;'); // 38 26
		s = s.replace(/"/g,'&quot;'); // 34 22
		s = s.replace(/\'/g,'&#39;'); // 39 27
		s = s.replace(/</g,'&lt;'); // 60 3C
		s = s.replace(/>/g,'&gt;'); // 62 3E

		if (newline == null || newline)
		{
			s = s.replace(/\n/g, '&#xa;');
		}
		
		return s;
	},
	
	/**
	 * Function: isVml
	 * 
	 * Returns true if the given node is in the VML namespace.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node whose tag urn should be checked.
	 */
	isVml: function(node)
	{
		return node != null && node.tagUrn == 'urn:schemas-microsoft-com:vml';
	},

	/**
	 * Function: getXml
	 * 
	 * Returns the XML content of the specified node. For Internet Explorer,
	 * all \r\n\t[\t]* are removed from the XML string and the remaining \r\n
	 * are replaced by \n. All \n are then replaced with linefeed, or &#xa; if
	 * no linefeed is defined.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the XML for.
	 * linefeed - Optional string that linefeeds are converted into. Default is
	 * &#xa;
	 */
	getXml: function(node, linefeed)
	{
		var xml = '';

		if (window.XMLSerializer != null)
		{
			var xmlSerializer = new XMLSerializer();
			xml = xmlSerializer.serializeToString(node);     
		}
		else if (node.xml != null)
		{
			xml = node.xml.replace(/\r\n\t[\t]*/g, '').
				replace(/>\r\n/g, '>').
				replace(/\r\n/g, '\n');
		}

		// Replaces linefeeds with HTML Entities.
		linefeed = linefeed || '&#xa;';
		xml = xml.replace(/\n/g, linefeed);
		  
		return xml;
	},
	
	/**
	 * Function: getTextContent
	 * 
	 * Returns the text content of the specified node.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the text content for.
	 */
	getTextContent: function(node)
	{
		if (node.innerText !== undefined)
		{
			return node.innerText;
		}
		else
		{
			return (node != null) ? node[(node.textContent === undefined) ? 'text' : 'textContent'] : '';
		}
	},
	
	/**
	 * Function: setTextContent
	 * 
	 * Sets the text content of the specified node.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to set the text content for.
	 * text - String that represents the text content.
	 */
	setTextContent: function(node, text)
	{
		if (node.innerText !== undefined)
		{
			node.innerText = text;
		}
		else
		{
			node[(node.textContent === undefined) ? 'text' : 'textContent'] = text;
		}
	},
	
	/**
	 * Function: getInnerHtml
	 * 
	 * Returns the inner HTML for the given node as a string or an empty string
	 * if no node was specified. The inner HTML is the text representing all
	 * children of the node, but not the node itself.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the inner HTML for.
	 */
	getInnerHtml: function()
	{
		if (mxClient.IS_IE)
		{
			return function(node)
			{
				if (node != null)
				{
					return node.innerHTML;
				}
				
				return '';
			};
		}
		else
		{
			return function(node)
			{
				if (node != null)
				{
					var serializer = new XMLSerializer();
					return serializer.serializeToString(node);
				}
				
				return '';
			};
		}
	}(),

	/**
	 * Function: getOuterHtml
	 * 
	 * Returns the outer HTML for the given node as a string or an empty
	 * string if no node was specified. The outer HTML is the text representing
	 * all children of the node including the node itself.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to return the outer HTML for.
	 */
	getOuterHtml: function()
	{
		if (mxClient.IS_IE)
		{
			return function(node)
			{
				if (node != null)
				{
					if (node.outerHTML != null)
					{
						return node.outerHTML;
					}
					else
					{
						var tmp = [];
						tmp.push('<'+node.nodeName);
						
						var attrs = node.attributes;
						
						if (attrs != null)
						{
							for (var i = 0; i < attrs.length; i++)
							{
								var value = attrs[i].value;
								
								if (value != null && value.length > 0)
								{
									tmp.push(' ');
									tmp.push(attrs[i].nodeName);
									tmp.push('="');
									tmp.push(value);
									tmp.push('"');
								}
							}
						}
						
						if (node.innerHTML.length == 0)
						{
							tmp.push('/>');
						}
						else
						{
							tmp.push('>');
							tmp.push(node.innerHTML);
							tmp.push('</'+node.nodeName+'>');
						}
						
						return tmp.join('');
					}
				}
				
				return '';
			};
		}
		else
		{
			return function(node)
			{
				if (node != null)
				{
					var serializer = new XMLSerializer();
					return serializer.serializeToString(node);
				}
				
				return '';
			};
		}
	}(),
	
	/**
	 * Function: write
	 * 
	 * Creates a text node for the given string and appends it to the given
	 * parent. Returns the text node.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to append the text node to.
	 * text - String representing the text to be added.
	 */
	write: function(parent, text)
	{
		var doc = parent.ownerDocument;
		var node = doc.createTextNode(text);
		
		if (parent != null)
		{
			parent.appendChild(node);
		}
		
		return node;
	},
	
	/**
	 * Function: writeln
	 * 
	 * Creates a text node for the given string and appends it to the given
	 * parent with an additional linefeed. Returns the text node.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to append the text node to.
	 * text - String representing the text to be added.
	 */
	writeln: function(parent, text)
	{
		var doc = parent.ownerDocument;
		var node = doc.createTextNode(text);
		
		if (parent != null)
		{
			parent.appendChild(node);
			parent.appendChild(document.createElement('br'));
		}
		
		return node;
	},
	
	/**
	 * Function: br
	 * 
	 * Appends a linebreak to the given parent and returns the linebreak.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to append the linebreak to.
	 */
	br: function(parent, count)
	{
		count = count || 1;
		var br = null;
		
		for (var i = 0; i < count; i++)
		{
			if (parent != null)
			{
				br = parent.ownerDocument.createElement('br');
				parent.appendChild(br);
			}
		}
		
		return br;
	},
		
	/**
	 * Function: button
	 * 
	 * Returns a new button with the given level and function as an onclick
	 * event handler.
	 * 
	 * (code)
	 * document.body.appendChild(mxUtils.button('Test', function(evt)
	 * {
	 *   alert('Hello, World!');
	 * }));
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * label - String that represents the label of the button.
	 * funct - Function to be called if the button is pressed.
	 * doc - Optional document to be used for creating the button. Default is the
	 * current document.
	 */
	button: function(label, funct, doc)
	{
		doc = (doc != null) ? doc : document;
		
		var button = doc.createElement('button');
		mxUtils.write(button, label);

		mxEvent.addListener(button, 'click', function(evt)
		{
			funct(evt);
		});
		
		return button;
	},
	
	/**
	 * Function: para
	 * 
	 * Appends a new paragraph with the given text to the specified parent and
	 * returns the paragraph.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to append the text node to.
	 * text - String representing the text for the new paragraph.
	 */
	para: function(parent, text)
	{
		var p = document.createElement('p');
		mxUtils.write(p, text);

		if (parent != null)
		{
			parent.appendChild(p);
		}
		
		return p;
	},

	/**
	 * Function: addTransparentBackgroundFilter
	 * 
	 * Adds a transparent background to the filter of the given node. This
	 * background can be used in IE8 standards mode (native IE8 only) to pass
	 * events through the node.
	 */
	addTransparentBackgroundFilter: function(node)
	{
		node.style.filter += 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' +
			mxClient.imageBasePath + '/transparent.gif\', sizingMethod=\'scale\')';
	},

	/**
	 * Function: linkAction
	 * 
	 * Adds a hyperlink to the specified parent that invokes action on the
	 * specified editor.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to contain the new link.
	 * text - String that is used as the link label.
	 * editor - <mxEditor> that will execute the action.
	 * action - String that defines the name of the action to be executed.
	 * pad - Optional left-padding for the link. Default is 0.
	 */
	linkAction: function(parent, text, editor, action, pad)
	{
		return mxUtils.link(parent, text, function()
		{
			editor.execute(action);
		}, pad);
	},

	/**
	 * Function: linkInvoke
	 * 
	 * Adds a hyperlink to the specified parent that invokes the specified
	 * function on the editor passing along the specified argument. The
	 * function name is the name of a function of the editor instance,
	 * not an action name.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to contain the new link.
	 * text - String that is used as the link label.
	 * editor - <mxEditor> instance to execute the function on.
	 * functName - String that represents the name of the function.
	 * arg - Object that represents the argument to the function.
	 * pad - Optional left-padding for the link. Default is 0.
	 */
	linkInvoke: function(parent, text, editor, functName, arg, pad)
	{
		return mxUtils.link(parent, text, function()
		{
			editor[functName](arg);
		}, pad);
	},
	
	/**
	 * Function: link
	 * 
	 * Adds a hyperlink to the specified parent and invokes the given function
	 * when the link is clicked.
	 * 
	 * Parameters:
	 * 
	 * parent - DOM node to contain the new link.
	 * text - String that is used as the link label.
	 * funct - Function to execute when the link is clicked.
	 * pad - Optional left-padding for the link. Default is 0.
	 */
	link: function(parent, text, funct, pad)
	{
		var a = document.createElement('span');
		
		a.style.color = 'blue';
		a.style.textDecoration = 'underline';
		a.style.cursor = 'pointer';
		
		if (pad != null)
		{
			a.style.paddingLeft = pad+'px';
		}
		
		mxEvent.addListener(a, 'click', funct);
		mxUtils.write(a, text);
		
		if (parent != null)
		{
			parent.appendChild(a);
		}
		
		return a;
	},

	/**
	 * Function: fit
	 * 
	 * Makes sure the given node is inside the visible area of the window. This
	 * is done by setting the left and top in the style. 
	 */
	fit: function(node)
	{
		var left = parseInt(node.offsetLeft);
		var width = parseInt(node.offsetWidth);
			
		var offset = mxUtils.getDocumentScrollOrigin(node.ownerDocument);
		var sl = offset.x;
		var st = offset.y;

		var b = document.body;
		var d = document.documentElement;
		var right = (sl) + (b.clientWidth || d.clientWidth);
		
		if (left + width > right)
		{
			node.style.left = Math.max(sl, right - width) + 'px';
		}
		
		var top = parseInt(node.offsetTop);
		var height = parseInt(node.offsetHeight);
		
		var bottom = st + Math.max(b.clientHeight || 0, d.clientHeight);
		
		if (top + height > bottom)
		{
			node.style.top = Math.max(st, bottom - height) + 'px';
		}
	},

	/**
	 * Function: load
	 * 
	 * Loads the specified URL *synchronously* and returns the <mxXmlRequest>.
	 * Throws an exception if the file cannot be loaded. See <mxUtils.get> for
	 * an asynchronous implementation.
	 *
	 * Example:
	 * 
	 * (code)
	 * try
	 * {
	 *   var req = mxUtils.load(filename);
	 *   var root = req.getDocumentElement();
	 *   // Process XML DOM...
	 * }
	 * catch (ex)
	 * {
	 *   mxUtils.alert('Cannot load '+filename+': '+ex);
	 * }
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * url - URL to get the data from.
	 */
	load: function(url)
	{
		var req = new mxXmlRequest(url, null, 'GET', false);
		req.send();
		
		return req;
	},

	/**
	 * Function: get
	 * 
	 * Loads the specified URL *asynchronously* and invokes the given functions
	 * depending on the request status. Returns the <mxXmlRequest> in use. Both
	 * functions take the <mxXmlRequest> as the only parameter. See
	 * <mxUtils.load> for a synchronous implementation.
	 *
	 * Example:
	 * 
	 * (code)
	 * mxUtils.get(url, function(req)
	 * {
	 *    var node = req.getDocumentElement();
	 *    // Process XML DOM...
	 * });
	 * (end)
	 * 
	 * So for example, to load a diagram into an existing graph model, the
	 * following code is used.
	 * 
	 * (code)
	 * mxUtils.get(url, function(req)
	 * {
	 *   var node = req.getDocumentElement();
	 *   var dec = new mxCodec(node.ownerDocument);
	 *   dec.decode(node, graph.getModel());
	 * });
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * url - URL to get the data from.
	 * onload - Optional function to execute for a successful response.
	 * onerror - Optional function to execute on error.
	 * binary - Optional boolean parameter that specifies if the request is
	 * binary.
	 * timeout - Optional timeout in ms before calling ontimeout.
	 * ontimeout - Optional function to execute on timeout.
	 */
	get: function(url, onload, onerror, binary, timeout, ontimeout)
	{
		var req = new mxXmlRequest(url, null, 'GET');
		
		if (binary != null)
		{
			req.setBinary(binary);
		}
		
		req.send(onload, onerror, timeout, ontimeout);
		
		return req;
	},
	
	/**
	 * Function: post
	 * 
	 * Posts the specified params to the given URL *asynchronously* and invokes
	 * the given functions depending on the request status. Returns the
	 * <mxXmlRequest> in use. Both functions take the <mxXmlRequest> as the
	 * only parameter. Make sure to use encodeURIComponent for the parameter
	 * values.
	 *
	 * Example:
	 * 
	 * (code)
	 * mxUtils.post(url, 'key=value', function(req)
	 * {
	 * 	mxUtils.alert('Ready: '+req.isReady()+' Status: '+req.getStatus());
	 *  // Process req.getDocumentElement() using DOM API if OK...
	 * });
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * url - URL to get the data from.
	 * params - Parameters for the post request.
	 * onload - Optional function to execute for a successful response.
	 * onerror - Optional function to execute on error.
	 */
	post: function(url, params, onload, onerror)
	{
		return new mxXmlRequest(url, params).send(onload, onerror);
	},
	
	/**
	 * Function: submit
	 * 
	 * Submits the given parameters to the specified URL using
	 * <mxXmlRequest.simulate> and returns the <mxXmlRequest>.
	 * Make sure to use encodeURIComponent for the parameter
	 * values.
	 * 
	 * Parameters:
	 * 
	 * url - URL to get the data from.
	 * params - Parameters for the form.
	 * doc - Document to create the form in.
	 * target - Target to send the form result to.
	 */
	submit: function(url, params, doc, target)
	{
		return new mxXmlRequest(url, params).simulate(doc, target);
	},
	
	/**
	 * Function: loadInto
	 * 
	 * Loads the specified URL *asynchronously* into the specified document,
	 * invoking onload after the document has been loaded. This implementation
	 * does not use <mxXmlRequest>, but the document.load method.
	 * 
	 * Parameters:
	 * 
	 * url - URL to get the data from.
	 * doc - The document to load the URL into.
	 * onload - Function to execute when the URL has been loaded.
	 */
	loadInto: function(url, doc, onload)
	{
		if (mxClient.IS_IE)
		{
			doc.onreadystatechange = function ()
			{
				if (doc.readyState == 4)
				{
					onload();
				}
			};
		}
		else
		{
			doc.addEventListener('load', onload, false);
		}
		
		doc.load(url);
	},
	
	/**
	 * Function: getValue
	 * 
	 * Returns the value for the given key in the given associative array or
	 * the given default value if the value is null.
	 * 
	 * Parameters:
	 * 
	 * array - Associative array that contains the value for the key.
	 * key - Key whose value should be returned.
	 * defaultValue - Value to be returned if the value for the given
	 * key is null.
	 */
	getValue: function(array, key, defaultValue)
	{
		var value = (array != null) ? array[key] : null;

		if (value == null)
		{
			value = defaultValue;			
		}
		
		return value;
	},
	
	/**
	 * Function: getNumber
	 * 
	 * Returns the numeric value for the given key in the given associative
	 * array or the given default value (or 0) if the value is null. The value
	 * is converted to a numeric value using the Number function.
	 * 
	 * Parameters:
	 * 
	 * array - Associative array that contains the value for the key.
	 * key - Key whose value should be returned.
	 * defaultValue - Value to be returned if the value for the given
	 * key is null. Default is 0.
	 */
	getNumber: function(array, key, defaultValue)
	{
		var value = (array != null) ? array[key] : null;

		if (value == null)
		{
			value = defaultValue || 0;			
		}
		
		return Number(value);
	},
	
	/**
	 * Function: getColor
	 * 
	 * Returns the color value for the given key in the given associative
	 * array or the given default value if the value is null. If the value
	 * is <mxConstants.NONE> then null is returned.
	 * 
	 * Parameters:
	 * 
	 * array - Associative array that contains the value for the key.
	 * key - Key whose value should be returned.
	 * defaultValue - Value to be returned if the value for the given
	 * key is null. Default is null.
	 */
	getColor: function(array, key, defaultValue)
	{
		var value = (array != null) ? array[key] : null;

		if (value == null)
		{
			value = defaultValue;
		}
		else if (value == mxConstants.NONE)
		{
			value = null;
		}
		
		return value;
	},

	/**
	 * Function: clone
	 * 
	 * Recursively clones the specified object ignoring all fieldnames in the
	 * given array of transient fields. <mxObjectIdentity.FIELD_NAME> is always
	 * ignored by this function.
	 * 
	 * Parameters:
	 * 
	 * obj - Object to be cloned.
	 * transients - Optional array of strings representing the fieldname to be
	 * ignored.
	 * shallow - Optional boolean argument to specify if a shallow clone should
	 * be created, that is, one where all object references are not cloned or,
	 * in other words, one where only atomic (strings, numbers) values are
	 * cloned. Default is false.
	 */
	clone: function(obj, transients, shallow)
	{
		shallow = (shallow != null) ? shallow : false;
		var clone = null;
		
		if (obj != null && typeof(obj.constructor) == 'function')
		{
			clone = new obj.constructor();
			
		    for (var i in obj)
		    {
		    	if (i != mxObjectIdentity.FIELD_NAME && (transients == null ||
		    		mxUtils.indexOf(transients, i) < 0))
		    	{
			    	if (!shallow && typeof(obj[i]) == 'object')
			    	{
			            clone[i] = mxUtils.clone(obj[i]);
			        }
			        else
			        {
			            clone[i] = obj[i];
			        }
				}
		    }
		}
		
	    return clone;
	},

	/**
	 * Function: equalPoints
	 * 
	 * Compares all mxPoints in the given lists.
	 * 
	 * Parameters:
	 * 
	 * a - Array of <mxPoints> to be compared.
	 * b - Array of <mxPoints> to be compared.
	 */
	equalPoints: function(a, b)
	{
		if ((a == null && b != null) || (a != null && b == null) ||
			(a != null && b != null && a.length != b.length))
		{
			return false;
		}
		else if (a != null && b != null)
		{
			for (var i = 0; i < a.length; i++)
			{
				if (a[i] == b[i] || (a[i] != null && !a[i].equals(b[i])))
				{
					return false;
				}
			}
		}
		
		return true;
	},

	/**
	 * Function: equalEntries
	 * 
	 * Returns true if all entries of the given objects are equal. Values with
	 * with Number.NaN are equal to Number.NaN and unequal to any other value.
	 * 
	 * Parameters:
	 * 
	 * a - <mxRectangle> to be compared.
	 * b - <mxRectangle> to be compared.
	 */
	equalEntries: function(a, b)
	{
		if ((a == null && b != null) || (a != null && b == null) ||
			(a != null && b != null && a.length != b.length))
		{
			return false;
		}
		else if (a != null && b != null)
		{
			for (var key in a)
			{
				if ((!mxUtils.isNaN(a[key]) || !mxUtils.isNaN(b[key])) && a[key] != b[key])
				{
					return false;
				}
			}
		}
		
		return true;
	},
	
	/**
	 * Function: isNaN
	 *
	 * Returns true if the given value is of type number and isNaN returns true.
	 */
	isNaN: function(value)
	{
		return typeof(value) == 'number' && isNaN(value);
	},
	
	/**
	 * Function: extend
	 *
	 * Assigns a copy of the superclass prototype to the subclass prototype.
	 * Note that this does not call the constructor of the superclass at this
	 * point, the superclass constructor should be called explicitely in the
	 * subclass constructor. Below is an example.
	 * 
	 * (code)
	 * MyGraph = function(container, model, renderHint, stylesheet)
	 * {
	 *   mxGraph.call(this, container, model, renderHint, stylesheet);
	 * }
	 * 
	 * mxUtils.extend(MyGraph, mxGraph);
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * ctor - Constructor of the subclass.
	 * superCtor - Constructor of the superclass.
	 */
	extend: function(ctor, superCtor)
	{
		var f = function() {};
		f.prototype = superCtor.prototype;
		
		ctor.prototype = new f();
		ctor.prototype.constructor = ctor;
	},

	/**
	 * Function: toString
	 * 
	 * Returns a textual representation of the specified object.
	 * 
	 * Parameters:
	 * 
	 * obj - Object to return the string representation for.
	 */
	toString: function(obj)
	{
	    var output = '';
	    
	    for (var i in obj)
	    {
	    	try
	    	{
			    if (obj[i] == null)
			    {
		            output += i + ' = [null]\n';
			    }
			    else if (typeof(obj[i]) == 'function')
			    {
		            output += i + ' => [Function]\n';
		        }
		        else if (typeof(obj[i]) == 'object')
		        {
		        	var ctor = mxUtils.getFunctionName(obj[i].constructor); 
		            output += i + ' => [' + ctor + ']\n';
		        }
		        else
		        {
		            output += i + ' = ' + obj[i] + '\n';
		        }
	    	}
	    	catch (e)
	    	{
	    		output += i + '=' + e.message;
	    	}
	    }
	    
	    return output;
	},

	/**
	 * Function: toRadians
	 * 
	 * Converts the given degree to radians.
	 */
	toRadians: function(deg)
	{
		return Math.PI * deg / 180;
	},

	/**
	 * Function: toDegree
	 * 
	 * Converts the given radians to degree.
	 */
	toDegree: function(rad)
	{
		return rad * 180 / Math.PI;
	},
	
	/**
	 * Function: arcToCurves
	 * 
	 * Converts the given arc to a series of curves.
	 */
	arcToCurves: function(x0, y0, r1, r2, angle, largeArcFlag, sweepFlag, x, y)
	{
		x -= x0;
		y -= y0;
		
        if (r1 === 0 || r2 === 0) 
        {
        	return result;
        }
        
        var fS = sweepFlag;
        var psai = angle;
        r1 = Math.abs(r1);
        r2 = Math.abs(r2);
        var ctx = -x / 2;
        var cty = -y / 2;
        var cpsi = Math.cos(psai * Math.PI / 180);
        var spsi = Math.sin(psai * Math.PI / 180);
        var rxd = cpsi * ctx + spsi * cty;
        var ryd = -1 * spsi * ctx + cpsi * cty;
        var rxdd = rxd * rxd;
        var rydd = ryd * ryd;
        var r1x = r1 * r1;
        var r2y = r2 * r2;
        var lamda = rxdd / r1x + rydd / r2y;
        var sds;
        
        if (lamda > 1) 
        {
        	r1 = Math.sqrt(lamda) * r1;
        	r2 = Math.sqrt(lamda) * r2;
        	sds = 0;
        }  
        else
        {
        	var seif = 1;
            
        	if (largeArcFlag === fS) 
        	{
        		seif = -1;
        	}
            
        	sds = seif * Math.sqrt((r1x * r2y - r1x * rydd - r2y * rxdd) / (r1x * rydd + r2y * rxdd));
        }
        
        var txd = sds * r1 * ryd / r2;
        var tyd = -1 * sds * r2 * rxd / r1;
        var tx = cpsi * txd - spsi * tyd + x / 2;
        var ty = spsi * txd + cpsi * tyd + y / 2;
        var rad = Math.atan2((ryd - tyd) / r2, (rxd - txd) / r1) - Math.atan2(0, 1);
        var s1 = (rad >= 0) ? rad : 2 * Math.PI + rad;
        rad = Math.atan2((-ryd - tyd) / r2, (-rxd - txd) / r1) - Math.atan2((ryd - tyd) / r2, (rxd - txd) / r1);
        var dr = (rad >= 0) ? rad : 2 * Math.PI + rad;
        
        if (fS == 0 && dr > 0) 
        {
        	dr -= 2 * Math.PI;
        }
        else if (fS != 0 && dr < 0) 
        {
        	dr += 2 * Math.PI;
        }
        
        var sse = dr * 2 / Math.PI;
        var seg = Math.ceil(sse < 0 ? -1 * sse : sse);
        var segr = dr / seg;
        var t = 8/3 * Math.sin(segr / 4) * Math.sin(segr / 4) / Math.sin(segr / 2);
        var cpsir1 = cpsi * r1;
        var cpsir2 = cpsi * r2;
        var spsir1 = spsi * r1;
        var spsir2 = spsi * r2;
        var mc = Math.cos(s1);
        var ms = Math.sin(s1);
        var x2 = -t * (cpsir1 * ms + spsir2 * mc);
        var y2 = -t * (spsir1 * ms - cpsir2 * mc);
        var x3 = 0;
        var y3 = 0;

		var result = [];
        
        for (var n = 0; n < seg; ++n) 
        {
            s1 += segr;
            mc = Math.cos(s1);
            ms = Math.sin(s1);
            
            x3 = cpsir1 * mc - spsir2 * ms + tx;
            y3 = spsir1 * mc + cpsir2 * ms + ty;
            var dx = -t * (cpsir1 * ms + spsir2 * mc);
            var dy = -t * (spsir1 * ms - cpsir2 * mc);
            
            // CurveTo updates x0, y0 so need to restore it
            var index = n * 6;
            result[index] = Number(x2 + x0);
            result[index + 1] = Number(y2 + y0);
            result[index + 2] = Number(x3 - dx + x0);
            result[index + 3] = Number(y3 - dy + y0);
            result[index + 4] = Number(x3 + x0);
            result[index + 5] = Number(y3 + y0);
            
			x2 = x3 + dx;
            y2 = y3 + dy;
        }
        
        return result;
	},

	/**
	 * Function: getBoundingBox
	 * 
	 * Returns the bounding box for the rotated rectangle.
	 * 
	 * Parameters:
	 * 
	 * rect - <mxRectangle> to be rotated.
	 * angle - Number that represents the angle (in degrees).
	 * cx - Optional <mxPoint> that represents the rotation center. If no
	 * rotation center is given then the center of rect is used.
	 */
	getBoundingBox: function(rect, rotation, cx)
	{
        var result = null;

        if (rect != null && rotation != null && rotation != 0)
        {
            var rad = mxUtils.toRadians(rotation);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            cx = (cx != null) ? cx : new mxPoint(rect.x + rect.width / 2, rect.y  + rect.height / 2);

            var p1 = new mxPoint(rect.x, rect.y);
            var p2 = new mxPoint(rect.x + rect.width, rect.y);
            var p3 = new mxPoint(p2.x, rect.y + rect.height);
            var p4 = new mxPoint(rect.x, p3.y);

            p1 = mxUtils.getRotatedPoint(p1, cos, sin, cx);
            p2 = mxUtils.getRotatedPoint(p2, cos, sin, cx);
            p3 = mxUtils.getRotatedPoint(p3, cos, sin, cx);
            p4 = mxUtils.getRotatedPoint(p4, cos, sin, cx);

            result = new mxRectangle(p1.x, p1.y, 0, 0);
            result.add(new mxRectangle(p2.x, p2.y, 0, 0));
            result.add(new mxRectangle(p3.x, p3.y, 0, 0));
            result.add(new mxRectangle(p4.x, p4.y, 0, 0));
        }

        return result;
	},

	/**
	 * Function: getRotatedPoint
	 * 
	 * Rotates the given point by the given cos and sin.
	 */
	getRotatedPoint: function(pt, cos, sin, c)
	{
		c = (c != null) ? c : new mxPoint();
		var x = pt.x - c.x;
		var y = pt.y - c.y;

		var x1 = x * cos - y * sin;
		var y1 = y * cos + x * sin;

		return new mxPoint(x1 + c.x, y1 + c.y);
	},
	
	/**
	 * Returns an integer mask of the port constraints of the given map
	 * @param dict the style map to determine the port constraints for
	 * @param defaultValue Default value to return if the key is undefined.
	 * @return the mask of port constraint directions
	 * 
	 * Parameters:
	 * 
	 * terminal - <mxCelState> that represents the terminal.
	 * edge - <mxCellState> that represents the edge.
	 * source - Boolean that specifies if the terminal is the source terminal.
	 * defaultValue - Default value to be returned.
	 */
	getPortConstraints: function(terminal, edge, source, defaultValue)
	{
		var value = mxUtils.getValue(terminal.style, mxConstants.STYLE_PORT_CONSTRAINT, null);
		
		if (value == null)
		{
			return defaultValue;
		}
		else
		{
			var directions = value.toString();
			var returnValue = mxConstants.DIRECTION_MASK_NONE;
			var constraintRotationEnabled = mxUtils.getValue(terminal.style, mxConstants.STYLE_PORT_CONSTRAINT_ROTATION, 0);
			var rotation = 0;
			
			if (constraintRotationEnabled == 1)
			{
				rotation = mxUtils.getValue(terminal.style, mxConstants.STYLE_ROTATION, 0);
			}
			
			var quad = 0;

			if (rotation > 45)
			{
				quad = 1;
				
				if (rotation >= 135)
				{
					quad = 2;
				}
			}
			else if (rotation < -45)
			{
				quad = 3;
				
				if (rotation <= -135)
				{
					quad = 2;
				}
			}

			if (directions.indexOf(mxConstants.DIRECTION_NORTH) >= 0)
			{
				switch (quad)
				{
					case 0:
						returnValue |= mxConstants.DIRECTION_MASK_NORTH;
						break;
					case 1:
						returnValue |= mxConstants.DIRECTION_MASK_EAST;
						break;
					case 2:
						returnValue |= mxConstants.DIRECTION_MASK_SOUTH;
						break;
					case 3:
						returnValue |= mxConstants.DIRECTION_MASK_WEST;
						break;
				}
			}
			if (directions.indexOf(mxConstants.DIRECTION_WEST) >= 0)
			{
				switch (quad)
				{
					case 0:
						returnValue |= mxConstants.DIRECTION_MASK_WEST;
						break;
					case 1:
						returnValue |= mxConstants.DIRECTION_MASK_NORTH;
						break;
					case 2:
						returnValue |= mxConstants.DIRECTION_MASK_EAST;
						break;
					case 3:
						returnValue |= mxConstants.DIRECTION_MASK_SOUTH;
						break;
				}
			}
			if (directions.indexOf(mxConstants.DIRECTION_SOUTH) >= 0)
			{
				switch (quad)
				{
					case 0:
						returnValue |= mxConstants.DIRECTION_MASK_SOUTH;
						break;
					case 1:
						returnValue |= mxConstants.DIRECTION_MASK_WEST;
						break;
					case 2:
						returnValue |= mxConstants.DIRECTION_MASK_NORTH;
						break;
					case 3:
						returnValue |= mxConstants.DIRECTION_MASK_EAST;
						break;
				}
			}
			if (directions.indexOf(mxConstants.DIRECTION_EAST) >= 0)
			{
				switch (quad)
				{
					case 0:
						returnValue |= mxConstants.DIRECTION_MASK_EAST;
						break;
					case 1:
						returnValue |= mxConstants.DIRECTION_MASK_SOUTH;
						break;
					case 2:
						returnValue |= mxConstants.DIRECTION_MASK_WEST;
						break;
					case 3:
						returnValue |= mxConstants.DIRECTION_MASK_NORTH;
						break;
				}
			}

			return returnValue;
		}
	},
	
	/**
	 * Function: reversePortConstraints
	 * 
	 * Reverse the port constraint bitmask. For example, north | east
	 * becomes south | west
	 */
	reversePortConstraints: function(constraint)
	{
		var result = 0;
		
		result = (constraint & mxConstants.DIRECTION_MASK_WEST) << 3;
		result |= (constraint & mxConstants.DIRECTION_MASK_NORTH) << 1;
		result |= (constraint & mxConstants.DIRECTION_MASK_SOUTH) >> 1;
		result |= (constraint & mxConstants.DIRECTION_MASK_EAST) >> 3;
		
		return result;
	},
	
	/**
	 * Function: findNearestSegment
	 * 
	 * Finds the index of the nearest segment on the given cell state for
	 * the specified coordinate pair.
	 */
	findNearestSegment: function(state, x, y)
	{
		var index = -1;
		
		if (state.absolutePoints.length > 0)
		{
			var last = state.absolutePoints[0];
			var min = null;
			
			for (var i = 1; i < state.absolutePoints.length; i++)
			{
				var current = state.absolutePoints[i];
				var dist = mxUtils.ptSegDistSq(last.x, last.y,
					current.x, current.y, x, y);
				
				if (min == null || dist < min)
				{
					min = dist;
					index = i - 1;
				}

				last = current;
			}
		}
		
		return index;
	},
	
	/**
	 * Function: rectangleIntersectsSegment
	 * 
	 * Returns true if the given rectangle intersects the given segment.
	 * 
	 * Parameters:
	 * 
	 * bounds - <mxRectangle> that represents the rectangle.
	 * p1 - <mxPoint> that represents the first point of the segment.
	 * p2 - <mxPoint> that represents the second point of the segment.
	 */
	rectangleIntersectsSegment: function(bounds, p1, p2)
	{
		var top = bounds.y;
		var left = bounds.x;
		var bottom = top + bounds.height;
		var right = left + bounds.width;
			
		// Find min and max X for the segment
		var minX = p1.x;
		var maxX = p2.x;
		
		if (p1.x > p2.x)
		{
		  minX = p2.x;
		  maxX = p1.x;
		}
		
		// Find the intersection of the segment's and rectangle's x-projections
		if (maxX > right)
		{
		  maxX = right;
		}
		
		if (minX < left)
		{
		  minX = left;
		}
		
		if (minX > maxX) // If their projections do not intersect return false
		{
		  return false;
		}
		
		// Find corresponding min and max Y for min and max X we found before
		var minY = p1.y;
		var maxY = p2.y;
		var dx = p2.x - p1.x;
		
		if (Math.abs(dx) > 0.0000001)
		{
		  var a = (p2.y - p1.y) / dx;
		  var b = p1.y - a * p1.x;
		  minY = a * minX + b;
		  maxY = a * maxX + b;
		}
		
		if (minY > maxY)
		{
		  var tmp = maxY;
		  maxY = minY;
		  minY = tmp;
		}
		
		// Find the intersection of the segment's and rectangle's y-projections
		if (maxY > bottom)
		{
		  maxY = bottom;
		}
		
		if (minY < top)
		{
		  minY = top;
		}
		
		if (minY > maxY) // If Y-projections do not intersect return false
		{
		  return false;
		}
		
		return true;
	},
	
	/**
	 * Function: contains
	 * 
	 * Returns true if the specified point (x, y) is contained in the given rectangle.
	 * 
	 * Parameters:
	 * 
	 * bounds - <mxRectangle> that represents the area.
	 * x - X-coordinate of the point.
	 * y - Y-coordinate of the point.
	 */
	contains: function(bounds, x, y)
	{
		return (bounds.x <= x && bounds.x + bounds.width >= x &&
				bounds.y <= y && bounds.y + bounds.height >= y);
	},

	/**
	 * Function: intersects
	 * 
	 * Returns true if the two rectangles intersect.
	 * 
	 * Parameters:
	 * 
	 * a - <mxRectangle> to be checked for intersection.
	 * b - <mxRectangle> to be checked for intersection.
	 */
	intersects: function(a, b)
	{
		var tw = a.width;
		var th = a.height;
		var rw = b.width;
		var rh = b.height;
		
		if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0)
		{
		    return false;
		}
		
		var tx = a.x;
		var ty = a.y;
		var rx = b.x;
		var ry = b.y;
		
		rw += rx;
		rh += ry;
		tw += tx;
		th += ty;

		return ((rw < rx || rw > tx) &&
			(rh < ry || rh > ty) &&
			(tw < tx || tw > rx) &&
			(th < ty || th > ry));
	},

	/**
	 * Function: intersects
	 * 
	 * Returns true if the two rectangles intersect.
	 * 
	 * Parameters:
	 * 
	 * a - <mxRectangle> to be checked for intersection.
	 * b - <mxRectangle> to be checked for intersection.
	 */
	intersectsHotspot: function(state, x, y, hotspot, min, max)
	{
		hotspot = (hotspot != null) ? hotspot : 1;
		min = (min != null) ? min : 0;
		max = (max != null) ? max : 0;
		
		if (hotspot > 0)
		{
			var cx = state.getCenterX();
			var cy = state.getCenterY();
			var w = state.width;
			var h = state.height;
			
			var start = mxUtils.getValue(state.style, mxConstants.STYLE_STARTSIZE) * state.view.scale;

			if (start > 0)
			{
				if (mxUtils.getValue(state.style, mxConstants.STYLE_HORIZONTAL, true))
				{
					cy = state.y + start / 2;
					h = start;
				}
				else
				{
					cx = state.x + start / 2;
					w = start;
				}
			}

			w = Math.max(min, w * hotspot);
			h = Math.max(min, h * hotspot);
			
			if (max > 0)
			{
				w = Math.min(w, max);
				h = Math.min(h, max);
			}
			
			var rect = new mxRectangle(cx - w / 2, cy - h / 2, w, h);
			var alpha = mxUtils.toRadians(mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION) || 0);
			
			if (alpha != 0)
			{
				var cos = Math.cos(-alpha);
				var sin = Math.sin(-alpha);
				var cx = new mxPoint(state.getCenterX(), state.getCenterY());
				var pt = mxUtils.getRotatedPoint(new mxPoint(x, y), cos, sin, cx);
				x = pt.x;
				y = pt.y;
			}
			
			return mxUtils.contains(rect, x, y);			
		}
		
		return true;
	},

	/**
	 * Function: getOffset
	 * 
	 * Returns the offset for the specified container as an <mxPoint>. The
	 * offset is the distance from the top left corner of the container to the
	 * top left corner of the document.
	 * 
	 * Parameters:
	 * 
	 * container - DOM node to return the offset for.
	 * scollOffset - Optional boolean to add the scroll offset of the document.
	 * Default is false.
	 */
	getOffset: function(container, scrollOffset)
	{
		var offsetLeft = 0;
		var offsetTop = 0;
		
		if (scrollOffset != null && scrollOffset)
		{
			var offset = mxUtils.getDocumentScrollOrigin(container.ownerDocument);
			offsetLeft += offset.x;
			offsetTop += offset.y;
		}

		while (container.offsetParent)
		{
			offsetLeft += container.offsetLeft;
			offsetTop += container.offsetTop;
			
			container = container.offsetParent;
		}
		
		return new mxPoint(offsetLeft, offsetTop);
	},

	/**
	 * Function: getDocumentScrollOrigin
	 * 
	 * Returns the scroll origin of the given document or the current document
	 * if no document is given.
	 */
	getDocumentScrollOrigin: function(doc)
	{
		if (mxClient.IS_QUIRKS)
		{
			return new mxPoint(doc.body.scrollLeft, doc.body.scrollTop);
		}
		else
		{
			var wnd = doc.defaultView || doc.parentWindow;
			
			var x = (wnd != null && window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
			var y = (wnd != null && window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			
			return new mxPoint(x, y);
		}
	},
	
	/**
	 * Function: getScrollOrigin
	 * 
	 * Returns the top, left corner of the viewrect as an <mxPoint>.
	 */
	getScrollOrigin: function(node)
	{
		var b = document.body;
		var d = document.documentElement;
		var result = mxUtils.getDocumentScrollOrigin((node != null) ? node.ownerDocument : document);
		
		while (node != null && node != b && node != d)
		{
			if (!isNaN(node.scrollLeft) && !isNaN(node.scrollTop))
			{
				result.x += node.scrollLeft;
				result.y += node.scrollTop;
			}
			
			node = node.parentNode;
		}
		
		return result;
	},
	
	/**
	 * Function: convertPoint
	 * 
	 * Converts the specified point (x, y) using the offset of the specified
	 * container and returns a new <mxPoint> with the result.
	 * 
	 * (code)
	 * var pt = mxUtils.convertPoint(graph.container,
	 *   mxEvent.getClientX(evt), mxEvent.getClientY(evt));
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * container - DOM node to use for the offset.
	 * x - X-coordinate of the point to be converted.
	 * y - Y-coordinate of the point to be converted.
	 */
	convertPoint: function(container, x, y)
	{
		var origin = mxUtils.getScrollOrigin(container);
		var offset = mxUtils.getOffset(container);

		offset.x -= origin.x;
		offset.y -= origin.y;
		
		return new mxPoint(x - offset.x, y - offset.y);
	},
	
	/**
	 * Function: ltrim
	 * 
	 * Strips all whitespaces from the beginning of the string.
	 * Without the second parameter, Javascript function will trim these
	 * characters:
	 * 
	 * - " " (ASCII 32 (0x20)), an ordinary space
	 * - "\t" (ASCII 9 (0x09)), a tab
	 * - "\n" (ASCII 10 (0x0A)), a new line (line feed)
	 * - "\r" (ASCII 13 (0x0D)), a carriage return
	 * - "\0" (ASCII 0 (0x00)), the NUL-byte
	 * - "\x0B" (ASCII 11 (0x0B)), a vertical tab
	 */
	ltrim: function(str, chars)
	{
		chars = chars || "\\s";
		
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	},
	
	/**
	 * Function: rtrim
	 * 
	 * Strips all whitespaces from the end of the string.
	 * Without the second parameter, Javascript function will trim these
	 * characters:
	 * 
	 * - " " (ASCII 32 (0x20)), an ordinary space
	 * - "\t" (ASCII 9 (0x09)), a tab
	 * - "\n" (ASCII 10 (0x0A)), a new line (line feed)
	 * - "\r" (ASCII 13 (0x0D)), a carriage return
	 * - "\0" (ASCII 0 (0x00)), the NUL-byte
	 * - "\x0B" (ASCII 11 (0x0B)), a vertical tab
	 */
	rtrim: function(str, chars)
	{
		chars = chars || "\\s";
		
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	},
	
	/**
	 * Function: trim
	 * 
	 * Strips all whitespaces from both end of the string.
	 * Without the second parameter, Javascript function will trim these
	 * characters:
	 * 
	 * - " " (ASCII 32 (0x20)), an ordinary space
	 * - "\t" (ASCII 9 (0x09)), a tab
	 * - "\n" (ASCII 10 (0x0A)), a new line (line feed)
	 * - "\r" (ASCII 13 (0x0D)), a carriage return
	 * - "\0" (ASCII 0 (0x00)), the NUL-byte
	 * - "\x0B" (ASCII 11 (0x0B)), a vertical tab
	 */
	trim: function(str, chars)
	{
		return mxUtils.ltrim(mxUtils.rtrim(str, chars), chars);
	},
	
	/**
	 * Function: isNumeric
	 * 
	 * Returns true if the specified value is numeric, that is, if it is not
	 * null, not an empty string, not a HEX number and isNaN returns false.
	 * 
	 * Parameters:
	 * 
	 * n - String representing the possibly numeric value.
	 */
	isNumeric: function(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n) && (typeof(n) != 'string' || n.toLowerCase().indexOf('0x') < 0);
	},

	/**
	 * Function: isInteger
	 * 
	 * Returns true if the given value is an valid integer number.
	 * 
	 * Parameters:
	 * 
	 * n - String representing the possibly numeric value.
	 */
	isInteger: function(n)
	{
		return String(parseInt(n)) === String(n);
	},

	/**
	 * Function: mod
	 * 
	 * Returns the remainder of division of n by m. You should use this instead
	 * of the built-in operation as the built-in operation does not properly
	 * handle negative numbers.
	 */
	mod: function(n, m)
	{
		return ((n % m) + m) % m;
	},

	/**
	 * Function: intersection
	 * 
	 * Returns the intersection of two lines as an <mxPoint>.
	 * 
	 * Parameters:
	 * 
	 * x0 - X-coordinate of the first line's startpoint.
	 * y0 - X-coordinate of the first line's startpoint.
	 * x1 - X-coordinate of the first line's endpoint.
	 * y1 - Y-coordinate of the first line's endpoint.
	 * x2 - X-coordinate of the second line's startpoint.
	 * y2 - Y-coordinate of the second line's startpoint.
	 * x3 - X-coordinate of the second line's endpoint.
	 * y3 - Y-coordinate of the second line's endpoint.
	 */
	intersection: function (x0, y0, x1, y1, x2, y2, x3, y3)
	{
		var denom = ((y3 - y2)*(x1 - x0)) - ((x3 - x2)*(y1 - y0));
		var nume_a = ((x3 - x2)*(y0 - y2)) - ((y3 - y2)*(x0 - x2));
		var nume_b = ((x1 - x0)*(y0 - y2)) - ((y1 - y0)*(x0 - x2));

		var ua = nume_a / denom;
		var ub = nume_b / denom;
		
		if(ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0)
		{
			// Get the intersection point
			var intersectionX = x0 + ua*(x1 - x0);
			var intersectionY = y0 + ua*(y1 - y0);
			
			return new mxPoint(intersectionX, intersectionY);
		}
		
		// No intersection
		return null;
	},
	
	/**
	 * Function: ptSegDistSq
	 * 
	 * Returns the square distance between a segment and a point. To get the
	 * distance between a point and a line (with infinite length) use
	 * <mxUtils.ptLineDist>.
	 * 
	 * Parameters:
	 * 
	 * x1 - X-coordinate of the startpoint of the segment.
	 * y1 - Y-coordinate of the startpoint of the segment.
	 * x2 - X-coordinate of the endpoint of the segment.
	 * y2 - Y-coordinate of the endpoint of the segment.
	 * px - X-coordinate of the point.
	 * py - Y-coordinate of the point.
	 */
	ptSegDistSq: function(x1, y1, x2, y2, px, py)
    {
		x2 -= x1;
		y2 -= y1;

		px -= x1;
		py -= y1;

		var dotprod = px * x2 + py * y2;
		var projlenSq;

		if (dotprod <= 0.0)
		{
		    projlenSq = 0.0;
		}
		else
		{
		    px = x2 - px;
		    py = y2 - py;
		    dotprod = px * x2 + py * y2;

		    if (dotprod <= 0.0)
		    {
				projlenSq = 0.0;
		    }
		    else
		    {
				projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
		    }
		}

		var lenSq = px * px + py * py - projlenSq;
		
		if (lenSq < 0)
		{
		    lenSq = 0;
		}
		
		return lenSq;
    },
	
	/**
	 * Function: ptLineDist
	 * 
	 * Returns the distance between a line defined by two points and a point.
	 * To get the distance between a point and a segment (with a specific
	 * length) use <mxUtils.ptSeqDistSq>.
	 * 
	 * Parameters:
	 * 
	 * x1 - X-coordinate of point 1 of the line.
	 * y1 - Y-coordinate of point 1 of the line.
	 * x2 - X-coordinate of point 1 of the line.
	 * y2 - Y-coordinate of point 1 of the line.
	 * px - X-coordinate of the point.
	 * py - Y-coordinate of the point.
	 */
    ptLineDist: function(x1, y1, x2, y2, px, py)
    {
		return Math.abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1) /
			Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    },
    	
	/**
	 * Function: relativeCcw
	 * 
	 * Returns 1 if the given point on the right side of the segment, 0 if its
	 * on the segment, and -1 if the point is on the left side of the segment.
	 * 
	 * Parameters:
	 * 
	 * x1 - X-coordinate of the startpoint of the segment.
	 * y1 - Y-coordinate of the startpoint of the segment.
	 * x2 - X-coordinate of the endpoint of the segment.
	 * y2 - Y-coordinate of the endpoint of the segment.
	 * px - X-coordinate of the point.
	 * py - Y-coordinate of the point.
	 */
	relativeCcw: function(x1, y1, x2, y2, px, py)
    {
		x2 -= x1;
		y2 -= y1;
		px -= x1;
		py -= y1;
		var ccw = px * y2 - py * x2;
		
		if (ccw == 0.0)
		{
		    ccw = px * x2 + py * y2;
		    
		    if (ccw > 0.0)
		    {
				px -= x2;
				py -= y2;
				ccw = px * x2 + py * y2;
				
				if (ccw < 0.0)
				{
				    ccw = 0.0;
				}
		    }
		}
		
		return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
    },
    
	/**
	 * Function: animateChanges
	 * 
	 * See <mxEffects.animateChanges>. This is for backwards compatibility and
	 * will be removed later.
	 */
	animateChanges: function(graph, changes)
	{
		// LATER: Deprecated, remove this function
    	mxEffects.animateChanges.apply(this, arguments);
	},
    
	/**
	 * Function: cascadeOpacity
	 * 
	 * See <mxEffects.cascadeOpacity>. This is for backwards compatibility and
	 * will be removed later.
	 */
    cascadeOpacity: function(graph, cell, opacity)
	{
		mxEffects.cascadeOpacity.apply(this, arguments);
	},

	/**
	 * Function: fadeOut
	 * 
	 * See <mxEffects.fadeOut>. This is for backwards compatibility and
	 * will be removed later.
	 */
	fadeOut: function(node, from, remove, step, delay, isEnabled)
	{
		mxEffects.fadeOut.apply(this, arguments);
	},
	
	/**
	 * Function: setOpacity
	 * 
	 * Sets the opacity of the specified DOM node to the given value in %.
	 * 
	 * Parameters:
	 * 
	 * node - DOM node to set the opacity for.
	 * value - Opacity in %. Possible values are between 0 and 100.
	 */
	setOpacity: function(node, value)
	{
		if (mxUtils.isVml(node))
		{
	    	if (value >= 100)
	    	{
	    		node.style.filter = '';
	    	}
	    	else
	    	{
	    		// TODO: Why is the division by 5 needed in VML?
			    node.style.filter = 'alpha(opacity=' + (value/5) + ')';
	    	}
		}
		else if (mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9))
	    {
	    	if (value >= 100)
	    	{
	    		node.style.filter = '';
	    	}
	    	else
	    	{
			    node.style.filter = 'alpha(opacity=' + value + ')';
	    	}
		}
		else
		{
		    node.style.opacity = (value / 100);
		}
	},

	/**
	 * Function: createImage
	 * 
	 * Creates and returns an image (IMG node) or VML image (v:image) in IE6 in
	 * quirks mode.
	 * 
	 * Parameters:
	 * 
	 * src - URL that points to the image to be displayed.
	 */
	createImage: function(src)
	{
        var imageNode = null;
        
		if (mxClient.IS_IE6 && document.compatMode != 'CSS1Compat')
		{
        	imageNode = document.createElement(mxClient.VML_PREFIX + ':image');
        	imageNode.setAttribute('src', src);
        	imageNode.style.borderStyle = 'none';
        }
		else
		{
			imageNode = document.createElement('img');
			imageNode.setAttribute('src', src);
			imageNode.setAttribute('border', '0');
		}
		
		return imageNode;
	},

	/**
	 * Function: sortCells
	 * 
	 * Sorts the given cells according to the order in the cell hierarchy.
	 * Ascending is optional and defaults to true.
	 */
	sortCells: function(cells, ascending)
	{
		ascending = (ascending != null) ? ascending : true;
		var lookup = new mxDictionary();
		cells.sort(function(o1, o2)
		{
			var p1 = lookup.get(o1);
			
			if (p1 == null)
			{
				p1 = mxCellPath.create(o1).split(mxCellPath.PATH_SEPARATOR);
				lookup.put(o1, p1);
			}
			
			var p2 = lookup.get(o2);
			
			if (p2 == null)
			{
				p2 = mxCellPath.create(o2).split(mxCellPath.PATH_SEPARATOR);
				lookup.put(o2, p2);
			}
			
			var comp = mxCellPath.compare(p1, p2);
			
			return (comp == 0) ? 0 : (((comp > 0) == ascending) ? 1 : -1);
		});
		
		return cells;
	},

	/**
	 * Function: getStylename
	 * 
	 * Returns the stylename in a style of the form [(stylename|key=value);] or
	 * an empty string if the given style does not contain a stylename.
	 * 
	 * Parameters:
	 * 
	 * style - String of the form [(stylename|key=value);].
	 */
	getStylename: function(style)
	{
		if (style != null)
		{
			var pairs = style.split(';');
			var stylename = pairs[0];
			
			if (stylename.indexOf('=') < 0)
			{
				return stylename;
			}
		}
				
		return '';
	},

	/**
	 * Function: getStylenames
	 * 
	 * Returns the stylenames in a style of the form [(stylename|key=value);]
	 * or an empty array if the given style does not contain any stylenames.
	 * 
	 * Parameters:
	 * 
	 * style - String of the form [(stylename|key=value);].
	 */
	getStylenames: function(style)
	{
		var result = [];
		
		if (style != null)
		{
			var pairs = style.split(';');
			
			for (var i = 0; i < pairs.length; i++)
			{
				if (pairs[i].indexOf('=') < 0)
				{
					result.push(pairs[i]);
				}
			}
		}
				
		return result;
	},

	/**
	 * Function: indexOfStylename
	 * 
	 * Returns the index of the given stylename in the given style. This
	 * returns -1 if the given stylename does not occur (as a stylename) in the
	 * given style, otherwise it returns the index of the first character.
	 */
	indexOfStylename: function(style, stylename)
	{
		if (style != null && stylename != null)
		{
			var tokens = style.split(';');
			var pos = 0;
			
			for (var i = 0; i < tokens.length; i++)
			{
				if (tokens[i] == stylename)
				{
					return pos;
				}
				
				pos += tokens[i].length + 1;
			}
		}

		return -1;
	},
	
	/**
	 * Function: addStylename
	 * 
	 * Adds the specified stylename to the given style if it does not already
	 * contain the stylename.
	 */
	addStylename: function(style, stylename)
	{
		if (mxUtils.indexOfStylename(style, stylename) < 0)
		{
			if (style == null)
			{
				style = '';
			}
			else if (style.length > 0 && style.charAt(style.length - 1) != ';')
			{
				style += ';';
			}
			
			style += stylename;
		}
		
		return style;
	},
	
	/**
	 * Function: removeStylename
	 * 
	 * Removes all occurrences of the specified stylename in the given style
	 * and returns the updated style. Trailing semicolons are not preserved.
	 */
	removeStylename: function(style, stylename)
	{
		var result = [];
		
		if (style != null)
		{
			var tokens = style.split(';');
			
			for (var i = 0; i < tokens.length; i++)
			{
				if (tokens[i] != stylename)
				{
					result.push(tokens[i]);
				}
			}
		}
		
		return result.join(';');
	},
	
	/**
	 * Function: removeAllStylenames
	 * 
	 * Removes all stylenames from the given style and returns the updated
	 * style.
	 */
	removeAllStylenames: function(style)
	{
		var result = [];
		
		if (style != null)
		{
			var tokens = style.split(';');
			
			for (var i = 0; i < tokens.length; i++)
			{
				// Keeps the key, value assignments
				if (tokens[i].indexOf('=') >= 0)
				{
					result.push(tokens[i]);
				}
			}
		}
		
		return result.join(';');
	},

	/**
	 * Function: setCellStyles
	 * 
	 * Assigns the value for the given key in the styles of the given cells, or
	 * removes the key from the styles if the value is null.
	 * 
	 * Parameters:
	 * 
	 * model - <mxGraphModel> to execute the transaction in.
	 * cells - Array of <mxCells> to be updated.
	 * key - Key of the style to be changed.
	 * value - New value for the given key.
	 */
	setCellStyles: function(model, cells, key, value)
	{
		if (cells != null && cells.length > 0)
		{
			model.beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					if (cells[i] != null)
					{
						var style = mxUtils.setStyle(model.getStyle(cells[i]), key, value);
						model.setStyle(cells[i], style);
					}
				}
			}
			finally
			{
				model.endUpdate();
			}
		}
	},
	
	/**
	 * Function: setStyle
	 * 
	 * Adds or removes the given key, value pair to the style and returns the
	 * new style. If value is null or zero length then the key is removed from
	 * the style. This is for cell styles, not for CSS styles.
	 * 
	 * Parameters:
	 * 
	 * style - String of the form [(stylename|key=value);].
	 * key - Key of the style to be changed.
	 * value - New value for the given key.
	 */
	setStyle: function(style, key, value)
	{
		var isValue = value != null && (typeof(value.length) == 'undefined' || value.length > 0);
		
		if (style == null || style.length == 0)
		{
			if (isValue)
			{
				style = key + '=' + value + ';';
			}
		}
		else
		{
			if (style.substring(0, key.length + 1) == key + '=')
			{
				var next = style.indexOf(';');
				
				if (isValue)
				{
					style = key + '=' + value + ((next < 0) ? ';' : style.substring(next));
				}
				else
				{
					style = (next < 0 || next == style.length - 1) ? '' : style.substring(next + 1);
				}
			}
			else
			{
				var index = style.indexOf(';' + key + '=');
				
				if (index < 0)
				{
					if (isValue)
					{
						var sep = (style.charAt(style.length - 1) == ';') ? '' : ';';
						style = style + sep + key + '=' + value + ';';
					}
				}
				else
				{
					var next = style.indexOf(';', index + 1);
					
					if (isValue)
					{
						style = style.substring(0, index + 1) + key + '=' + value + ((next < 0) ? ';' : style.substring(next));
					}
					else
					{
						style = style.substring(0, index) + ((next < 0) ? ';' : style.substring(next));
					}
				}
			}
		}
		
		return style;
	},

	/**
	 * Function: setCellStyleFlags
	 * 
	 * Sets or toggles the flag bit for the given key in the cell's styles.
	 * If value is null then the flag is toggled.
	 * 
	 * Example:
	 * 
	 * (code)
	 * var cells = graph.getSelectionCells();
	 * mxUtils.setCellStyleFlags(graph.model,
	 * 			cells,
	 * 			mxConstants.STYLE_FONTSTYLE,
	 * 			mxConstants.FONT_BOLD);
	 * (end)
	 * 
	 * Toggles the bold font style.
	 * 
	 * Parameters:
	 * 
	 * model - <mxGraphModel> that contains the cells.
	 * cells - Array of <mxCells> to change the style for.
	 * key - Key of the style to be changed.
	 * flag - Integer for the bit to be changed.
	 * value - Optional boolean value for the flag.
	 */
	setCellStyleFlags: function(model, cells, key, flag, value)
	{
		if (cells != null && cells.length > 0)
		{
			model.beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					if (cells[i] != null)
					{
						var style = mxUtils.setStyleFlag(
							model.getStyle(cells[i]),
							key, flag, value);
						model.setStyle(cells[i], style);
					}
				}
			}
			finally
			{
				model.endUpdate();
			}
		}
	},
	
	/**
	 * Function: setStyleFlag
	 * 
	 * Sets or removes the given key from the specified style and returns the
	 * new style. If value is null then the flag is toggled.
	 * 
	 * Parameters:
	 * 
	 * style - String of the form [(stylename|key=value);].
	 * key - Key of the style to be changed.
	 * flag - Integer for the bit to be changed.
	 * value - Optional boolean value for the given flag.
	 */
	setStyleFlag: function(style, key, flag, value)
	{
		if (style == null || style.length == 0)
		{
			if (value || value == null)
			{
				style = key+'='+flag;
			}
			else
			{
				style = key+'=0';
			}
		}
		else
		{
			var index = style.indexOf(key+'=');
			
			if (index < 0)
			{
				var sep = (style.charAt(style.length-1) == ';') ? '' : ';';

				if (value || value == null)
				{
					style = style + sep + key + '=' + flag;
				}
				else
				{
					style = style + sep + key + '=0';
				}
			}
			else
			{
				var cont = style.indexOf(';', index);
				var tmp = '';
				
				if (cont < 0)
				{
					tmp  = style.substring(index+key.length+1);
				}
				else
				{
					tmp = style.substring(index+key.length+1, cont);
				}
				
				if (value == null)
				{
					tmp = parseInt(tmp) ^ flag;
				}
				else if (value)
				{
					tmp = parseInt(tmp) | flag;
				}
				else
				{
					tmp = parseInt(tmp) & ~flag;
				}
				
				style = style.substring(0, index) + key + '=' + tmp +
					((cont >= 0) ? style.substring(cont) : '');
			}
		}
		
		return style;
	},
	
	/**
	 * Function: getAlignmentAsPoint
	 * 
	 * Returns an <mxPoint> that represents the horizontal and vertical alignment
	 * for numeric computations. X is -0.5 for center, -1 for right and 0 for
	 * left alignment. Y is -0.5 for middle, -1 for bottom and 0 for top
	 * alignment. Default values for missing arguments is top, left.
	 */
	getAlignmentAsPoint: function(align, valign)
	{
		var dx = 0;
		var dy = 0;
		
		// Horizontal alignment
		if (align == mxConstants.ALIGN_CENTER)
		{
			dx = -0.5;
		}
		else if (align == mxConstants.ALIGN_RIGHT)
		{
			dx = -1;
		}

		// Vertical alignment
		if (valign == mxConstants.ALIGN_MIDDLE)
		{
			dy = -0.5;
		}
		else if (valign == mxConstants.ALIGN_BOTTOM)
		{
			dy = -1;
		}
		
		return new mxPoint(dx, dy);
	},
	
	/**
	 * Function: getSizeForString
	 * 
	 * Returns an <mxRectangle> with the size (width and height in pixels) of
	 * the given string. The string may contain HTML markup. Newlines should be
	 * converted to <br> before calling this method. The caller is responsible
	 * for sanitizing the HTML markup.
	 * 
	 * Example:
	 * 
	 * (code)
	 * var label = graph.getLabel(cell).replace(/\n/g, "<br>");
	 * var size = graph.getSizeForString(label);
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * text - String whose size should be returned.
	 * fontSize - Integer that specifies the font size in pixels. Default is
	 * <mxConstants.DEFAULT_FONTSIZE>.
	 * fontFamily - String that specifies the name of the font family. Default
	 * is <mxConstants.DEFAULT_FONTFAMILY>.
	 * textWidth - Optional width for text wrapping.
	 */
	getSizeForString: function(text, fontSize, fontFamily, textWidth)
	{
		fontSize = (fontSize != null) ? fontSize : mxConstants.DEFAULT_FONTSIZE;
		fontFamily = (fontFamily != null) ? fontFamily : mxConstants.DEFAULT_FONTFAMILY;
		var div = document.createElement('div');
		
		// Sets the font size and family
		div.style.fontFamily = fontFamily;
		div.style.fontSize = Math.round(fontSize) + 'px';
		div.style.lineHeight = Math.round(fontSize * mxConstants.LINE_HEIGHT) + 'px';
		
		// Disables block layout and outside wrapping and hides the div
		div.style.position = 'absolute';
		div.style.visibility = 'hidden';
		div.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
		div.style.zoom = '1';
		
		if (textWidth != null)
		{
			div.style.width = textWidth + 'px';
			div.style.whiteSpace = 'normal';
		}
		else
		{
			div.style.whiteSpace = 'nowrap';
		}
		
		// Adds the text and inserts into DOM for updating of size
		div.innerHTML = text;
		document.body.appendChild(div);
		
		// Gets the size and removes from DOM
		var size = new mxRectangle(0, 0, div.offsetWidth, div.offsetHeight);
		document.body.removeChild(div);
		
		return size;
	},
	
	/**
	 * Function: getViewXml
	 */
	getViewXml: function(graph, scale, cells, x0, y0)
	{
		x0 = (x0 != null) ? x0 : 0;
		y0 = (y0 != null) ? y0 : 0;
		scale = (scale != null) ? scale : 1;

		if (cells == null)
		{
			var model = graph.getModel();
			cells = [model.getRoot()];
		}
		
		var view = graph.getView();
		var result = null;

		// Disables events on the view
		var eventsEnabled = view.isEventsEnabled();
		view.setEventsEnabled(false);

		// Workaround for label bounds not taken into account for image export.
		// Creates a temporary draw pane which is used for rendering the text.
		// Text rendering is required for finding the bounds of the labels.
		var drawPane = view.drawPane;
		var overlayPane = view.overlayPane;

		if (graph.dialect == mxConstants.DIALECT_SVG)
		{
			view.drawPane = document.createElementNS(mxConstants.NS_SVG, 'g');
			view.canvas.appendChild(view.drawPane);

			// Redirects cell overlays into temporary container
			view.overlayPane = document.createElementNS(mxConstants.NS_SVG, 'g');
			view.canvas.appendChild(view.overlayPane);
		}
		else
		{
			view.drawPane = view.drawPane.cloneNode(false);
			view.canvas.appendChild(view.drawPane);
			
			// Redirects cell overlays into temporary container
			view.overlayPane = view.overlayPane.cloneNode(false);
			view.canvas.appendChild(view.overlayPane);
		}

		// Resets the translation
		var translate = view.getTranslate();
		view.translate = new mxPoint(x0, y0);

		// Creates the temporary cell states in the view
		var temp = new mxTemporaryCellStates(graph.getView(), scale, cells);

		try
		{
			var enc = new mxCodec();
			result = enc.encode(graph.getView());
		}
		finally
		{
			temp.destroy();
			view.translate = translate;
			view.canvas.removeChild(view.drawPane);
			view.canvas.removeChild(view.overlayPane);
			view.drawPane = drawPane;
			view.overlayPane = overlayPane;
			view.setEventsEnabled(eventsEnabled);
		}

		return result;
	},
	
	/**
	 * Function: getScaleForPageCount
	 * 
	 * Returns the scale to be used for printing the graph with the given
	 * bounds across the specifies number of pages with the given format. The
	 * scale is always computed such that it given the given amount or fewer
	 * pages in the print output. See <mxPrintPreview> for an example.
	 * 
	 * Parameters:
	 * 
	 * pageCount - Specifies the number of pages in the print output.
	 * graph - <mxGraph> that should be printed.
	 * pageFormat - Optional <mxRectangle> that specifies the page format.
	 * Default is <mxConstants.PAGE_FORMAT_A4_PORTRAIT>.
	 * border - The border along each side of every page.
	 */
	getScaleForPageCount: function(pageCount, graph, pageFormat, border)
	{
		if (pageCount < 1)
		{
			// We can't work with less than 1 page, return no scale
			// change
			return 1;
		}
		
		pageFormat = (pageFormat != null) ? pageFormat : mxConstants.PAGE_FORMAT_A4_PORTRAIT;
		border = (border != null) ? border : 0;
		
		var availablePageWidth = pageFormat.width - (border * 2);
		var availablePageHeight = pageFormat.height - (border * 2);

		// Work out the number of pages required if the
		// graph is not scaled.
		var graphBounds = graph.getGraphBounds().clone();
		var sc = graph.getView().getScale();
		graphBounds.width /= sc;
		graphBounds.height /= sc;
		var graphWidth = graphBounds.width;
		var graphHeight = graphBounds.height;

		var scale = 1;
		
		// The ratio of the width/height for each printer page
		var pageFormatAspectRatio = availablePageWidth / availablePageHeight;
		// The ratio of the width/height for the graph to be printer
		var graphAspectRatio = graphWidth / graphHeight;
		
		// The ratio of horizontal pages / vertical pages for this 
		// graph to maintain its aspect ratio on this page format
		var pagesAspectRatio = graphAspectRatio / pageFormatAspectRatio;
		
		// Factor the square root of the page count up and down 
		// by the pages aspect ratio to obtain a horizontal and 
		// vertical page count that adds up to the page count
		// and has the correct aspect ratio
		var pageRoot = Math.sqrt(pageCount);
		var pagesAspectRatioSqrt = Math.sqrt(pagesAspectRatio);
		var numRowPages = pageRoot * pagesAspectRatioSqrt;
		var numColumnPages = pageRoot / pagesAspectRatioSqrt;

		// These value are rarely more than 2 rounding downs away from
		// a total that meets the page count. In cases of one being less 
		// than 1 page, the other value can be too high and take more iterations 
		// In this case, just change that value to be the page count, since 
		// we know the other value is 1
		if (numRowPages < 1 && numColumnPages > pageCount)
		{
			var scaleChange = numColumnPages / pageCount;
			numColumnPages = pageCount;
			numRowPages /= scaleChange;
		}
		
		if (numColumnPages < 1 && numRowPages > pageCount)
		{
			var scaleChange = numRowPages / pageCount;
			numRowPages = pageCount;
			numColumnPages /= scaleChange;
		}		

		var currentTotalPages = Math.ceil(numRowPages) * Math.ceil(numColumnPages);

		var numLoops = 0;
		
		// Iterate through while the rounded up number of pages comes to
		// a total greater than the required number
		while (currentTotalPages > pageCount)
		{
			// Round down the page count (rows or columns) that is
			// closest to its next integer down in percentage terms.
			// i.e. Reduce the page total by reducing the total
			// page area by the least possible amount

			var roundRowDownProportion = Math.floor(numRowPages) / numRowPages;
			var roundColumnDownProportion = Math.floor(numColumnPages) / numColumnPages;
			
			// If the round down proportion is, work out the proportion to
			// round down to 1 page less
			if (roundRowDownProportion == 1)
			{
				roundRowDownProportion = Math.floor(numRowPages-1) / numRowPages;
			}
			if (roundColumnDownProportion == 1)
			{
				roundColumnDownProportion = Math.floor(numColumnPages-1) / numColumnPages;
			}
			
			// Check which rounding down is smaller, but in the case of very small roundings
			// try the other dimension instead
			var scaleChange = 1;
			
			// Use the higher of the two values
			if (roundRowDownProportion > roundColumnDownProportion)
			{
				scaleChange = roundRowDownProportion;
			}
			else
			{
				scaleChange = roundColumnDownProportion;
			}

			numRowPages = numRowPages * scaleChange;
			numColumnPages = numColumnPages * scaleChange;
			currentTotalPages = Math.ceil(numRowPages) * Math.ceil(numColumnPages);
			
			numLoops++;
			
			if (numLoops > 10)
			{
				break;
			}
		}

		// Work out the scale from the number of row pages required
		// The column pages will give the same value
		var posterWidth = availablePageWidth * numRowPages;
		scale = posterWidth / graphWidth;
		
		// Allow for rounding errors
		return scale * 0.99999;
	},
	
	/**
	 * Function: show
	 * 
	 * Copies the styles and the markup from the graph's container into the
	 * given document and removes all cursor styles. The document is returned.
	 * 
	 * This function should be called from within the document with the graph.
	 * If you experience problems with missing stylesheets in IE then try adding
	 * the domain to the trusted sites.
	 * 
	 * Parameters:
	 * 
	 * graph - <mxGraph> to be copied.
	 * doc - Document where the new graph is created.
	 * x0 - X-coordinate of the graph view origin. Default is 0.
	 * y0 - Y-coordinate of the graph view origin. Default is 0.
	 * w - Optional width of the graph view.
	 * h - Optional height of the graph view.
	 */
	show: function(graph, doc, x0, y0, w, h)
	{
		x0 = (x0 != null) ? x0 : 0;
		y0 = (y0 != null) ? y0 : 0;
		
		if (doc == null)
		{
			var wnd = window.open();
			doc = wnd.document;
		}
		else
		{
			doc.open();
		}

		// Workaround for missing print output in IE9 standards
		if (document.documentMode == 9)
		{
			doc.writeln('<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=9"><![endif]-->');
		}
		
		var bounds = graph.getGraphBounds();
		var dx = Math.ceil(x0 - bounds.x);
		var dy = Math.ceil(y0 - bounds.y);
		
		if (w == null)
		{
			w = Math.ceil(bounds.width + x0) + Math.ceil(Math.ceil(bounds.x) - bounds.x);
		}
		
		if (h == null)
		{
			h = Math.ceil(bounds.height + y0) + Math.ceil(Math.ceil(bounds.y) - bounds.y);
		}
		
		// Needs a special way of creating the page so that no click is required
		// to refresh the contents after the external CSS styles have been loaded.
		// To avoid a click or programmatic refresh, the styleSheets[].cssText
		// property is copied over from the original document.
		if (mxClient.IS_IE || document.documentMode == 11)
		{
			var html = '<html><head>';

			var base = document.getElementsByTagName('base');
			
			for (var i = 0; i < base.length; i++)
			{
				html += base[i].outerHTML;
			}

			html += '<style>';

			// Copies the stylesheets without having to load them again
			for (var i = 0; i < document.styleSheets.length; i++)
			{
				try
				{
					html += document.styleSheets(i).cssText;
				}
				catch (e)
				{
					// ignore security exception
				}
			}

			html += '</style></head><body style="margin:0px;">';
			
			// Copies the contents of the graph container
			html += '<div style="position:absolute;overflow:hidden;width:' + w + 'px;height:' + h + 'px;"><div style="position:relative;left:' + dx + 'px;top:' + dy + 'px;">';
			html += graph.container.innerHTML;
			html += '</div></div></body><html>';

			doc.writeln(html);
			doc.close();
		}
		else
		{
			doc.writeln('<html><head>');
			
			var base = document.getElementsByTagName('base');
			
			for (var i = 0; i < base.length; i++)
			{
				doc.writeln(mxUtils.getOuterHtml(base[i]));
			}
			
			var links = document.getElementsByTagName('link');
			
			for (var i = 0; i < links.length; i++)
			{
				doc.writeln(mxUtils.getOuterHtml(links[i]));
			}
	
			var styles = document.getElementsByTagName('style');
			
			for (var i = 0; i < styles.length; i++)
			{
				doc.writeln(mxUtils.getOuterHtml(styles[i]));
			}

			doc.writeln('</head><body style="margin:0px;"></body></html>');
			doc.close();

			var outer = doc.createElement('div');
			outer.position = 'absolute';
			outer.overflow = 'hidden';
			outer.style.width = w + 'px';
			outer.style.height = h + 'px';

			// Required for HTML labels if foreignObjects are disabled
			var div = doc.createElement('div');
			div.style.position = 'absolute';
			div.style.left = dx + 'px';
			div.style.top = dy + 'px';

			var node = graph.container.firstChild;
			var svg = null;
			
			while (node != null)
			{
				var clone = node.cloneNode(true);
				
				if (node == graph.view.drawPane.ownerSVGElement)
				{
					outer.appendChild(clone);
					svg = clone;
				}
				else
				{
					div.appendChild(clone);
				}
				
				node = node.nextSibling;
			}

			doc.body.appendChild(outer);
			
			if (div.firstChild != null)
			{
				doc.body.appendChild(div);
			}
						
			if (svg != null)
			{
				svg.style.minWidth = '';
				svg.style.minHeight = '';
				svg.firstChild.setAttribute('transform', 'translate(' + dx + ',' + dy + ')');
			}
		}
		
		mxUtils.removeCursors(doc.body);
	
		return doc;
	},
	
	/**
	 * Function: printScreen
	 * 
	 * Prints the specified graph using a new window and the built-in print
	 * dialog.
	 * 
	 * This function should be called from within the document with the graph.
	 * 
	 * Parameters:
	 * 
	 * graph - <mxGraph> to be printed.
	 */
	printScreen: function(graph)
	{
		var wnd = window.open();
		var bounds = graph.getGraphBounds();
		mxUtils.show(graph, wnd.document);
		
		var print = function()
		{
			wnd.focus();
			wnd.print();
			wnd.close();
		};
		
		// Workaround for Google Chrome which needs a bit of a
		// delay in order to render the SVG contents
		if (mxClient.IS_GC)
		{
			wnd.setTimeout(print, 500);
		}
		else
		{
			print();
		}
	},
	
	/**
	 * Function: popup
	 * 
	 * Shows the specified text content in a new <mxWindow> or a new browser
	 * window if isInternalWindow is false.
	 * 
	 * Parameters:
	 * 
	 * content - String that specifies the text to be displayed.
	 * isInternalWindow - Optional boolean indicating if an mxWindow should be
	 * used instead of a new browser window. Default is false.
	 */
	popup: function(content, isInternalWindow)
	{
	   	if (isInternalWindow)
	   	{
			var div = document.createElement('div');
			
			div.style.overflow = 'scroll';
			div.style.width = '636px';
			div.style.height = '460px';
			
			var pre = document.createElement('pre');
		    pre.innerHTML = mxUtils.htmlEntities(content, false).
		    	replace(/\n/g,'<br>').replace(/ /g, '&nbsp;');
			
			div.appendChild(pre);
			
			var w = document.body.clientWidth;
			var h = Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight)
			var wnd = new mxWindow('Popup Window', div,
				w/2-320, h/2-240, 640, 480, false, true);

			wnd.setClosable(true);
			wnd.setVisible(true);
		}
		else
		{
			// Wraps up the XML content in a textarea
			if (mxClient.IS_NS)
			{
			    var wnd = window.open();
				wnd.document.writeln('<pre>'+mxUtils.htmlEntities(content)+'</pre');
			   	wnd.document.close();
			}
			else
			{
			    var wnd = window.open();
			    var pre = wnd.document.createElement('pre');
			    pre.innerHTML = mxUtils.htmlEntities(content, false).
			    	replace(/\n/g,'<br>').replace(/ /g, '&nbsp;');
			   	wnd.document.body.appendChild(pre);
			}
	   	}
	},
	
	/**
	 * Function: alert
	 * 
	 * Displayss the given alert in a new dialog. This implementation uses the
	 * built-in alert function. This is used to display validation errors when
	 * connections cannot be changed or created.
	 * 
	 * Parameters:
	 * 
	 * message - String specifying the message to be displayed.
	 */
	alert: function(message)
	{
		alert(message);
	},
	
	/**
	 * Function: prompt
	 * 
	 * Displays the given message in a prompt dialog. This implementation uses
	 * the built-in prompt function.
	 * 
	 * Parameters:
	 * 
	 * message - String specifying the message to be displayed.
	 * defaultValue - Optional string specifying the default value.
	 */
	prompt: function(message, defaultValue)
	{
		return prompt(message, (defaultValue != null) ? defaultValue : '');
	},
	
	/**
	 * Function: confirm
	 * 
	 * Displays the given message in a confirm dialog. This implementation uses
	 * the built-in confirm function.
	 * 
	 * Parameters:
	 * 
	 * message - String specifying the message to be displayed.
	 */
	confirm: function(message)
	{
		return confirm(message);
	},

	/**
	 * Function: error
	 * 
	 * Displays the given error message in a new <mxWindow> of the given width.
	 * If close is true then an additional close button is added to the window.
	 * The optional icon specifies the icon to be used for the window. Default
	 * is <mxUtils.errorImage>.
	 * 
	 * Parameters:
	 * 
	 * message - String specifying the message to be displayed.
	 * width - Integer specifying the width of the window.
	 * close - Optional boolean indicating whether to add a close button.
	 * icon - Optional icon for the window decoration.
	 */
	error: function(message, width, close, icon)
	{
		var div = document.createElement('div');
		div.style.padding = '20px';

		var img = document.createElement('img');
		img.setAttribute('src', icon || mxUtils.errorImage);
		img.setAttribute('valign', 'bottom');
		img.style.verticalAlign = 'middle';
		div.appendChild(img);

		div.appendChild(document.createTextNode('\u00a0')); // &nbsp;
		div.appendChild(document.createTextNode('\u00a0')); // &nbsp;
		div.appendChild(document.createTextNode('\u00a0')); // &nbsp;
		mxUtils.write(div, message);

		var w = document.body.clientWidth;
		var h = (document.body.clientHeight || document.documentElement.clientHeight);
		var warn = new mxWindow(mxResources.get(mxUtils.errorResource) ||
			mxUtils.errorResource, div, (w-width)/2, h/4, width, null,
			false, true);

		if (close)
		{
			mxUtils.br(div);
			
			var tmp = document.createElement('p');
			var button = document.createElement('button');

			if (mxClient.IS_IE)
			{
				button.style.cssText = 'float:right';
			}
			else
			{
				button.setAttribute('style', 'float:right');
			}

			mxEvent.addListener(button, 'click', function(evt)
			{
				warn.destroy();
			});

			mxUtils.write(button, mxResources.get(mxUtils.closeResource) ||
				mxUtils.closeResource);
			
			tmp.appendChild(button);
			div.appendChild(tmp);
			
			mxUtils.br(div);
			
			warn.setClosable(true);
		}
		
		warn.setVisible(true);
		
		return warn;
	},

	/**
	 * Function: makeDraggable
	 * 
	 * Configures the given DOM element to act as a drag source for the
	 * specified graph. Returns a a new <mxDragSource>. If
	 * <mxDragSource.guideEnabled> is enabled then the x and y arguments must
	 * be used in funct to match the preview location.
	 * 
	 * Example:
	 * 
	 * (code)
	 * var funct = function(graph, evt, cell, x, y)
	 * {
	 *   if (graph.canImportCell(cell))
	 *   {
	 *     var parent = graph.getDefaultParent();
	 *     var vertex = null;
	 *     
	 *     graph.getModel().beginUpdate();
	 *     try
	 *     {
	 * 	     vertex = graph.insertVertex(parent, null, 'Hello', x, y, 80, 30);
	 *     }
	 *     finally
	 *     {
	 *       graph.getModel().endUpdate();
	 *     }
	 *
	 *     graph.setSelectionCell(vertex);
	 *   }
	 * }
	 * 
	 * var img = document.createElement('img');
	 * img.setAttribute('src', 'editors/images/rectangle.gif');
	 * img.style.position = 'absolute';
	 * img.style.left = '0px';
	 * img.style.top = '0px';
	 * img.style.width = '16px';
	 * img.style.height = '16px';
	 * 
	 * var dragImage = img.cloneNode(true);
	 * dragImage.style.width = '32px';
	 * dragImage.style.height = '32px';
	 * mxUtils.makeDraggable(img, graph, funct, dragImage);
	 * document.body.appendChild(img);
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * element - DOM element to make draggable.
	 * graphF - <mxGraph> that acts as the drop target or a function that takes a
	 * mouse event and returns the current <mxGraph>.
	 * funct - Function to execute on a successful drop.
	 * dragElement - Optional DOM node to be used for the drag preview.
	 * dx - Optional horizontal offset between the cursor and the drag
	 * preview.
	 * dy - Optional vertical offset between the cursor and the drag
	 * preview.
	 * autoscroll - Optional boolean that specifies if autoscroll should be
	 * used. Default is mxGraph.autoscroll.
	 * scalePreview - Optional boolean that specifies if the preview element
	 * should be scaled according to the graph scale. If this is true, then
	 * the offsets will also be scaled. Default is false.
	 * highlightDropTargets - Optional boolean that specifies if dropTargets
	 * should be highlighted. Default is true.
	 * getDropTarget - Optional function to return the drop target for a given
	 * location (x, y). Default is mxGraph.getCellAt.
	 */
	makeDraggable: function(element, graphF, funct, dragElement, dx, dy, autoscroll,
			scalePreview, highlightDropTargets, getDropTarget)
	{
		var dragSource = new mxDragSource(element, funct);
		dragSource.dragOffset = new mxPoint((dx != null) ? dx : 0,
			(dy != null) ? dy : mxConstants.TOOLTIP_VERTICAL_OFFSET);
		dragSource.autoscroll = autoscroll;
		
		// Cannot enable this by default. This needs to be enabled in the caller
		// if the funct argument uses the new x- and y-arguments.
		dragSource.setGuidesEnabled(false);
		
		if (highlightDropTargets != null)
		{
			dragSource.highlightDropTargets = highlightDropTargets;
		}
		
		// Overrides function to find drop target cell
		if (getDropTarget != null)
		{
			dragSource.getDropTarget = getDropTarget;
		}
		
		// Overrides function to get current graph
		dragSource.getGraphForEvent = function(evt)
		{
			return (typeof(graphF) == 'function') ? graphF(evt) : graphF;
		};
		
		// Translates switches into dragSource customizations
		if (dragElement != null)
		{
			dragSource.createDragElement = function()
			{
				return dragElement.cloneNode(true);
			};
			
			if (scalePreview)
			{
				dragSource.createPreviewElement = function(graph)
				{
					var elt = dragElement.cloneNode(true);

					var w = parseInt(elt.style.width);
					var h = parseInt(elt.style.height);
					elt.style.width = Math.round(w * graph.view.scale) + 'px';
					elt.style.height = Math.round(h * graph.view.scale) + 'px';
					
					return elt;
				};
			}
		}
		
		return dragSource;
	}

};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
 var mxConstants =
 {
	/**
	 * Class: mxConstants
	 * 
	 * Defines various global constants.
	 * 
	 * Variable: DEFAULT_HOTSPOT
	 * 
	 * Defines the portion of the cell which is to be used as a connectable
	 * region. Default is 0.3. Possible values are 0 < x <= 1. 
	 */
	DEFAULT_HOTSPOT: 0.3,

	/**
	 * Variable: MIN_HOTSPOT_SIZE
	 * 
	 * Defines the minimum size in pixels of the portion of the cell which is
	 * to be used as a connectable region. Default is 8.
	 */
	MIN_HOTSPOT_SIZE: 8,

	/**
	 * Variable: MAX_HOTSPOT_SIZE
	 * 
	 * Defines the maximum size in pixels of the portion of the cell which is
	 * to be used as a connectable region. Use 0 for no maximum. Default is 0.
	 */
	MAX_HOTSPOT_SIZE: 0,

	/**
	 * Variable: RENDERING_HINT_EXACT
	 * 
	 * Defines the exact rendering hint.
	 */
	RENDERING_HINT_EXACT: 'exact',

	/**
	 * Variable: RENDERING_HINT_FASTER
	 * 
	 * Defines the faster rendering hint.
	 */
	RENDERING_HINT_FASTER: 'faster',

	/**
	 * Variable: RENDERING_HINT_FASTEST
	 * 
	 * Defines the fastest rendering hint.
	 */
	RENDERING_HINT_FASTEST: 'fastest',

	/**
	 * Variable: DIALECT_SVG
	 * 
	 * Defines the SVG display dialect name.
	 */
	DIALECT_SVG: 'svg',

	/**
	 * Variable: DIALECT_VML
	 * 
	 * Defines the VML display dialect name.
	 */
	DIALECT_VML: 'vml',

	/**
	 * Variable: DIALECT_MIXEDHTML
	 * 
	 * Defines the mixed HTML display dialect name.
	 */
	DIALECT_MIXEDHTML: 'mixedHtml',

	/**
	 * Variable: DIALECT_PREFERHTML
	 * 
	 * Defines the preferred HTML display dialect name.
	 */
	DIALECT_PREFERHTML: 'preferHtml',

	/**
	 * Variable: DIALECT_STRICTHTML
	 * 
	 * Defines the strict HTML display dialect.
	 */
	DIALECT_STRICTHTML: 'strictHtml',

	/**
	 * Variable: NS_SVG
	 * 
	 * Defines the SVG namespace.
	 */
	NS_SVG: 'http://www.w3.org/2000/svg',

	/**
	 * Variable: NS_XHTML
	 * 
	 * Defines the XHTML namespace.
	 */
	NS_XHTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Variable: NS_XLINK
	 * 
	 * Defines the XLink namespace.
	 */
	NS_XLINK: 'http://www.w3.org/1999/xlink',

	/**
	 * Variable: SHADOWCOLOR
	 * 
	 * Defines the color to be used to draw shadows in shapes and windows.
	 * Default is gray.
	 */
	SHADOWCOLOR: 'gray',

	/**
	 * Variable: SHADOW_OFFSET_X
	 * 
	 * Specifies the x-offset of the shadow. Default is 2.
	 */
	SHADOW_OFFSET_X: 2,

	/**
	 * Variable: SHADOW_OFFSET_Y
	 * 
	 * Specifies the y-offset of the shadow. Default is 3.
	 */
	SHADOW_OFFSET_Y: 3,
	
	/**
	 * Variable: SHADOW_OPACITY
	 * 
	 * Defines the opacity for shadows. Default is 1.
	 */
	SHADOW_OPACITY: 1,
 
	/**
	 * Variable: NODETYPE_ELEMENT
	 * 
	 * DOM node of type ELEMENT.
	 */
	NODETYPE_ELEMENT: 1,

	/**
	 * Variable: NODETYPE_ATTRIBUTE
	 * 
	 * DOM node of type ATTRIBUTE.
	 */
	NODETYPE_ATTRIBUTE: 2,

	/**
	 * Variable: NODETYPE_TEXT
	 * 
	 * DOM node of type TEXT.
	 */
	NODETYPE_TEXT: 3,

	/**
	 * Variable: NODETYPE_CDATA
	 * 
	 * DOM node of type CDATA.
	 */
	NODETYPE_CDATA: 4,
	
	/**
	 * Variable: NODETYPE_ENTITY_REFERENCE
	 * 
	 * DOM node of type ENTITY_REFERENCE.
	 */
	NODETYPE_ENTITY_REFERENCE: 5,

	/**
	 * Variable: NODETYPE_ENTITY
	 * 
	 * DOM node of type ENTITY.
	 */
	NODETYPE_ENTITY: 6,

	/**
	 * Variable: NODETYPE_PROCESSING_INSTRUCTION
	 * 
	 * DOM node of type PROCESSING_INSTRUCTION.
	 */
	NODETYPE_PROCESSING_INSTRUCTION: 7,

	/**
	 * Variable: NODETYPE_COMMENT
	 * 
	 * DOM node of type COMMENT.
	 */
	NODETYPE_COMMENT: 8,
		
	/**
	 * Variable: NODETYPE_DOCUMENT
	 * 
	 * DOM node of type DOCUMENT.
	 */
	NODETYPE_DOCUMENT: 9,

	/**
	 * Variable: NODETYPE_DOCUMENTTYPE
	 * 
	 * DOM node of type DOCUMENTTYPE.
	 */
	NODETYPE_DOCUMENTTYPE: 10,

	/**
	 * Variable: NODETYPE_DOCUMENT_FRAGMENT
	 * 
	 * DOM node of type DOCUMENT_FRAGMENT.
	 */
	NODETYPE_DOCUMENT_FRAGMENT: 11,

	/**
	 * Variable: NODETYPE_NOTATION
	 * 
	 * DOM node of type NOTATION.
	 */
	NODETYPE_NOTATION: 12,
	
	/**
	 * Variable: TOOLTIP_VERTICAL_OFFSET
	 * 
	 * Defines the vertical offset for the tooltip.
	 * Default is 16.
	 */
	TOOLTIP_VERTICAL_OFFSET: 16,

	/**
	 * Variable: DEFAULT_VALID_COLOR
	 * 
	 * Specifies the default valid color. Default is #0000FF.
	 */
	DEFAULT_VALID_COLOR: '#00FF00',

	/**
	 * Variable: DEFAULT_INVALID_COLOR
	 * 
	 * Specifies the default invalid color. Default is #FF0000.
	 */
	DEFAULT_INVALID_COLOR: '#FF0000',

	/**
	 * Variable: OUTLINE_HIGHLIGHT_COLOR
	 * 
	 * Specifies the default highlight color for shape outlines.
	 * Default is #0000FF. This is used in <mxEdgeHandler>.
	 */
	OUTLINE_HIGHLIGHT_COLOR: '#00FF00',

	/**
	 * Variable: OUTLINE_HIGHLIGHT_COLOR
	 * 
	 * Defines the strokewidth to be used for shape outlines.
	 * Default is 5. This is used in <mxEdgeHandler>.
	 */
	OUTLINE_HIGHLIGHT_STROKEWIDTH: 5,

	/**
	 * Variable: HIGHLIGHT_STROKEWIDTH
	 * 
	 * Defines the strokewidth to be used for the highlights.
	 * Default is 3.
	 */
	HIGHLIGHT_STROKEWIDTH: 3,
	
	/**
	 * Variable: CURSOR_MOVABLE_VERTEX
	 * 
	 * Defines the cursor for a movable vertex. Default is 'move'.
	 */
	CURSOR_MOVABLE_VERTEX: 'move',
	
	/**
	 * Variable: CURSOR_MOVABLE_EDGE
	 * 
	 * Defines the cursor for a movable edge. Default is 'move'.
	 */
	CURSOR_MOVABLE_EDGE: 'move',
	
	/**
	 * Variable: CURSOR_LABEL_HANDLE
	 * 
	 * Defines the cursor for a movable label. Default is 'default'.
	 */
	CURSOR_LABEL_HANDLE: 'default',
	
	/**
	 * Variable: CURSOR_TERMINAL_HANDLE
	 * 
	 * Defines the cursor for a terminal handle. Default is 'pointer'.
	 */
	CURSOR_TERMINAL_HANDLE: 'pointer',
	
	/**
	 * Variable: CURSOR_BEND_HANDLE
	 * 
	 * Defines the cursor for a movable bend. Default is 'crosshair'.
	 */
	CURSOR_BEND_HANDLE: 'crosshair',

	/**
	 * Variable: CURSOR_VIRTUAL_BEND_HANDLE
	 * 
	 * Defines the cursor for a movable bend. Default is 'crosshair'.
	 */
	CURSOR_VIRTUAL_BEND_HANDLE: 'crosshair',
	
	/**
	 * Variable: CURSOR_CONNECT
	 * 
	 * Defines the cursor for a connectable state. Default is 'pointer'.
	 */
	CURSOR_CONNECT: 'pointer',

	/**
	 * Variable: HIGHLIGHT_COLOR
	 * 
	 * Defines the color to be used for the cell highlighting.
	 * Use 'none' for no color. Default is #00FF00.
	 */
	HIGHLIGHT_COLOR: '#00FF00',

	/**
	 * Variable: TARGET_HIGHLIGHT_COLOR
	 * 
	 * Defines the color to be used for highlighting a target cell for a new
	 * or changed connection. Note that this may be either a source or
	 * target terminal in the graph. Use 'none' for no color.
	 * Default is #0000FF.
	 */
	CONNECT_TARGET_COLOR: '#0000FF',

	/**
	 * Variable: INVALID_CONNECT_TARGET_COLOR
	 * 
	 * Defines the color to be used for highlighting a invalid target cells
	 * for a new or changed connections. Note that this may be either a source
	 * or target terminal in the graph. Use 'none' for no color. Default is
	 * #FF0000.
	 */
	INVALID_CONNECT_TARGET_COLOR: '#FF0000',

	/**
	 * Variable: DROP_TARGET_COLOR
	 * 
	 * Defines the color to be used for the highlighting target parent cells
	 * (for drag and drop). Use 'none' for no color. Default is #0000FF.
	 */
	DROP_TARGET_COLOR: '#0000FF',

	/**
	 * Variable: VALID_COLOR
	 * 
	 * Defines the color to be used for the coloring valid connection
	 * previews. Use 'none' for no color. Default is #FF0000.
	 */
	VALID_COLOR: '#00FF00',

	/**
	 * Variable: INVALID_COLOR
	 * 
	 * Defines the color to be used for the coloring invalid connection
	 * previews. Use 'none' for no color. Default is #FF0000.
	 */
	INVALID_COLOR: '#FF0000',

	/**
	 * Variable: EDGE_SELECTION_COLOR
	 * 
	 * Defines the color to be used for the selection border of edges. Use
	 * 'none' for no color. Default is #00FF00.
	 */
	EDGE_SELECTION_COLOR: '#00FF00',

	/**
	 * Variable: VERTEX_SELECTION_COLOR
	 * 
	 * Defines the color to be used for the selection border of vertices. Use
	 * 'none' for no color. Default is #00FF00.
	 */
	VERTEX_SELECTION_COLOR: '#00FF00',

	/**
	 * Variable: VERTEX_SELECTION_STROKEWIDTH
	 * 
	 * Defines the strokewidth to be used for vertex selections.
	 * Default is 1.
	 */
	VERTEX_SELECTION_STROKEWIDTH: 1,

	/**
	 * Variable: EDGE_SELECTION_STROKEWIDTH
	 * 
	 * Defines the strokewidth to be used for edge selections.
	 * Default is 1.
	 */
	EDGE_SELECTION_STROKEWIDTH: 1,

	/**
	 * Variable: SELECTION_DASHED
	 * 
	 * Defines the dashed state to be used for the vertex selection
	 * border. Default is true.
	 */
	VERTEX_SELECTION_DASHED: true,

	/**
	 * Variable: SELECTION_DASHED
	 * 
	 * Defines the dashed state to be used for the edge selection
	 * border. Default is true.
	 */
	EDGE_SELECTION_DASHED: true,

	/**
	 * Variable: GUIDE_COLOR
	 * 
	 * Defines the color to be used for the guidelines in mxGraphHandler.
	 * Default is #FF0000.
	 */
	GUIDE_COLOR: '#FF0000',

	/**
	 * Variable: GUIDE_STROKEWIDTH
	 * 
	 * Defines the strokewidth to be used for the guidelines in mxGraphHandler.
	 * Default is 1.
	 */
	GUIDE_STROKEWIDTH: 1,

	/**
	 * Variable: OUTLINE_COLOR
	 * 
	 * Defines the color to be used for the outline rectangle
	 * border.  Use 'none' for no color. Default is #0099FF.
	 */
	OUTLINE_COLOR: '#0099FF',

	/**
	 * Variable: OUTLINE_STROKEWIDTH
	 * 
	 * Defines the strokewidth to be used for the outline rectangle
	 * stroke width. Default is 3.
	 */
	OUTLINE_STROKEWIDTH: (mxClient.IS_IE) ? 2 : 3,

	/**
	 * Variable: HANDLE_SIZE
	 * 
	 * Defines the default size for handles. Default is 7.
	 */
	HANDLE_SIZE: 7,

	/**
	 * Variable: LABEL_HANDLE_SIZE
	 * 
	 * Defines the default size for label handles. Default is 4.
	 */
	LABEL_HANDLE_SIZE: 4,

	/**
	 * Variable: HANDLE_FILLCOLOR
	 * 
	 * Defines the color to be used for the handle fill color. Use 'none' for
	 * no color. Default is #00FF00 (green).
	 */
	HANDLE_FILLCOLOR: '#00FF00',

	/**
	 * Variable: HANDLE_STROKECOLOR
	 * 
	 * Defines the color to be used for the handle stroke color. Use 'none' for
	 * no color. Default is black.
	 */
	HANDLE_STROKECOLOR: 'black',

	/**
	 * Variable: LABEL_HANDLE_FILLCOLOR
	 * 
	 * Defines the color to be used for the label handle fill color. Use 'none'
	 * for no color. Default is yellow.
	 */
	LABEL_HANDLE_FILLCOLOR: 'yellow',

	/**
	 * Variable: CONNECT_HANDLE_FILLCOLOR
	 * 
	 * Defines the color to be used for the connect handle fill color. Use
	 * 'none' for no color. Default is #0000FF (blue).
	 */
	CONNECT_HANDLE_FILLCOLOR: '#0000FF',

	/**
	 * Variable: LOCKED_HANDLE_FILLCOLOR
	 * 
	 * Defines the color to be used for the locked handle fill color. Use
	 * 'none' for no color. Default is #FF0000 (red).
	 */
	LOCKED_HANDLE_FILLCOLOR: '#FF0000',

	/**
	 * Variable: OUTLINE_HANDLE_FILLCOLOR
	 * 
	 * Defines the color to be used for the outline sizer fill color. Use
	 * 'none' for no color. Default is #00FFFF.
	 */
	OUTLINE_HANDLE_FILLCOLOR: '#00FFFF',

	/**
	 * Variable: OUTLINE_HANDLE_STROKECOLOR
	 * 
	 * Defines the color to be used for the outline sizer stroke color. Use
	 * 'none' for no color. Default is #0033FF.
	 */
	OUTLINE_HANDLE_STROKECOLOR: '#0033FF',

	/**
	 * Variable: DEFAULT_FONTFAMILY
	 * 
	 * Defines the default family for all fonts in points. Default is
	 * Arial,Helvetica.
	 */
	DEFAULT_FONTFAMILY: 'Arial,Helvetica',

	/**
	 * Variable: DEFAULT_FONTSIZE
	 * 
	 * Defines the default size for all fonts in points. Default is 11.
	 */
	DEFAULT_FONTSIZE: 11,

	/**
	 * Variable: DEFAULT_TEXT_DIRECTION
	 * 
	 * Defines the default value for the <STYLE_TEXT_DIRECTION> if no value is
	 * defined for it in the style. Default value is an empty string which means
	 * the default system setting is used and no direction is set.
	 */
	DEFAULT_TEXT_DIRECTION: '',

	/**
	 * Variable: LINE_HEIGHT
	 * 
	 * Defines the default line height for text labels. Default is 1.2.
	 */
	LINE_HEIGHT: 1.2,

	/**
	 * Variable: ABSOLUTE_LINE_HEIGHT
	 * 
	 * Specifies if absolute line heights should be used (px) in CSS. Default
	 * is false. Set this to true for backwards compatibility.
	 */
	ABSOLUTE_LINE_HEIGHT: false,

	/**
	 * Variable: DEFAULT_FONTSTYLE
	 * 
	 * Defines the default style for all fonts. Default is 0. This can be set
	 * to any combination of font styles as follows.
	 * 
	 * (code)
	 * mxConstants.DEFAULT_FONTSTYLE = mxConstants.FONT_BOLD | mxConstants.FONT_ITALIC;
	 * (end)
	 */
	DEFAULT_FONTSTYLE: 0,

	/**
	 * Variable: DEFAULT_STARTSIZE
	 * 
	 * Defines the default start size for swimlanes. Default is 40.
	 */
	DEFAULT_STARTSIZE: 40,

	/**
	 * Variable: DEFAULT_MARKERSIZE
	 * 
	 * Defines the default size for all markers. Default is 6.
	 */
	DEFAULT_MARKERSIZE: 6,

	/**
	 * Variable: DEFAULT_IMAGESIZE
	 * 
	 * Defines the default width and height for images used in the
	 * label shape. Default is 24.
	 */
	DEFAULT_IMAGESIZE: 24,

	/**
	 * Variable: ENTITY_SEGMENT
	 * 
	 * Defines the length of the horizontal segment of an Entity Relation.
	 * This can be overridden using <mxConstants.STYLE_SEGMENT> style.
	 * Default is 30.
	 */
	ENTITY_SEGMENT: 30,

	/**
	 * Variable: RECTANGLE_ROUNDING_FACTOR
	 * 
	 * Defines the rounding factor for rounded rectangles in percent between
	 * 0 and 1. Values should be smaller than 0.5. Default is 0.15.
	 */
	RECTANGLE_ROUNDING_FACTOR: 0.15,

	/**
	 * Variable: LINE_ARCSIZE
	 * 
	 * Defines the size of the arcs for rounded edges. Default is 20.
	 */
	LINE_ARCSIZE: 20,

	/**
	 * Variable: ARROW_SPACING
	 * 
	 * Defines the spacing between the arrow shape and its terminals. Default
	 * is 10.
	 */
	ARROW_SPACING: 10,

	/**
	 * Variable: ARROW_WIDTH
	 * 
	 * Defines the width of the arrow shape. Default is 30.
	 */
	ARROW_WIDTH: 30,

	/**
	 * Variable: ARROW_SIZE
	 * 
	 * Defines the size of the arrowhead in the arrow shape. Default is 30.
	 */
	ARROW_SIZE: 30,

	/**
	 * Variable: PAGE_FORMAT_A4_PORTRAIT
	 * 
	 * Defines the rectangle for the A4 portrait page format. The dimensions
	 * of this page format are 826x1169 pixels.
	 */
	PAGE_FORMAT_A4_PORTRAIT: new mxRectangle(0, 0, 826, 1169),

	/**
	 * Variable: PAGE_FORMAT_A4_PORTRAIT
	 * 
	 * Defines the rectangle for the A4 portrait page format. The dimensions
	 * of this page format are 826x1169 pixels.
	 */
	PAGE_FORMAT_A4_LANDSCAPE: new mxRectangle(0, 0, 1169, 826),

	/**
	 * Variable: PAGE_FORMAT_LETTER_PORTRAIT
	 * 
	 * Defines the rectangle for the Letter portrait page format. The
	 * dimensions of this page format are 850x1100 pixels.
	 */
	PAGE_FORMAT_LETTER_PORTRAIT: new mxRectangle(0, 0, 850, 1100),

	/**
	 * Variable: PAGE_FORMAT_LETTER_PORTRAIT
	 * 
	 * Defines the rectangle for the Letter portrait page format. The dimensions
	 * of this page format are 850x1100 pixels.
	 */
	PAGE_FORMAT_LETTER_LANDSCAPE: new mxRectangle(0, 0, 1100, 850),

	/**
	 * Variable: NONE
	 * 
	 * Defines the value for none. Default is "none".
	 */
	NONE: 'none',

	/**
	 * Variable: STYLE_PERIMETER
	 * 
	 * Defines the key for the perimeter style. This is a function that defines
	 * the perimeter around a particular shape. Possible values are the
	 * functions defined in <mxPerimeter>. Alternatively, the constants in this
	 * class that start with <code>PERIMETER_</code> may be used to access
	 * perimeter styles in <mxStyleRegistry>. Value is <code>perimeter</code>.
	 */
	STYLE_PERIMETER: 'perimeter',
	
	/**
	 * Variable: STYLE_SOURCE_PORT
	 * 
	 * Defines the ID of the cell that should be used for computing the
	 * perimeter point of the source for an edge. This allows for graphically
	 * connecting to a cell while keeping the actual terminal of the edge.
	 * Value is <code>sourcePort</code>.
	 */
	STYLE_SOURCE_PORT: 'sourcePort',
	
	/**
	 * Variable: STYLE_TARGET_PORT
	 * 
	 * Defines the ID of the cell that should be used for computing the
	 * perimeter point of the target for an edge. This allows for graphically
	 * connecting to a cell while keeping the actual terminal of the edge.
	 * Value is <code>targetPort</code>.
	 */
	STYLE_TARGET_PORT: 'targetPort',

	/**
	 * Variable: STYLE_PORT_CONSTRAINT
	 * 
	 * Defines the direction(s) that edges are allowed to connect to cells in.
	 * Possible values are <code>DIRECTION_NORTH, DIRECTION_SOUTH, 
	 * DIRECTION_EAST</code> and <code>DIRECTION_WEST</code>. Value is
	 * <code>portConstraint</code>.
	 */
	STYLE_PORT_CONSTRAINT: 'portConstraint',

	/**
	 * Variable: STYLE_PORT_CONSTRAINT_ROTATION
	 * 
	 * Define whether port constraint directions are rotated with vertex
	 * rotation. 0 (default) causes port constraints to remain absolute, 
	 * relative to the graph, 1 causes the constraints to rotate with
	 * the vertex. Value is <code>portConstraintRotation</code>.
	 */
	STYLE_PORT_CONSTRAINT_ROTATION: 'portConstraintRotation',

	/**
	 * Variable: STYLE_OPACITY
	 * 
	 * Defines the key for the opacity style. The type of the value is 
	 * numeric and the possible range is 0-100. Value is <code>opacity</code>.
	 */
	STYLE_OPACITY: 'opacity',

	/**
	 * Variable: STYLE_TEXT_OPACITY
	 * 
	 * Defines the key for the text opacity style. The type of the value is 
	 * numeric and the possible range is 0-100. Value is <code>textOpacity</code>.
	 */
	STYLE_TEXT_OPACITY: 'textOpacity',

	/**
	 * Variable: STYLE_TEXT_DIRECTION
	 * 
	 * Defines the key for the text direction style. Possible values are
	 * <code>TEXT_DIRECTION_DEFAULT, TEXT_DIRECTION_AUTO, TEXT_DIRECTION_LTR</code>
	 * and <code>TEXT_DIRECTION_RTL</code>. Value is <code>textDirection</code>.
	 * The default value for the style is defined in <DEFAULT_TEXT_DIRECTION>.
	 * It is used is no value is defined for this key in a given style. This is
	 * an experimental style that is currently ignored in the backends.
	 */
	STYLE_TEXT_DIRECTION: 'textDirection',

	/**
	 * Variable: STYLE_OVERFLOW
	 * 
	 * Defines the key for the overflow style. Possible values are 'visible',
	 * 'hidden', 'fill' and 'width'. The default value is 'visible'. This value
	 * specifies how overlapping vertex labels are handled. A value of
	 * 'visible' will show the complete label. A value of 'hidden' will clip
	 * the label so that it does not overlap the vertex bounds. A value of
	 * 'fill' will use the vertex bounds and a value of 'width' will use the
	 * the vertex width for the label. See <mxGraph.isLabelClipped>. Note that
	 * the vertical alignment is ignored for overflow fill. Value is <code>overflow</code>.
	 */
	STYLE_OVERFLOW: 'overflow',

	/**
	 * Variable: STYLE_ORTHOGONAL
	 * 
	 * Defines if the connection points on either end of the edge should be
	 * computed so that the edge is vertical or horizontal if possible and
	 * if the point is not at a fixed location. Default is false. This is
	 * used in <mxGraph.isOrthogonal>, which also returns true if the edgeStyle
	 * of the edge is an elbow or entity. Value is <code>orthogonal</code>.
	 */
	STYLE_ORTHOGONAL: 'orthogonal',

	/**
	 * Variable: STYLE_EXIT_X
	 * 
	 * Defines the key for the horizontal relative coordinate connection point
	 * of an edge with its source terminal. Value is <code>exitX</code>.
	 */
	STYLE_EXIT_X: 'exitX',

	/**
	 * Variable: STYLE_EXIT_Y
	 * 
	 * Defines the key for the vertical relative coordinate connection point
	 * of an edge with its source terminal. Value is <code>exitY</code>.
	 */
	STYLE_EXIT_Y: 'exitY',

	/**
	 * Variable: STYLE_EXIT_PERIMETER
	 * 
	 * Defines if the perimeter should be used to find the exact entry point
	 * along the perimeter of the source. Possible values are 0 (false) and
	 * 1 (true). Default is 1 (true). Value is <code>exitPerimeter</code>.
	 */
	STYLE_EXIT_PERIMETER: 'exitPerimeter',

	/**
	 * Variable: STYLE_ENTRY_X
	 * 
	 * Defines the key for the horizontal relative coordinate connection point
	 * of an edge with its target terminal. Value is <code>entryX</code>.
	 */
	STYLE_ENTRY_X: 'entryX',

	/**
	 * Variable: STYLE_ENTRY_Y
	 * 
	 * Defines the key for the vertical relative coordinate connection point
	 * of an edge with its target terminal. Value is <code>entryY</code>.
	 */
	STYLE_ENTRY_Y: 'entryY',

	/**
	 * Variable: STYLE_ENTRY_PERIMETER
	 * 
	 * Defines if the perimeter should be used to find the exact entry point
	 * along the perimeter of the target. Possible values are 0 (false) and
	 * 1 (true). Default is 1 (true). Value is <code>entryPerimeter</code>.
	 */
	STYLE_ENTRY_PERIMETER: 'entryPerimeter',

	/**
	 * Variable: STYLE_WHITE_SPACE
	 * 
	 * Defines the key for the white-space style. Possible values are 'nowrap'
	 * and 'wrap'. The default value is 'nowrap'. This value specifies how
	 * white-space inside a HTML vertex label should be handled. A value of
	 * 'nowrap' means the text will never wrap to the next line until a
	 * linefeed is encountered. A value of 'wrap' means text will wrap when
	 * necessary. This style is only used for HTML labels.
	 * See <mxGraph.isWrapping>. Value is <code>whiteSpace</code>.
	 */
	STYLE_WHITE_SPACE: 'whiteSpace',

	/**
	 * Variable: STYLE_ROTATION
	 * 
	 * Defines the key for the rotation style. The type of the value is 
	 * numeric and the possible range is 0-360. Value is <code>rotation</code>.
	 */
	STYLE_ROTATION: 'rotation',

	/**
	 * Variable: STYLE_FILLCOLOR
	 * 
	 * Defines the key for the fill color. Possible values are all HTML color
	 * names or HEX codes, as well as special keywords such as 'swimlane,
	 * 'inherit' or 'indicated' to use the color code of a related cell or the
	 * indicator shape. Value is <code>fillColor</code>.
	 */
	STYLE_FILLCOLOR: 'fillColor',

	/**
	 * Variable: STYLE_POINTER_EVENTS
	 * 
	 * Specifies if pointer events should be fired on transparent backgrounds.
	 * This style is currently only supported in <mxRectangleShape>. Default
	 * is true. Value is <code>pointerEvents</code>. This is typically set to
	 * false in groups where the transparent part should allow any underlying
	 * cells to be clickable.
	 */
	STYLE_POINTER_EVENTS: 'pointerEvents',

	/**
	 * Variable: STYLE_SWIMLANE_FILLCOLOR
	 * 
	 * Defines the key for the fill color of the swimlane background. Possible
	 * values are all HTML color names or HEX codes. Default is no background.
	 * Value is <code>swimlaneFillColor</code>.
	 */
	STYLE_SWIMLANE_FILLCOLOR: 'swimlaneFillColor',

	/**
	 * Variable: STYLE_MARGIN
	 * 
	 * Defines the key for the margin between the ellipses in the double ellipse shape.
	 * Possible values are all positive numbers. Value is <code>margin</code>.
	 */
	STYLE_MARGIN: 'margin',

	/**
	 * Variable: STYLE_GRADIENTCOLOR
	 * 
	 * Defines the key for the gradient color. Possible values are all HTML color
	 * names or HEX codes, as well as special keywords such as 'swimlane,
	 * 'inherit' or 'indicated' to use the color code of a related cell or the
	 * indicator shape. This is ignored if no fill color is defined. Value is
	 * <code>gradientColor</code>.
	 */
	STYLE_GRADIENTCOLOR: 'gradientColor',

	/**
	 * Variable: STYLE_GRADIENT_DIRECTION
	 * 
	 * Defines the key for the gradient direction. Possible values are
	 * <DIRECTION_EAST>, <DIRECTION_WEST>, <DIRECTION_NORTH> and
	 * <DIRECTION_SOUTH>. Default is <DIRECTION_SOUTH>. Generally, and by
	 * default in mxGraph, gradient painting is done from the value of
	 * <STYLE_FILLCOLOR> to the value of <STYLE_GRADIENTCOLOR>. Taking the
	 * example of <DIRECTION_NORTH>, this means <STYLE_FILLCOLOR> color at the 
	 * bottom of paint pattern and <STYLE_GRADIENTCOLOR> at top, with a
	 * gradient in-between. Value is <code>gradientDirection</code>.
	 */
	STYLE_GRADIENT_DIRECTION: 'gradientDirection',

	/**
	 * Variable: STYLE_STROKECOLOR
	 * 
	 * Defines the key for the strokeColor style. Possible values are all HTML
	 * color names or HEX codes, as well as special keywords such as 'swimlane,
	 * 'inherit', 'indicated' to use the color code of a related cell or the
	 * indicator shape or 'none' for no color. Value is <code>strokeColor</code>.
	 */
	STYLE_STROKECOLOR: 'strokeColor',

	/**
	 * Variable: STYLE_SEPARATORCOLOR
	 * 
	 * Defines the key for the separatorColor style. Possible values are all
	 * HTML color names or HEX codes. This style is only used for
	 * <SHAPE_SWIMLANE> shapes. Value is <code>separatorColor</code>.
	 */
	STYLE_SEPARATORCOLOR: 'separatorColor',

	/**
	 * Variable: STYLE_STROKEWIDTH
	 * 
	 * Defines the key for the strokeWidth style. The type of the value is 
	 * numeric and the possible range is any non-negative value larger or equal
	 * to 1. The value defines the stroke width in pixels. Note: To hide a
	 * stroke use strokeColor none. Value is <code>strokeWidth</code>.
	 */
	STYLE_STROKEWIDTH: 'strokeWidth',

	/**
	 * Variable: STYLE_ALIGN
	 * 
	 * Defines the key for the align style. Possible values are <ALIGN_LEFT>,
	 * <ALIGN_CENTER> and <ALIGN_RIGHT>. This value defines how the lines of
	 * the label are horizontally aligned. <ALIGN_LEFT> mean label text lines
	 * are aligned to left of the label bounds, <ALIGN_RIGHT> to the right of
	 * the label bounds and <ALIGN_CENTER> means the center of the text lines
	 * are aligned in the center of the label bounds. Note this value doesn't
	 * affect the positioning of the overall label bounds relative to the
	 * vertex, to move the label bounds horizontally, use
	 * <STYLE_LABEL_POSITION>. Value is <code>align</code>.
	 */
	STYLE_ALIGN: 'align',

	/**
	 * Variable: STYLE_VERTICAL_ALIGN
	 * 
	 * Defines the key for the verticalAlign style. Possible values are
	 * <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>. This value defines how
	 * the lines of the label are vertically aligned. <ALIGN_TOP> means the
	 * topmost label text line is aligned against the top of the label bounds,
	 * <ALIGN_BOTTOM> means the bottom-most label text line is aligned against
	 * the bottom of the label bounds and <ALIGN_MIDDLE> means there is equal
	 * spacing between the topmost text label line and the top of the label
	 * bounds and the bottom-most text label line and the bottom of the label
	 * bounds. Note this value doesn't affect the positioning of the overall
	 * label bounds relative to the vertex, to move the label bounds
	 * vertically, use <STYLE_VERTICAL_LABEL_POSITION>. Value is <code>verticalAlign</code>.
	 */
	STYLE_VERTICAL_ALIGN: 'verticalAlign',

	/**
	 * Variable: STYLE_LABEL_WIDTH
	 * 
	 * Defines the key for the width of the label if the label position is not
	 * center. Value is <code>labelWidth</code>.
	 */
	STYLE_LABEL_WIDTH: 'labelWidth',

	/**
	 * Variable: STYLE_LABEL_POSITION
	 * 
	 * Defines the key for the horizontal label position of vertices. Possible
	 * values are <ALIGN_LEFT>, <ALIGN_CENTER> and <ALIGN_RIGHT>. Default is
	 * <ALIGN_CENTER>. The label align defines the position of the label
	 * relative to the cell. <ALIGN_LEFT> means the entire label bounds is
	 * placed completely just to the left of the vertex, <ALIGN_RIGHT> means
	 * adjust to the right and <ALIGN_CENTER> means the label bounds are
	 * vertically aligned with the bounds of the vertex. Note this value
	 * doesn't affect the positioning of label within the label bounds, to move
	 * the label horizontally within the label bounds, use <STYLE_ALIGN>.
	 * Value is <code>labelPosition</code>.
	 */
	STYLE_LABEL_POSITION: 'labelPosition',

	/**
	 * Variable: STYLE_VERTICAL_LABEL_POSITION
	 * 
	 * Defines the key for the vertical label position of vertices. Possible
	 * values are <ALIGN_TOP>, <ALIGN_BOTTOM> and <ALIGN_MIDDLE>. Default is
	 * <ALIGN_MIDDLE>. The label align defines the position of the label
	 * relative to the cell. <ALIGN_TOP> means the entire label bounds is
	 * placed completely just on the top of the vertex, <ALIGN_BOTTOM> means
	 * adjust on the bottom and <ALIGN_MIDDLE> means the label bounds are
	 * horizontally aligned with the bounds of the vertex. Note this value
	 * doesn't affect the positioning of label within the label bounds, to move
	 * the label vertically within the label bounds, use
	 * <STYLE_VERTICAL_ALIGN>. Value is <code>verticalLabelPosition</code>.
	 */
	STYLE_VERTICAL_LABEL_POSITION: 'verticalLabelPosition',
	
	/**
	 * Variable: STYLE_IMAGE_ASPECT
	 * 
	 * Defines the key for the image aspect style. Possible values are 0 (do
	 * not preserve aspect) or 1 (keep aspect). This is only used in
	 * <mxImageShape>. Default is 1. Value is <code>imageAspect</code>.
	 */
	STYLE_IMAGE_ASPECT: 'imageAspect',

	/**
	 * Variable: STYLE_IMAGE_ALIGN
	 * 
	 * Defines the key for the align style. Possible values are <ALIGN_LEFT>,
	 * <ALIGN_CENTER> and <ALIGN_RIGHT>. The value defines how any image in the
	 * vertex label is aligned horizontally within the label bounds of a
	 * <SHAPE_LABEL> shape. Value is <code>imageAlign</code>.
	 */
	STYLE_IMAGE_ALIGN: 'imageAlign',

	/**
	 * Variable: STYLE_IMAGE_VERTICAL_ALIGN
	 * 
	 * Defines the key for the verticalAlign style. Possible values are
	 * <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>. The value defines how
	 * any image in the vertex label is aligned vertically within the label
	 * bounds of a <SHAPE_LABEL> shape. Value is <code>imageVerticalAlign</code>.
	 */
	STYLE_IMAGE_VERTICAL_ALIGN: 'imageVerticalAlign',

	/**
	 * Variable: STYLE_GLASS
	 * 
	 * Defines the key for the glass style. Possible values are 0 (disabled) and
	 * 1(enabled). The default value is 0. This is used in <mxLabel>. Value is
	 * <code>glass</code>.
	 */
	STYLE_GLASS: 'glass',

	/**
	 * Variable: STYLE_IMAGE
	 * 
	 * Defines the key for the image style. Possible values are any image URL,
	 * the type of the value is String. This is the path to the image to image
	 * that is to be displayed within the label of a vertex. Data URLs should
	 * use the following format: data:image/png,xyz where xyz is the base64
	 * encoded data (without the "base64"-prefix). Note that Data URLs are only
	 * supported in modern browsers. Value is <code>image</code>.
	 */
	STYLE_IMAGE: 'image',

	/**
	 * Variable: STYLE_IMAGE_WIDTH
	 * 
	 * Defines the key for the imageWidth style. The type of this value is
	 * int, the value is the image width in pixels and must be greater than 0.
	 * Value is <code>imageWidth</code>.
	 */
	STYLE_IMAGE_WIDTH: 'imageWidth',

	/**
	 * Variable: STYLE_IMAGE_HEIGHT
	 * 
	 * Defines the key for the imageHeight style. The type of this value is
	 * int, the value is the image height in pixels and must be greater than 0.
	 * Value is <code>imageHeight</code>.
	 */
	STYLE_IMAGE_HEIGHT: 'imageHeight',

	/**
	 * Variable: STYLE_IMAGE_BACKGROUND
	 * 
	 * Defines the key for the image background color. This style is only used
	 * in <mxImageShape>. Possible values are all HTML color names or HEX
	 * codes. Value is <code>imageBackground</code>.
	 */
	STYLE_IMAGE_BACKGROUND: 'imageBackground',

	/**
	 * Variable: STYLE_IMAGE_BORDER
	 * 
	 * Defines the key for the image border color. This style is only used in
	 * <mxImageShape>. Possible values are all HTML color names or HEX codes.
	 * Value is <code>imageBorder</code>.
	 */
	STYLE_IMAGE_BORDER: 'imageBorder',

	/**
	 * Variable: STYLE_FLIPH
	 * 
	 * Defines the key for the horizontal image flip. This style is only used
	 * in <mxImageShape>. Possible values are 0 and 1. Default is 0. Value is
	 * <code>flipH</code>.
	 */
	STYLE_FLIPH: 'flipH',

	/**
	 * Variable: STYLE_FLIPV
	 * 
	 * Defines the key for the vertical flip. Possible values are 0 and 1.
	 * Default is 0. Value is <code>flipV</code>.
	 */
	STYLE_FLIPV: 'flipV',

	/**
	 * Variable: STYLE_NOLABEL
	 * 
	 * Defines the key for the noLabel style. If this is true then no label is
	 * visible for a given cell. Possible values are true or false (1 or 0).
	 * Default is false. Value is <code>noLabel</code>.
	 */
	STYLE_NOLABEL: 'noLabel',

	/**
	 * Variable: STYLE_NOEDGESTYLE
	 * 
	 * Defines the key for the noEdgeStyle style. If this is true then no edge
	 * style is applied for a given edge. Possible values are true or false
	 * (1 or 0). Default is false. Value is <code>noEdgeStyle</code>.
	 */
	STYLE_NOEDGESTYLE: 'noEdgeStyle',

	/**
	 * Variable: STYLE_LABEL_BACKGROUNDCOLOR
	 * 
	 * Defines the key for the label background color. Possible values are all
	 * HTML color names or HEX codes. Value is <code>labelBackgroundColor</code>.
	 */
	STYLE_LABEL_BACKGROUNDCOLOR: 'labelBackgroundColor',

	/**
	 * Variable: STYLE_LABEL_BORDERCOLOR
	 * 
	 * Defines the key for the label border color. Possible values are all
	 * HTML color names or HEX codes. Value is <code>labelBorderColor</code>.
	 */
	STYLE_LABEL_BORDERCOLOR: 'labelBorderColor',

	/**
	 * Variable: STYLE_LABEL_PADDING
	 * 
	 * Defines the key for the label padding, ie. the space between the label
	 * border and the label. Value is <code>labelPadding</code>.
	 */
	STYLE_LABEL_PADDING: 'labelPadding',

	/**
	 * Variable: STYLE_INDICATOR_SHAPE
	 * 
	 * Defines the key for the indicator shape used within an <mxLabel>.
	 * Possible values are all SHAPE_* constants or the names of any new
	 * shapes. The indicatorShape has precedence over the indicatorImage.
	 * Value is <code>indicatorShape</code>.
	 */
	STYLE_INDICATOR_SHAPE: 'indicatorShape',

	/**
	 * Variable: STYLE_INDICATOR_IMAGE
	 * 
	 * Defines the key for the indicator image used within an <mxLabel>.
	 * Possible values are all image URLs. The indicatorShape has
	 * precedence over the indicatorImage. Value is <code>indicatorImage</code>.
	 */
	STYLE_INDICATOR_IMAGE: 'indicatorImage',

	/**
	 * Variable: STYLE_INDICATOR_COLOR
	 * 
	 * Defines the key for the indicatorColor style. Possible values are all
	 * HTML color names or HEX codes, as well as the special 'swimlane' keyword
	 * to refer to the color of the parent swimlane if one exists. Value is
	 * <code>indicatorColor</code>.
	 */
	STYLE_INDICATOR_COLOR: 'indicatorColor',

	/**
	 * Variable: STYLE_INDICATOR_STROKECOLOR
	 * 
	 * Defines the key for the indicator stroke color in <mxLabel>.
	 * Possible values are all color codes. Value is <code>indicatorStrokeColor</code>.
	 */
	STYLE_INDICATOR_STROKECOLOR: 'indicatorStrokeColor',

	/**
	 * Variable: STYLE_INDICATOR_GRADIENTCOLOR
	 * 
	 * Defines the key for the indicatorGradientColor style. Possible values
	 * are all HTML color names or HEX codes. This style is only supported in
	 * <SHAPE_LABEL> shapes. Value is <code>indicatorGradientColor</code>.
	 */
	STYLE_INDICATOR_GRADIENTCOLOR: 'indicatorGradientColor',

	/**
	 * Variable: STYLE_INDICATOR_SPACING
	 * 
	 * The defines the key for the spacing between the label and the
	 * indicator in <mxLabel>. Possible values are in pixels. Value is
	 * <code>indicatorSpacing</code>.
	 */
	STYLE_INDICATOR_SPACING: 'indicatorSpacing',

	/**
	 * Variable: STYLE_INDICATOR_WIDTH
	 * 
	 * Defines the key for the indicator width. Possible values start at 0 (in
	 * pixels). Value is <code>indicatorWidth</code>.
	 */
	STYLE_INDICATOR_WIDTH: 'indicatorWidth',

	/**
	 * Variable: STYLE_INDICATOR_HEIGHT
	 * 
	 * Defines the key for the indicator height. Possible values start at 0 (in
	 * pixels). Value is <code>indicatorHeight</code>.
	 */
	STYLE_INDICATOR_HEIGHT: 'indicatorHeight',

	/**
	 * Variable: STYLE_INDICATOR_DIRECTION
	 * 
	 * Defines the key for the indicatorDirection style. The direction style is
	 * used to specify the direction of certain shapes (eg. <mxTriangle>).
	 * Possible values are <DIRECTION_EAST> (default), <DIRECTION_WEST>,
	 * <DIRECTION_NORTH> and <DIRECTION_SOUTH>. Value is <code>indicatorDirection</code>.
	 */
	STYLE_INDICATOR_DIRECTION: 'indicatorDirection',

	/**
	 * Variable: STYLE_SHADOW
	 * 
	 * Defines the key for the shadow style. The type of the value is Boolean.
	 * Value is <code>shadow</code>.
	 */
	STYLE_SHADOW: 'shadow',
	
	/**
	 * Variable: STYLE_SEGMENT
	 * 
	 * Defines the key for the segment style. The type of this value is float
	 * and the value represents the size of the horizontal segment of the
	 * entity relation style. Default is ENTITY_SEGMENT. Value is <code>segment</code>.
	 */
	STYLE_SEGMENT: 'segment',
	
	/**
	 * Variable: STYLE_ENDARROW
	 *
	 * Defines the key for the end arrow marker. Possible values are all
	 * constants with an ARROW-prefix. This is only used in <mxConnector>.
	 * Value is <code>endArrow</code>.
	 *
	 * Example:
	 * (code)
	 * style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
	 * (end)
	 */
	STYLE_ENDARROW: 'endArrow',

	/**
	 * Variable: STYLE_STARTARROW
	 * 
	 * Defines the key for the start arrow marker. Possible values are all
	 * constants with an ARROW-prefix. This is only used in <mxConnector>.
	 * See <STYLE_ENDARROW>. Value is <code>startArrow</code>.
	 */
	STYLE_STARTARROW: 'startArrow',

	/**
	 * Variable: STYLE_ENDSIZE
	 * 
	 * Defines the key for the endSize style. The type of this value is numeric
	 * and the value represents the size of the end marker in pixels. Value is
	 * <code>endSize</code>.
	 */
	STYLE_ENDSIZE: 'endSize',

	/**
	 * Variable: STYLE_STARTSIZE
	 * 
	 * Defines the key for the startSize style. The type of this value is
	 * numeric and the value represents the size of the start marker or the
	 * size of the swimlane title region depending on the shape it is used for.
	 * Value is <code>startSize</code>.
	 */
	STYLE_STARTSIZE: 'startSize',

	/**
	 * Variable: STYLE_SWIMLANE_LINE
	 * 
	 * Defines the key for the swimlaneLine style. This style specifies whether
	 * the line between the title regio of a swimlane should be visible. Use 0
	 * for hidden or 1 (default) for visible. Value is <code>swimlaneLine</code>.
	 */
	STYLE_SWIMLANE_LINE: 'swimlaneLine',

	/**
	 * Variable: STYLE_ENDFILL
	 * 
	 * Defines the key for the endFill style. Use 0 for no fill or 1 (default)
	 * for fill. (This style is only exported via <mxImageExport>.) Value is
	 * <code>endFill</code>.
	 */
	STYLE_ENDFILL: 'endFill',

	/**
	 * Variable: STYLE_STARTFILL
	 * 
	 * Defines the key for the startFill style. Use 0 for no fill or 1 (default)
	 * for fill. (This style is only exported via <mxImageExport>.) Value is
	 * <code>startFill</code>.
	 */
	STYLE_STARTFILL: 'startFill',

	/**
	 * Variable: STYLE_DASHED
	 * 
	 * Defines the key for the dashed style. Use 0 (default) for non-dashed or 1
	 * for dashed. Value is <code>dashed</code>.
	 */
	STYLE_DASHED: 'dashed',

	/**
	 * Defines the key for the dashed pattern style in SVG and image exports.
	 * The type of this value is a space separated list of numbers that specify
	 * a custom-defined dash pattern. Dash styles are defined in terms of the
	 * length of the dash (the drawn part of the stroke) and the length of the
	 * space between the dashes. The lengths are relative to the line width: a
	 * length of "1" is equal to the line width. VML ignores this style and
	 * uses dashStyle instead as defined in the VML specification. This style
	 * is only used in the <mxConnector> shape. Value is <code>dashPattern</code>.
	 */
	STYLE_DASH_PATTERN: 'dashPattern',

	/**
	 * Variable: STYLE_ROUNDED
	 * 
	 * Defines the key for the rounded style. The type of this value is
	 * Boolean. For edges this determines whether or not joins between edges
	 * segments are smoothed to a rounded finish. For vertices that have the
	 * rectangle shape, this determines whether or not the rectangle is
	 * rounded. Use 0 (default) for non-rounded or 1 for rounded. Value is
	 * <code>rounded</code>.
	 */
	STYLE_ROUNDED: 'rounded',

	/**
	 * Variable: STYLE_CURVED
	 * 
	 * Defines the key for the curved style. The type of this value is
	 * Boolean. It is only applicable for connector shapes. Use 0 (default)
	 * for non-curved or 1 for curved. Value is <code>curved</code>.
	 */
	STYLE_CURVED: 'curved',

	/**
	 * Variable: STYLE_ARCSIZE
	 * 
	 * Defines the rounding factor for a rounded rectangle in percent (without
	 * the percent sign). Possible values are between 0 and 100. If this value
	 * is not specified then RECTANGLE_ROUNDING_FACTOR * 100 is used. For
	 * edges, this defines the absolute size of rounded corners in pixels. If
	 * this values is not specified then LINE_ARCSIZE is used.
	 * (This style is only exported via <mxImageExport>.) Value is <code>arcSize</code>.
	 */
	STYLE_ARCSIZE: 'arcSize',

	/**
	 * Variable: STYLE_SMOOTH
	 * 
	 * An experimental style for edges. This style is currently not available
	 * in the backends and is implemented differently for VML and SVG. The use
	 * of this style is currently only recommended for VML. Value is <code>smooth</code>.
	 */
	STYLE_SMOOTH: 'smooth',

	/**
	 * Variable: STYLE_SOURCE_PERIMETER_SPACING
	 * 
	 * Defines the key for the source perimeter spacing. The type of this value
	 * is numeric. This is the distance between the source connection point of
	 * an edge and the perimeter of the source vertex in pixels. This style
	 * only applies to edges. Value is <code>sourcePerimeterSpacing</code>.
	 */
	STYLE_SOURCE_PERIMETER_SPACING: 'sourcePerimeterSpacing',

	/**
	 * Variable: STYLE_TARGET_PERIMETER_SPACING
	 * 
	 * Defines the key for the target perimeter spacing. The type of this value
	 * is numeric. This is the distance between the target connection point of
	 * an edge and the perimeter of the target vertex in pixels. This style
	 * only applies to edges. Value is <code>targetPerimeterSpacing</code>.
	 */
	STYLE_TARGET_PERIMETER_SPACING: 'targetPerimeterSpacing',

	/**
	 * Variable: STYLE_PERIMETER_SPACING
	 * 
	 * Defines the key for the perimeter spacing. This is the distance between
	 * the connection point and the perimeter in pixels. When used in a vertex
	 * style, this applies to all incoming edges to floating ports (edges that
	 * terminate on the perimeter of the vertex). When used in an edge style,
	 * this spacing applies to the source and target separately, if they
	 * terminate in floating ports (on the perimeter of the vertex). Value is
	 * <code>perimeterSpacing</code>.
	 */
	STYLE_PERIMETER_SPACING: 'perimeterSpacing',

	/**
	 * Variable: STYLE_SPACING
	 * 
	 * Defines the key for the spacing. The value represents the spacing, in
	 * pixels, added to each side of a label in a vertex (style applies to
	 * vertices only). Value is <code>spacing</code>.
	 */
	STYLE_SPACING: 'spacing',

	/**
	 * Variable: STYLE_SPACING_TOP
	 * 
	 * Defines the key for the spacingTop style. The value represents the
	 * spacing, in pixels, added to the top side of a label in a vertex (style
	 * applies to vertices only). Value is <code>spacingTop</code>.
	 */
	STYLE_SPACING_TOP: 'spacingTop',

	/**
	 * Variable: STYLE_SPACING_LEFT
	 * 
	 * Defines the key for the spacingLeft style. The value represents the
	 * spacing, in pixels, added to the left side of a label in a vertex (style
	 * applies to vertices only). Value is <code>spacingLeft</code>.
	 */
	STYLE_SPACING_LEFT: 'spacingLeft',

	/**
	 * Variable: STYLE_SPACING_BOTTOM
	 * 
	 * Defines the key for the spacingBottom style The value represents the
	 * spacing, in pixels, added to the bottom side of a label in a vertex
	 * (style applies to vertices only). Value is <code>spacingBottom</code>.
	 */
	STYLE_SPACING_BOTTOM: 'spacingBottom',

	/**
	 * Variable: STYLE_SPACING_RIGHT
	 * 
	 * Defines the key for the spacingRight style The value represents the
	 * spacing, in pixels, added to the right side of a label in a vertex (style
	 * applies to vertices only). Value is <code>spacingRight</code>.
	 */
	STYLE_SPACING_RIGHT: 'spacingRight',

	/**
	 * Variable: STYLE_HORIZONTAL
	 * 
	 * Defines the key for the horizontal style. Possible values are
	 * true or false. This value only applies to vertices. If the <STYLE_SHAPE>
	 * is <code>SHAPE_SWIMLANE</code> a value of false indicates that the
	 * swimlane should be drawn vertically, true indicates to draw it
	 * horizontally. If the shape style does not indicate that this vertex is a
	 * swimlane, this value affects only whether the label is drawn
	 * horizontally or vertically. Value is <code>horizontal</code>.
	 */
	STYLE_HORIZONTAL: 'horizontal',

	/**
	 * Variable: STYLE_DIRECTION
	 * 
	 * Defines the key for the direction style. The direction style is used
	 * to specify the direction of certain shapes (eg. <mxTriangle>).
	 * Possible values are <DIRECTION_EAST> (default), <DIRECTION_WEST>,
	 * <DIRECTION_NORTH> and <DIRECTION_SOUTH>. Value is <code>direction</code>.
	 */
	STYLE_DIRECTION: 'direction',

	/**
	 * Variable: STYLE_ELBOW
	 * 
	 * Defines the key for the elbow style. Possible values are
	 * <ELBOW_HORIZONTAL> and <ELBOW_VERTICAL>. Default is <ELBOW_HORIZONTAL>.
	 * This defines how the three segment orthogonal edge style leaves its
	 * terminal vertices. The vertical style leaves the terminal vertices at
	 * the top and bottom sides. Value is <code>elbow</code>.
	 */
	STYLE_ELBOW: 'elbow',

	/**
	 * Variable: STYLE_FONTCOLOR
	 * 
	 * Defines the key for the fontColor style. Possible values are all HTML
	 * color names or HEX codes. Value is <code>fontColor</code>.
	 */
	STYLE_FONTCOLOR: 'fontColor',

	/**
	 * Variable: STYLE_FONTFAMILY
	 * 
	 * Defines the key for the fontFamily style. Possible values are names such
	 * as Arial; Dialog; Verdana; Times New Roman. The value is of type String.
	 * Value is fontFamily.
	 */
	STYLE_FONTFAMILY: 'fontFamily',

	/**
	 * Variable: STYLE_FONTSIZE
	 * 
	 * Defines the key for the fontSize style (in points). The type of the value
	 * is int. Value is <code>fontSize</code>.
	 */
	STYLE_FONTSIZE: 'fontSize',

	/**
	 * Variable: STYLE_FONTSTYLE
	 * 
	 * Defines the key for the fontStyle style. Values may be any logical AND
	 * (sum) of <FONT_BOLD>, <FONT_ITALIC> and <FONT_UNDERLINE>.
	 * The type of the value is int. Value is <code>fontStyle</code>.
	 */
	STYLE_FONTSTYLE: 'fontStyle',
	
	/**
	 * Variable: STYLE_ASPECT
	 * 
	 * Defines the key for the aspect style. Possible values are empty or fixed.
	 * If fixed is used then the aspect ratio of the cell will be maintained
	 * when resizing. Default is empty. Value is <code>aspect</code>.
	 */
	STYLE_ASPECT: 'aspect',

	/**
	 * Variable: STYLE_AUTOSIZE
	 * 
	 * Defines the key for the autosize style. This specifies if a cell should be
	 * resized automatically if the value has changed. Possible values are 0 or 1.
	 * Default is 0. See <mxGraph.isAutoSizeCell>. This is normally combined with
	 * <STYLE_RESIZABLE> to disable manual sizing. Value is <code>autosize</code>.
	 */
	STYLE_AUTOSIZE: 'autosize',

	/**
	 * Variable: STYLE_FOLDABLE
	 * 
	 * Defines the key for the foldable style. This specifies if a cell is foldable
	 * using a folding icon. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellFoldable>. Value is <code>foldable</code>.
	 */
	STYLE_FOLDABLE: 'foldable',

	/**
	 * Variable: STYLE_EDITABLE
	 * 
	 * Defines the key for the editable style. This specifies if the value of
	 * a cell can be edited using the in-place editor. Possible values are 0 or
	 * 1. Default is 1. See <mxGraph.isCellEditable>. Value is <code>editable</code>.
	 */
	STYLE_EDITABLE: 'editable',

	/**
	 * Variable: STYLE_BENDABLE
	 * 
	 * Defines the key for the bendable style. This specifies if the control
	 * points of an edge can be moved. Possible values are 0 or 1. Default is
	 * 1. See <mxGraph.isCellBendable>. Value is <code>bendable</code>.
	 */
	STYLE_BENDABLE: 'bendable',

	/**
	 * Variable: STYLE_MOVABLE
	 * 
	 * Defines the key for the movable style. This specifies if a cell can
	 * be moved. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellMovable>. Value is <code>movable</code>.
	 */
	STYLE_MOVABLE: 'movable',

	/**
	 * Variable: STYLE_RESIZABLE
	 * 
	 * Defines the key for the resizable style. This specifies if a cell can
	 * be resized. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellResizable>. Value is <code>resizable</code>.
	 */
	STYLE_RESIZABLE: 'resizable',

	/**
	 * Variable: STYLE_ROTATABLE
	 * 
	 * Defines the key for the rotatable style. This specifies if a cell can
	 * be rotated. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellRotatable>. Value is <code>rotatable</code>.
	 */
	STYLE_ROTATABLE: 'rotatable',

	/**
	 * Variable: STYLE_CLONEABLE
	 * 
	 * Defines the key for the cloneable style. This specifies if a cell can
	 * be cloned. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellCloneable>. Value is <code>cloneable</code>.
	 */
	STYLE_CLONEABLE: 'cloneable',

	/**
	 * Variable: STYLE_DELETABLE
	 * 
	 * Defines the key for the deletable style. This specifies if a cell can be
	 * deleted. Possible values are 0 or 1. Default is 1. See
	 * <mxGraph.isCellDeletable>. Value is <code>deletable</code>.
	 */
	STYLE_DELETABLE: 'deletable',

	/**
	 * Variable: STYLE_SHAPE
	 * 
	 * Defines the key for the shape. Possible values are all constants with
	 * a SHAPE-prefix or any newly defined shape names. Value is <code>shape</code>.
	 */
	STYLE_SHAPE: 'shape',

	/**
	 * Variable: STYLE_EDGE
	 * 
	 * Defines the key for the edge style. Possible values are the functions
	 * defined in <mxEdgeStyle>. Value is <code>edgeStyle</code>.
	 */
	STYLE_EDGE: 'edgeStyle',

	/**
	 * Variable: STYLE_LOOP
	 * 
	 * Defines the key for the loop style. Possible values are the functions
	 * defined in <mxEdgeStyle>. Value is <code>loopStyle</code>.
	 */
	STYLE_LOOP: 'loopStyle',

	/**
	 * Variable: STYLE_ROUTING_CENTER_X
	 * 
	 * Defines the key for the horizontal routing center. Possible values are
	 * between -0.5 and 0.5. This is the relative offset from the center used
	 * for connecting edges. The type of this value is numeric. Value is
	 * <code>routingCenterX</code>.
	 */
	STYLE_ROUTING_CENTER_X: 'routingCenterX',

	/**
	 * Variable: STYLE_ROUTING_CENTER_Y
	 * 
	 * Defines the key for the vertical routing center. Possible values are
	 * between -0.5 and 0.5. This is the relative offset from the center used
	 * for connecting edges. The type of this value is numeric. Value is
	 * <code>routingCenterY</code>.
	 */
	STYLE_ROUTING_CENTER_Y: 'routingCenterY',

	/**
	 * Variable: FONT_BOLD
	 * 
	 * Constant for bold fonts. Default is 1.
	 */
	FONT_BOLD: 1,

	/**
	 * Variable: FONT_ITALIC
	 * 
	 * Constant for italic fonts. Default is 2.
	 */
	FONT_ITALIC: 2,

	/**
	 * Variable: FONT_UNDERLINE
	 * 
	 * Constant for underlined fonts. Default is 4.
	 */
	FONT_UNDERLINE: 4,

	/**
	 * Variable: SHAPE_RECTANGLE
	 * 
	 * Name under which <mxRectangleShape> is registered in <mxCellRenderer>.
	 * Default is rectangle.
	 */
	SHAPE_RECTANGLE: 'rectangle',

	/**
	 * Variable: SHAPE_ELLIPSE
	 * 
	 * Name under which <mxEllipse> is registered in <mxCellRenderer>.
	 * Default is ellipse.
	 */
	SHAPE_ELLIPSE: 'ellipse',

	/**
	 * Variable: SHAPE_DOUBLE_ELLIPSE
	 * 
	 * Name under which <mxDoubleEllipse> is registered in <mxCellRenderer>.
	 * Default is doubleEllipse.
	 */
	SHAPE_DOUBLE_ELLIPSE: 'doubleEllipse',

	/**
	 * Variable: SHAPE_RHOMBUS
	 * 
	 * Name under which <mxRhombus> is registered in <mxCellRenderer>.
	 * Default is rhombus.
	 */
	SHAPE_RHOMBUS: 'rhombus',

	/**
	 * Variable: SHAPE_LINE
	 * 
	 * Name under which <mxLine> is registered in <mxCellRenderer>.
	 * Default is line.
	 */
	SHAPE_LINE: 'line',

	/**
	 * Variable: SHAPE_IMAGE
	 * 
	 * Name under which <mxImageShape> is registered in <mxCellRenderer>.
	 * Default is image.
	 */
	SHAPE_IMAGE: 'image',
	
	/**
	 * Variable: SHAPE_ARROW
	 * 
	 * Name under which <mxArrow> is registered in <mxCellRenderer>.
	 * Default is arrow.
	 */
	SHAPE_ARROW: 'arrow',
	
	/**
	 * Variable: SHAPE_ARROW_CONNECTOR
	 * 
	 * Name under which <mxArrowConnector> is registered in <mxCellRenderer>.
	 * Default is arrowConnector.
	 */
	SHAPE_ARROW_CONNECTOR: 'arrowConnector',
	
	/**
	 * Variable: SHAPE_LABEL
	 * 
	 * Name under which <mxLabel> is registered in <mxCellRenderer>.
	 * Default is label.
	 */
	SHAPE_LABEL: 'label',
	
	/**
	 * Variable: SHAPE_CYLINDER
	 * 
	 * Name under which <mxCylinder> is registered in <mxCellRenderer>.
	 * Default is cylinder.
	 */
	SHAPE_CYLINDER: 'cylinder',
	
	/**
	 * Variable: SHAPE_SWIMLANE
	 * 
	 * Name under which <mxSwimlane> is registered in <mxCellRenderer>.
	 * Default is swimlane.
	 */
	SHAPE_SWIMLANE: 'swimlane',
		
	/**
	 * Variable: SHAPE_CONNECTOR
	 * 
	 * Name under which <mxConnector> is registered in <mxCellRenderer>.
	 * Default is connector.
	 */
	SHAPE_CONNECTOR: 'connector',

	/**
	 * Variable: SHAPE_ACTOR
	 * 
	 * Name under which <mxActor> is registered in <mxCellRenderer>.
	 * Default is actor.
	 */
	SHAPE_ACTOR: 'actor',
		
	/**
	 * Variable: SHAPE_CLOUD
	 * 
	 * Name under which <mxCloud> is registered in <mxCellRenderer>.
	 * Default is cloud.
	 */
	SHAPE_CLOUD: 'cloud',
		
	/**
	 * Variable: SHAPE_TRIANGLE
	 * 
	 * Name under which <mxTriangle> is registered in <mxCellRenderer>.
	 * Default is triangle.
	 */
	SHAPE_TRIANGLE: 'triangle',
		
	/**
	 * Variable: SHAPE_HEXAGON
	 * 
	 * Name under which <mxHexagon> is registered in <mxCellRenderer>.
	 * Default is hexagon.
	 */
	SHAPE_HEXAGON: 'hexagon',

	/**
	 * Variable: ARROW_CLASSIC
	 * 
	 * Constant for classic arrow markers.
	 */
	ARROW_CLASSIC: 'classic',

	/**
	 * Variable: ARROW_BLOCK
	 * 
	 * Constant for block arrow markers.
	 */
	ARROW_BLOCK: 'block',

	/**
	 * Variable: ARROW_OPEN
	 * 
	 * Constant for open arrow markers.
	 */
	ARROW_OPEN: 'open',

	/**
	 * Variable: ARROW_OVAL
	 * 
	 * Constant for oval arrow markers.
	 */
	ARROW_OVAL: 'oval',

	/**
	 * Variable: ARROW_DIAMOND
	 * 
	 * Constant for diamond arrow markers.
	 */
	ARROW_DIAMOND: 'diamond',

	/**
	 * Variable: ARROW_DIAMOND
	 * 
	 * Constant for diamond arrow markers.
	 */
	ARROW_DIAMOND_THIN: 'diamondThin',

	/**
	 * Variable: ALIGN_LEFT
	 * 
	 * Constant for left horizontal alignment. Default is left.
	 */
	ALIGN_LEFT: 'left',

	/**
	 * Variable: ALIGN_CENTER
	 * 
	 * Constant for center horizontal alignment. Default is center.
	 */
	ALIGN_CENTER: 'center',

	/**
	 * Variable: ALIGN_RIGHT
	 * 
	 * Constant for right horizontal alignment. Default is right.
	 */
	ALIGN_RIGHT: 'right',

	/**
	 * Variable: ALIGN_TOP
	 * 
	 * Constant for top vertical alignment. Default is top.
	 */
	ALIGN_TOP: 'top',

	/**
	 * Variable: ALIGN_MIDDLE
	 * 
	 * Constant for middle vertical alignment. Default is middle.
	 */
	ALIGN_MIDDLE: 'middle',

	/**
	 * Variable: ALIGN_BOTTOM
	 * 
	 * Constant for bottom vertical alignment. Default is bottom.
	 */
	ALIGN_BOTTOM: 'bottom',

	/**
	 * Variable: DIRECTION_NORTH
	 * 
	 * Constant for direction north. Default is north.
	 */
	DIRECTION_NORTH: 'north',

	/**
	 * Variable: DIRECTION_SOUTH
	 * 
	 * Constant for direction south. Default is south.
	 */
	DIRECTION_SOUTH: 'south',

	/**
	 * Variable: DIRECTION_EAST
	 * 
	 * Constant for direction east. Default is east.
	 */
	DIRECTION_EAST: 'east',

	/**
	 * Variable: DIRECTION_WEST
	 * 
	 * Constant for direction west. Default is west.
	 */
	DIRECTION_WEST: 'west',

	/**
	 * Variable: TEXT_DIRECTION_DEFAULT
	 * 
	 * Constant for text direction default. Default is an empty string. Use
	 * this value to use the default text direction of the operating system. 
	 */
	TEXT_DIRECTION_DEFAULT: '',

	/**
	 * Variable: TEXT_DIRECTION_AUTO
	 * 
	 * Constant for text direction automatic. Default is auto. Use this value
	 * to find the direction for a given text with <mxText.getAutoDirection>. 
	 */
	TEXT_DIRECTION_AUTO: 'auto',

	/**
	 * Variable: TEXT_DIRECTION_LTR
	 * 
	 * Constant for text direction left to right. Default is ltr. Use this
	 * value for left to right text direction.
	 */
	TEXT_DIRECTION_LTR: 'ltr',

	/**
	 * Variable: TEXT_DIRECTION_RTL
	 * 
	 * Constant for text direction right to left. Default is rtl. Use this
	 * value for right to left text direction.
	 */
	TEXT_DIRECTION_RTL: 'rtl',

	/**
	 * Variable: DIRECTION_MASK_NONE
	 * 
	 * Constant for no direction.
	 */
	DIRECTION_MASK_NONE: 0,

	/**
	 * Variable: DIRECTION_MASK_WEST
	 * 
	 * Bitwise mask for west direction.
	 */
	DIRECTION_MASK_WEST: 1,
	
	/**
	 * Variable: DIRECTION_MASK_NORTH
	 * 
	 * Bitwise mask for north direction.
	 */
	DIRECTION_MASK_NORTH: 2,

	/**
	 * Variable: DIRECTION_MASK_SOUTH
	 * 
	 * Bitwise mask for south direction.
	 */
	DIRECTION_MASK_SOUTH: 4,

	/**
	 * Variable: DIRECTION_MASK_EAST
	 * 
	 * Bitwise mask for east direction.
	 */
	DIRECTION_MASK_EAST: 8,
	
	/**
	 * Variable: DIRECTION_MASK_ALL
	 * 
	 * Bitwise mask for all directions.
	 */
	DIRECTION_MASK_ALL: 15,

	/**
	 * Variable: ELBOW_VERTICAL
	 * 
	 * Constant for elbow vertical. Default is horizontal.
	 */
	ELBOW_VERTICAL: 'vertical',

	/**
	 * Variable: ELBOW_HORIZONTAL
	 * 
	 * Constant for elbow horizontal. Default is horizontal.
	 */
	ELBOW_HORIZONTAL: 'horizontal',

	/**
	 * Variable: EDGESTYLE_ELBOW
	 * 
	 * Name of the elbow edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_ELBOW: 'elbowEdgeStyle',

	/**
	 * Variable: EDGESTYLE_ENTITY_RELATION
	 * 
	 * Name of the entity relation edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_ENTITY_RELATION: 'entityRelationEdgeStyle',

	/**
	 * Variable: EDGESTYLE_LOOP
	 * 
	 * Name of the loop edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_LOOP: 'loopEdgeStyle',

	/**
	 * Variable: EDGESTYLE_SIDETOSIDE
	 * 
	 * Name of the side to side edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_SIDETOSIDE: 'sideToSideEdgeStyle',

	/**
	 * Variable: EDGESTYLE_TOPTOBOTTOM
	 * 
	 * Name of the top to bottom edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_TOPTOBOTTOM: 'topToBottomEdgeStyle',

	/**
	 * Variable: EDGESTYLE_ORTHOGONAL
	 * 
	 * Name of the generic orthogonal edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_ORTHOGONAL: 'orthogonalEdgeStyle',

	/**
	 * Variable: EDGESTYLE_SEGMENT
	 * 
	 * Name of the generic segment edge style. Can be used as a string value
	 * for the STYLE_EDGE style.
	 */
	EDGESTYLE_SEGMENT: 'segmentEdgeStyle',
 
	/**
	 * Variable: PERIMETER_ELLIPSE
	 * 
	 * Name of the ellipse perimeter. Can be used as a string value
	 * for the STYLE_PERIMETER style.
	 */
	PERIMETER_ELLIPSE: 'ellipsePerimeter',

	/**
	 * Variable: PERIMETER_RECTANGLE
	 *
	 * Name of the rectangle perimeter. Can be used as a string value
	 * for the STYLE_PERIMETER style.
	 */
	PERIMETER_RECTANGLE: 'rectanglePerimeter',

	/**
	 * Variable: PERIMETER_RHOMBUS
	 * 
	 * Name of the rhombus perimeter. Can be used as a string value
	 * for the STYLE_PERIMETER style.
	 */
	PERIMETER_RHOMBUS: 'rhombusPerimeter',

	/**
	 * Variable: PERIMETER_HEXAGON
	 * 
	 * Name of the hexagon perimeter. Can be used as a string value 
	 * for the STYLE_PERIMETER style.
	 */
	PERIMETER_HEXAGON: 'hexagonPerimeter',

	/**
	 * Variable: PERIMETER_TRIANGLE
	 * 
	 * Name of the triangle perimeter. Can be used as a string value
	 * for the STYLE_PERIMETER style.
	 */
	PERIMETER_TRIANGLE: 'trianglePerimeter'

};


/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxEventObject
 * 
 * The mxEventObject is a wrapper for all properties of a single event.
 * Additionally, it also offers functions to consume the event and check if it
 * was consumed as follows:
 * 
 * (code)
 * evt.consume();
 * INV: evt.isConsumed() == true
 * (end)
 * 
 * Constructor: mxEventObject
 *
 * Constructs a new event object with the specified name. An optional
 * sequence of key, value pairs can be appended to define properties.
 * 
 * Example:
 *
 * (code)
 * new mxEventObject("eventName", key1, val1, .., keyN, valN)
 * (end)
 */
function mxEventObject(name)
{
	this.name = name;
	this.properties = [];
	
	for (var i = 1; i < arguments.length; i += 2)
	{
		if (arguments[i + 1] != null)
		{
			this.properties[arguments[i]] = arguments[i + 1];
		}
	}
};

/**
 * Variable: name
 *
 * Holds the name.
 */
mxEventObject.prototype.name = null;

/**
 * Variable: properties
 *
 * Holds the properties as an associative array.
 */
mxEventObject.prototype.properties = null;

/**
 * Variable: consumed
 *
 * Holds the consumed state. Default is false.
 */
mxEventObject.prototype.consumed = false;

/**
 * Function: getName
 * 
 * Returns <name>.
 */
mxEventObject.prototype.getName = function()
{
	return this.name;
};

/**
 * Function: getProperties
 * 
 * Returns <properties>.
 */
mxEventObject.prototype.getProperties = function()
{
	return this.properties;
};

/**
 * Function: getProperty
 * 
 * Returns the property for the given key.
 */
mxEventObject.prototype.getProperty = function(key)
{
	return this.properties[key];
};

/**
 * Function: isConsumed
 *
 * Returns true if the event has been consumed.
 */
mxEventObject.prototype.isConsumed = function()
{
	return this.consumed;
};

/**
 * Function: consume
 *
 * Consumes the event.
 */
mxEventObject.prototype.consume = function()
{
	this.consumed = true;
};


/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxEventSource
 *
 * Base class for objects that dispatch named events. To create a subclass that
 * inherits from mxEventSource, the following code is used.
 *
 * (code)
 * function MyClass() { };
 *
 * MyClass.prototype = new mxEventSource();
 * MyClass.prototype.constructor = MyClass;
 * (end)
 *
 * Known Subclasses:
 *
 * <mxGraphModel>, <mxGraph>, <mxGraphView>, <mxEditor>, <mxCellOverlay>,
 * <mxToolbar>, <mxWindow>
 * 
 * Constructor: mxEventSource
 *
 * Constructs a new event source.
 */
function mxEventSource(eventSource)
{
	this.setEventSource(eventSource);
};

/**
 * Variable: eventListeners
 *
 * Holds the event names and associated listeners in an array. The array
 * contains the event name followed by the respective listener for each
 * registered listener.
 */
mxEventSource.prototype.eventListeners = null;

/**
 * Variable: eventsEnabled
 *
 * Specifies if events can be fired. Default is true.
 */
mxEventSource.prototype.eventsEnabled = true;

/**
 * Variable: eventSource
 *
 * Optional source for events. Default is null.
 */
mxEventSource.prototype.eventSource = null;

/**
 * Function: isEventsEnabled
 * 
 * Returns <eventsEnabled>.
 */
mxEventSource.prototype.isEventsEnabled = function()
{
	return this.eventsEnabled;
};

/**
 * Function: setEventsEnabled
 * 
 * Sets <eventsEnabled>.
 */
mxEventSource.prototype.setEventsEnabled = function(value)
{
	this.eventsEnabled = value;
};

/**
 * Function: getEventSource
 * 
 * Returns <eventSource>.
 */
mxEventSource.prototype.getEventSource = function()
{
	return this.eventSource;
};

/**
 * Function: setEventSource
 * 
 * Sets <eventSource>.
 */
mxEventSource.prototype.setEventSource = function(value)
{
	this.eventSource = value;
};

/**
 * Function: addListener
 *
 * Binds the specified function to the given event name. If no event name
 * is given, then the listener is registered for all events.
 * 
 * The parameters of the listener are the sender and an <mxEventObject>.
 */
mxEventSource.prototype.addListener = function(name, funct)
{
	if (this.eventListeners == null)
	{
		this.eventListeners = [];
	}
	
	this.eventListeners.push(name);
	this.eventListeners.push(funct);
};

/**
 * Function: removeListener
 *
 * Removes all occurrences of the given listener from <eventListeners>.
 */
mxEventSource.prototype.removeListener = function(funct)
{
	if (this.eventListeners != null)
	{
		var i = 0;
		
		while (i < this.eventListeners.length)
		{
			if (this.eventListeners[i+1] == funct)
			{
				this.eventListeners.splice(i, 2);
			}
			else
			{
				i += 2;
			}
		}
	}
};

/**
 * Function: fireEvent
 *
 * Dispatches the given event to the listeners which are registered for
 * the event. The sender argument is optional. The current execution scope
 * ("this") is used for the listener invocation (see <mxUtils.bind>).
 *
 * Example:
 *
 * (code)
 * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
 * (end)
 * 
 * Parameters:
 *
 * evt - <mxEventObject> that represents the event.
 * sender - Optional sender to be passed to the listener. Default value is
 * the return value of <getEventSource>.
 */
mxEventSource.prototype.fireEvent = function(evt, sender)
{
	if (this.eventListeners != null && this.isEventsEnabled())
	{
		if (evt == null)
		{
			evt = new mxEventObject();
		}
		
		if (sender == null)
		{
			sender = this.getEventSource();
		}

		if (sender == null)
		{
			sender = this;
		}

		var args = [sender, evt];
		
		for (var i = 0; i < this.eventListeners.length; i += 2)
		{
			var listen = this.eventListeners[i];
			
			if (listen == null || listen == evt.getName())
			{
				this.eventListeners[i+1].apply(this, args);
			}
		}
	}
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
var mxEvent =
{

	/**
	 * Class: mxEvent
	 * 
	 * Cross-browser DOM event support. For internal event handling,
	 * <mxEventSource> and the graph event dispatch loop in <mxGraph> are used.
	 * 
	 * Memory Leaks:
	 * 
	 * Use this class for adding and removing listeners to/from DOM nodes. The
	 * <removeAllListeners> function is provided to remove all listeners that
	 * have been added using <addListener>. The function should be invoked when
	 * the last reference is removed in the JavaScript code, typically when the
	 * referenced DOM node is removed from the DOM, and helps to reduce memory
	 * leaks in IE6.
	 * 
	 * Variable: objects
	 * 
	 * Contains all objects where any listener was added using <addListener>.
	 * This is used to reduce memory leaks in IE, see <mxClient.dispose>.
	 */
	objects: [],

	 /**
	  * Function: addListener
	  * 
	  * Binds the function to the specified event on the given element. Use
	  * <mxUtils.bind> in order to bind the "this" keyword inside the function
	  * to a given execution scope.
	  */
	addListener: function()
	{
		var updateListenerList = function(element, eventName, funct)
		{
			if (element.mxListenerList == null)
			{
				element.mxListenerList = [];
				mxEvent.objects.push(element);
			}
			
			var entry = {name: eventName, f: funct};
			element.mxListenerList.push(entry);
		};
		
		if (window.addEventListener)
		{
			return function(element, eventName, funct)
			{
				element.addEventListener(eventName, funct, false);
				updateListenerList(element, eventName, funct);
			};
		}
		else
		{
			return function(element, eventName, funct)
			{
				element.attachEvent('on' + eventName, funct);
				updateListenerList(element, eventName, funct);				
			};
		}
	}(),

	/**
	 * Function: removeListener
	 *
	 * Removes the specified listener from the given element.
	 */
	removeListener: function()
	{
		var updateListener = function(element, eventName, funct)
		{
			if (element.mxListenerList != null)
			{
				var listenerCount = element.mxListenerList.length;
				
				for (var i = 0; i < listenerCount; i++)
				{
					var entry = element.mxListenerList[i];
					
					if (entry.f == funct)
					{
						element.mxListenerList.splice(i, 1);
						break;
					}
				}
				
				if (element.mxListenerList.length == 0)
				{
					element.mxListenerList = null;
					
					var idx = mxUtils.indexOf(mxEvent.objects, element);
					
					if (idx >= 0)
					{
						mxEvent.objects.splice(idx, 1);
					}
				}
			}
		};
		
		if (window.removeEventListener)
		{
			return function(element, eventName, funct)
			{
				element.removeEventListener(eventName, funct, false);
				updateListener(element, eventName, funct);
			};
		}
		else
		{
			return function(element, eventName, funct)
			{
				element.detachEvent('on' + eventName, funct);
				updateListener(element, eventName, funct);
			};
		}
	}(),

	/**
	 * Function: removeAllListeners
	 * 
	 * Removes all listeners from the given element.
	 */
	removeAllListeners: function(element)
	{
		var list = element.mxListenerList;

		if (list != null)
		{
			while (list.length > 0)
			{
				var entry = list[0];
				mxEvent.removeListener(element, entry.name, entry.f);
			}
		}
	},
	
	/**
	 * Function: addGestureListeners
	 * 
	 * Adds the given listeners for touch, mouse and/or pointer events. If
	 * <mxClient.IS_POINTER> is true then MSPointerEvents will be registered,
	 * else the respective mouse events will be registered. If <mxClient.IS_POINTER>
	 * is false and <mxClient.IS_TOUCH> is true then the respective touch events
	 * will be registered as well as the mouse events.
	 */
	addGestureListeners: function(node, startListener, moveListener, endListener)
	{
		if (startListener != null)
		{
			mxEvent.addListener(node, (mxClient.IS_POINTER) ? 'MSPointerDown' : 'mousedown', startListener);
		}
		
		if (moveListener != null)
		{
			mxEvent.addListener(node, (mxClient.IS_POINTER) ? 'MSPointerMove' : 'mousemove', moveListener);
		}
		
		if (endListener != null)
		{
			mxEvent.addListener(node, (mxClient.IS_POINTER) ? 'MSPointerUp' : 'mouseup', endListener);
		}
		
		if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
		{
			if (startListener != null)
			{
				mxEvent.addListener(node, 'touchstart', startListener);
			}
			
			if (moveListener != null)
			{
				mxEvent.addListener(node, 'touchmove', moveListener);
			}
			
			if (endListener != null)
			{
				mxEvent.addListener(node, 'touchend', endListener);
			}
		}
	},
	
	/**
	 * Function: removeGestureListeners
	 * 
	 * Removes the given listeners from mousedown, mousemove, mouseup and the
	 * respective touch events if <mxClient.IS_TOUCH> is true.
	 */
	removeGestureListeners: function(node, startListener, moveListener, endListener)
	{
		if (startListener != null)
		{
			mxEvent.removeListener(node, (mxClient.IS_POINTER) ? 'MSPointerDown' : 'mousedown', startListener);
		}
		
		if (moveListener != null)
		{
			mxEvent.removeListener(node, (mxClient.IS_POINTER) ? 'MSPointerMove' : 'mousemove', moveListener);
		}
		
		if (endListener != null)
		{
			mxEvent.removeListener(node, (mxClient.IS_POINTER) ? 'MSPointerUp' : 'mouseup', endListener);
		}
		
		if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
		{
			if (startListener != null)
			{
				mxEvent.removeListener(node, 'touchstart', startListener);
			}
			
			if (moveListener != null)
			{
				mxEvent.removeListener(node, 'touchmove', moveListener);
			}
			
			if (endListener != null)
			{
				mxEvent.removeListener(node, 'touchend', endListener);
			}
		}
	},
	
	/**
	 * Function: redirectMouseEvents
	 *
	 * Redirects the mouse events from the given DOM node to the graph dispatch
	 * loop using the event and given state as event arguments. State can
	 * either be an instance of <mxCellState> or a function that returns an
	 * <mxCellState>. The down, move, up and dblClick arguments are optional
	 * functions that take the trigger event as arguments and replace the
	 * default behaviour.
	 */
	redirectMouseEvents: function(node, graph, state, down, move, up, dblClick)
	{
		var getState = function(evt)
		{
			return (typeof(state) == 'function') ? state(evt) : state;
		};
		
		mxEvent.addGestureListeners(node, function (evt)
		{
			if (down != null)
			{
				down(evt);
			}
			else if (!mxEvent.isConsumed(evt))
			{
				graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt, getState(evt)));
			}
		},
		function (evt)
		{
			if (move != null)
			{
				move(evt);
			}
			else if (!mxEvent.isConsumed(evt))
			{
				graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt, getState(evt)));
			}
		},
		function (evt)
		{
			if (up != null)
			{
				up(evt);
			}
			else if (!mxEvent.isConsumed(evt))
			{
				graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt, getState(evt)));
			}
		});

		mxEvent.addListener(node, 'dblclick', function (evt)
		{
			if (dblClick != null)
			{
				dblClick(evt);
			}
			else if (!mxEvent.isConsumed(evt))
			{
				var tmp = getState(evt);
				graph.dblClick(evt, (tmp != null) ? tmp.cell : null);
			}
		});
	},

	/**
	 * Function: release
	 * 
	 * Removes the known listeners from the given DOM node and its descendants.
	 * 
	 * Parameters:
	 * 
	 * element - DOM node to remove the listeners from.
	 */
	release: function(element)
	{
		if (element != null)
		{
			mxEvent.removeAllListeners(element);
			
			var children = element.childNodes;
			
			if (children != null)
			{
		        var childCount = children.length;
		        
		        for (var i = 0; i < childCount; i += 1)
		        {
		        	mxEvent.release(children[i]);
		        }
		    }
		}
	},

	/**
	 * Function: addMouseWheelListener
	 * 
	 * Installs the given function as a handler for mouse wheel events. The
	 * function has two arguments: the mouse event and a boolean that specifies
	 * if the wheel was moved up or down.
	 * 
	 * This has been tested with IE 6 and 7, Firefox (all versions), Opera and
	 * Safari. It does currently not work on Safari for Mac.
	 * 
	 * Example:
	 * 
	 * (code)
	 * mxEvent.addMouseWheelListener(function (evt, up)
	 * {
	 *   mxLog.show();
	 *   mxLog.debug('mouseWheel: up='+up);
	 * });
	 *(end)
	 * 
	 * Parameters:
	 * 
	 * funct - Handler function that takes the event argument and a boolean up
	 * argument for the mousewheel direction.
	 */
	addMouseWheelListener: function(funct)
	{
		if (funct != null)
		{
			var wheelHandler = function(evt)
			{
				// IE does not give an event object but the
				// global event object is the mousewheel event
				// at this point in time.
				if (evt == null)
				{
					evt = window.event;
				}
			
				var delta = 0;
				
				if (mxClient.IS_FF)
				{
					delta = -evt.detail / 2;
				}
				else
				{
					delta = evt.wheelDelta / 120;
				}
				
				// Handles the event using the given function
				if (delta != 0)
				{
					funct(evt, delta > 0);
				}
			};
	
			// Webkit has NS event API, but IE event name and details 
			if (mxClient.IS_NS && document.documentMode == null)
			{
				var eventName = (mxClient.IS_SF || 	mxClient.IS_GC) ? 'mousewheel' : 'DOMMouseScroll';
				mxEvent.addListener(window, eventName, wheelHandler);
			}
			else
			{
				mxEvent.addListener(document, 'mousewheel', wheelHandler);
			}
		}
	},
	
	/**
	 * Function: disableContextMenu
	 *
	 * Disables the context menu for the given element.
	 */
	disableContextMenu: function()
	{
		if (mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9))
		{
			return function(element)
			{
				mxEvent.addListener(element, 'contextmenu', function()
				{
					return false;
				});
			};
		}
		else
		{
			return function(element)
			{
				element.setAttribute('oncontextmenu', 'return false;');
			};		
		}
	}(),
	
	/**
	 * Function: getSource
	 * 
	 * Returns the event's target or srcElement depending on the browser.
	 */
	getSource: function(evt)
	{
		return (evt.srcElement != null) ? evt.srcElement : evt.target;
	},

	/**
	 * Function: isConsumed
	 * 
	 * Returns true if the event has been consumed using <consume>.
	 */
	isConsumed: function(evt)
	{
		return evt.isConsumed != null && evt.isConsumed;
	},

	/**
	 * Function: isTouchEvent
	 * 
	 * Returns true if the event was generated using a touch device (not a pen or mouse).
	 */
	isTouchEvent: function(evt)
	{
		return (evt.pointerType != null) ? (evt.pointerType == 'touch' || evt.pointerType ===
			evt.MSPOINTER_TYPE_TOUCH) : ((evt.mozInputSource != null) ?
					evt.mozInputSource == 5 : evt.type.indexOf('touch') == 0);
	},

	/**
	 * Function: isMultiTouchEvent
	 * 
	 * Returns true if the event was generated using a touch device (not a pen or mouse).
	 */
	isMultiTouchEvent: function(evt)
	{
		return (evt.type != null && evt.type.indexOf('touch') == 0 && evt.touches != null && evt.touches.length > 1);
	},

	/**
	 * Function: isMouseEvent
	 * 
	 * Returns true if the event was generated using a mouse (not a pen or touch device).
	 */
	isMouseEvent: function(evt)
	{
		return (evt.pointerType != null) ? (evt.pointerType == 'mouse' || evt.pointerType ===
			evt.MSPOINTER_TYPE_MOUSE) : ((evt.mozInputSource != null) ?
				evt.mozInputSource == 1 : evt.type.indexOf('mouse') == 0);
	},
	
	/**
	 * Function: isLeftMouseButton
	 * 
	 * Returns true if the left mouse button is pressed for the given event.
	 * To check if a button is pressed during a mouseMove you should use the
	 * <mxGraph.isMouseDown> property. Note that this returns true in Firefox
	 * for control+left-click on the Mac.
	 */
	isLeftMouseButton: function(evt)
	{
		return evt.button == ((mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 1 : 0);
	},
	
	/**
	 * Function: isMiddleMouseButton
	 * 
	 * Returns true if the middle mouse button is pressed for the given event.
	 * To check if a button is pressed during a mouseMove you should use the
	 * <mxGraph.isMouseDown> property.
	 */
	isMiddleMouseButton: function(evt)
	{
		return evt.button == ((mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) ? 4 : 1);
	},
	
	/**
	 * Function: isRightMouseButton
	 * 
	 * Returns true if the right mouse button was pressed. Note that this
	 * button might not be available on some systems. For handling a popup
	 * trigger <isPopupTrigger> should be used.
	 */
	isRightMouseButton: function(evt)
	{
		return evt.button == 2;
	},

	/**
	 * Function: isPopupTrigger
	 * 
	 * Returns true if the event is a popup trigger. This implementation
	 * returns true if the right button or the left button and control was
	 * pressed on a Mac.
	 */
	isPopupTrigger: function(evt)
	{
		return mxEvent.isRightMouseButton(evt) || (mxClient.IS_MAC && mxEvent.isControlDown(evt) &&
			!mxEvent.isShiftDown(evt) && !mxEvent.isMetaDown(evt) && !mxEvent.isAltDown(evt));
	},

	/**
	 * Function: isShiftDown
	 * 
	 * Returns true if the shift key is pressed for the given event.
	 */
	isShiftDown: function(evt)
	{
		return (evt != null) ? evt.shiftKey : false;
	},

	/**
	 * Function: isAltDown
	 * 
	 * Returns true if the alt key is pressed for the given event.
	 */
	isAltDown: function(evt)
	{
		return (evt != null) ? evt.altKey : false;
	},

	/**
	 * Function: isControlDown
	 * 
	 * Returns true if the control key is pressed for the given event.
	 */
	isControlDown: function(evt)
	{
		return (evt != null) ? evt.ctrlKey : false;
	},

	/**
	 * Function: isMetaDown
	 * 
	 * Returns true if the meta key is pressed for the given event.
	 */
	isMetaDown: function(evt)
	{
		return (evt != null) ? evt.metaKey : false;
	},

	/**
	 * Function: getMainEvent
	 * 
	 * Returns the touch or mouse event that contains the mouse coordinates.
	 */
	getMainEvent: function(e)
	{
		if ((e.type == 'touchstart' || e.type == 'touchmove') && e.touches != null && e.touches[0] != null)
		{
			e = e.touches[0];
		}
		else if (e.type == 'touchend' && e.changedTouches != null && e.changedTouches[0] != null)
		{
			e = e.changedTouches[0];
		}
		
		return e;
	},
	
	/**
	 * Function: getClientX
	 * 
	 * Returns true if the meta key is pressed for the given event.
	 */
	getClientX: function(e)
	{
		return mxEvent.getMainEvent(e).clientX;
	},

	/**
	 * Function: getClientY
	 * 
	 * Returns true if the meta key is pressed for the given event.
	 */
	getClientY: function(e)
	{
		return mxEvent.getMainEvent(e).clientY;
	},

	/**
	 * Function: consume
	 * 
	 * Consumes the given event.
	 * 
	 * Parameters:
	 * 
	 * evt - Native event to be consumed.
	 * preventDefault - Optional boolean to prevent the default for the event.
	 * Default is true.
	 * stopPropagation - Option boolean to stop event propagation. Default is
	 * true.
	 */
	consume: function(evt, preventDefault, stopPropagation)
	{
		preventDefault = (preventDefault != null) ? preventDefault : true;
		stopPropagation = (stopPropagation != null) ? stopPropagation : true;
		
		if (preventDefault)
		{
			if (evt.preventDefault)
			{
				if (stopPropagation)
				{
					evt.stopPropagation();
				}
				
				evt.preventDefault();
			}
			else if (stopPropagation)
			{
				evt.cancelBubble = true;
			}
		}

		// Opera
		evt.isConsumed = true;

		// Other browsers
		if (!evt.preventDefault)
		{
			evt.returnValue = false;
		}
	},
	
	//
	// Special handles in mouse events
	//
	
	/**
	 * Variable: LABEL_HANDLE
	 * 
	 * Index for the label handle in an mxMouseEvent. This should be a negative
	 * value that does not interfere with any possible handle indices. Default
	 * is -1.
	 */
	LABEL_HANDLE: -1,
	
	/**
	 * Variable: ROTATION_HANDLE
	 * 
	 * Index for the rotation handle in an mxMouseEvent. This should be a
	 * negative value that does not interfere with any possible handle indices.
	 * Default is -2.
	 */
	ROTATION_HANDLE: -2,
	
	/**
	 * Variable: CUSTOM_HANDLE
	 * 
	 * Start index for the custom handles in an mxMouseEvent. This should be a
	 * negative value and is the start index which is decremented for each
	 * custom handle. Default is -100.
	 */
	CUSTOM_HANDLE: -100,
	
	/**
	 * Variable: VIRTUAL_HANDLE
	 * 
	 * Start index for the virtual handles in an mxMouseEvent. This should be a
	 * negative value and is the start index which is decremented for each
	 * virtual handle. Default is -100000. This assumes that there are no more
	 * than VIRTUAL_HANDLE - CUSTOM_HANDLE custom handles.
	 * 
	 */
	VIRTUAL_HANDLE: -100000,
	
	//
	// Event names
	//
	
	/**
	 * Variable: MOUSE_DOWN
	 *
	 * Specifies the event name for mouseDown.
	 */
	MOUSE_DOWN: 'mouseDown',
	
	/**
	 * Variable: MOUSE_MOVE
	 *
	 * Specifies the event name for mouseMove. 
	 */
	MOUSE_MOVE: 'mouseMove',
	
	/**
	 * Variable: MOUSE_UP
	 *
	 * Specifies the event name for mouseUp. 
	 */
	MOUSE_UP: 'mouseUp',

	/**
	 * Variable: ACTIVATE
	 *
	 * Specifies the event name for activate.
	 */
	ACTIVATE: 'activate',

	/**
	 * Variable: RESIZE_START
	 *
	 * Specifies the event name for resizeStart.
	 */
	RESIZE_START: 'resizeStart',

	/**
	 * Variable: RESIZE
	 *
	 * Specifies the event name for resize.
	 */
	RESIZE: 'resize',

	/**
	 * Variable: RESIZE_END
	 *
	 * Specifies the event name for resizeEnd.
	 */
	RESIZE_END: 'resizeEnd',

	/**
	 * Variable: MOVE_START
	 *
	 * Specifies the event name for moveStart.
	 */
	MOVE_START: 'moveStart',

	/**
	 * Variable: MOVE
	 *
	 * Specifies the event name for move.
	 */
	MOVE: 'move',

	/**
	 * Variable: MOVE_END
	 *
	 * Specifies the event name for moveEnd.
	 */
	MOVE_END: 'moveEnd',

	/**
	 * Variable: PAN_START
	 *
	 * Specifies the event name for panStart.
	 */
	PAN_START: 'panStart',

	/**
	 * Variable: PAN
	 *
	 * Specifies the event name for pan.
	 */
	PAN: 'pan',

	/**
	 * Variable: PAN_END
	 *
	 * Specifies the event name for panEnd.
	 */
	PAN_END: 'panEnd',

	/**
	 * Variable: MINIMIZE
	 *
	 * Specifies the event name for minimize.
	 */
	MINIMIZE: 'minimize',

	/**
	 * Variable: NORMALIZE
	 *
	 * Specifies the event name for normalize.
	 */
	NORMALIZE: 'normalize',

	/**
	 * Variable: MAXIMIZE
	 *
	 * Specifies the event name for maximize.
	 */
	MAXIMIZE: 'maximize',

	/**
	 * Variable: HIDE
	 *
	 * Specifies the event name for hide.
	 */
	HIDE: 'hide',

	/**
	 * Variable: SHOW
	 *
	 * Specifies the event name for show.
	 */
	SHOW: 'show',

	/**
	 * Variable: CLOSE
	 *
	 * Specifies the event name for close.
	 */
	CLOSE: 'close',

	/**
	 * Variable: DESTROY
	 *
	 * Specifies the event name for destroy.
	 */
	DESTROY: 'destroy',

	/**
	 * Variable: REFRESH
	 *
	 * Specifies the event name for refresh.
	 */
	REFRESH: 'refresh',

	/**
	 * Variable: SIZE
	 *
	 * Specifies the event name for size.
	 */
	SIZE: 'size',
	
	/**
	 * Variable: SELECT
	 *
	 * Specifies the event name for select.
	 */
	SELECT: 'select',

	/**
	 * Variable: FIRED
	 *
	 * Specifies the event name for fired.
	 */
	FIRED: 'fired',

	/**
	 * Variable: FIRE_MOUSE_EVENT
	 *
	 * Specifies the event name for fireMouseEvent.
	 */
	FIRE_MOUSE_EVENT: 'fireMouseEvent',

	/**
	 * Variable: GESTURE
	 *
	 * Specifies the event name for gesture.
	 */
	GESTURE: 'gesture',

	/**
	 * Variable: TAP_AND_HOLD
	 *
	 * Specifies the event name for tapAndHold.
	 */
	TAP_AND_HOLD: 'tapAndHold',

	/**
	 * Variable: GET
	 *
	 * Specifies the event name for get.
	 */
	GET: 'get',

	/**
	 * Variable: RECEIVE
	 *
	 * Specifies the event name for receive.
	 */
	RECEIVE: 'receive',

	/**
	 * Variable: CONNECT
	 *
	 * Specifies the event name for connect.
	 */
	CONNECT: 'connect',

	/**
	 * Variable: DISCONNECT
	 *
	 * Specifies the event name for disconnect.
	 */
	DISCONNECT: 'disconnect',

	/**
	 * Variable: SUSPEND
	 *
	 * Specifies the event name for suspend.
	 */
	SUSPEND: 'suspend',

	/**
	 * Variable: RESUME
	 *
	 * Specifies the event name for suspend.
	 */
	RESUME: 'resume',

	/**
	 * Variable: MARK
	 *
	 * Specifies the event name for mark.
	 */
	MARK: 'mark',

	/**
	 * Variable: ROOT
	 *
	 * Specifies the event name for root.
	 */
	ROOT: 'root',

	/**
	 * Variable: POST
	 *
	 * Specifies the event name for post.
	 */
	POST: 'post',

	/**
	 * Variable: OPEN
	 *
	 * Specifies the event name for open.
	 */
	OPEN: 'open',

	/**
	 * Variable: SAVE
	 *
	 * Specifies the event name for open.
	 */
	SAVE: 'save',

	/**
	 * Variable: BEFORE_ADD_VERTEX
	 *
	 * Specifies the event name for beforeAddVertex.
	 */
	BEFORE_ADD_VERTEX: 'beforeAddVertex',

	/**
	 * Variable: ADD_VERTEX
	 *
	 * Specifies the event name for addVertex.
	 */
	ADD_VERTEX: 'addVertex',

	/**
	 * Variable: AFTER_ADD_VERTEX
	 *
	 * Specifies the event name for afterAddVertex.
	 */
	AFTER_ADD_VERTEX: 'afterAddVertex',

	/**
	 * Variable: DONE
	 *
	 * Specifies the event name for done.
	 */
	DONE: 'done',

	/**
	 * Variable: EXECUTE
	 *
	 * Specifies the event name for execute.
	 */
	EXECUTE: 'execute',

	/**
	 * Variable: EXECUTED
	 *
	 * Specifies the event name for executed.
	 */
	EXECUTED: 'executed',

	/**
	 * Variable: BEGIN_UPDATE
	 *
	 * Specifies the event name for beginUpdate.
	 */
	BEGIN_UPDATE: 'beginUpdate',

	/**
	 * Variable: START_EDIT
	 *
	 * Specifies the event name for startEdit.
	 */
	START_EDIT: 'startEdit',

	/**
	 * Variable: END_UPDATE
	 *
	 * Specifies the event name for endUpdate.
	 */
	END_UPDATE: 'endUpdate',

	/**
	 * Variable: END_EDIT
	 *
	 * Specifies the event name for endEdit.
	 */
	END_EDIT: 'endEdit',

	/**
	 * Variable: BEFORE_UNDO
	 *
	 * Specifies the event name for beforeUndo.
	 */
	BEFORE_UNDO: 'beforeUndo',

	/**
	 * Variable: UNDO
	 *
	 * Specifies the event name for undo.
	 */
	UNDO: 'undo',

	/**
	 * Variable: REDO
	 *
	 * Specifies the event name for redo.
	 */
	REDO: 'redo',

	/**
	 * Variable: CHANGE
	 *
	 * Specifies the event name for change.
	 */
	CHANGE: 'change',

	/**
	 * Variable: NOTIFY
	 *
	 * Specifies the event name for notify.
	 */
	NOTIFY: 'notify',

	/**
	 * Variable: LAYOUT_CELLS
	 *
	 * Specifies the event name for layoutCells.
	 */
	LAYOUT_CELLS: 'layoutCells',

	/**
	 * Variable: CLICK
	 *
	 * Specifies the event name for click.
	 */
	CLICK: 'click',

	/**
	 * Variable: SCALE
	 *
	 * Specifies the event name for scale.
	 */
	SCALE: 'scale',

	/**
	 * Variable: TRANSLATE
	 *
	 * Specifies the event name for translate.
	 */
	TRANSLATE: 'translate',

	/**
	 * Variable: SCALE_AND_TRANSLATE
	 *
	 * Specifies the event name for scaleAndTranslate.
	 */
	SCALE_AND_TRANSLATE: 'scaleAndTranslate',

	/**
	 * Variable: UP
	 *
	 * Specifies the event name for up.
	 */
	UP: 'up',

	/**
	 * Variable: DOWN
	 *
	 * Specifies the event name for down.
	 */
	DOWN: 'down',

	/**
	 * Variable: ADD
	 *
	 * Specifies the event name for add.
	 */
	ADD: 'add',

	/**
	 * Variable: REMOVE
	 *
	 * Specifies the event name for remove.
	 */
	REMOVE: 'remove',
	
	/**
	 * Variable: CLEAR
	 *
	 * Specifies the event name for clear.
	 */
	CLEAR: 'clear',

	/**
	 * Variable: ADD_CELLS
	 *
	 * Specifies the event name for addCells.
	 */
	ADD_CELLS: 'addCells',

	/**
	 * Variable: CELLS_ADDED
	 *
	 * Specifies the event name for cellsAdded.
	 */
	CELLS_ADDED: 'cellsAdded',

	/**
	 * Variable: MOVE_CELLS
	 *
	 * Specifies the event name for moveCells.
	 */
	MOVE_CELLS: 'moveCells',

	/**
	 * Variable: CELLS_MOVED
	 *
	 * Specifies the event name for cellsMoved.
	 */
	CELLS_MOVED: 'cellsMoved',

	/**
	 * Variable: RESIZE_CELLS
	 *
	 * Specifies the event name for resizeCells.
	 */
	RESIZE_CELLS: 'resizeCells',

	/**
	 * Variable: CELLS_RESIZED
	 *
	 * Specifies the event name for cellsResized.
	 */
	CELLS_RESIZED: 'cellsResized',

	/**
	 * Variable: TOGGLE_CELLS
	 *
	 * Specifies the event name for toggleCells.
	 */
	TOGGLE_CELLS: 'toggleCells',

	/**
	 * Variable: CELLS_TOGGLED
	 *
	 * Specifies the event name for cellsToggled.
	 */
	CELLS_TOGGLED: 'cellsToggled',

	/**
	 * Variable: ORDER_CELLS
	 *
	 * Specifies the event name for orderCells.
	 */
	ORDER_CELLS: 'orderCells',

	/**
	 * Variable: CELLS_ORDERED
	 *
	 * Specifies the event name for cellsOrdered.
	 */
	CELLS_ORDERED: 'cellsOrdered',

	/**
	 * Variable: REMOVE_CELLS
	 *
	 * Specifies the event name for removeCells.
	 */
	REMOVE_CELLS: 'removeCells',

	/**
	 * Variable: CELLS_REMOVED
	 *
	 * Specifies the event name for cellsRemoved.
	 */
	CELLS_REMOVED: 'cellsRemoved',

	/**
	 * Variable: GROUP_CELLS
	 *
	 * Specifies the event name for groupCells.
	 */
	GROUP_CELLS: 'groupCells',

	/**
	 * Variable: UNGROUP_CELLS
	 *
	 * Specifies the event name for ungroupCells.
	 */
	UNGROUP_CELLS: 'ungroupCells',

	/**
	 * Variable: REMOVE_CELLS_FROM_PARENT
	 *
	 * Specifies the event name for removeCellsFromParent.
	 */
	REMOVE_CELLS_FROM_PARENT: 'removeCellsFromParent',

	/**
	 * Variable: FOLD_CELLS
	 *
	 * Specifies the event name for foldCells.
	 */
	FOLD_CELLS: 'foldCells',

	/**
	 * Variable: CELLS_FOLDED
	 *
	 * Specifies the event name for cellsFolded.
	 */
	CELLS_FOLDED: 'cellsFolded',

	/**
	 * Variable: ALIGN_CELLS
	 *
	 * Specifies the event name for alignCells.
	 */
	ALIGN_CELLS: 'alignCells',

	/**
	 * Variable: LABEL_CHANGED
	 *
	 * Specifies the event name for labelChanged.
	 */
	LABEL_CHANGED: 'labelChanged',

	/**
	 * Variable: CONNECT_CELL
	 *
	 * Specifies the event name for connectCell.
	 */
	CONNECT_CELL: 'connectCell',

	/**
	 * Variable: CELL_CONNECTED
	 *
	 * Specifies the event name for cellConnected.
	 */
	CELL_CONNECTED: 'cellConnected',

	/**
	 * Variable: SPLIT_EDGE
	 *
	 * Specifies the event name for splitEdge.
	 */
	SPLIT_EDGE: 'splitEdge',

	/**
	 * Variable: FLIP_EDGE
	 *
	 * Specifies the event name for flipEdge.
	 */
	FLIP_EDGE: 'flipEdge',

	/**
	 * Variable: START_EDITING
	 *
	 * Specifies the event name for startEditing.
	 */
	START_EDITING: 'startEditing',

	/**
	 * Variable: EDITING_STARTED
	 *
	 * Specifies the event name for editingStarted.
	 */
	EDITING_STARTED: 'editingStarted',

	/**
	 * Variable: EDITING_STOPPED
	 *
	 * Specifies the event name for editingStopped.
	 */
	EDITING_STOPPED: 'editingStopped',

	/**
	 * Variable: ADD_OVERLAY
	 *
	 * Specifies the event name for addOverlay.
	 */
	ADD_OVERLAY: 'addOverlay',

	/**
	 * Variable: REMOVE_OVERLAY
	 *
	 * Specifies the event name for removeOverlay.
	 */
	REMOVE_OVERLAY: 'removeOverlay',

	/**
	 * Variable: UPDATE_CELL_SIZE
	 *
	 * Specifies the event name for updateCellSize.
	 */
	UPDATE_CELL_SIZE: 'updateCellSize',

	/**
	 * Variable: ESCAPE
	 *
	 * Specifies the event name for escape.
	 */
	ESCAPE: 'escape',

	/**
	 * Variable: CLICK
	 *
	 * Specifies the event name for click.
	 */
	CLICK: 'click',

	/**
	 * Variable: DOUBLE_CLICK
	 *
	 * Specifies the event name for doubleClick.
	 */
	DOUBLE_CLICK: 'doubleClick',

	/**
	 * Variable: START
	 *
	 * Specifies the event name for start.
	 */
	START: 'start',

	/**
	 * Variable: RESET
	 *
	 * Specifies the event name for reset.
	 */
	RESET: 'reset'

};


/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxUndoableEdit
 * 
 * Implements a composite undoable edit. Here is an example for a custom change
 * which gets executed via the model:
 * 
 * (code)
 * function CustomChange(model, name)
 * {
 *   this.model = model;
 *   this.name = name;
 *   this.previous = name;
 * };
 * 
 * CustomChange.prototype.execute = function()
 * {
 *   var tmp = this.model.name;
 *   this.model.name = this.previous;
 *   this.previous = tmp;
 * };
 * 
 * var name = prompt('Enter name');
 * graph.model.execute(new CustomChange(graph.model, name));
 * (end)
 * 
 * Event: mxEvent.EXECUTED
 * 
 * Fires between START_EDIT and END_EDIT after an atomic change was executed.
 * The <code>change</code> property contains the change that was executed.
 * 
 * Event: mxEvent.START_EDIT
 * 
 * Fires before a set of changes will be executed in <undo> or <redo>.
 * This event contains no properties.
 * 
 * Event: mxEvent.END_EDIT
 *
 * Fires after a set of changeswas executed in <undo> or <redo>.
 * This event contains no properties.
 * 
 * Constructor: mxUndoableEdit
 * 
 * Constructs a new undoable edit for the given source.
 */
function mxUndoableEdit(source, significant)
{
	this.source = source;
	this.changes = [];
	this.significant = (significant != null) ? significant : true;
};

/**
 * Variable: source
 * 
 * Specifies the source of the edit.
 */
mxUndoableEdit.prototype.source = null;

/**
 * Variable: changes
 * 
 * Array that contains the changes that make up this edit. The changes are
 * expected to either have an undo and redo function, or an execute
 * function. Default is an empty array.
 */
mxUndoableEdit.prototype.changes = null;

/**
 * Variable: significant
 * 
 * Specifies if the undoable change is significant.
 * Default is true.
 */
mxUndoableEdit.prototype.significant = null;

/**
 * Variable: undone
 * 
 * Specifies if this edit has been undone. Default is false.
 */
mxUndoableEdit.prototype.undone = false;

/**
 * Variable: redone
 * 
 * Specifies if this edit has been redone. Default is false.
 */
mxUndoableEdit.prototype.redone = false;

/**
 * Function: isEmpty
 * 
 * Returns true if the this edit contains no changes.
 */
mxUndoableEdit.prototype.isEmpty = function()
{
	return this.changes.length == 0;
};

/**
 * Function: isSignificant
 * 
 * Returns <significant>.
 */
mxUndoableEdit.prototype.isSignificant = function()
{
	return this.significant;
};

/**
 * Function: add
 * 
 * Adds the specified change to this edit. The change is an object that is
 * expected to either have an undo and redo, or an execute function.
 */
mxUndoableEdit.prototype.add = function(change)
{
	this.changes.push(change);
};

/**
 * Function: notify
 * 
 * Hook to notify any listeners of the changes after an <undo> or <redo>
 * has been carried out. This implementation is empty.
 */
mxUndoableEdit.prototype.notify = function() { };

/**
 * Function: die
 * 
 * Hook to free resources after the edit has been removed from the command
 * history. This implementation is empty.
 */
mxUndoableEdit.prototype.die = function() { };

/**
 * Function: undo
 * 
 * Undoes all changes in this edit.
 */
mxUndoableEdit.prototype.undo = function()
{
	if (!this.undone)
	{
		this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
		var count = this.changes.length;
		
		for (var i = count - 1; i >= 0; i--)
		{
			var change = this.changes[i];
			
			if (change.execute != null)
			{
				change.execute();
			}
			else if (change.undo != null)
			{
				change.undo();
			}
			
			// New global executed event
			this.source.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));
		}
		
		this.undone = true;
		this.redone = false;
		this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
	}
	
	this.notify();
};

/**
 * Function: redo
 * 
 * Redoes all changes in this edit.
 */
mxUndoableEdit.prototype.redo = function()
{
	if (!this.redone)
	{
		this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
		var count = this.changes.length;
		
		for (var i = 0; i < count; i++)
		{
			var change = this.changes[i];
			
			if (change.execute != null)
			{
				change.execute();
			}
			else if (change.redo != null)
			{
				change.redo();
			}
			
			// New global executed event
			this.source.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));
		}
		
		this.undone = false;
		this.redone = true;
		this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
	}
	
	this.notify();
};


/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxGraphModel
 * 
 * Extends <mxEventSource> to implement a graph model. The graph model acts as
 * a wrapper around the cells which are in charge of storing the actual graph
 * datastructure. The model acts as a transactional wrapper with event
 * notification for all changes, whereas the cells contain the atomic
 * operations for updating the actual datastructure.
 * 
 * Layers:
 * 
 * The cell hierarchy in the model must have a top-level root cell which
 * contains the layers (typically one default layer), which in turn contain the
 * top-level cells of the layers. This means each cell is contained in a layer.
 * If no layers are required, then all new cells should be added to the default
 * layer.
 * 
 * Layers are useful for hiding and showing groups of cells, or for placing
 * groups of cells on top of other cells in the display. To identify a layer,
 * the <isLayer> function is used. It returns true if the parent of the given
 * cell is the root of the model.
 * 
 * Events:
 * 
 * See events section for more details. There is a new set of events for
 * tracking transactional changes as they happen. The events are called
 * startEdit for the initial beginUpdate, executed for each executed change
 * and endEdit for the terminal endUpdate. The executed event contains a
 * property called change which represents the change after execution.
 * 
 * Encoding the model:
 * 
 * To encode a graph model, use the following code:
 * 
 * (code)
 * var enc = new mxCodec();
 * var node = enc.encode(graph.getModel());
 * (end)
 * 
 * This will create an XML node that contains all the model information.
 * 
 * Encoding and decoding changes:
 * 
 * For the encoding of changes, a graph model listener is required that encodes
 * each change from the given array of changes.
 * 
 * (code)
 * model.addListener(mxEvent.CHANGE, function(sender, evt)
 * {
 *   var changes = evt.getProperty('edit').changes;
 *   var nodes = [];
 *   var codec = new mxCodec();
 * 
 *   for (var i = 0; i < changes.length; i++)
 *   {
 *     nodes.push(codec.encode(changes[i]));
 *   }
 *   // do something with the nodes
 * });
 * (end)
 * 
 * For the decoding and execution of changes, the codec needs a lookup function
 * that allows it to resolve cell IDs as follows:
 * 
 * (code)
 * var codec = new mxCodec();
 * codec.lookup = function(id)
 * {
 *   return model.getCell(id);
 * }
 * (end)
 * 
 * For each encoded change (represented by a node), the following code can be
 * used to carry out the decoding and create a change object.
 * 
 * (code)
 * var changes = [];
 * var change = codec.decode(node);
 * change.model = model;
 * change.execute();
 * changes.push(change);
 * (end)
 * 
 * The changes can then be dispatched using the model as follows.
 * 
 * (code)
 * var edit = new mxUndoableEdit(model, false);
 * edit.changes = changes;
 * 
 * edit.notify = function()
 * {
 *   edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
 *   	'edit', edit, 'changes', edit.changes));
 *   edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
 *   	'edit', edit, 'changes', edit.changes));
 * }
 * 
 * model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
 * model.fireEvent(new mxEventObject(mxEvent.CHANGE,
 * 		'edit', edit, 'changes', changes));
 * (end)
 *
 * Event: mxEvent.CHANGE
 *
 * Fires when an undoable edit is dispatched. The <code>edit</code> property
 * contains the <mxUndoableEdit>. The <code>changes</code> property contains
 * the array of atomic changes inside the undoable edit. The changes property
 * is <strong>deprecated</strong>, please use edit.changes instead.
 *
 * Example:
 * 
 * For finding newly inserted cells, the following code can be used:
 * 
 * (code)
 * graph.model.addListener(mxEvent.CHANGE, function(sender, evt)
 * {
 *   var changes = evt.getProperty('edit').changes;
 * 
 *   for (var i = 0; i < changes.length; i++)
 *   {
 *     var change = changes[i];
 *     
 *     if (change instanceof mxChildChange &&
 *       change.change.previous == null)
 *     {
 *       graph.startEditingAtCell(change.child);
 *       break;
 *     }
 *   }
 * });
 * (end)
 * 
 * 
 * Event: mxEvent.NOTIFY
 *
 * Same as <mxEvent.CHANGE>, this event can be used for classes that need to
 * implement a sync mechanism between this model and, say, a remote model. In
 * such a setup, only local changes should trigger a notify event and all
 * changes should trigger a change event.
 * 
 * Event: mxEvent.EXECUTE
 * 
 * Fires between begin- and endUpdate and after an atomic change was executed
 * in the model. The <code>change</code> property contains the atomic change
 * that was executed.
 * 
 * Event: mxEvent.EXECUTED
 * 
 * Fires between START_EDIT and END_EDIT after an atomic change was executed.
 * The <code>change</code> property contains the change that was executed.
 *
 * Event: mxEvent.BEGIN_UPDATE
 *
 * Fires after the <updateLevel> was incremented in <beginUpdate>. This event
 * contains no properties.
 * 
 * Event: mxEvent.START_EDIT
 *
 * Fires after the <updateLevel> was changed from 0 to 1. This event
 * contains no properties.
 * 
 * Event: mxEvent.END_UPDATE
 * 
 * Fires after the <updateLevel> was decreased in <endUpdate> but before any
 * notification or change dispatching. The <code>edit</code> property contains
 * the <currentEdit>.
 * 
 * Event: mxEvent.END_EDIT
 *
 * Fires after the <updateLevel> was changed from 1 to 0. This event
 * contains no properties.
 * 
 * Event: mxEvent.BEFORE_UNDO
 * 
 * Fires before the change is dispatched after the update level has reached 0
 * in <endUpdate>. The <code>edit</code> property contains the <curreneEdit>.
 * 
 * Event: mxEvent.UNDO
 * 
 * Fires after the change was dispatched in <endUpdate>. The <code>edit</code>
 * property contains the <currentEdit>.
 * 
 * Constructor: mxGraphModel
 * 
 * Constructs a new graph model. If no root is specified then a new root
 * <mxCell> with a default layer is created.
 * 
 * Parameters:
 * 
 * root - <mxCell> that represents the root cell.
 */
function mxGraphModel(root)
{
	this.currentEdit = this.createUndoableEdit();
	
	if (root != null)
	{
		this.setRoot(root);
	}
	else
	{
		this.clear();
	}
};

/**
 * Extends mxEventSource.
 */
mxGraphModel.prototype = new mxEventSource();
mxGraphModel.prototype.constructor = mxGraphModel;

/**
 * Variable: root
 * 
 * Holds the root cell, which in turn contains the cells that represent the
 * layers of the diagram as child cells. That is, the actual elements of the
 * diagram are supposed to live in the third generation of cells and below.
 */
mxGraphModel.prototype.root = null;

/**
 * Variable: cells
 * 
 * Maps from Ids to cells.
 */
mxGraphModel.prototype.cells = null;

/**
 * Variable: maintainEdgeParent
 * 
 * Specifies if edges should automatically be moved into the nearest common
 * ancestor of their terminals. Default is true.
 */
mxGraphModel.prototype.maintainEdgeParent = true;

/**
 * Variable: createIds
 * 
 * Specifies if the model should automatically create Ids for new cells.
 * Default is true.
 */
mxGraphModel.prototype.createIds = true;

/**
 * Variable: prefix
 * 
 * Defines the prefix of new Ids. Default is an empty string.
 */
mxGraphModel.prototype.prefix = '';

/**
 * Variable: postfix
 * 
 * Defines the postfix of new Ids. Default is an empty string.
 */
mxGraphModel.prototype.postfix = '';

/**
 * Variable: nextId
 * 
 * Specifies the next Id to be created. Initial value is 0.
 */
mxGraphModel.prototype.nextId = 0;

/**
 * Variable: currentEdit
 * 
 * Holds the changes for the current transaction. If the transaction is
 * closed then a new object is created for this variable using
 * <createUndoableEdit>.
 */
mxGraphModel.prototype.currentEdit = null;

/**
 * Variable: updateLevel
 * 
 * Counter for the depth of nested transactions. Each call to <beginUpdate>
 * will increment this number and each call to <endUpdate> will decrement
 * it. When the counter reaches 0, the transaction is closed and the
 * respective events are fired. Initial value is 0.
 */
mxGraphModel.prototype.updateLevel = 0;

/**
 * Variable: endingUpdate
 * 
 * True if the program flow is currently inside endUpdate.
 */
mxGraphModel.prototype.endingUpdate = false;

/**
 * Function: clear
 *
 * Sets a new root using <createRoot>.
 */
mxGraphModel.prototype.clear = function()
{
	this.setRoot(this.createRoot());
};

/**
 * Function: isCreateIds
 *
 * Returns <createIds>.
 */
mxGraphModel.prototype.isCreateIds = function()
{
	return this.createIds;
};

/**
 * Function: setCreateIds
 *
 * Sets <createIds>.
 */
mxGraphModel.prototype.setCreateIds = function(value)
{
	this.createIds = value;
};

/**
 * Function: createRoot
 *
 * Creates a new root cell with a default layer (child 0).
 */
mxGraphModel.prototype.createRoot = function()
{
	var cell = new mxCell();
	cell.insert(new mxCell());
	
	return cell;
};

/**
 * Function: getCell
 *
 * Returns the <mxCell> for the specified Id or null if no cell can be
 * found for the given Id.
 *
 * Parameters:
 * 
 * id - A string representing the Id of the cell.
 */
mxGraphModel.prototype.getCell = function(id)
{
	return (this.cells != null) ? this.cells[id] : null;
};

/**
 * Function: filterCells
 * 
 * Returns the cells from the given array where the fiven filter function
 * returns true.
 */
mxGraphModel.prototype.filterCells = function(cells, filter)
{
	var result = null;
	
	if (cells != null)
	{
		result = [];
		
		for (var i = 0; i < cells.length; i++)
		{
			if (filter(cells[i]))
			{
				result.push(cells[i]);
			}
		}
	}
	
	return result;
};

/**
 * Function: getDescendants
 * 
 * Returns all descendants of the given cell and the cell itself in an array.
 * 
 * Parameters:
 * 
 * parent - <mxCell> whose descendants should be returned.
 */
mxGraphModel.prototype.getDescendants = function(parent)
{
	return this.filterDescendants(null, parent);
};

/**
 * Function: filterDescendants
 * 
 * Visits all cells recursively and applies the specified filter function
 * to each cell. If the function returns true then the cell is added
 * to the resulting array. The parent and result paramters are optional.
 * If parent is not specified then the recursion starts at <root>.
 * 
 * Example:
 * The following example extracts all vertices from a given model:
 * (code)
 * var filter = function(cell)
 * {
 * 	return model.isVertex(cell);
 * }
 * var vertices = model.filterDescendants(filter);
 * (end)
 * 
 * Parameters:
 * 
 * filter - JavaScript function that takes an <mxCell> as an argument
 * and returns a boolean.
 * parent - Optional <mxCell> that is used as the root of the recursion.
 */
mxGraphModel.prototype.filterDescendants = function(filter, parent)
{
	// Creates a new array for storing the result
	var result = [];

	// Recursion starts at the root of the model
	parent = parent || this.getRoot();
	
	// Checks if the filter returns true for the cell
	// and adds it to the result array
	if (filter == null || filter(parent))
	{
		result.push(parent);
	}
	
	// Visits the children of the cell
	var childCount = this.getChildCount(parent);
	
	for (var i = 0; i < childCount; i++)
	{
		var child = this.getChildAt(parent, i);
		result = result.concat(this.filterDescendants(filter, child));
	}

	return result;
};

/**
 * Function: getRoot
 * 
 * Returns the root of the model or the topmost parent of the given cell.
 *
 * Parameters:
 * 
 * cell - Optional <mxCell> that specifies the child.
 */
mxGraphModel.prototype.getRoot = function(cell)
{
	var root = cell || this.root;
	
	if (cell != null)
	{
		while (cell != null)
		{
			root = cell;
			cell = this.getParent(cell);
		}
	}
	
	return root;
};

/**
 * Function: setRoot
 * 
 * Sets the <root> of the model using <mxRootChange> and adds the change to
 * the current transaction. This resets all datastructures in the model and
 * is the preferred way of clearing an existing model. Returns the new
 * root.
 * 
 * Example:
 * 
 * (code)
 * var root = new mxCell();
 * root.insert(new mxCell());
 * model.setRoot(root);
 * (end)
 *
 * Parameters:
 * 
 * root - <mxCell> that specifies the new root.
 */
mxGraphModel.prototype.setRoot = function(root)
{
	this.execute(new mxRootChange(this, root));
	
	return root;
};

/**
 * Function: rootChanged
 * 
 * Inner callback to change the root of the model and update the internal
 * datastructures, such as <cells> and <nextId>. Returns the previous root.
 *
 * Parameters:
 * 
 * root - <mxCell> that specifies the new root.
 */
mxGraphModel.prototype.rootChanged = function(root)
{
	var oldRoot = this.root;
	this.root = root;
	
	// Resets counters and datastructures
	this.nextId = 0;
	this.cells = null;
	this.cellAdded(root);
	
	return oldRoot;
};

/**
 * Function: isRoot
 * 
 * Returns true if the given cell is the root of the model and a non-null
 * value.
 *
 * Parameters:
 * 
 * cell - <mxCell> that represents the possible root.
 */
mxGraphModel.prototype.isRoot = function(cell)
{
	return cell != null && this.root == cell;
};

/**
 * Function: isLayer
 * 
 * Returns true if <isRoot> returns true for the parent of the given cell.
 *
 * Parameters:
 * 
 * cell - <mxCell> that represents the possible layer.
 */
mxGraphModel.prototype.isLayer = function(cell)
{
	return this.isRoot(this.getParent(cell));
};

/**
 * Function: isAncestor
 * 
 * Returns true if the given parent is an ancestor of the given child.
 *
 * Parameters:
 * 
 * parent - <mxCell> that specifies the parent.
 * child - <mxCell> that specifies the child.
 */
mxGraphModel.prototype.isAncestor = function(parent, child)
{
	while (child != null && child != parent)
	{
		child = this.getParent(child);
	}
	
	return child == parent;
};

/**
 * Function: contains
 * 
 * Returns true if the model contains the given <mxCell>.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell.
 */
mxGraphModel.prototype.contains = function(cell)
{
	return this.isAncestor(this.root, cell);
};

/**
 * Function: getParent
 * 
 * Returns the parent of the given cell.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose parent should be returned.
 */
mxGraphModel.prototype.getParent = function(cell)
{
	return (cell != null) ? cell.getParent() : null;
};

/**
 * Function: add
 * 
 * Adds the specified child to the parent at the given index using
 * <mxChildChange> and adds the change to the current transaction. If no
 * index is specified then the child is appended to the parent's array of
 * children. Returns the inserted child.
 * 
 * Parameters:
 * 
 * parent - <mxCell> that specifies the parent to contain the child.
 * child - <mxCell> that specifies the child to be inserted.
 * index - Optional integer that specifies the index of the child.
 */
mxGraphModel.prototype.add = function(parent, child, index)
{
	if (child != parent && parent != null && child != null)
	{	
		// Appends the child if no index was specified
		if (index == null)
		{
			index = this.getChildCount(parent);
		}
		
		var parentChanged = parent != this.getParent(child);
		this.execute(new mxChildChange(this, parent, child, index));

		// Maintains the edges parents by moving the edges
		// into the nearest common ancestor of its
		// terminals
		if (this.maintainEdgeParent && parentChanged)
		{
			this.updateEdgeParents(child);
		}
	}
	
	return child;
};

/**
 * Function: cellAdded
 * 
 * Inner callback to update <cells> when a cell has been added. This
 * implementation resolves collisions by creating new Ids. To change the
 * ID of a cell after it was inserted into the model, use the following
 * code:
 * 
 * (code
 * delete model.cells[cell.getId()];
 * cell.setId(newId);
 * model.cells[cell.getId()] = cell;
 * (end)
 *
 * If the change of the ID should be part of the command history, then the
 * cell should be removed from the model and a clone with the new ID should
 * be reinserted into the model instead.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell that has been added.
 */
mxGraphModel.prototype.cellAdded = function(cell)
{
	if (cell != null)
	{
		// Creates an Id for the cell if not Id exists
		if (cell.getId() == null && this.createIds)
		{
			cell.setId(this.createId(cell));
		}
		
		if (cell.getId() != null)
		{
			var collision = this.getCell(cell.getId());
			
			if (collision != cell)
			{	
				// Creates new Id for the cell
				// as long as there is a collision
				while (collision != null)
				{
					cell.setId(this.createId(cell));
					collision = this.getCell(cell.getId());
				}
				
				// Lazily creates the cells dictionary
				if (this.cells == null)
				{
					this.cells = new Object();
				}
				
				this.cells[cell.getId()] = cell;
			}
		}
		
		// Makes sure IDs of deleted cells are not reused
		if (mxUtils.isNumeric(cell.getId()))
		{
			this.nextId = Math.max(this.nextId, cell.getId());
		}
		
		// Recursively processes child cells
		var childCount = this.getChildCount(cell);
		
		for (var i=0; i<childCount; i++)
		{
			this.cellAdded(this.getChildAt(cell, i));
		}
	}
};

/**
 * Function: createId
 * 
 * Hook method to create an Id for the specified cell. This implementation
 * concatenates <prefix>, id and <postfix> to create the Id and increments
 * <nextId>. The cell is ignored by this implementation, but can be used in
 * overridden methods to prefix the Ids with eg. the cell type.
 *
 * Parameters:
 *
 * cell - <mxCell> to create the Id for.
 */
mxGraphModel.prototype.createId = function(cell)
{
	var id = this.nextId;
	this.nextId++;
	
	return this.prefix + id + this.postfix;
};

/**
 * Function: updateEdgeParents
 * 
 * Updates the parent for all edges that are connected to cell or one of
 * its descendants using <updateEdgeParent>.
 */
mxGraphModel.prototype.updateEdgeParents = function(cell, root)
{
	// Gets the topmost node of the hierarchy
	root = root || this.getRoot(cell);
	
	// Updates edges on children first
	var childCount = this.getChildCount(cell);
	
	for (var i = 0; i < childCount; i++)
	{
		var child = this.getChildAt(cell, i);
		this.updateEdgeParents(child, root);
	}
	
	// Updates the parents of all connected edges
	var edgeCount = this.getEdgeCount(cell);
	var edges = [];

	for (var i = 0; i < edgeCount; i++)
	{
		edges.push(this.getEdgeAt(cell, i));
	}
	
	for (var i = 0; i < edges.length; i++)
	{
		var edge = edges[i];
		
		// Updates edge parent if edge and child have
		// a common root node (does not need to be the
		// model root node)
		if (this.isAncestor(root, edge))
		{
			this.updateEdgeParent(edge, root);
		}
	}
};

/**
 * Function: updateEdgeParent
 *
 * Inner callback to update the parent of the specified <mxCell> to the
 * nearest-common-ancestor of its two terminals.
 *
 * Parameters:
 * 
 * edge - <mxCell> that specifies the edge.
 * root - <mxCell> that represents the current root of the model.
 */
mxGraphModel.prototype.updateEdgeParent = function(edge, root)
{
	var source = this.getTerminal(edge, true);
	var target = this.getTerminal(edge, false);
	var cell = null;
	
	// Uses the first non-relative descendants of the source terminal
	while (source != null && !this.isEdge(source) &&
		source.geometry != null && source.geometry.relative)
	{
		source = this.getParent(source);
	}
	
	// Uses the first non-relative descendants of the target terminal
	while (target != null && !this.isEdge(target) &&
		target.geometry != null && target.geometry.relative)
	{
		target = this.getParent(target);
	}
	
	if (this.isAncestor(root, source) && this.isAncestor(root, target))
	{
		if (source == target)
		{
			cell = this.getParent(source);
		}
		else
		{
			cell = this.getNearestCommonAncestor(source, target);
		}

		if (cell != null && (this.getParent(cell) != this.root ||
			this.isAncestor(cell, edge)) && this.getParent(edge) != cell)
		{
			var geo = this.getGeometry(edge);
			
			if (geo != null)
			{
				var origin1 = this.getOrigin(this.getParent(edge));
				var origin2 = this.getOrigin(cell);
				
				var dx = origin2.x - origin1.x;
				var dy = origin2.y - origin1.y;
				
				geo = geo.clone();
				geo.translate(-dx, -dy);
				this.setGeometry(edge, geo);
			}

			this.add(cell, edge, this.getChildCount(cell));
		}
	}
};

/**
 * Function: getOrigin
 * 
 * Returns the absolute, accumulated origin for the children inside the
 * given parent as an <mxPoint>.
 */
mxGraphModel.prototype.getOrigin = function(cell)
{
	var result = null;
	
	if (cell != null)
	{
		result = this.getOrigin(this.getParent(cell));
		
		if (!this.isEdge(cell))
		{
			var geo = this.getGeometry(cell);
			
			if (geo != null)
			{
				result.x += geo.x;
				result.y += geo.y;
			}
		}
	}
	else
	{
		result = new mxPoint();
	}
	
	return result;
};

/**
 * Function: getNearestCommonAncestor
 * 
 * Returns the nearest common ancestor for the specified cells.
 *
 * Parameters:
 * 
 * cell1 - <mxCell> that specifies the first cell in the tree.
 * cell2 - <mxCell> that specifies the second cell in the tree.
 */
mxGraphModel.prototype.getNearestCommonAncestor = function(cell1, cell2)
{
	if (cell1 != null && cell2 != null)
	{		
		// Creates the cell path for the second cell
		var path = mxCellPath.create(cell2);

		if (path != null && path.length > 0)
		{
			// Bubbles through the ancestors of the first
			// cell to find the nearest common ancestor.
			var cell = cell1;
			var current = mxCellPath.create(cell);
			
			// Inverts arguments
			if (path.length < current.length)
			{
				cell = cell2;
				var tmp = current;
				current = path;
				path = tmp;
			}
			
			while (cell != null)
			{
				var parent = this.getParent(cell);
				
				// Checks if the cell path is equal to the beginning of the given cell path
				if (path.indexOf(current + mxCellPath.PATH_SEPARATOR) == 0 && parent != null)
				{
					return cell;
				}
				
				current = mxCellPath.getParentPath(current);
				cell = parent;
			}
		}
	}
	
	return null;
};

/**
 * Function: remove
 * 
 * Removes the specified cell from the model using <mxChildChange> and adds
 * the change to the current transaction. This operation will remove the
 * cell and all of its children from the model. Returns the removed cell.
 *
 * Parameters:
 * 
 * cell - <mxCell> that should be removed.
 */
mxGraphModel.prototype.remove = function(cell)
{
	if (cell == this.root)
	{
		this.setRoot(null);
	}
	else if (this.getParent(cell) != null)
	{
		this.execute(new mxChildChange(this, null, cell));
	}
	
	return cell;
};

/**
 * Function: cellRemoved
 * 
 * Inner callback to update <cells> when a cell has been removed.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell that has been removed.
 */
mxGraphModel.prototype.cellRemoved = function(cell)
{
	if (cell != null && this.cells != null)
	{
		// Recursively processes child cells
		var childCount = this.getChildCount(cell);
		
		for (var i = childCount - 1; i >= 0; i--)
		{
			this.cellRemoved(this.getChildAt(cell, i));
		}
		
		// Removes the dictionary entry for the cell
		if (this.cells != null && cell.getId() != null)
		{
			delete this.cells[cell.getId()];
		}
	}
};

/**
 * Function: parentForCellChanged
 * 
 * Inner callback to update the parent of a cell using <mxCell.insert>
 * on the parent and return the previous parent.
 *
 * Parameters:
 * 
 * cell - <mxCell> to update the parent for.
 * parent - <mxCell> that specifies the new parent of the cell.
 * index - Optional integer that defines the index of the child
 * in the parent's child array.
 */
mxGraphModel.prototype.parentForCellChanged = function(cell, parent, index)
{
	var previous = this.getParent(cell);
	
	if (parent != null)
	{
		if (parent != previous || previous.getIndex(cell) != index)
		{
			parent.insert(cell, index);
		}
	}
	else if (previous != null)
	{
		var oldIndex = previous.getIndex(cell);
		previous.remove(oldIndex);
	}
	
	// Checks if the previous parent was already in the
	// model and avoids calling cellAdded if it was.
	if (!this.contains(previous) && parent != null)
	{
		this.cellAdded(cell);
	}
	else if (parent == null)
	{
		this.cellRemoved(cell);
	}
	
	return previous;
};

/**
 * Function: getChildCount
 *
 * Returns the number of children in the given cell.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose number of children should be returned.
 */
mxGraphModel.prototype.getChildCount = function(cell)
{
	return (cell != null) ? cell.getChildCount() : 0;
};

/**
 * Function: getChildAt
 *
 * Returns the child of the given <mxCell> at the given index.
 * 
 * Parameters:
 * 
 * cell - <mxCell> that represents the parent.
 * index - Integer that specifies the index of the child to be returned.
 */
mxGraphModel.prototype.getChildAt = function(cell, index)
{
	return (cell != null) ? cell.getChildAt(index) : null;
};

/**
 * Function: getChildren
 * 
 * Returns all children of the given <mxCell> as an array of <mxCells>. The
 * return value should be only be read.
 *
 * Parameters:
 * 
 * cell - <mxCell> the represents the parent.
 */
mxGraphModel.prototype.getChildren = function(cell)
{
	return (cell != null) ? cell.children : null;
};
	
/**
 * Function: getChildVertices
 * 
 * Returns the child vertices of the given parent.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose child vertices should be returned.
 */
mxGraphModel.prototype.getChildVertices = function(parent)
{
	return this.getChildCells(parent, true, false);
};
		
/**
 * Function: getChildEdges
 * 
 * Returns the child edges of the given parent.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose child edges should be returned.
 */
mxGraphModel.prototype.getChildEdges = function(parent)
{
	return this.getChildCells(parent, false, true);
};

/**
 * Function: getChildCells
 * 
 * Returns the children of the given cell that are vertices and/or edges
 * depending on the arguments.
 *
 * Parameters:
 * 
 * cell - <mxCell> the represents the parent.
 * vertices - Boolean indicating if child vertices should be returned.
 * Default is false.
 * edges - Boolean indicating if child edges should be returned.
 * Default is false.
 */
mxGraphModel.prototype.getChildCells = function(parent, vertices, edges)
{
	vertices = (vertices != null) ? vertices : false;
	edges = (edges != null) ? edges : false;
	
	var childCount = this.getChildCount(parent);
	var result = [];

	for (var i = 0; i < childCount; i++)
	{
		var child = this.getChildAt(parent, i);

		if ((!edges && !vertices) || (edges && this.isEdge(child)) ||
			(vertices && this.isVertex(child)))
		{
			result.push(child);
		}
	}

	return result;
};
		
/**
 * Function: getTerminal
 * 
 * Returns the source or target <mxCell> of the given edge depending on the
 * value of the boolean parameter.
 *
 * Parameters:
 * 
 * edge - <mxCell> that specifies the edge.
 * isSource - Boolean indicating which end of the edge should be returned.
 */
mxGraphModel.prototype.getTerminal = function(edge, isSource)
{
	return (edge != null) ? edge.getTerminal(isSource) : null;
};

/**
 * Function: setTerminal
 * 
 * Sets the source or target terminal of the given <mxCell> using
 * <mxTerminalChange> and adds the change to the current transaction.
 * This implementation updates the parent of the edge using <updateEdgeParent>
 * if required.
 *
 * Parameters:
 * 
 * edge - <mxCell> that specifies the edge.
 * terminal - <mxCell> that specifies the new terminal.
 * isSource - Boolean indicating if the terminal is the new source or
 * target terminal of the edge.
 */
mxGraphModel.prototype.setTerminal = function(edge, terminal, isSource)
{
	var terminalChanged = terminal != this.getTerminal(edge, isSource);
	this.execute(new mxTerminalChange(this, edge, terminal, isSource));
	
	if (this.maintainEdgeParent && terminalChanged)
	{
		this.updateEdgeParent(edge, this.getRoot());
	}
	
	return terminal;
};
	
/**
 * Function: setTerminals
 * 
 * Sets the source and target <mxCell> of the given <mxCell> in a single
 * transaction using <setTerminal> for each end of the edge.
 *
 * Parameters:
 * 
 * edge - <mxCell> that specifies the edge.
 * source - <mxCell> that specifies the new source terminal.
 * target - <mxCell> that specifies the new target terminal.
 */
mxGraphModel.prototype.setTerminals = function(edge, source, target)
{
	this.beginUpdate();
	try
	{
		this.setTerminal(edge, source, true);
		this.setTerminal(edge, target, false);
	}
	finally
	{
		this.endUpdate();
	}
};

/**
 * Function: terminalForCellChanged
 * 
 * Inner helper function to update the terminal of the edge using
 * <mxCell.insertEdge> and return the previous terminal.
 * 
 * Parameters:
 * 
 * edge - <mxCell> that specifies the edge to be updated.
 * terminal - <mxCell> that specifies the new terminal.
 * isSource - Boolean indicating if the terminal is the new source or
 * target terminal of the edge.
 */
mxGraphModel.prototype.terminalForCellChanged = function(edge, terminal, isSource)
{
	var previous = this.getTerminal(edge, isSource);
	
	if (terminal != null)
	{
		terminal.insertEdge(edge, isSource);
	}
	else if (previous != null)
	{
		previous.removeEdge(edge, isSource);
	}
	
	return previous;
};

/**
 * Function: getEdgeCount
 * 
 * Returns the number of distinct edges connected to the given cell.
 *
 * Parameters:
 * 
 * cell - <mxCell> that represents the vertex.
 */
mxGraphModel.prototype.getEdgeCount = function(cell)
{
	return (cell != null) ? cell.getEdgeCount() : 0;
};

/**
 * Function: getEdgeAt
 * 
 * Returns the edge of cell at the given index.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the vertex.
 * index - Integer that specifies the index of the edge
 * to return.
 */
mxGraphModel.prototype.getEdgeAt = function(cell, index)
{
	return (cell != null) ? cell.getEdgeAt(index) : null;
};
	
/**
 * Function: getDirectedEdgeCount
 * 
 * Returns the number of incoming or outgoing edges, ignoring the given
 * edge.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose edge count should be returned.
 * outgoing - Boolean that specifies if the number of outgoing or
 * incoming edges should be returned.
 * ignoredEdge - <mxCell> that represents an edge to be ignored.
 */
mxGraphModel.prototype.getDirectedEdgeCount = function(cell, outgoing, ignoredEdge)
{
	var count = 0;
	var edgeCount = this.getEdgeCount(cell);

	for (var i = 0; i < edgeCount; i++)
	{
		var edge = this.getEdgeAt(cell, i);

		if (edge != ignoredEdge && this.getTerminal(edge, outgoing) == cell)
		{
			count++;
		}
	}

	return count;
};

/**
 * Function: getConnections
 * 
 * Returns all edges of the given cell without loops.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose edges should be returned.
 * 
 */
mxGraphModel.prototype.getConnections = function(cell)
{
	return this.getEdges(cell, true, true, false);
};

/**
 * Function: getIncomingEdges
 * 
 * Returns the incoming edges of the given cell without loops.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose incoming edges should be returned.
 * 
 */
mxGraphModel.prototype.getIncomingEdges = function(cell)
{
	return this.getEdges(cell, true, false, false);
};

/**
 * Function: getOutgoingEdges
 * 
 * Returns the outgoing edges of the given cell without loops.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose outgoing edges should be returned.
 * 
 */
mxGraphModel.prototype.getOutgoingEdges = function(cell)
{
	return this.getEdges(cell, false, true, false);
};

/**
 * Function: getEdges
 * 
 * Returns all distinct edges connected to this cell as a new array of
 * <mxCells>. If at least one of incoming or outgoing is true, then loops
 * are ignored, otherwise if both are false, then all edges connected to
 * the given cell are returned including loops.
 * 
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell.
 * incoming - Optional boolean that specifies if incoming edges should be
 * returned. Default is true.
 * outgoing - Optional boolean that specifies if outgoing edges should be
 * returned. Default is true.
 * includeLoops - Optional boolean that specifies if loops should be returned.
 * Default is true. 
 */
mxGraphModel.prototype.getEdges = function(cell, incoming, outgoing, includeLoops)
{
	incoming = (incoming != null) ? incoming : true;
	outgoing = (outgoing != null) ? outgoing : true;
	includeLoops = (includeLoops != null) ? includeLoops : true;
	
	var edgeCount = this.getEdgeCount(cell);
	var result = [];

	for (var i = 0; i < edgeCount; i++)
	{
		var edge = this.getEdgeAt(cell, i);
		var source = this.getTerminal(edge, true);
		var target = this.getTerminal(edge, false);

		if ((includeLoops && source == target) || ((source != target) && ((incoming && target == cell) ||
			(outgoing && source == cell))))
		{
			result.push(edge);
		}
	}

	return result;
};

/**
 * Function: getEdgesBetween
 * 
 * Returns all edges between the given source and target pair. If directed
 * is true, then only edges from the source to the target are returned,
 * otherwise, all edges between the two cells are returned.
 * 
 * Parameters:
 * 
 * source - <mxCell> that defines the source terminal of the edge to be
 * returned.
 * target - <mxCell> that defines the target terminal of the edge to be
 * returned.
 * directed - Optional boolean that specifies if the direction of the
 * edge should be taken into account. Default is false.
 */
mxGraphModel.prototype.getEdgesBetween = function(source, target, directed)
{
	directed = (directed != null) ? directed : false;
	
	var tmp1 = this.getEdgeCount(source);
	var tmp2 = this.getEdgeCount(target);
	
	// Assumes the source has less connected edges
	var terminal = source;
	var edgeCount = tmp1;
	
	// Uses the smaller array of connected edges
	// for searching the edge
	if (tmp2 < tmp1)
	{
		edgeCount = tmp2;
		terminal = target;
	}
	
	var result = [];
	
	// Checks if the edge is connected to the correct
	// cell and returns the first match
	for (var i = 0; i < edgeCount; i++)
	{
		var edge = this.getEdgeAt(terminal, i);
		var src = this.getTerminal(edge, true);
		var trg = this.getTerminal(edge, false);
		var directedMatch = (src == source) && (trg == target);
		var oppositeMatch = (trg == source) && (src == target);

		if (directedMatch || (!directed && oppositeMatch))
		{
			result.push(edge);
		}
	}
	
	return result;
};

/**
 * Function: getOpposites
 * 
 * Returns all opposite vertices wrt terminal for the given edges, only
 * returning sources and/or targets as specified. The result is returned
 * as an array of <mxCells>.
 * 
 * Parameters:
 * 
 * edges - Array of <mxCells> that contain the edges to be examined.
 * terminal - <mxCell> that specifies the known end of the edges.
 * sources - Boolean that specifies if source terminals should be contained
 * in the result. Default is true.
 * targets - Boolean that specifies if target terminals should be contained
 * in the result. Default is true.
 */
mxGraphModel.prototype.getOpposites = function(edges, terminal, sources, targets)
{
	sources = (sources != null) ? sources : true;
	targets = (targets != null) ? targets : true;
	
	var terminals = [];
	
	if (edges != null)
	{
		for (var i = 0; i < edges.length; i++)
		{
			var source = this.getTerminal(edges[i], true);
			var target = this.getTerminal(edges[i], false);
			
			// Checks if the terminal is the source of
			// the edge and if the target should be
			// stored in the result
			if (source == terminal && target != null && target != terminal && targets)
			{
				terminals.push(target);
			}
			
			// Checks if the terminal is the taget of
			// the edge and if the source should be
			// stored in the result
			else if (target == terminal && source != null && source != terminal && sources)
			{
				terminals.push(source);
			}
		}
	}
	
	return terminals;
};

/**
 * Function: getTopmostCells
 * 
 * Returns the topmost cells of the hierarchy in an array that contains no
 * descendants for each <mxCell> that it contains. Duplicates should be
 * removed in the cells array to improve performance.
 * 
 * Parameters:
 * 
 * cells - Array of <mxCells> whose topmost ancestors should be returned.
 */
mxGraphModel.prototype.getTopmostCells = function(cells)
{
	var tmp = [];
	
	for (var i = 0; i < cells.length; i++)
	{
		var cell = cells[i];
		var topmost = true;
		var parent = this.getParent(cell);
		
		while (parent != null)
		{
			if (mxUtils.indexOf(cells, parent) >= 0)
			{
				topmost = false;
				break;
			}
			
			parent = this.getParent(parent);
		}
		
		if (topmost)
		{
			tmp.push(cell);
		}
	}
	
	return tmp;
};

/**
 * Function: isVertex
 * 
 * Returns true if the given cell is a vertex.
 *
 * Parameters:
 * 
 * cell - <mxCell> that represents the possible vertex.
 */
mxGraphModel.prototype.isVertex = function(cell)
{
	return (cell != null) ? cell.isVertex() : false;
};

/**
 * Function: isEdge
 * 
 * Returns true if the given cell is an edge.
 *
 * Parameters:
 * 
 * cell - <mxCell> that represents the possible edge.
 */
mxGraphModel.prototype.isEdge = function(cell)
{
	return (cell != null) ? cell.isEdge() : false;
};

/**
 * Function: isConnectable
 * 
 * Returns true if the given <mxCell> is connectable. If <edgesConnectable>
 * is false, then this function returns false for all edges else it returns
 * the return value of <mxCell.isConnectable>.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose connectable state should be returned.
 */
mxGraphModel.prototype.isConnectable = function(cell)
{
	return (cell != null) ? cell.isConnectable() : false;
};

/**
 * Function: getValue
 * 
 * Returns the user object of the given <mxCell> using <mxCell.getValue>.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose user object should be returned.
 */
mxGraphModel.prototype.getValue = function(cell)
{
	return (cell != null) ? cell.getValue() : null;
};

/**
 * Function: setValue
 * 
 * Sets the user object of then given <mxCell> using <mxValueChange>
 * and adds the change to the current transaction.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose user object should be changed.
 * value - Object that defines the new user object.
 */
mxGraphModel.prototype.setValue = function(cell, value)
{
	this.execute(new mxValueChange(this, cell, value));
	
	return value;
};

/**
 * Function: valueForCellChanged
 * 
 * Inner callback to update the user object of the given <mxCell>
 * using <mxCell.valueChanged> and return the previous value,
 * that is, the return value of <mxCell.valueChanged>.
 * 
 * To change a specific attribute in an XML node, the following code can be
 * used.
 * 
 * (code)
 * graph.getModel().valueForCellChanged = function(cell, value)
 * {
 *   var previous = cell.value.getAttribute('label');
 *   cell.value.setAttribute('label', value);
 *   
 *   return previous;
 * };
 * (end) 
 */
mxGraphModel.prototype.valueForCellChanged = function(cell, value)
{
	return cell.valueChanged(value);
};

/**
 * Function: getGeometry
 * 
 * Returns the <mxGeometry> of the given <mxCell>.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose geometry should be returned.
 */
mxGraphModel.prototype.getGeometry = function(cell)
{
	return (cell != null) ? cell.getGeometry() : null;
};

/**
 * Function: setGeometry
 * 
 * Sets the <mxGeometry> of the given <mxCell>. The actual update
 * of the cell is carried out in <geometryForCellChanged>. The
 * <mxGeometryChange> action is used to encapsulate the change.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose geometry should be changed.
 * geometry - <mxGeometry> that defines the new geometry.
 */
mxGraphModel.prototype.setGeometry = function(cell, geometry)
{
	if (geometry != this.getGeometry(cell))
	{
		this.execute(new mxGeometryChange(this, cell, geometry));
	}
	
	return geometry;
};

/**
 * Function: geometryForCellChanged
 * 
 * Inner callback to update the <mxGeometry> of the given <mxCell> using
 * <mxCell.setGeometry> and return the previous <mxGeometry>.
 */
mxGraphModel.prototype.geometryForCellChanged = function(cell, geometry)
{
	var previous = this.getGeometry(cell);
	cell.setGeometry(geometry);
	
	return previous;
};

/**
 * Function: getStyle
 * 
 * Returns the style of the given <mxCell>.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose style should be returned.
 */
mxGraphModel.prototype.getStyle = function(cell)
{
	return (cell != null) ? cell.getStyle() : null;
};

/**
 * Function: setStyle
 * 
 * Sets the style of the given <mxCell> using <mxStyleChange> and
 * adds the change to the current transaction.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose style should be changed.
 * style - String of the form [stylename;|key=value;] to specify
 * the new cell style.
 */
mxGraphModel.prototype.setStyle = function(cell, style)
{
	if (style != this.getStyle(cell))
	{
		this.execute(new mxStyleChange(this, cell, style));
	}
	
	return style;
};

/**
 * Function: styleForCellChanged
 * 
 * Inner callback to update the style of the given <mxCell>
 * using <mxCell.setStyle> and return the previous style.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell to be updated.
 * style - String of the form [stylename;|key=value;] to specify
 * the new cell style.
 */
mxGraphModel.prototype.styleForCellChanged = function(cell, style)
{
	var previous = this.getStyle(cell);
	cell.setStyle(style);
	
	return previous;
};

/**
 * Function: isCollapsed
 * 
 * Returns true if the given <mxCell> is collapsed.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose collapsed state should be returned.
 */
mxGraphModel.prototype.isCollapsed = function(cell)
{
	return (cell != null) ? cell.isCollapsed() : false;
};

/**
 * Function: setCollapsed
 * 
 * Sets the collapsed state of the given <mxCell> using <mxCollapseChange>
 * and adds the change to the current transaction.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose collapsed state should be changed.
 * collapsed - Boolean that specifies the new collpased state.
 */
mxGraphModel.prototype.setCollapsed = function(cell, collapsed)
{
	if (collapsed != this.isCollapsed(cell))
	{
		this.execute(new mxCollapseChange(this, cell, collapsed));
	}
	
	return collapsed;
};
	
/**
 * Function: collapsedStateForCellChanged
 *
 * Inner callback to update the collapsed state of the
 * given <mxCell> using <mxCell.setCollapsed> and return
 * the previous collapsed state.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell to be updated.
 * collapsed - Boolean that specifies the new collpased state.
 */
mxGraphModel.prototype.collapsedStateForCellChanged = function(cell, collapsed)
{
	var previous = this.isCollapsed(cell);
	cell.setCollapsed(collapsed);
	
	return previous;
};

/**
 * Function: isVisible
 * 
 * Returns true if the given <mxCell> is visible.
 * 
 * Parameters:
 * 
 * cell - <mxCell> whose visible state should be returned.
 */
mxGraphModel.prototype.isVisible = function(cell)
{
	return (cell != null) ? cell.isVisible() : false;
};

/**
 * Function: setVisible
 * 
 * Sets the visible state of the given <mxCell> using <mxVisibleChange> and
 * adds the change to the current transaction.
 *
 * Parameters:
 * 
 * cell - <mxCell> whose visible state should be changed.
 * visible - Boolean that specifies the new visible state.
 */
mxGraphModel.prototype.setVisible = function(cell, visible)
{
	if (visible != this.isVisible(cell))
	{
		this.execute(new mxVisibleChange(this, cell, visible));
	}
	
	return visible;
};
	
/**
 * Function: visibleStateForCellChanged
 *
 * Inner callback to update the visible state of the
 * given <mxCell> using <mxCell.setCollapsed> and return
 * the previous visible state.
 *
 * Parameters:
 * 
 * cell - <mxCell> that specifies the cell to be updated.
 * visible - Boolean that specifies the new visible state.
 */
mxGraphModel.prototype.visibleStateForCellChanged = function(cell, visible)
{
	var previous = this.isVisible(cell);
	cell.setVisible(visible);
	
	return previous;
};

/**
 * Function: execute
 * 
 * Executes the given edit and fires events if required. The edit object
 * requires an execute function which is invoked. The edit is added to the
 * <currentEdit> between <beginUpdate> and <endUpdate> calls, so that
 * events will be fired if this execute is an individual transaction, that
 * is, if no previous <beginUpdate> calls have been made without calling
 * <endUpdate>. This implementation fires an <execute> event before
 * executing the given change.
 * 
 * Parameters:
 * 
 * change - Object that described the change.
 */
mxGraphModel.prototype.execute = function(change)
{
	change.execute();
	this.beginUpdate();
	this.currentEdit.add(change);
	this.fireEvent(new mxEventObject(mxEvent.EXECUTE, 'change', change));
	// New global executed event
	this.fireEvent(new mxEventObject(mxEvent.EXECUTED, 'change', change));
	this.endUpdate();
};

/**
 * Function: beginUpdate
 * 
 * Increments the <updateLevel> by one. The event notification
 * is queued until <updateLevel> reaches 0 by use of
 * <endUpdate>.
 *
 * All changes on <mxGraphModel> are transactional,
 * that is, they are executed in a single undoable change
 * on the model (without transaction isolation).
 * Therefore, if you want to combine any
 * number of changes into a single undoable change,
 * you should group any two or more API calls that
 * modify the graph model between <beginUpdate>
 * and <endUpdate> calls as shown here:
 * 
 * (code)
 * var model = graph.getModel();
 * var parent = graph.getDefaultParent();
 * var index = model.getChildCount(parent);
 * model.beginUpdate();
 * try
 * {
 *   model.add(parent, v1, index);
 *   model.add(parent, v2, index+1);
 * }
 * finally
 * {
 *   model.endUpdate();
 * }
 * (end)
 * 
 * Of course there is a shortcut for appending a
 * sequence of cells into the default parent:
 * 
 * (code)
 * graph.addCells([v1, v2]).
 * (end)
 */
mxGraphModel.prototype.beginUpdate = function()
{
	this.updateLevel++;
	this.fireEvent(new mxEventObject(mxEvent.BEGIN_UPDATE));
	
	if (this.updateLevel == 1)
	{
		this.fireEvent(new mxEventObject(mxEvent.START_EDIT));
	}
};

/**
 * Function: endUpdate
 * 
 * Decrements the <updateLevel> by one and fires an <undo>
 * event if the <updateLevel> reaches 0. This function
 * indirectly fires a <change> event by invoking the notify
 * function on the <currentEdit> und then creates a new
 * <currentEdit> using <createUndoableEdit>.
 *
 * The <undo> event is fired only once per edit, whereas
 * the <change> event is fired whenever the notify
 * function is invoked, that is, on undo and redo of
 * the edit.
 */
mxGraphModel.prototype.endUpdate = function()
{
	this.updateLevel--;
	
	if (this.updateLevel == 0)
	{
		this.fireEvent(new mxEventObject(mxEvent.END_EDIT));
	}
	
	if (!this.endingUpdate)
	{
		this.endingUpdate = this.updateLevel == 0;
		this.fireEvent(new mxEventObject(mxEvent.END_UPDATE, 'edit', this.currentEdit));

		try
		{		
			if (this.endingUpdate && !this.currentEdit.isEmpty())
			{
				this.fireEvent(new mxEventObject(mxEvent.BEFORE_UNDO, 'edit', this.currentEdit));
				var tmp = this.currentEdit;
				this.currentEdit = this.createUndoableEdit();
				tmp.notify();
				this.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', tmp));
			}
		}
		finally
		{
			this.endingUpdate = false;
		}
	}
};

/**
 * Function: createUndoableEdit
 * 
 * Creates a new <mxUndoableEdit> that implements the
 * notify function to fire a <change> and <notify> event
 * through the <mxUndoableEdit>'s source.
 */
mxGraphModel.prototype.createUndoableEdit = function()
{
	var edit = new mxUndoableEdit(this, true);
	
	edit.notify = function()
	{
		// LATER: Remove changes property (deprecated)
		edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
			'edit', edit, 'changes', edit.changes));
		edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
			'edit', edit, 'changes', edit.changes));
	};
	
	return edit;
};

/**
 * Function: mergeChildren
 * 
 * Merges the children of the given cell into the given target cell inside
 * this model. All cells are cloned unless there is a corresponding cell in
 * the model with the same id, in which case the source cell is ignored and
 * all edges are connected to the corresponding cell in this model. Edges
 * are considered to have no identity and are always cloned unless the
 * cloneAllEdges flag is set to false, in which case edges with the same
 * id in the target model are reconnected to reflect the terminals of the
 * source edges.
 */
mxGraphModel.prototype.mergeChildren = function(from, to, cloneAllEdges)
{
	cloneAllEdges = (cloneAllEdges != null) ? cloneAllEdges : true;
	
	this.beginUpdate();
	try
	{
		var mapping = new Object();
		this.mergeChildrenImpl(from, to, cloneAllEdges, mapping);
		
		// Post-processes all edges in the mapping and
		// reconnects the terminals to the corresponding
		// cells in the target model
		for (var key in mapping)
		{
			var cell = mapping[key];
			var terminal = this.getTerminal(cell, true);

			if (terminal != null)
			{
				terminal = mapping[mxCellPath.create(terminal)];
				this.setTerminal(cell, terminal, true);
			}
			
			terminal = this.getTerminal(cell, false);
			
			if (terminal != null)
			{
				terminal = mapping[mxCellPath.create(terminal)];
				this.setTerminal(cell, terminal, false);
			}
		}
	}
	finally
	{
		this.endUpdate();
	}
};

/**
 * Function: mergeChildren
 * 
 * Clones the children of the source cell into the given target cell in
 * this model and adds an entry to the mapping that maps from the source
 * cell to the target cell with the same id or the clone of the source cell
 * that was inserted into this model.
 */
mxGraphModel.prototype.mergeChildrenImpl = function(from, to, cloneAllEdges, mapping)
{
	this.beginUpdate();
	try
	{
		var childCount = from.getChildCount();
		
		for (var i = 0; i < childCount; i++)
		{
			var cell = from.getChildAt(i);
			
			if (typeof(cell.getId) == 'function')
			{
				var id = cell.getId();
				var target = (id != null && (!this.isEdge(cell) || !cloneAllEdges)) ?
						this.getCell(id) : null;
				
				// Clones and adds the child if no cell exists for the id
				if (target == null)
				{
					var clone = cell.clone();
					clone.setId(id);
					
					// Sets the terminals from the original cell to the clone
					// because the lookup uses strings not cells in JS
					clone.setTerminal(cell.getTerminal(true), true);
					clone.setTerminal(cell.getTerminal(false), false);
					
					// Do *NOT* use model.add as this will move the edge away
					// from the parent in updateEdgeParent if maintainEdgeParent
					// is enabled in the target model
					target = to.insert(clone);
					this.cellAdded(target);
				}
				
				// Stores the mapping for later reconnecting edges
				mapping[mxCellPath.create(cell)] = target;
				
				// Recurses
				this.mergeChildrenImpl(cell, target, cloneAllEdges, mapping);
			}
		}
	}
	finally
	{
		this.endUpdate();
	}
};

/**
 * Function: getParents
 * 
 * Returns an array that represents the set (no duplicates) of all parents
 * for the given array of cells.
 * 
 * Parameters:
 * 
 * cells - Array of cells whose parents should be returned.
 */
mxGraphModel.prototype.getParents = function(cells)
{
	var parents = [];
	
	if (cells != null)
	{
		var hash = new Object();
		
		for (var i = 0; i < cells.length; i++)
		{
			var parent = this.getParent(cells[i]);
			
			if (parent != null)
			{
				var id = mxCellPath.create(parent);
				
				if (hash[id] == null)
				{
					hash[id] = parent;
					parents.push(parent);
				}
			}
		}
	}
	
	return parents;
};

//
// Cell Cloning
//

/**
 * Function: cloneCell
 * 
 * Returns a deep clone of the given <mxCell> (including
 * the children) which is created using <cloneCells>.
 *
 * Parameters:
 * 
 * cell - <mxCell> to be cloned.
 */
mxGraphModel.prototype.cloneCell = function(cell)
{
	if (cell != null)
	{
		return this.cloneCells([cell], true)[0];
	}
	
	return null;
};

/**
 * Function: cloneCells
 * 
 * Returns an array of clones for the given array of <mxCells>.
 * Depending on the value of includeChildren, a deep clone is created for
 * each cell. Connections are restored based if the corresponding
 * cell is contained in the passed in array.
 *
 * Parameters:
 * 
 * cells - Array of <mxCell> to be cloned.
 * includeChildren - Boolean indicating if the cells should be cloned
 * with all descendants.
 */
mxGraphModel.prototype.cloneCells = function(cells, includeChildren)
{
	var mapping = new Object();
	var clones = [];
	
	for (var i = 0; i < cells.length; i++)
	{
		if (cells[i] != null)
		{
			clones.push(this.cloneCellImpl(cells[i], mapping, includeChildren));
		}
		else
		{
			clones.push(null);
		}
	}
	
	for (var i = 0; i < clones.length; i++)
	{
		if (clones[i] != null)
		{
			this.restoreClone(clones[i], cells[i], mapping);
		}
	}
	
	return clones;
};
			
/**
 * Function: cloneCellImpl
 * 
 * Inner helper method for cloning cells recursively.
 */
mxGraphModel.prototype.cloneCellImpl = function(cell, mapping, includeChildren)
{
	var clone = this.cellCloned(cell);
	
	// Stores the clone in the lookup under the
	// cell path for the original cell
	mapping[mxObjectIdentity.get(cell)] = clone;
	
	if (includeChildren)
	{
		var childCount = this.getChildCount(cell);
		
		for (var i = 0; i < childCount; i++)
		{
			var cloneChild = this.cloneCellImpl(
				this.getChildAt(cell, i), mapping, true);
			clone.insert(cloneChild);
		}
	}
	
	return clone;
};

/**
 * Function: cellCloned
 * 
 * Hook for cloning the cell. This returns cell.clone() or
 * any possible exceptions.
 */
mxGraphModel.prototype.cellCloned = function(cell)
{
	return cell.clone();
};

/**
 * Function: restoreClone
 * 
 * Inner helper method for restoring the connections in
 * a network of cloned cells.
 */
mxGraphModel.prototype.restoreClone = function(clone, cell, mapping)
{
	var source = this.getTerminal(cell, true);
	
	if (source != null)
	{
		var tmp = mapping[mxObjectIdentity.get(source)];
		
		if (tmp != null)
		{
			tmp.insertEdge(clone, true);
		}
	}
	
	var target = this.getTerminal(cell, false);
	
	if (target != null)
	{
		var tmp = mapping[mxObjectIdentity.get(target)];
		
		if (tmp != null)
		{	
			tmp.insertEdge(clone, false);
		}
	}
	
	var childCount = this.getChildCount(clone);
	
	for (var i = 0; i < childCount; i++)
	{
		this.restoreClone(this.getChildAt(clone, i),
			this.getChildAt(cell, i), mapping);
	}
};

//
// Atomic changes
//

/**
 * Class: mxRootChange
 * 
 * Action to change the root in a model.
 *
 * Constructor: mxRootChange
 * 
 * Constructs a change of the root in the
 * specified model.
 */
function mxRootChange(model, root)
{
	this.model = model;
	this.root = root;
	this.previous = root;
};

/**
 * Function: execute
 * 
 * Carries out a change of the root using
 * <mxGraphModel.rootChanged>.
 */
mxRootChange.prototype.execute = function()
{
	this.root = this.previous;
	this.previous = this.model.rootChanged(this.previous);
};

/**
 * Class: mxChildChange
 * 
 * Action to add or remove a child in a model.
 *
 * Constructor: mxChildChange
 * 
 * Constructs a change of a child in the
 * specified model.
 */
function mxChildChange(model, parent, child, index)
{
	this.model = model;
	this.parent = parent;
	this.previous = parent;
	this.child = child;
	this.index = index;
	this.previousIndex = index;
};

/**
 * Function: execute
 * 
 * Changes the parent of <child> using
 * <mxGraphModel.parentForCellChanged> and
 * removes or restores the cell's
 * connections.
 */
mxChildChange.prototype.execute = function()
{
	var tmp = this.model.getParent(this.child);
	var tmp2 = (tmp != null) ? tmp.getIndex(this.child) : 0;
	
	if (this.previous == null)
	{
		this.connect(this.child, false);
	}
	
	tmp = this.model.parentForCellChanged(
		this.child, this.previous, this.previousIndex);
		
	if (this.previous != null)
	{
		this.connect(this.child, true);
	}
	
	this.parent = this.previous;
	this.previous = tmp;
	this.index = this.previousIndex;
	this.previousIndex = tmp2;
};

/**
 * Function: disconnect
 * 
 * Disconnects the given cell recursively from its
 * terminals and stores the previous terminal in the
 * cell's terminals.
 */
mxChildChange.prototype.connect = function(cell, isConnect)
{
	isConnect = (isConnect != null) ? isConnect : true;
	
	var source = cell.getTerminal(true);
	var target = cell.getTerminal(false);
	
	if (source != null)
	{
		if (isConnect)
		{
			this.model.terminalForCellChanged(cell, source, true);
		}
		else
		{
			this.model.terminalForCellChanged(cell, null, true);
		}
	}
	
	if (target != null)
	{
		if (isConnect)
		{
			this.model.terminalForCellChanged(cell, target, false);
		}
		else
		{
			this.model.terminalForCellChanged(cell, null, false);
		}
	}
	
	cell.setTerminal(source, true);
	cell.setTerminal(target, false);
	
	var childCount = this.model.getChildCount(cell);
	
	for (var i=0; i<childCount; i++)
	{
		this.connect(this.model.getChildAt(cell, i), isConnect);
	}
};

/**
 * Class: mxTerminalChange
 * 
 * Action to change a terminal in a model.
 *
 * Constructor: mxTerminalChange
 * 
 * Constructs a change of a terminal in the 
 * specified model.
 */
function mxTerminalChange(model, cell, terminal, source)
{
	this.model = model;
	this.cell = cell;
	this.terminal = terminal;
	this.previous = terminal;
	this.source = source;
};

/**
 * Function: execute
 * 
 * Changes the terminal of <cell> to <previous> using
 * <mxGraphModel.terminalForCellChanged>.
 */
mxTerminalChange.prototype.execute = function()
{
	this.terminal = this.previous;
	this.previous = this.model.terminalForCellChanged(
		this.cell, this.previous, this.source);
};

/**
 * Class: mxValueChange
 * 
 * Action to change a user object in a model.
 *
 * Constructor: mxValueChange
 * 
 * Constructs a change of a user object in the 
 * specified model.
 */
function mxValueChange(model, cell, value)
{
	this.model = model;
	this.cell = cell;
	this.value = value;
	this.previous = value;
};

/**
 * Function: execute
 * 
 * Changes the value of <cell> to <previous> using
 * <mxGraphModel.valueForCellChanged>.
 */
mxValueChange.prototype.execute = function()
{
	this.value = this.previous;
	this.previous = this.model.valueForCellChanged(
		this.cell, this.previous);
};

/**
 * Class: mxStyleChange
 * 
 * Action to change a cell's style in a model.
 *
 * Constructor: mxStyleChange
 * 
 * Constructs a change of a style in the
 * specified model.
 */
function mxStyleChange(model, cell, style)
{
	this.model = model;
	this.cell = cell;
	this.style = style;
	this.previous = style;
};

/**
 * Function: execute
 * 
 * Changes the style of <cell> to <previous> using
 * <mxGraphModel.styleForCellChanged>.
 */
mxStyleChange.prototype.execute = function()
{
	this.style = this.previous;
	this.previous = this.model.styleForCellChanged(
		this.cell, this.previous);
};

/**
 * Class: mxGeometryChange
 * 
 * Action to change a cell's geometry in a model.
 *
 * Constructor: mxGeometryChange
 * 
 * Constructs a change of a geometry in the
 * specified model.
 */
function mxGeometryChange(model, cell, geometry)
{
	this.model = model;
	this.cell = cell;
	this.geometry = geometry;
	this.previous = geometry;
};

/**
 * Function: execute
 * 
 * Changes the geometry of <cell> ro <previous> using
 * <mxGraphModel.geometryForCellChanged>.
 */
mxGeometryChange.prototype.execute = function()
{
	this.geometry = this.previous;
	this.previous = this.model.geometryForCellChanged(
		this.cell, this.previous);
};

/**
 * Class: mxCollapseChange
 * 
 * Action to change a cell's collapsed state in a model.
 *
 * Constructor: mxCollapseChange
 * 
 * Constructs a change of a collapsed state in the
 * specified model.
 */
function mxCollapseChange(model, cell, collapsed)
{
	this.model = model;
	this.cell = cell;
	this.collapsed = collapsed;
	this.previous = collapsed;
};

/**
 * Function: execute
 * 
 * Changes the collapsed state of <cell> to <previous> using
 * <mxGraphModel.collapsedStateForCellChanged>.
 */
mxCollapseChange.prototype.execute = function()
{
	this.collapsed = this.previous;
	this.previous = this.model.collapsedStateForCellChanged(
		this.cell, this.previous);
};

/**
 * Class: mxVisibleChange
 * 
 * Action to change a cell's visible state in a model.
 *
 * Constructor: mxVisibleChange
 * 
 * Constructs a change of a visible state in the
 * specified model.
 */
function mxVisibleChange(model, cell, visible)
{
	this.model = model;
	this.cell = cell;
	this.visible = visible;
	this.previous = visible;
};

/**
 * Function: execute
 * 
 * Changes the visible state of <cell> to <previous> using
 * <mxGraphModel.visibleStateForCellChanged>.
 */
mxVisibleChange.prototype.execute = function()
{
	this.visible = this.previous;
	this.previous = this.model.visibleStateForCellChanged(
		this.cell, this.previous);
};

/**
 * Class: mxCellAttributeChange
 * 
 * Action to change the attribute of a cell's user object.
 * There is no method on the graph model that uses this
 * action. To use the action, you can use the code shown
 * in the example below.
 * 
 * Example:
 * 
 * To change the attributeName in the cell's user object
 * to attributeValue, use the following code:
 * 
 * (code)
 * model.beginUpdate();
 * try
 * {
 *   var edit = new mxCellAttributeChange(
 *     cell, attributeName, attributeValue);
 *   model.execute(edit);
 * }
 * finally
 * {
 *   model.endUpdate();
 * } 
 * (end)
 *
 * Constructor: mxCellAttributeChange
 * 
 * Constructs a change of a attribute of the DOM node
 * stored as the value of the given <mxCell>.
 */
function mxCellAttributeChange(cell, attribute, value)
{
	this.cell = cell;
	this.attribute = attribute;
	this.value = value;
	this.previous = value;
};

/**
 * Function: execute
 * 
 * Changes the attribute of the cell's user object by
 * using <mxCell.setAttribute>.
 */
mxCellAttributeChange.prototype.execute = function()
{
	var tmp = this.cell.getAttribute(this.attribute);
	
	if (this.previous == null)
	{
		this.cell.value.removeAttribute(this.attribute);
	}
	else
	{
		this.cell.setAttribute(this.attribute, this.previous);
	}
	
	this.previous = tmp;
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxCell
 *
 * Cells are the elements of the graph model. They represent the state
 * of the groups, vertices and edges in a graph.
 * 
 * Custom attributes:
 * 
 * For custom attributes we recommend using an XML node as the value of a cell.
 * The following code can be used to create a cell with an XML node as the
 * value:
 * 
 * (code)
 * var doc = mxUtils.createXmlDocument();
 * var node = doc.createElement('MyNode')
 * node.setAttribute('label', 'MyLabel');
 * node.setAttribute('attribute1', 'value1');
 * graph.insertVertex(graph.getDefaultParent(), null, node, 40, 40, 80, 30);
 * (end)
 * 
 * For the label to work, <mxGraph.convertValueToString> and
 * <mxGraph.cellLabelChanged> should be overridden as follows:
 * 
 * (code)
 * graph.convertValueToString = function(cell)
 * {
 *   if (mxUtils.isNode(cell.value))
 *   {
 *     return cell.getAttribute('label', '')
 *   }
 * };
 * 
 * var cellLabelChanged = graph.cellLabelChanged;
 * graph.cellLabelChanged = function(cell, newValue, autoSize)
 * {
 *   if (mxUtils.isNode(cell.value))
 *   {
 *     // Clones the value for correct undo/redo
 *     var elt = cell.value.cloneNode(true);
 *     elt.setAttribute('label', newValue);
 *     newValue = elt;
 *   }
 *   
 *   cellLabelChanged.apply(this, arguments);
 * };
 * (end)
 * 
 * Callback: onInit
 *
 * Called from within the constructor.
 * 
 * Constructor: mxCell
 *
 * Constructs a new cell to be used in a graph model.
 * This method invokes <onInit> upon completion.
 * 
 * Parameters:
 * 
 * value - Optional object that represents the cell value.
 * geometry - Optional <mxGeometry> that specifies the geometry.
 * style - Optional formatted string that defines the style.
 */
function mxCell(value, geometry, style)
{
	this.value = value;
	this.setGeometry(geometry);
	this.setStyle(style);
	
	if (this.onInit != null)
	{
		this.onInit();
	}
};

/**
 * Variable: id
 *
 * Holds the Id. Default is null.
 */
mxCell.prototype.id = null;

/**
 * Variable: value
 *
 * Holds the user object. Default is null.
 */
mxCell.prototype.value = null;

/**
 * Variable: geometry
 *
 * Holds the <mxGeometry>. Default is null.
 */
mxCell.prototype.geometry = null;

/**
 * Variable: style
 *
 * Holds the style as a string of the form [(stylename|key=value);]. Default is
 * null.
 */
mxCell.prototype.style = null;

/**
 * Variable: vertex
 *
 * Specifies whether the cell is a vertex. Default is false.
 */
mxCell.prototype.vertex = false;

/**
 * Variable: edge
 *
 * Specifies whether the cell is an edge. Default is false.
 */
mxCell.prototype.edge = false;

/**
 * Variable: connectable
 *
 * Specifies whether the cell is connectable. Default is true.
 */
mxCell.prototype.connectable = true;

/**
 * Variable: visible
 *
 * Specifies whether the cell is visible. Default is true.
 */
mxCell.prototype.visible = true;

/**
 * Variable: collapsed
 *
 * Specifies whether the cell is collapsed. Default is false.
 */
mxCell.prototype.collapsed = false;

/**
 * Variable: parent
 *
 * Reference to the parent cell.
 */
mxCell.prototype.parent = null;

/**
 * Variable: source
 *
 * Reference to the source terminal.
 */
mxCell.prototype.source = null;

/**
 * Variable: target
 *
 * Reference to the target terminal.
 */
mxCell.prototype.target = null;

/**
 * Variable: children
 *
 * Holds the child cells.
 */
mxCell.prototype.children = null;

/**
 * Variable: edges
 *
 * Holds the edges.
 */
mxCell.prototype.edges = null;

/**
 * Variable: mxTransient
 *
 * List of members that should not be cloned inside <clone>. This field is
 * passed to <mxUtils.clone> and is not made persistent in <mxCellCodec>.
 * This is not a convention for all classes, it is only used in this class
 * to mark transient fields since transient modifiers are not supported by
 * the language.
 */
mxCell.prototype.mxTransient = ['id', 'value', 'parent', 'source',
                                'target', 'children', 'edges'];

/**
 * Function: getId
 *
 * Returns the Id of the cell as a string.
 */
mxCell.prototype.getId = function()
{
	return this.id;
};
		
/**
 * Function: setId
 *
 * Sets the Id of the cell to the given string.
 */
mxCell.prototype.setId = function(id)
{
	this.id = id;
};

/**
 * Function: getValue
 *
 * Returns the user object of the cell. The user
 * object is stored in <value>.
 */
mxCell.prototype.getValue = function()
{
	return this.value;
};
		
/**
 * Function: setValue
 *
 * Sets the user object of the cell. The user object
 * is stored in <value>.
 */
mxCell.prototype.setValue = function(value)
{
	this.value = value;
};

/**
 * Function: valueChanged
 *
 * Changes the user object after an in-place edit
 * and returns the previous value. This implementation
 * replaces the user object with the given value and
 * returns the old user object.
 */
mxCell.prototype.valueChanged = function(newValue)
{
	var previous = this.getValue();
	this.setValue(newValue);
	
	return previous;
};

/**
 * Function: getGeometry
 *
 * Returns the <mxGeometry> that describes the <geometry>.
 */
mxCell.prototype.getGeometry = function()
{
	return this.geometry;
};

/**
 * Function: setGeometry
 *
 * Sets the <mxGeometry> to be used as the <geometry>.
 */
mxCell.prototype.setGeometry = function(geometry)
{
	this.geometry = geometry;
};

/**
 * Function: getStyle
 *
 * Returns a string that describes the <style>.
 */
mxCell.prototype.getStyle = function()
{
	return this.style;
};

/**
 * Function: setStyle
 *
 * Sets the string to be used as the <style>.
 */
mxCell.prototype.setStyle = function(style)
{
	this.style = style;
};

/**
 * Function: isVertex
 *
 * Returns true if the cell is a vertex.
 */
mxCell.prototype.isVertex = function()
{
	return this.vertex != 0;
};

/**
 * Function: setVertex
 *
 * Specifies if the cell is a vertex. This should only be assigned at
 * construction of the cell and not be changed during its lifecycle.
 * 
 * Parameters:
 * 
 * vertex - Boolean that specifies if the cell is a vertex.
 */
mxCell.prototype.setVertex = function(vertex)
{
	this.vertex = vertex;
};

/**
 * Function: isEdge
 *
 * Returns true if the cell is an edge.
 */
mxCell.prototype.isEdge = function()
{
	return this.edge != 0;
};
	
/**
 * Function: setEdge
 * 
 * Specifies if the cell is an edge. This should only be assigned at
 * construction of the cell and not be changed during its lifecycle.
 * 
 * Parameters:
 * 
 * edge - Boolean that specifies if the cell is an edge.
 */
mxCell.prototype.setEdge = function(edge)
{
	this.edge = edge;
};

/**
 * Function: isConnectable
 *
 * Returns true if the cell is connectable.
 */
mxCell.prototype.isConnectable = function()
{
	return this.connectable != 0;
};

/**
 * Function: setConnectable
 *
 * Sets the connectable state.
 * 
 * Parameters:
 * 
 * connectable - Boolean that specifies the new connectable state.
 */
mxCell.prototype.setConnectable = function(connectable)
{
	this.connectable = connectable;
};

/**
 * Function: isVisible
 *
 * Returns true if the cell is visibile.
 */
mxCell.prototype.isVisible = function()
{
	return this.visible != 0;
};

/**
 * Function: setVisible
 *
 * Specifies if the cell is visible.
 * 
 * Parameters:
 * 
 * visible - Boolean that specifies the new visible state.
 */
mxCell.prototype.setVisible = function(visible)
{
	this.visible = visible;
};

/**
 * Function: isCollapsed
 *
 * Returns true if the cell is collapsed.
 */
mxCell.prototype.isCollapsed = function()
{
	return this.collapsed != 0;
};

/**
 * Function: setCollapsed
 *
 * Sets the collapsed state.
 * 
 * Parameters:
 * 
 * collapsed - Boolean that specifies the new collapsed state.
 */
mxCell.prototype.setCollapsed = function(collapsed)
{
	this.collapsed = collapsed;
};

/**
 * Function: getParent
 *
 * Returns the cell's parent.
 */
mxCell.prototype.getParent = function()
{
	return this.parent;
};

/**
 * Function: setParent
 *
 * Sets the parent cell.
 * 
 * Parameters:
 * 
 * parent - <mxCell> that represents the new parent.
 */
mxCell.prototype.setParent = function(parent)
{
	this.parent = parent;
};

/**
 * Function: getTerminal
 *
 * Returns the source or target terminal.
 * 
 * Parameters:
 * 
 * source - Boolean that specifies if the source terminal should be
 * returned.
 */
mxCell.prototype.getTerminal = function(source)
{
	return (source) ? this.source : this.target;
};

/**
 * Function: setTerminal
 *
 * Sets the source or target terminal and returns the new terminal.
 * 
 * Parameters:
 * 
 * terminal - <mxCell> that represents the new source or target terminal.
 * isSource - Boolean that specifies if the source or target terminal
 * should be set.
 */
mxCell.prototype.setTerminal = function(terminal, isSource)
{
	if (isSource)
	{
		this.source = terminal;
	}
	else
	{
		this.target = terminal;
	}
	
	return terminal;
};

/**
 * Function: getChildCount
 *
 * Returns the number of child cells.
 */
mxCell.prototype.getChildCount = function()
{
	return (this.children == null) ? 0 : this.children.length;
};

/**
 * Function: getIndex
 *
 * Returns the index of the specified child in the child array.
 * 
 * Parameters:
 * 
 * child - Child whose index should be returned.
 */
mxCell.prototype.getIndex = function(child)
{
	return mxUtils.indexOf(this.children, child);
};

/**
 * Function: getChildAt
 *
 * Returns the child at the specified index.
 * 
 * Parameters:
 * 
 * index - Integer that specifies the child to be returned.
 */
mxCell.prototype.getChildAt = function(index)
{
	return (this.children == null) ? null : this.children[index];
};

/**
 * Function: insert
 *
 * Inserts the specified child into the child array at the specified index
 * and updates the parent reference of the child. If not childIndex is
 * specified then the child is appended to the child array. Returns the
 * inserted child.
 * 
 * Parameters:
 * 
 * child - <mxCell> to be inserted or appended to the child array.
 * index - Optional integer that specifies the index at which the child
 * should be inserted into the child array.
 */
mxCell.prototype.insert = function(child, index)
{
	if (child != null)
	{
		if (index == null)
		{
			index = this.getChildCount();
			
			if (child.getParent() == this)
			{
				index--;
			}
		}

		child.removeFromParent();
		child.setParent(this);
		
		if (this.children == null)
		{
			this.children = [];
			this.children.push(child);
		}
		else
		{
			this.children.splice(index, 0, child);
		}
	}
	
	return child;
};

/**
 * Function: remove
 *
 * Removes the child at the specified index from the child array and
 * returns the child that was removed. Will remove the parent reference of
 * the child.
 * 
 * Parameters:
 * 
 * index - Integer that specifies the index of the child to be
 * removed.
 */
mxCell.prototype.remove = function(index)
{
	var child = null;
	
	if (this.children != null && index >= 0)
	{
		child = this.getChildAt(index);
		
		if (child != null)
		{
			this.children.splice(index, 1);
			child.setParent(null);
		}
	}
	
	return child;
};

/**
 * Function: removeFromParent
 *
 * Removes the cell from its parent.
 */
mxCell.prototype.removeFromParent = function()
{
	if (this.parent != null)
	{
		var index = this.parent.getIndex(this);
		this.parent.remove(index);
	}
};

/**
 * Function: getEdgeCount
 *
 * Returns the number of edges in the edge array.
 */
mxCell.prototype.getEdgeCount = function()
{
	return (this.edges == null) ? 0 : this.edges.length;
};

/**
 * Function: getEdgeIndex
 *
 * Returns the index of the specified edge in <edges>.
 * 
 * Parameters:
 * 
 * edge - <mxCell> whose index in <edges> should be returned.
 */
mxCell.prototype.getEdgeIndex = function(edge)
{
	return mxUtils.indexOf(this.edges, edge);
};

/**
 * Function: getEdgeAt
 *
 * Returns the edge at the specified index in <edges>.
 * 
 * Parameters:
 * 
 * index - Integer that specifies the index of the edge to be returned.
 */
mxCell.prototype.getEdgeAt = function(index)
{
	return (this.edges == null) ? null : this.edges[index];
};

/**
 * Function: insertEdge
 *
 * Inserts the specified edge into the edge array and returns the edge.
 * Will update the respective terminal reference of the edge.
 * 
 * Parameters:
 * 
 * edge - <mxCell> to be inserted into the edge array.
 * isOutgoing - Boolean that specifies if the edge is outgoing.
 */
mxCell.prototype.insertEdge = function(edge, isOutgoing)
{
	if (edge != null)
	{
		edge.removeFromTerminal(isOutgoing);
		edge.setTerminal(this, isOutgoing);
		
		if (this.edges == null ||
			edge.getTerminal(!isOutgoing) != this ||
			mxUtils.indexOf(this.edges, edge) < 0)
		{
			if (this.edges == null)
			{
				this.edges = [];
			}
			
			this.edges.push(edge);
		}
	}
	
	return edge;
};

/**
 * Function: removeEdge
 *
 * Removes the specified edge from the edge array and returns the edge.
 * Will remove the respective terminal reference from the edge.
 * 
 * Parameters:
 * 
 * edge - <mxCell> to be removed from the edge array.
 * isOutgoing - Boolean that specifies if the edge is outgoing.
 */
mxCell.prototype.removeEdge = function(edge, isOutgoing)
{
	if (edge != null)
	{
		if (edge.getTerminal(!isOutgoing) != this &&
			this.edges != null)
		{
			var index = this.getEdgeIndex(edge);
			
			if (index >= 0)
			{
				this.edges.splice(index, 1);
			}
		}
		
		edge.setTerminal(null, isOutgoing);
	}
	
	return edge;
};

/**
 * Function: removeFromTerminal
 *
 * Removes the edge from its source or target terminal.
 * 
 * Parameters:
 * 
 * isSource - Boolean that specifies if the edge should be removed from its
 * source or target terminal.
 */
mxCell.prototype.removeFromTerminal = function(isSource)
{
	var terminal = this.getTerminal(isSource);
	
	if (terminal != null)
	{
		terminal.removeEdge(this, isSource);
	}
};

/**
 * Function: getAttribute
 *
 * Returns the specified attribute from the user object if it is an XML
 * node.
 * 
 * Parameters:
 * 
 * name - Name of the attribute whose value should be returned.
 * defaultValue - Optional default value to use if the attribute has no
 * value.
 */
mxCell.prototype.getAttribute = function(name, defaultValue)
{
	var userObject = this.getValue();
	
	var val = (userObject != null &&
		userObject.nodeType == mxConstants.NODETYPE_ELEMENT) ?
		userObject.getAttribute(name) : null;
		
	return val || defaultValue;
};

/**
 * Function: setAttribute
 *
 * Sets the specified attribute on the user object if it is an XML node.
 * 
 * Parameters:
 * 
 * name - Name of the attribute whose value should be set.
 * value - New value of the attribute.
 */
mxCell.prototype.setAttribute = function(name, value)
{
	var userObject = this.getValue();
	
	if (userObject != null &&
		userObject.nodeType == mxConstants.NODETYPE_ELEMENT)
	{
		userObject.setAttribute(name, value);
	}
};

/**
 * Function: clone
 *
 * Returns a clone of the cell. Uses <cloneValue> to clone
 * the user object. All fields in <mxTransient> are ignored
 * during the cloning.
 */
mxCell.prototype.clone = function()
{
	var clone = mxUtils.clone(this, this.mxTransient);
	clone.setValue(this.cloneValue());
	
	return clone;
};

/**
 * Function: cloneValue
 *
 * Returns a clone of the cell's user object.
 */
mxCell.prototype.cloneValue = function()
{
	var value = this.getValue();
	
	if (value != null)
	{
		if (typeof(value.clone) == 'function')
		{
			value = value.clone();
		}
		else if (!isNaN(value.nodeType))
		{
			value = value.cloneNode(true);
		}
	}
	
	return value;
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxGeometry
 * 
 * Extends <mxRectangle> to represent the geometry of a cell.
 * 
 * For vertices, the geometry consists of the x- and y-location, and the width
 * and height. For edges, the geometry consists of the optional terminal- and
 * control points. The terminal points are only required if an edge is
 * unconnected, and are stored in the sourcePoint> and <targetPoint>
 * variables, respectively.
 * 
 * Example:
 * 
 * If an edge is unconnected, that is, it has no source or target terminal,
 * then a geometry with terminal points for a new edge can be defined as
 * follows.
 * 
 * (code)
 * geometry.setTerminalPoint(new mxPoint(x1, y1), true);
 * geometry.points = [new mxPoint(x2, y2)];
 * geometry.setTerminalPoint(new mxPoint(x3, y3), false);
 * (end)
 * 
 * Control points are used regardless of the connected state of an edge and may
 * be ignored or interpreted differently depending on the edge's <mxEdgeStyle>.
 * 
 * To disable automatic reset of control points after a cell has been moved or
 * resized, the the <mxGraph.resizeEdgesOnMove> and
 * <mxGraph.resetEdgesOnResize> may be used.
 *
 * Edge Labels:
 * 
 * Using the x- and y-coordinates of a cell's geometry, it is possible to
 * position the label on edges on a specific location on the actual edge shape
 * as it appears on the screen. The x-coordinate of an edge's geometry is used
 * to describe the distance from the center of the edge from -1 to 1 with 0
 * being the center of the edge and the default value. The y-coordinate of an
 * edge's geometry is used to describe the absolute, orthogonal distance in
 * pixels from that point. In addition, the <mxGeometry.offset> is used as an
 * absolute offset vector from the resulting point.
 * 
 * This coordinate system is applied if <relative> is true, otherwise the
 * offset defines the absolute vector from the edge's center point to the
 * label and the values for <x> and <y> are ignored.
 * 
 * The width and height parameter for edge geometries can be used to set the
 * label width and height (eg. for word wrapping).
 * 
 * Ports:
 * 
 * The term "port" refers to a relatively positioned, connectable child cell,
 * which is used to specify the connection between the parent and another cell
 * in the graph. Ports are typically modeled as vertices with relative
 * geometries.
 * 
 * Offsets:
 * 
 * The <offset> field is interpreted in 3 different ways, depending on the cell
 * and the geometry. For edges, the offset defines the absolute offset for the
 * edge label. For relative geometries, the offset defines the absolute offset
 * for the origin (top, left corner) of the vertex, otherwise the offset
 * defines the absolute offset for the label inside the vertex or group.
 * 
 * Constructor: mxGeometry
 *
 * Constructs a new object to describe the size and location of a vertex or
 * the control points of an edge.
 */
function mxGeometry(x, y, width, height)
{
	mxRectangle.call(this, x, y, width, height);
};

/**
 * Extends mxRectangle.
 */
mxGeometry.prototype = new mxRectangle();
mxGeometry.prototype.constructor = mxGeometry;

/**
 * Variable: TRANSLATE_CONTROL_POINTS
 * 
 * Global switch to translate the points in translate. Default is true.
 */
mxGeometry.prototype.TRANSLATE_CONTROL_POINTS = true;

/**
 * Variable: alternateBounds
 *
 * Stores alternate values for x, y, width and height in a rectangle. See
 * <swap> to exchange the values. Default is null.
 */
mxGeometry.prototype.alternateBounds = null;

/**
 * Variable: sourcePoint
 *
 * Defines the source <mxPoint> of the edge. This is used if the
 * corresponding edge does not have a source vertex. Otherwise it is
 * ignored. Default is  null.
 */
mxGeometry.prototype.sourcePoint = null;

/**
 * Variable: targetPoint
 *
 * Defines the target <mxPoint> of the edge. This is used if the
 * corresponding edge does not have a target vertex. Otherwise it is
 * ignored. Default is null.
 */
mxGeometry.prototype.targetPoint = null;

/**
 * Variable: points
 *
 * Array of <mxPoints> which specifies the control points along the edge.
 * These points are the intermediate points on the edge, for the endpoints
 * use <targetPoint> and <sourcePoint> or set the terminals of the edge to
 * a non-null value. Default is null.
 */
mxGeometry.prototype.points = null;

/**
 * Variable: offset
 *
 * For edges, this holds the offset (in pixels) from the position defined
 * by <x> and <y> on the edge. For relative geometries (for vertices), this
 * defines the absolute offset from the point defined by the relative
 * coordinates. For absolute geometries (for vertices), this defines the
 * offset for the label. Default is null.
 */
mxGeometry.prototype.offset = null;

/**
 * Variable: relative
 *
 * Specifies if the coordinates in the geometry are to be interpreted as
 * relative coordinates. For edges, this is used to define the location of
 * the edge label relative to the edge as rendered on the display. For
 * vertices, this specifies the relative location inside the bounds of the
 * parent cell.
 * 
 * If this is false, then the coordinates are relative to the origin of the
 * parent cell or, for edges, the edge label position is relative to the
 * center of the edge as rendered on screen.
 * 
 * Default is false.
 */
mxGeometry.prototype.relative = false;

/**
 * Function: swap
 * 
 * Swaps the x, y, width and height with the values stored in
 * <alternateBounds> and puts the previous values into <alternateBounds> as
 * a rectangle. This operation is carried-out in-place, that is, using the
 * existing geometry instance. If this operation is called during a graph
 * model transactional change, then the geometry should be cloned before
 * calling this method and setting the geometry of the cell using
 * <mxGraphModel.setGeometry>.
 */
mxGeometry.prototype.swap = function()
{
	if (this.alternateBounds != null)
	{
		var old = new mxRectangle(
			this.x, this.y, this.width, this.height);

		this.x = this.alternateBounds.x;
		this.y = this.alternateBounds.y;
		this.width = this.alternateBounds.width;
		this.height = this.alternateBounds.height;

		this.alternateBounds = old;
	}
};

/**
 * Function: getTerminalPoint
 * 
 * Returns the <mxPoint> representing the source or target point of this
 * edge. This is only used if the edge has no source or target vertex.
 * 
 * Parameters:
 * 
 * isSource - Boolean that specifies if the source or target point
 * should be returned.
 */
mxGeometry.prototype.getTerminalPoint = function(isSource)
{
	return (isSource) ? this.sourcePoint : this.targetPoint;
};

/**
 * Function: setTerminalPoint
 * 
 * Sets the <sourcePoint> or <targetPoint> to the given <mxPoint> and
 * returns the new point.
 * 
 * Parameters:
 * 
 * point - Point to be used as the new source or target point.
 * isSource - Boolean that specifies if the source or target point
 * should be set.
 */
mxGeometry.prototype.setTerminalPoint = function(point, isSource)
{
	if (isSource)
	{
		this.sourcePoint = point;
	}
	else
	{
		this.targetPoint = point;
	}
	
	return point;
};

/**
 * Function: rotate
 * 
 * Rotates the geometry by the given angle around the given center. That is,
 * <x> and <y> of the geometry, the <sourcePoint>, <targetPoint> and all
 * <points> are translated by the given amount. <x> and <y> are only
 * translated if <relative> is false.
 * 
 * Parameters:
 * 
 * angle - Number that specifies the rotation angle in degrees.
 * cx - <mxPoint> that specifies the center of the rotation.
 */
mxGeometry.prototype.rotate = function(angle, cx)
{
	var rad = mxUtils.toRadians(angle);
	var cos = Math.cos(rad);
	var sin = Math.sin(rad);
	
	// Rotates the geometry
	if (!this.relative)
	{
		var ct = new mxPoint(this.getCenterX(), this.getCenterY());
		var pt = mxUtils.getRotatedPoint(ct, cos, sin, cx);
		
		this.x = Math.round(pt.x - this.width / 2);
		this.y = Math.round(pt.y - this.height / 2);
	}

	// Rotates the source point
	if (this.sourcePoint != null)
	{
		var pt = mxUtils.getRotatedPoint(this.sourcePoint, cos, sin, cx);
		this.sourcePoint.x = Math.round(pt.x);
		this.sourcePoint.y = Math.round(pt.y);
	}
	
	// Translates the target point
	if (this.targetPoint != null)
	{
		var pt = mxUtils.getRotatedPoint(this.targetPoint, cos, sin, cx);
		this.targetPoint.x = Math.round(pt.x);
		this.targetPoint.y = Math.round(pt.y);	
	}
	
	// Translate the control points
	if (this.points != null)
	{
		for (var i = 0; i < this.points.length; i++)
		{
			if (this.points[i] != null)
			{
				var pt = mxUtils.getRotatedPoint(this.points[i], cos, sin, cx);
				this.points[i].x = Math.round(pt.x);
				this.points[i].y = Math.round(pt.y);
			}
		}
	}
};

/**
 * Function: translate
 * 
 * Translates the geometry by the specified amount. That is, <x> and <y> of the
 * geometry, the <sourcePoint>, <targetPoint> and all <points> are translated
 * by the given amount. <x> and <y> are only translated if <relative> is false.
 * If <TRANSLATE_CONTROL_POINTS> is false, then <points> are not modified by
 * this function.
 * 
 * Parameters:
 * 
 * dx - Number that specifies the x-coordinate of the translation.
 * dy - Number that specifies the y-coordinate of the translation.
 */
mxGeometry.prototype.translate = function(dx, dy)
{
	dx = parseFloat(dx);
	dy = parseFloat(dy);
	
	// Translates the geometry
	if (!this.relative)
	{
		this.x = parseFloat(this.x) + dx;
		this.y = parseFloat(this.y) + dy;
	}

	// Translates the source point
	if (this.sourcePoint != null)
	{
		this.sourcePoint.x = parseFloat(this.sourcePoint.x) + dx;
		this.sourcePoint.y = parseFloat(this.sourcePoint.y) + dy;
	}
	
	// Translates the target point
	if (this.targetPoint != null)
	{
		this.targetPoint.x = parseFloat(this.targetPoint.x) + dx;
		this.targetPoint.y = parseFloat(this.targetPoint.y) + dy;		
	}

	// Translate the control points
	if (this.TRANSLATE_CONTROL_POINTS && this.points != null)
	{
		for (var i = 0; i < this.points.length; i++)
		{
			if (this.points[i] != null)
			{
				this.points[i].x = parseFloat(this.points[i].x) + dx;
				this.points[i].y = parseFloat(this.points[i].y) + dy;
			}
		}
	}
};

/**
 * Function: scale
 * 
 * Scales the geometry by the given amount. That is, <x> and <y> of the
 * geometry, the <sourcePoint>, <targetPoint> and all <points> are scaled
 * by the given amount. <x>, <y>, <width> and <height> are only scaled if
 * <relative> is false. If <fixedAspect> is true, then the smaller value
 * is used to scale the width and the height.
 * 
 * Parameters:
 * 
 * sx - Number that specifies the horizontal scale factor.
 * sy - Number that specifies the vertical scale factor.
 * fixedAspect - Optional boolean to keep the aspect ratio fixed.
 */
mxGeometry.prototype.scale = function(sx, sy, fixedAspect)
{
	sx = parseFloat(sx);
	sy = parseFloat(sy);

	// Translates the source point
	if (this.sourcePoint != null)
	{
		this.sourcePoint.x = parseFloat(this.sourcePoint.x) * sx;
		this.sourcePoint.y = parseFloat(this.sourcePoint.y) * sy;
	}
	
	// Translates the target point
	if (this.targetPoint != null)
	{
		this.targetPoint.x = parseFloat(this.targetPoint.x) * sx;
		this.targetPoint.y = parseFloat(this.targetPoint.y) * sy;		
	}

	// Translate the control points
	if (this.points != null)
	{
		for (var i = 0; i < this.points.length; i++)
		{
			if (this.points[i] != null)
			{
				this.points[i].x = parseFloat(this.points[i].x) * sx;
				this.points[i].y = parseFloat(this.points[i].y) * sy;
			}
		}
	}
	
	// Translates the geometry
	if (!this.relative)
	{
		this.x = parseFloat(this.x) * sx;
		this.y = parseFloat(this.y) * sy;

		if (fixedAspect)
		{
			sy = sx = Math.min(sx, sy);
		}
		
		this.width = parseFloat(this.width) * sx;
		this.height = parseFloat(this.height) * sy;
	}
};

/**
 * Function: equals
 * 
 * Returns true if the given object equals this geometry.
 */
mxGeometry.prototype.equals = function(obj)
{
	return mxRectangle.prototype.equals.apply(this, arguments) &&
		this.relative == obj.relative &&
		((this.sourcePoint == null && obj.sourcePoint == null) || (this.sourcePoint != null && this.sourcePoint.equals(obj.sourcePoint))) &&
		((this.targetPoint == null && obj.targetPoint == null) || (this.targetPoint != null && this.targetPoint.equals(obj.targetPoint))) &&
		((this.points == null && obj.points == null) || (this.points != null && mxUtils.equalPoints(this.points, obj.points))) &&
		((this.alternateBounds == null && obj.alternateBounds == null) || (this.alternateBounds != null && this.alternateBounds.equals(obj.alternateBounds))) &&
		((this.offset == null && obj.offset == null) || (this.offset != null && this.offset.equals(obj.offset)));
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
var mxCellPath =
{

	/**
	 * Class: mxCellPath
	 * 
	 * Implements a mechanism for temporary cell Ids.
	 * 
	 * Variable: PATH_SEPARATOR
	 * 
	 * Defines the separator between the path components. Default is ".".
	 */
	PATH_SEPARATOR: '.',
	
	/**
	 * Function: create
	 * 
	 * Creates the cell path for the given cell. The cell path is a
	 * concatenation of the indices of all ancestors on the (finite) path to
	 * the root, eg. "0.0.0.1".
	 * 
	 * Parameters:
	 * 
	 * cell - Cell whose path should be returned.
	 */
	create: function(cell)
	{
		var result = '';
		
		if (cell != null)
		{
			var parent = cell.getParent();
			
			while (parent != null)
			{
				var index = parent.getIndex(cell);
				result = index + mxCellPath.PATH_SEPARATOR + result;
				
				cell = parent;
				parent = cell.getParent();
			}
		}
		
		// Removes trailing separator
		var n = result.length;
		
		if (n > 1)
		{
			result = result.substring(0, n - 1);
		}
		
		return result;
	},
	
	/**
	 * Function: getParentPath
	 * 
	 * Returns the path for the parent of the cell represented by the given
	 * path. Returns null if the given path has no parent.
	 * 
	 * Parameters:
	 * 
	 * path - Path whose parent path should be returned.
	 */
	getParentPath: function(path)
	{
		if (path != null)
		{
			var index = path.lastIndexOf(mxCellPath.PATH_SEPARATOR);

			if (index >= 0)
			{
				return path.substring(0, index);
			}
			else if (path.length > 0)
			{
				return '';
			}
		}

		return null;
	},

	/**
	 * Function: resolve
	 * 
	 * Returns the cell for the specified cell path using the given root as the
	 * root of the path.
	 * 
	 * Parameters:
	 * 
	 * root - Root cell of the path to be resolved.
	 * path - String that defines the path.
	 */
	resolve: function(root, path)
	{
		var parent = root;
		
		if (path != null)
		{
			var tokens = path.split(mxCellPath.PATH_SEPARATOR);
			
			for (var i=0; i<tokens.length; i++)
			{
				parent = parent.getChildAt(parseInt(tokens[i]));
			}
		}
		
		return parent;
	},
	
	/**
	 * Function: compare
	 * 
	 * Compares the given cell paths and returns -1 if p1 is smaller, 0 if
	 * p1 is equal and 1 if p1 is greater than p2.
	 */
	compare: function(p1, p2)
	{
		var min = Math.min(p1.length, p2.length);
		var comp = 0;
		
		for (var i = 0; i < min; i++)
		{
			if (p1[i] != p2[i])
			{
				if (p1[i].length == 0 ||
					p2[i].length == 0)
				{
					comp = (p1[i] == p2[i]) ? 0 : ((p1[i] > p2[i]) ? 1 : -1);
				}
				else
				{
					var t1 = parseInt(p1[i]);
					var t2 = parseInt(p2[i]);
					
					comp = (t1 == t2) ? 0 : ((t1 > t2) ? 1 : -1);
				}
				
				break;
			}
		}
		
		// Compares path length if both paths are equal to this point
		if (comp == 0)
		{
			var t1 = p1.length;
			var t2 = p2.length;
			
			if (t1 != t2)
			{
				comp = (t1 > t2) ? 1 : -1;
			}
		}
		
		return comp;
	}

};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
var mxCodecRegistry =
{
	/**
	 * Class: mxCodecRegistry
	 *
	 * Singleton class that acts as a global registry for codecs.
	 *
	 * Adding an <mxCodec>:
	 *
	 * 1. Define a default codec with a new instance of the 
	 * object to be handled.
	 *
	 * (code)
	 * var codec = new mxObjectCodec(new mxGraphModel());
	 * (end)
	 *
	 * 2. Define the functions required for encoding and decoding
	 * objects.
	 *
	 * (code)
	 * codec.encode = function(enc, obj) { ... }
	 * codec.decode = function(dec, node, into) { ... }
	 * (end)
	 *
	 * 3. Register the codec in the <mxCodecRegistry>.
	 *
	 * (code)
	 * mxCodecRegistry.register(codec);
	 * (end)
	 *
	 * <mxObjectCodec.decode> may be used to either create a new 
	 * instance of an object or to configure an existing instance, 
	 * in which case the into argument points to the existing
	 * object. In this case, we say the codec "configures" the
	 * object.
	 * 
	 * Variable: codecs
	 *
	 * Maps from constructor names to codecs.
	 */
	codecs: [],
	
	/**
	 * Variable: aliases
	 *
	 * Maps from classnames to codecnames.
	 */
	aliases: [],

	/**
	 * Function: register
	 *
	 * Registers a new codec and associates the name of the template
	 * constructor in the codec with the codec object.
	 *
	 * Parameters:
	 *
	 * codec - <mxObjectCodec> to be registered.
	 */
	register: function(codec)
	{
		if (codec != null)
		{
			var name = codec.getName();
			mxCodecRegistry.codecs[name] = codec;
			
			var classname = mxUtils.getFunctionName(codec.template.constructor);

			if (classname != name)
			{
				mxCodecRegistry.addAlias(classname, name);
			}
		}

		return codec;
	},

	/**
	 * Function: addAlias
	 *
	 * Adds an alias for mapping a classname to a codecname.
	 */
	addAlias: function(classname, codecname)
	{
		mxCodecRegistry.aliases[classname] = codecname;
	},

	/**
	 * Function: getCodec
	 *
	 * Returns a codec that handles objects that are constructed
	 * using the given constructor.
	 *
	 * Parameters:
	 *
	 * ctor - JavaScript constructor function. 
	 */
	getCodec: function(ctor)
	{
		var codec = null;
		
		if (ctor != null)
		{
			var name = mxUtils.getFunctionName(ctor);
			var tmp = mxCodecRegistry.aliases[name];
			
			if (tmp != null)
			{
				name = tmp;
			}
			
			codec = mxCodecRegistry.codecs[name];
			
			// Registers a new default codec for the given constructor
			// if no codec has been previously defined.
			if (codec == null)
			{
				try
				{
					codec = new mxObjectCodec(new ctor());
					mxCodecRegistry.register(codec);
				}
				catch (e)
				{
					// ignore
				}
			}
		}
		
		return codec;
	}

};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxCodec
 *
 * XML codec for JavaScript object graphs. See <mxObjectCodec> for a
 * description of the general encoding/decoding scheme. This class uses the
 * codecs registered in <mxCodecRegistry> for encoding/decoding each object.
 * 
 * References:
 * 
 * In order to resolve references, especially forward references, the mxCodec
 * constructor must be given the document that contains the referenced
 * elements.
 *
 * Examples:
 *
 * The following code is used to encode a graph model.
 *
 * (code)
 * var encoder = new mxCodec();
 * var result = encoder.encode(graph.getModel());
 * var xml = mxUtils.getXml(result);
 * (end)
 * 
 * Example:
 * 
 * Using the code below, an XML document is decoded into an existing model. The
 * document may be obtained using one of the functions in mxUtils for loading
 * an XML file, eg. <mxUtils.get>, or using <mxUtils.parseXml> for parsing an
 * XML string.
 * 
 * (code)
 * var doc = mxUtils.parseXml(xmlString);
 * var codec = new mxCodec(doc);
 * decoder.decode(doc.documentElement, graph.getModel());
 * (end)
 * 
 * Example:
 * 
 * This example demonstrates parsing a list of isolated cells into an existing
 * graph model. Note that the cells do not have a parent reference so they can
 * be added anywhere in the cell hierarchy after parsing.
 * 
 * (code)
 * var xml = '<root><mxCell id="2" value="Hello," vertex="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="World!" vertex="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" edge="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root>';
 * var doc = mxUtils.parseXml(xml);
 * var codec = new mxCodec(doc);
 * var elt = doc.documentElement.firstChild;
 * var cells = [];
 * 
 * while (elt != null)
 * {
 *   cells.push(codec.decode(elt));
 *   elt = elt.nextSibling;
 * }
 * 
 * graph.addCells(cells);
 * (end)
 * 
 * Example:
 * 
 * Using the following code, the selection cells of a graph are encoded and the
 * output is displayed in a dialog box.
 * 
 * (code)
 * var enc = new mxCodec();
 * var cells = graph.getSelectionCells();
 * mxUtils.alert(mxUtils.getPrettyXml(enc.encode(cells)));
 * (end)
 * 
 * Newlines in the XML can be converted to <br>, in which case a '<br>' argument
 * must be passed to <mxUtils.getXml> as the second argument.
 * 
 * Debugging:
 * 
 * For debugging I/O you can use the following code to get the sequence of
 * encoded objects:
 * 
 * (code)
 * var oldEncode = mxCodec.prototype.encode;
 * mxCodec.prototype.encode = function(obj)
 * {
 *   mxLog.show();
 *   mxLog.debug('mxCodec.encode: obj='+mxUtils.getFunctionName(obj.constructor));
 *   
 *   return oldEncode.apply(this, arguments);
 * };
 * (end)
 * 
 * Note that the I/O system adds object codecs for new object automatically. For
 * decoding those objects, the constructor should be written as follows:
 * 
 * (code)
 * var MyObj = function(name)
 * {
 *   // ...
 * };
 * (end)
 * 
 * Constructor: mxCodec
 *
 * Constructs an XML encoder/decoder for the specified
 * owner document.
 *
 * Parameters:
 *
 * document - Optional XML document that contains the data.
 * If no document is specified then a new document is created
 * using <mxUtils.createXmlDocument>.
 */
function mxCodec(document)
{
	this.document = document || mxUtils.createXmlDocument();
	this.objects = [];
};

/**
 * Variable: document
 *
 * The owner document of the codec.
 */
mxCodec.prototype.document = null;

/**
 * Variable: objects
 *
 * Maps from IDs to objects.
 */
mxCodec.prototype.objects = null;

/**
 * Variable: elements
 * 
 * Lookup table for resolving IDs to elements.
 */
mxCodec.prototype.elements = null;

/**
 * Variable: encodeDefaults
 *
 * Specifies if default values should be encoded. Default is false.
 */
mxCodec.prototype.encodeDefaults = false;


/**
 * Function: putObject
 * 
 * Assoiates the given object with the given ID and returns the given object.
 * 
 * Parameters
 * 
 * id - ID for the object to be associated with.
 * obj - Object to be associated with the ID.
 */
mxCodec.prototype.putObject = function(id, obj)
{
	this.objects[id] = obj;
	
	return obj;
};

/**
 * Function: getObject
 *
 * Returns the decoded object for the element with the specified ID in
 * <document>. If the object is not known then <lookup> is used to find an
 * object. If no object is found, then the element with the respective ID
 * from the document is parsed using <decode>.
 */
mxCodec.prototype.getObject = function(id)
{
	var obj = null;

	if (id != null)
	{
		obj = this.objects[id];
		
		if (obj == null)
		{
			obj = this.lookup(id);
			
			if (obj == null)
			{
				var node = this.getElementById(id);
				
				if (node != null)
				{
					obj = this.decode(node);
				}
			}
		}
	}
	
	return obj;
};

/**
 * Function: lookup
 *
 * Hook for subclassers to implement a custom lookup mechanism for cell IDs.
 * This implementation always returns null.
 *
 * Example:
 *
 * (code)
 * var codec = new mxCodec();
 * codec.lookup = function(id)
 * {
 *   return model.getCell(id);
 * };
 * (end)
 *
 * Parameters:
 *
 * id - ID of the object to be returned.
 */
mxCodec.prototype.lookup = function(id)
{
	return null;
};

/**
 * Function: getElementById
 *
 * Returns the element with the given ID from <document>.
 *
 * Parameters:
 *
 * id - String that contains the ID.
 */
mxCodec.prototype.getElementById = function(id)
{
	if (this.elements == null)
	{
		this.elements = new Object();
		this.addElement(this.document.documentElement);
	}
	
	return this.elements[id];
};

/**
 * Function: addElement
 *
 * Adds the given element to <elements> if it has an ID.
 */
mxCodec.prototype.addElement = function(node)
{
	if (node.nodeType == mxConstants.NODETYPE_ELEMENT)
	{
		var id = node.getAttribute('id');
		
		if (id != null && this.elements[id] == null)
		{
			this.elements[id] = node;
		}
	}
	
	node = node.firstChild;
	
	while (node != null)
	{
		this.addElement(node);
		node = node.nextSibling;
	}
};

/**
 * Function: getId
 *
 * Returns the ID of the specified object. This implementation
 * calls <reference> first and if that returns null handles
 * the object as an <mxCell> by returning their IDs using
 * <mxCell.getId>. If no ID exists for the given cell, then
 * an on-the-fly ID is generated using <mxCellPath.create>.
 *
 * Parameters:
 *
 * obj - Object to return the ID for.
 */
mxCodec.prototype.getId = function(obj)
{
	var id = null;
	
	if (obj != null)
	{
		id = this.reference(obj);
		
		if (id == null && obj instanceof mxCell)
		{
			id = obj.getId();
			
			if (id == null)
			{
				// Uses an on-the-fly Id
				id = mxCellPath.create(obj);
				
				if (id.length == 0)
				{
					id = 'root';
				}
			}
		}
	}
	
	return id;
};

/**
 * Function: reference
 *
 * Hook for subclassers to implement a custom method
 * for retrieving IDs from objects. This implementation
 * always returns null.
 *
 * Example:
 *
 * (code)
 * var codec = new mxCodec();
 * codec.reference = function(obj)
 * {
 *   return obj.getCustomId();
 * };
 * (end)
 *
 * Parameters:
 *
 * obj - Object whose ID should be returned.
 */
mxCodec.prototype.reference = function(obj)
{
	return null;
};

/**
 * Function: encode
 *
 * Encodes the specified object and returns the resulting
 * XML node.
 *
 * Parameters:
 *
 * obj - Object to be encoded. 
 */
mxCodec.prototype.encode = function(obj)
{
	var node = null;
	
	if (obj != null && obj.constructor != null)
	{
		var enc = mxCodecRegistry.getCodec(obj.constructor);
		
		if (enc != null)
		{
			node = enc.encode(this, obj);
		}
		else
		{
			if (mxUtils.isNode(obj))
			{
				node = mxUtils.importNode(this.document, obj, true);
			}
			else
			{
	    		mxLog.warn('mxCodec.encode: No codec for ' + mxUtils.getFunctionName(obj.constructor));
			}
		}
	}
	
	return node;
};

/**
 * Function: decode
 *
 * Decodes the given XML node. The optional "into"
 * argument specifies an existing object to be
 * used. If no object is given, then a new instance
 * is created using the constructor from the codec.
 *
 * The function returns the passed in object or
 * the new instance if no object was given.
 *
 * Parameters:
 *
 * node - XML node to be decoded.
 * into - Optional object to be decodec into.
 */
mxCodec.prototype.decode = function(node, into)
{
	var obj = null;
	
	if (node != null && node.nodeType == mxConstants.NODETYPE_ELEMENT)
	{
		var ctor = null;
		
		try
		{
			ctor = window[node.nodeName];
		}
		catch (err)
		{
			// ignore
		}
		
		var dec = mxCodecRegistry.getCodec(ctor);
		
		if (dec != null)
		{
			obj = dec.decode(this, node, into);
		}
		else
		{
			obj = node.cloneNode(true);
			obj.removeAttribute('as');
		}
	}
	
	return obj;
};

/**
 * Function: encodeCell
 *
 * Encoding of cell hierarchies is built-into the core, but
 * is a higher-level function that needs to be explicitely
 * used by the respective object encoders (eg. <mxModelCodec>,
 * <mxChildChangeCodec> and <mxRootChangeCodec>). This
 * implementation writes the given cell and its children as a
 * (flat) sequence into the given node. The children are not
 * encoded if the optional includeChildren is false. The
 * function is in charge of adding the result into the
 * given node and has no return value.
 *
 * Parameters:
 *
 * cell - <mxCell> to be encoded.
 * node - Parent XML node to add the encoded cell into.
 * includeChildren - Optional boolean indicating if the
 * function should include all descendents. Default is true. 
 */
mxCodec.prototype.encodeCell = function(cell, node, includeChildren)
{
	node.appendChild(this.encode(cell));
	
	if (includeChildren == null || includeChildren)
	{
		var childCount = cell.getChildCount();
		
		for (var i = 0; i < childCount; i++)
		{
			this.encodeCell(cell.getChildAt(i), node);
		}
	}
};

/**
 * Function: isCellCodec
 * 
 * Returns true if the given codec is a cell codec. This uses
 * <mxCellCodec.isCellCodec> to check if the codec is of the
 * given type.
 */
mxCodec.prototype.isCellCodec = function(codec)
{
	if (codec != null && typeof(codec.isCellCodec) == 'function')
	{
		return codec.isCellCodec();
	}
	
	return false;
};

/**
 * Function: decodeCell
 *
 * Decodes cells that have been encoded using inversion, ie.
 * where the user object is the enclosing node in the XML,
 * and restores the group and graph structure in the cells.
 * Returns a new <mxCell> instance that represents the
 * given node.
 *
 * Parameters:
 *
 * node - XML node that contains the cell data.
 * restoreStructures - Optional boolean indicating whether
 * the graph structure should be restored by calling insert
 * and insertEdge on the parent and terminals, respectively.
 * Default is true.
 */
mxCodec.prototype.decodeCell = function(node, restoreStructures)
{
	restoreStructures = (restoreStructures != null) ? restoreStructures : true;
	var cell = null;
	
	if (node != null && node.nodeType == mxConstants.NODETYPE_ELEMENT)
	{
		// Tries to find a codec for the given node name. If that does
		// not return a codec then the node is the user object (an XML node
		// that contains the mxCell, aka inversion).
		var decoder = mxCodecRegistry.getCodec(node.nodeName);
		
		// Tries to find the codec for the cell inside the user object.
		// This assumes all node names inside the user object are either
		// not registered or they correspond to a class for cells.
		if (!this.isCellCodec(decoder))
		{
			var child = node.firstChild;
			
			while (child != null && !this.isCellCodec(decoder))
			{
				decoder = mxCodecRegistry.getCodec(child.nodeName);
				child = child.nextSibling;
			}
		}
		
		if (!this.isCellCodec(decoder))
		{
			decoder = mxCodecRegistry.getCodec(mxCell);
		}

		cell = decoder.decode(this, node);
		
		if (restoreStructures)
		{
			this.insertIntoGraph(cell);
		}
	}
	
	return cell;
};

/**
 * Function: insertIntoGraph
 *
 * Inserts the given cell into its parent and terminal cells.
 */
mxCodec.prototype.insertIntoGraph = function(cell)
{
	var parent = cell.parent;
	var source = cell.getTerminal(true);
	var target = cell.getTerminal(false);

	// Fixes possible inconsistencies during insert into graph
	cell.setTerminal(null, false);
	cell.setTerminal(null, true);
	cell.parent = null;
	
	if (parent != null)
	{
		parent.insert(cell);
	}

	if (source != null)
	{
		source.insertEdge(cell, true);
	}

	if (target != null)
	{
		target.insertEdge(cell, false);
	}
};

/**
 * Function: setAttribute
 *
 * Sets the attribute on the specified node to value. This is a
 * helper method that makes sure the attribute and value arguments
 * are not null.
 *
 * Parameters:
 *
 * node - XML node to set the attribute for.
 * attributes - Attributename to be set.
 * value - New value of the attribute.
 */
mxCodec.prototype.setAttribute = function(node, attribute, value)
{
	if (attribute != null && value != null)
	{
		node.setAttribute(attribute, value);
	}
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxObjectCodec
 *
 * Generic codec for JavaScript objects that implements a mapping between
 * JavaScript objects and XML nodes that maps each field or element to an
 * attribute or child node, and vice versa.
 * 
 * Atomic Values:
 * 
 * Consider the following example.
 * 
 * (code)
 * var obj = new Object();
 * obj.foo = "Foo";
 * obj.bar = "Bar";
 * (end)
 * 
 * This object is encoded into an XML node using the following.
 * 
 * (code)
 * var enc = new mxCodec();
 * var node = enc.encode(obj);
 * (end)
 * 
 * The output of the encoding may be viewed using <mxLog> as follows.
 * 
 * (code)
 * mxLog.show();
 * mxLog.debug(mxUtils.getPrettyXml(node));
 * (end)
 * 
 * Finally, the result of the encoding looks as follows.
 * 
 * (code)
 * <Object foo="Foo" bar="Bar"/>
 * (end)
 * 
 * In the above output, the foo and bar fields have been mapped to attributes
 * with the same names, and the name of the constructor was used for the
 * nodename.
 * 
 * Booleans:
 *
 * Since booleans are numbers in JavaScript, all boolean values are encoded
 * into 1 for true and 0 for false. The decoder also accepts the string true
 * and false for boolean values.
 * 
 * Objects:
 * 
 * The above scheme is applied to all atomic fields, that is, to all non-object
 * fields of an object. For object fields, a child node is created with a
 * special attribute that contains the fieldname. This special attribute is
 * called "as" and hence, as is a reserved word that should not be used for a
 * fieldname.
 * 
 * Consider the following example where foo is an object and bar is an atomic
 * property of foo.
 * 
 * (code)
 * var obj = {foo: {bar: "Bar"}};
 * (end)
 * 
 * This will be mapped to the following XML structure by mxObjectCodec.
 * 
 * (code)
 * <Object>
 *   <Object bar="Bar" as="foo"/>
 * </Object>
 * (end)
 * 
 * In the above output, the inner Object node contains the as-attribute that
 * specifies the fieldname in the enclosing object. That is, the field foo was
 * mapped to a child node with an as-attribute that has the value foo.
 * 
 * Arrays:
 * 
 * Arrays are special objects that are either associative, in which case each
 * key, value pair is treated like a field where the key is the fieldname, or
 * they are a sequence of atomic values and objects, which is mapped to a
 * sequence of child nodes. For object elements, the above scheme is applied
 * without the use of the special as-attribute for creating each child. For
 * atomic elements, a special add-node is created with the value stored in the
 * value-attribute.
 * 
 * For example, the following array contains one atomic value and one object
 * with a field called bar. Furthermore it contains two associative entries
 * called bar with an atomic value, and foo with an object value.
 * 
 * (code)
 * var obj = ["Bar", {bar: "Bar"}];
 * obj["bar"] = "Bar";
 * obj["foo"] = {bar: "Bar"};
 * (end)
 * 
 * This array is represented by the following XML nodes.
 * 
 * (code)
 * <Array bar="Bar">
 *   <add value="Bar"/>
 *   <Object bar="Bar"/>
 *   <Object bar="Bar" as="foo"/>
 * </Array>
 * (end)
 * 
 * The Array node name is the name of the constructor. The additional
 * as-attribute in the last child contains the key of the associative entry,
 * whereas the second last child is part of the array sequence and does not
 * have an as-attribute.
 * 
 * References:
 * 
 * Objects may be represented as child nodes or attributes with ID values,
 * which are used to lookup the object in a table within <mxCodec>. The
 * <isReference> function is in charge of deciding if a specific field should
 * be encoded as a reference or not. Its default implementation returns true if
 * the fieldname is in <idrefs>, an array of strings that is used to configure
 * the <mxObjectCodec>.
 * 
 * Using this approach, the mapping does not guarantee that the referenced
 * object itself exists in the document. The fields that are encoded as
 * references must be carefully chosen to make sure all referenced objects
 * exist in the document, or may be resolved by some other means if necessary.
 * 
 * For example, in the case of the graph model all cells are stored in a tree
 * whose root is referenced by the model's root field. A tree is a structure
 * that is well suited for an XML representation, however, the additional edges
 * in the graph model have a reference to a source and target cell, which are
 * also contained in the tree. To handle this case, the source and target cell
 * of an edge are treated as references, whereas the children are treated as
 * objects. Since all cells are contained in the tree and no edge references a
 * source or target outside the tree, this setup makes sure all referenced
 * objects are contained in the document.
 * 
 * In the case of a tree structure we must further avoid infinite recursion by
 * ignoring the parent reference of each child. This is done by returning true
 * in <isExcluded>, whose default implementation uses the array of excluded
 * fieldnames passed to the mxObjectCodec constructor.
 * 
 * References are only used for cells in mxGraph. For defining other
 * referencable object types, the codec must be able to work out the ID of an
 * object. This is done by implementing <mxCodec.reference>. For decoding a
 * reference, the XML node with the respective id-attribute is fetched from the
 * document, decoded, and stored in a lookup table for later reference. For
 * looking up external objects, <mxCodec.lookup> may be implemented.
 * 
 * Expressions:
 * 
 * For decoding JavaScript expressions, the add-node may be used with a text
 * content that contains the JavaScript expression. For example, the following
 * creates a field called foo in the enclosing object and assigns it the value
 * of <mxConstants.ALIGN_LEFT>.
 * 
 * (code)
 * <Object>
 *   <add as="foo">mxConstants.ALIGN_LEFT</add>
 * </Object>
 * (end)
 * 
 * The resulting object has a field called foo with the value "left". Its XML
 * representation looks as follows.
 * 
 * (code)
 * <Object foo="left"/>
 * (end)
 * 
 * This means the expression is evaluated at decoding time and the result of
 * the evaluation is stored in the respective field. Valid expressions are all
 * JavaScript expressions, including function definitions, which are mapped to
 * functions on the resulting object.
 * 
 * Expressions are only evaluated if <allowEval> is true.
 * 
 * Constructor: mxObjectCodec
 *
 * Constructs a new codec for the specified template object.
 * The variables in the optional exclude array are ignored by
 * the codec. Variables in the optional idrefs array are
 * turned into references in the XML. The optional mapping
 * may be used to map from variable names to XML attributes.
 * The argument is created as follows:
 *
 * (code)
 * var mapping = new Object();
 * mapping['variableName'] = 'attribute-name';
 * (end)
 *
 * Parameters:
 *
 * template - Prototypical instance of the object to be
 * encoded/decoded.
 * exclude - Optional array of fieldnames to be ignored.
 * idrefs - Optional array of fieldnames to be converted to/from
 * references.
 * mapping - Optional mapping from field- to attributenames.
 */
function mxObjectCodec(template, exclude, idrefs, mapping)
{
	this.template = template;
	
	this.exclude = (exclude != null) ? exclude : [];
	this.idrefs = (idrefs != null) ? idrefs : [];
	this.mapping = (mapping != null) ? mapping : [];
	
	this.reverse = new Object();
	
	for (var i in this.mapping)
	{
		this.reverse[this.mapping[i]] = i;
	}
};

/**
 * Variable: allowEval
 *
 * Static global switch that specifies if expressions in arrays are allowed.
 * Default is false. NOTE: Enabling this carries a possible security risk.
 */
mxObjectCodec.allowEval = false;

/**
 * Variable: template
 *
 * Holds the template object associated with this codec.
 */
mxObjectCodec.prototype.template = null;

/**
 * Variable: exclude
 *
 * Array containing the variable names that should be
 * ignored by the codec.
 */
mxObjectCodec.prototype.exclude = null;

/**
 * Variable: idrefs
 *
 * Array containing the variable names that should be
 * turned into or converted from references. See
 * <mxCodec.getId> and <mxCodec.getObject>.
 */
mxObjectCodec.prototype.idrefs = null;

/**
 * Variable: mapping
 *
 * Maps from from fieldnames to XML attribute names.
 */
mxObjectCodec.prototype.mapping = null;

/**
 * Variable: reverse
 *
 * Maps from from XML attribute names to fieldnames.
 */
mxObjectCodec.prototype.reverse = null;

/**
 * Function: getName
 * 
 * Returns the name used for the nodenames and lookup of the codec when
 * classes are encoded and nodes are decoded. For classes to work with
 * this the codec registry automatically adds an alias for the classname
 * if that is different than what this returns. The default implementation
 * returns the classname of the template class.
 */
mxObjectCodec.prototype.getName = function()
{
	return mxUtils.getFunctionName(this.template.constructor);
};

/**
 * Function: cloneTemplate
 * 
 * Returns a new instance of the template for this codec.
 */
mxObjectCodec.prototype.cloneTemplate = function()
{
	return new this.template.constructor();
};

/**
 * Function: getFieldName
 * 
 * Returns the fieldname for the given attributename.
 * Looks up the value in the <reverse> mapping or returns
 * the input if there is no reverse mapping for the
 * given name.
 */
mxObjectCodec.prototype.getFieldName = function(attributename)
{
	if (attributename != null)
	{
		var mapped = this.reverse[attributename];
		
		if (mapped != null)
		{
			attributename = mapped;
		}
	}
	
	return attributename;
};

/**
 * Function: getAttributeName
 * 
 * Returns the attributename for the given fieldname.
 * Looks up the value in the <mapping> or returns
 * the input if there is no mapping for the
 * given name.
 */
mxObjectCodec.prototype.getAttributeName = function(fieldname)
{
	if (fieldname != null)
	{
		var mapped = this.mapping[fieldname];
		
		if (mapped != null)
		{
			fieldname = mapped;
		}
	}
	
	return fieldname;
};

/**
 * Function: isExcluded
 *
 * Returns true if the given attribute is to be ignored by the codec. This
 * implementation returns true if the given fieldname is in <exclude> or
 * if the fieldname equals <mxObjectIdentity.FIELD_NAME>.
 *
 * Parameters:
 *
 * obj - Object instance that contains the field.
 * attr - Fieldname of the field.
 * value - Value of the field.
 * write - Boolean indicating if the field is being encoded or decoded.
 * Write is true if the field is being encoded, else it is being decoded.
 */
mxObjectCodec.prototype.isExcluded = function(obj, attr, value, write)
{
	return attr == mxObjectIdentity.FIELD_NAME ||
		mxUtils.indexOf(this.exclude, attr) >= 0;
};

/**
 * Function: isReference
 *
 * Returns true if the given fieldname is to be treated
 * as a textual reference (ID). This implementation returns
 * true if the given fieldname is in <idrefs>.
 *
 * Parameters:
 *
 * obj - Object instance that contains the field.
 * attr - Fieldname of the field.
 * value - Value of the field. 
 * write - Boolean indicating if the field is being encoded or decoded.
 * Write is true if the field is being encoded, else it is being decoded.
 */
mxObjectCodec.prototype.isReference = function(obj, attr, value, write)
{
	return mxUtils.indexOf(this.idrefs, attr) >= 0;
};

/**
 * Function: encode
 *
 * Encodes the specified object and returns a node
 * representing then given object. Calls <beforeEncode>
 * after creating the node and <afterEncode> with the 
 * resulting node after processing.
 *
 * Enc is a reference to the calling encoder. It is used
 * to encode complex objects and create references.
 *
 * This implementation encodes all variables of an
 * object according to the following rules:
 *
 * - If the variable name is in <exclude> then it is ignored.
 * - If the variable name is in <idrefs> then <mxCodec.getId>
 * is used to replace the object with its ID.
 * - The variable name is mapped using <mapping>.
 * - If obj is an array and the variable name is numeric
 * (ie. an index) then it is not encoded.
 * - If the value is an object, then the codec is used to
 * create a child node with the variable name encoded into
 * the "as" attribute.
 * - Else, if <encodeDefaults> is true or the value differs
 * from the template value, then ...
 * - ... if obj is not an array, then the value is mapped to
 * an attribute.
 * - ... else if obj is an array, the value is mapped to an
 * add child with a value attribute or a text child node,
 * if the value is a function.
 *
 * If no ID exists for a variable in <idrefs> or if an object
 * cannot be encoded, a warning is issued using <mxLog.warn>.
 *
 * Returns the resulting XML node that represents the given
 * object.
 *
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Object to be encoded.
 */
mxObjectCodec.prototype.encode = function(enc, obj)
{
	var node = enc.document.createElement(this.getName());
	
	obj = this.beforeEncode(enc, obj, node);
	this.encodeObject(enc, obj, node);
	
	return this.afterEncode(enc, obj, node);
};
	
/**
 * Function: encodeObject
 *
 * Encodes the value of each member in then given obj into the given node using
 * <encodeValue>.
 * 
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Object to be encoded.
 * node - XML node that contains the encoded object.
 */
mxObjectCodec.prototype.encodeObject = function(enc, obj, node)
{
	enc.setAttribute(node, 'id', enc.getId(obj));
	
    for (var i in obj)
    {
		var name = i;
		var value = obj[name];
		
    	if (value != null && !this.isExcluded(obj, name, value, true))
    	{
    		if (mxUtils.isInteger(name))
    		{
    			name = null;
    		}
    		
    		this.encodeValue(enc, obj, name, value, node);
    	}
    }
};

/**
 * Function: encodeValue
 * 
 * Converts the given value according to the mappings
 * and id-refs in this codec and uses <writeAttribute>
 * to write the attribute into the given node.
 * 
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Object whose property is going to be encoded.
 * name - XML node that contains the encoded object.
 * value - Value of the property to be encoded.
 * node - XML node that contains the encoded object.
 */
mxObjectCodec.prototype.encodeValue = function(enc, obj, name, value, node)
{
	if (value != null)
	{
		if (this.isReference(obj, name, value, true))
		{
			var tmp = enc.getId(value);
			
			if (tmp == null)
			{
		    	mxLog.warn('mxObjectCodec.encode: No ID for ' +
		    		this.getName() + '.' + name + '=' + value);
		    	return; // exit
		    }
		    
		    value = tmp;
		}

		var defaultValue = this.template[name];
		
		// Checks if the value is a default value and
		// the name is correct
		if (name == null || enc.encodeDefaults || defaultValue != value)
		{
			name = this.getAttributeName(name);
			this.writeAttribute(enc, obj, name, value, node);	
		}
	}
};

/**
 * Function: writeAttribute
 * 
 * Writes the given value into node using <writePrimitiveAttribute>
 * or <writeComplexAttribute> depending on the type of the value.
 */
mxObjectCodec.prototype.writeAttribute = function(enc, obj, name, value, node)
{
	if (typeof(value) != 'object' /* primitive type */)
	{
		this.writePrimitiveAttribute(enc, obj, name, value, node);
	}
	else /* complex type */
	{
		this.writeComplexAttribute(enc, obj, name, value, node);
	}
};

/**
 * Function: writePrimitiveAttribute
 * 
 * Writes the given value as an attribute of the given node.
 */
mxObjectCodec.prototype.writePrimitiveAttribute = function(enc, obj, name, value, node)
{
	value = this.convertAttributeToXml(enc, obj, name, value, node);
	
	if (name == null)
	{
		var child = enc.document.createElement('add');
		
		if (typeof(value) == 'function')
		{
    		child.appendChild(enc.document.createTextNode(value));
    	}
    	else
    	{
    		enc.setAttribute(child, 'value', value);
    	}
    	
		node.appendChild(child);
	}
	else if (typeof(value) != 'function')
	{
    	enc.setAttribute(node, name, value);
	}		
};
	
/**
 * Function: writeComplexAttribute
 * 
 * Writes the given value as a child node of the given node.
 */
mxObjectCodec.prototype.writeComplexAttribute = function(enc, obj, name, value, node)
{
	var child = enc.encode(value);
	
	if (child != null)
	{
		if (name != null)
		{
    		child.setAttribute('as', name);
    	}
    	
    	node.appendChild(child);
	}
	else
	{
		mxLog.warn('mxObjectCodec.encode: No node for ' + this.getName() + '.' + name + ': ' + value);
	}
};

/**
 * Function: convertAttributeToXml
 * 
 * Converts true to "1" and false to "0" is <isBooleanAttribute> returns true.
 * All other values are not converted.
 * 
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Objec to convert the attribute for.
 * name - Name of the attribute to be converted.
 * value - Value to be converted.
 */
mxObjectCodec.prototype.convertAttributeToXml = function(enc, obj, name, value)
{
	// Makes sure to encode boolean values as numeric values
	if (this.isBooleanAttribute(enc, obj, name, value))
	{	
		// Checks if the value is true (do not use the value as is, because
		// this would check if the value is not null, so 0 would be true)
		value = (value == true) ? '1' : '0';
	}
	
	return value;
};

/**
 * Function: isBooleanAttribute
 * 
 * Returns true if the given object attribute is a boolean value.
 * 
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Objec to convert the attribute for.
 * name - Name of the attribute to be converted.
 * value - Value of the attribute to be converted.
 */
mxObjectCodec.prototype.isBooleanAttribute = function(enc, obj, name, value)
{
	return (typeof(value.length) == 'undefined' && (value == true || value == false));
};

/**
 * Function: convertAttributeFromXml
 * 
 * Converts booleans and numeric values to the respective types. Values are
 * numeric if <isNumericAttribute> returns true.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * attr - XML attribute to be converted.
 * obj - Objec to convert the attribute for.
 */
mxObjectCodec.prototype.convertAttributeFromXml = function(dec, attr, obj)
{
	var value = attr.value;
	
	if (this.isNumericAttribute(dec, attr, obj))
	{
		value = parseFloat(value);
	}
	
	return value;
};

/**
 * Function: isNumericAttribute
 * 
 * Returns true if the given XML attribute is a numeric value.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * attr - XML attribute to be converted.
 * obj - Objec to convert the attribute for.
 */
mxObjectCodec.prototype.isNumericAttribute = function(dec, attr, obj)
{
	return mxUtils.isNumeric(attr.value);
};

/**
 * Function: beforeEncode
 *
 * Hook for subclassers to pre-process the object before
 * encoding. This returns the input object. The return
 * value of this function is used in <encode> to perform
 * the default encoding into the given node.
 *
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Object to be encoded.
 * node - XML node to encode the object into.
 */
mxObjectCodec.prototype.beforeEncode = function(enc, obj, node)
{
	return obj;
};

/**
 * Function: afterEncode
 *
 * Hook for subclassers to post-process the node
 * for the given object after encoding and return the
 * post-processed node. This implementation returns 
 * the input node. The return value of this method
 * is returned to the encoder from <encode>.
 *
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * obj - Object to be encoded.
 * node - XML node that represents the default encoding.
 */
mxObjectCodec.prototype.afterEncode = function(enc, obj, node)
{
	return node;
};

/**
 * Function: decode
 *
 * Parses the given node into the object or returns a new object
 * representing the given node.
 *
 * Dec is a reference to the calling decoder. It is used to decode
 * complex objects and resolve references.
 *
 * If a node has an id attribute then the object cache is checked for the
 * object. If the object is not yet in the cache then it is constructed
 * using the constructor of <template> and cached in <mxCodec.objects>.
 *
 * This implementation decodes all attributes and childs of a node
 * according to the following rules:
 *
 * - If the variable name is in <exclude> or if the attribute name is "id"
 * or "as" then it is ignored.
 * - If the variable name is in <idrefs> then <mxCodec.getObject> is used
 * to replace the reference with an object.
 * - The variable name is mapped using a reverse <mapping>.
 * - If the value has a child node, then the codec is used to create a
 * child object with the variable name taken from the "as" attribute.
 * - If the object is an array and the variable name is empty then the
 * value or child object is appended to the array.
 * - If an add child has no value or the object is not an array then
 * the child text content is evaluated using <mxUtils.eval>.
 *
 * For add nodes where the object is not an array and the variable name
 * is defined, the default mechanism is used, allowing to override/add
 * methods as follows:
 *
 * (code)
 * <Object>
 *   <add as="hello"><![CDATA[
 *     function(arg1) {
 *       mxUtils.alert('Hello '+arg1);
 *     }
 *   ]]></add>
 * </Object>
 * (end) 
 *
 * If no object exists for an ID in <idrefs> a warning is issued
 * using <mxLog.warn>.
 *
 * Returns the resulting object that represents the given XML node
 * or the object given to the method as the into parameter.
 *
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * node - XML node to be decoded.
 * into - Optional objec to encode the node into.
 */
mxObjectCodec.prototype.decode = function(dec, node, into)
{
	var id = node.getAttribute('id');
	var obj = dec.objects[id];
	
	if (obj == null)
	{
		obj = into || this.cloneTemplate();
		
		if (id != null)
		{
			dec.putObject(id, obj);
		}
	}
	
	node = this.beforeDecode(dec, node, obj);
	this.decodeNode(dec, node, obj);
	
    return this.afterDecode(dec, node, obj);
};	

/**
 * Function: decodeNode
 * 
 * Calls <decodeAttributes> and <decodeChildren> for the given node.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * node - XML node to be decoded.
 * obj - Objec to encode the node into.
 */	
mxObjectCodec.prototype.decodeNode = function(dec, node, obj)
{
	if (node != null)
	{
		this.decodeAttributes(dec, node, obj);
		this.decodeChildren(dec, node, obj);
	}
};

/**
 * Function: decodeAttributes
 * 
 * Decodes all attributes of the given node using <decodeAttribute>.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * node - XML node to be decoded.
 * obj - Objec to encode the node into.
 */	
mxObjectCodec.prototype.decodeAttributes = function(dec, node, obj)
{
	var attrs = node.attributes;
	
	if (attrs != null)
	{
		for (var i = 0; i < attrs.length; i++)
		{
			this.decodeAttribute(dec, attrs[i], obj);
		}
	}
};

/**
 * Function: decodeAttribute
 * 
 * Reads the given attribute into the specified object.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * attr - XML attribute to be decoded.
 * obj - Objec to encode the attribute into.
 */	
mxObjectCodec.prototype.decodeAttribute = function(dec, attr, obj)
{
	var name = attr.nodeName;
	
	if (name != 'as' && name != 'id')
	{
		// Converts the string true and false to their boolean values.
		// This may require an additional check on the obj to see if
		// the existing field is a boolean value or uninitialized, in
		// which case we may want to convert true and false to a string.
		var value = this.convertAttributeFromXml(dec, attr, obj);
		var fieldname = this.getFieldName(name);
		
		if (this.isReference(obj, fieldname, value, false))
		{
			var tmp = dec.getObject(value);
			
			if (tmp == null)
			{
		    	mxLog.warn('mxObjectCodec.decode: No object for ' +
		    		this.getName() + '.' + name + '=' + value);
		    	return; // exit
		    }
		    
		    value = tmp;
		}

		if (!this.isExcluded(obj, name, value, false))
		{
			//mxLog.debug(mxUtils.getFunctionName(obj.constructor)+'.'+name+'='+value);
			obj[name] = value;
		}
	}
};

/**
 * Function: decodeChildren
 * 
 * Decodec all children of the given node using <decodeChild>.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * node - XML node to be decoded.
 * obj - Objec to encode the node into.
 */	
mxObjectCodec.prototype.decodeChildren = function(dec, node, obj)
{
	var child = node.firstChild;
	
	while (child != null)
	{
		var tmp = child.nextSibling;
		
		if (child.nodeType == mxConstants.NODETYPE_ELEMENT &&
			!this.processInclude(dec, child, obj))
		{
			this.decodeChild(dec, child, obj);
		}
		
		child = tmp;
	}
};

/**
 * Function: decodeChild
 * 
 * Reads the specified child into the given object.
 * 
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * child - XML child element to be decoded.
 * obj - Objec to encode the node into.
 */	
mxObjectCodec.prototype.decodeChild = function(dec, child, obj)
{
	var fieldname = this.getFieldName(child.getAttribute('as'));
	
	if (fieldname == null || !this.isExcluded(obj, fieldname, child, false))
	{
		var template = this.getFieldTemplate(obj, fieldname, child);
		var value = null;
		
		if (child.nodeName == 'add')
		{
			value = child.getAttribute('value');
			
			if (value == null && mxObjectCodec.allowEval)
			{
				value = mxUtils.eval(mxUtils.getTextContent(child));
			}
		}
		else
		{
			value = dec.decode(child, template);
		}

		this.addObjectValue(obj, fieldname, value, template);
	}
};

/**
 * Function: getFieldTemplate
 * 
 * Returns the template instance for the given field. This returns the
 * value of the field, null if the value is an array or an empty collection
 * if the value is a collection. The value is then used to populate the
 * field for a new instance. For strongly typed languages it may be
 * required to override this to return the correct collection instance
 * based on the encoded child.
 */	
mxObjectCodec.prototype.getFieldTemplate = function(obj, fieldname, child)
{
	var template = obj[fieldname];
	
	// Non-empty arrays are replaced completely
    if (template instanceof Array && template.length > 0)
    {
        template = null;
    }
    
    return template;
};

/**
 * Function: addObjectValue
 * 
 * Sets the decoded child node as a value of the given object. If the
 * object is a map, then the value is added with the given fieldname as a
 * key. If the fieldname is not empty, then setFieldValue is called or
 * else, if the object is a collection, the value is added to the
 * collection. For strongly typed languages it may be required to
 * override this with the correct code to add an entry to an object.
 */	
mxObjectCodec.prototype.addObjectValue = function(obj, fieldname, value, template)
{
	if (value != null && value != template)
	{
		if (fieldname != null && fieldname.length > 0)
		{
			obj[fieldname] = value;
		}
		else
		{
			obj.push(value);
		}
		//mxLog.debug('Decoded '+mxUtils.getFunctionName(obj.constructor)+'.'+fieldname+': '+value);
	}
};

/**
 * Function: processInclude
 *
 * Returns true if the given node is an include directive and
 * executes the include by decoding the XML document. Returns
 * false if the given node is not an include directive.
 *
 * Parameters:
 *
 * dec - <mxCodec> that controls the encoding/decoding process.
 * node - XML node to be checked.
 * into - Optional object to pass-thru to the codec.
 */
mxObjectCodec.prototype.processInclude = function(dec, node, into)
{
	if (node.nodeName == 'include')
	{
		var name = node.getAttribute('name');
		
		if (name != null)
		{
			try
			{
				var xml = mxUtils.load(name).getDocumentElement();
				
				if (xml != null)
				{
					dec.decode(xml, into);
				}
			}
			catch (e)
			{
				// ignore
			}
		}
		
		return true;
	}
	
	return false;
};

/**
 * Function: beforeDecode
 *
 * Hook for subclassers to pre-process the node for
 * the specified object and return the node to be
 * used for further processing by <decode>.
 * The object is created based on the template in the 
 * calling method and is never null. This implementation
 * returns the input node. The return value of this
 * function is used in <decode> to perform
 * the default decoding into the given object.
 *
 * Parameters:
 *
 * dec - <mxCodec> that controls the decoding process.
 * node - XML node to be decoded.
 * obj - Object to encode the node into.
 */
mxObjectCodec.prototype.beforeDecode = function(dec, node, obj)
{
	return node;
};

/**
 * Function: afterDecode
 *
 * Hook for subclassers to post-process the object after
 * decoding. This implementation returns the given object
 * without any changes. The return value of this method
 * is returned to the decoder from <decode>.
 *
 * Parameters:
 *
 * enc - <mxCodec> that controls the encoding process.
 * node - XML node to be decoded.
 * obj - Object that represents the default decoding.
 */
mxObjectCodec.prototype.afterDecode = function(dec, node, obj)
{
	return obj;
};

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
mxCodecRegistry.register(function()
{
	/**
	 * Class: mxCellCodec
	 *
	 * Codec for <mxCell>s. This class is created and registered
	 * dynamically at load time and used implicitely via <mxCodec>
	 * and the <mxCodecRegistry>.
	 *
	 * Transient Fields:
	 *
	 * - children
	 * - edges
	 * - overlays
	 * - mxTransient
	 *
	 * Reference Fields:
	 *
	 * - parent
	 * - source
	 * - target
	 * 
	 * Transient fields can be added using the following code:
	 * 
	 * mxCodecRegistry.getCodec(mxCell).exclude.push('name_of_field');
	 * 
	 * To subclass <mxCell>, replace the template and add an alias as
	 * follows.
	 * 
	 * (code)
	 * function CustomCell(value, geometry, style)
	 * {
	 *   mxCell.apply(this, arguments);
	 * }
	 * 
	 * mxUtils.extend(CustomCell, mxCell);
	 * 
	 * mxCodecRegistry.getCodec(mxCell).template = new CustomCell();
	 * mxCodecRegistry.addAlias('CustomCell', 'mxCell');
	 * (end)
	 */
	var codec = new mxObjectCodec(new mxCell(),
		['children', 'edges', 'overlays', 'mxTransient'],
		['parent', 'source', 'target']);

	/**
	 * Function: isCellCodec
	 *
	 * Returns true since this is a cell codec.
	 */
	codec.isCellCodec = function()
	{
		return true;
	};

	/**
	 * Overidden to disable conversion of value to number.
	 */
	codec.isNumericAttribute = function(dec, attr, obj)
	{
		return attr.nodeName !== 'value' && mxObjectCodec.prototype.isNumericAttribute.apply(this, arguments);
	};
	
	/**
	 * Function: isExcluded
	 *
	 * Excludes user objects that are XML nodes.
	 */ 
	codec.isExcluded = function(obj, attr, value, isWrite)
	{
		return mxObjectCodec.prototype.isExcluded.apply(this, arguments) ||
			(isWrite && attr == 'value' &&
			value.nodeType == mxConstants.NODETYPE_ELEMENT);
	};
	
	/**
	 * Function: afterEncode
	 *
	 * Encodes an <mxCell> and wraps the XML up inside the
	 * XML of the user object (inversion).
	 */
	codec.afterEncode = function(enc, obj, node)
	{
		if (obj.value != null && obj.value.nodeType == mxConstants.NODETYPE_ELEMENT)
		{
			// Wraps the graphical annotation up in the user object (inversion)
			// by putting the result of the default encoding into a clone of the
			// user object (node type 1) and returning this cloned user object.
			var tmp = node;
			node = mxUtils.importNode(enc.document, obj.value, true);
			node.appendChild(tmp);
			
			// Moves the id attribute to the outermost XML node, namely the
			// node which denotes the object boundaries in the file.
			var id = tmp.getAttribute('id');
			node.setAttribute('id', id);
			tmp.removeAttribute('id');
		}

		return node;
	};

	/**
	 * Function: beforeDecode
	 *
	 * Decodes an <mxCell> and uses the enclosing XML node as
	 * the user object for the cell (inversion).
	 */
	codec.beforeDecode = function(dec, node, obj)
	{
		var inner = node;
		var classname = this.getName();
		
		if (node.nodeName != classname)
		{
			// Passes the inner graphical annotation node to the
			// object codec for further processing of the cell.
			var tmp = node.getElementsByTagName(classname)[0];
			
			if (tmp != null && tmp.parentNode == node)
			{
				mxUtils.removeWhitespace(tmp, true);
				mxUtils.removeWhitespace(tmp, false);
				tmp.parentNode.removeChild(tmp);
				inner = tmp;
			}
			else
			{
				inner = null;
			}
			
			// Creates the user object out of the XML node
			obj.value = node.cloneNode(true);
			var id = obj.value.getAttribute('id');
			
			if (id != null)
			{
				obj.setId(id);
				obj.value.removeAttribute('id');
			}
		}
		else
		{
			// Uses ID from XML file as ID for cell in model
			obj.setId(node.getAttribute('id'));
		}
			
		// Preprocesses and removes all Id-references in order to use the
		// correct encoder (this) for the known references to cells (all).
		if (inner != null)
		{
			for (var i = 0; i < this.idrefs.length; i++)
			{
				var attr = this.idrefs[i];
				var ref = inner.getAttribute(attr);
				
				if (ref != null)
				{
					inner.removeAttribute(attr);
					var object = dec.objects[ref] || dec.lookup(ref);
					
					if (object == null)
					{
						// Needs to decode forward reference
						var element = dec.getElementById(ref);
						
						if (element != null)
						{
							var decoder = mxCodecRegistry.codecs[element.nodeName] || this;
							object = decoder.decode(dec, element);
						}
					}
					
					obj[attr] = object;
				}
			}
		}
		
		return inner;
	};

	// Returns the codec into the registry
	return codec;

}());

/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
mxCodecRegistry.register(function()
{
	/**
	 * Class: mxModelCodec
	 *
	 * Codec for <mxGraphModel>s. This class is created and registered
	 * dynamically at load time and used implicitely via <mxCodec>
	 * and the <mxCodecRegistry>.
	 */
	var codec = new mxObjectCodec(new mxGraphModel());

	/**
	 * Function: encodeObject
	 *
	 * Encodes the given <mxGraphModel> by writing a (flat) XML sequence of
	 * cell nodes as produced by the <mxCellCodec>. The sequence is
	 * wrapped-up in a node with the name root.
	 */
	codec.encodeObject = function(enc, obj, node)
	{
		var rootNode = enc.document.createElement('root');
		enc.encodeCell(obj.getRoot(), rootNode);
		node.appendChild(rootNode);
	};

	/**
	 * Function: decodeChild
	 * 
	 * Overrides decode child to handle special child nodes.
	 */	
	codec.decodeChild = function(dec, child, obj)
	{
		if (child.nodeName == 'root')
		{
			this.decodeRoot(dec, child, obj);
		}
		else
		{
			mxObjectCodec.prototype.decodeChild.apply(this, arguments);
		}
	};

	/**
	 * Function: decodeRoot
	 *
	 * Reads the cells into the graph model. All cells
	 * are children of the root element in the node.
	 */
	codec.decodeRoot = function(dec, root, model)
	{
		var rootCell = null;
		var tmp = root.firstChild;
		
		while (tmp != null)
		{
			var cell = dec.decodeCell(tmp);
			
			if (cell != null && cell.getParent() == null)
			{
				rootCell = cell;
			}
			
			tmp = tmp.nextSibling;
		}

		// Sets the root on the model if one has been decoded
		if (rootCell != null)
		{
			model.setRoot(rootCell);
		}
	};

	// Returns the codec into the registry
	return codec;

}());

window.mxGraphModel = mxGraphModel;

exports.mxGraphModel = mxGraphModel;
exports.mxCodec = mxCodec;