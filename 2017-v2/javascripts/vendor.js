/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
/**
 * Owl carousel
 * @version 2.1.6
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				// TODO: Should be computed from number of min width items in stage
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat--) {
				// Switch to only using appended clones
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			if (this.settings.center) {
				this.$stage.children('.center').removeClass('center');
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
			.wrap('<div class="' + this.settings.stageOuterClass + '"/>');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.$element.is(':visible')) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.$element.is(':visible')) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				// on a left pull, check on current index
				if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
					position = index;
				// on a right pull, check on previous index
				// to do so, subtract width from value and set position = index + 1
				} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
					position = index + 1;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!this.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			reciprocalItemsWidth = this._items[--iterator].width();
			elementWidth = this.$element.width();
			while (iterator--) {
				reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
				if (reciprocalItemsWidth > elementWidth) {
					break;
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var multiplier = 1,
			newPosition = position - 1,
			coordinate;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.$element.is(':visible')) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();

		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
	 */
	Owl.prototype.isNumeric = function(number) {
		return !isNaN(parseFloat(number));
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.$element.is(':visible');
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.$element.is(':visible') === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	};

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url("' + url + '")',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			visible = this._core.$stage.children().toArray().slice(start, end),
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
			var type = (function() {
					if (target.attr('data-vimeo-id')) {
						return 'vimeo';
					} else if (target.attr('data-vzaar-id')) {
						return 'vzaar'
					} else {
						return 'youtube';
					}
				})(),
				id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
				width = target.attr('data-width') || this._core.settings.videoWidth,
				height = target.attr('data-height') || this._core.settings.videoHeight,
				url = target.attr('href');

		if (url) {

			/*
					Parses the id's out of the following urls (and probably more):
					https://www.youtube.com/watch?v=:id
					https://youtu.be/:id
					https://vimeo.com/:id
					https://vimeo.com/channels/:channel/:id
					https://vimeo.com/groups/:group/videos/:id
					https://app.vzaar.com/videos/:id

					Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
			*/

			id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else if (id[3].indexOf('vzaar') > -1) {
				type = 'vzaar';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: '//vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		} else if (video.type === 'vzaar') {
			$.ajax({
				type: 'GET',
				url: '//vzaar.com/api/videos/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data.framegrab_url;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
				video.id + '?autoplay=1&rel=0&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="//player.vimeo.com/video/' + video.id +
				'?autoplay=1" width="' + width + '" height="' + height +
				'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		} else if (video.type === 'vzaar') {
			html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
				'" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
				'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
		}

		$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay timeout.
		 * @type {Timeout}
		 */
		this._timeout = null;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				} else if (e.namespace && e.property.name === 'position') {
					//console.log('play?', e);
					if (this._core.settings.autoplay) {
						this._setAutoPlayInterval();
					}
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this),
			'touchstart.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'touchend.owl.core': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		this._paused = false;

		if (this._core.is('rotating')) {
			return;
		}

		this._core.enter('rotating');

		this._setAutoPlayInterval();
	};

	/**
	 * Gets a new timeout
	 * @private
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 * @return {Timeout}
	 */
	Autoplay.prototype._getNextTimeout = function(timeout, speed) {
		if ( this._timeout ) {
			window.clearTimeout(this._timeout);
		}
		return window.setTimeout($.proxy(function() {
			if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
				return;
			}
			this._core.next(speed || this._core.settings.autoplaySpeed);
		}, this), timeout || this._core.settings.autoplayTimeout);
	};

	/**
	 * Sets autoplay in motion.
	 * @private
	 */
	Autoplay.prototype._setAutoPlayInterval = function() {
		this._timeout = this._getNextTimeout();
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		window.clearTimeout(this._timeout);
		this._core.leave('rotating');
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		this._paused = true;
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navText: [ 'prev', 'next' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<div>')
				.addClass(settings.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard && this._pages.length) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.1.0
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);

/*1508243861,,JIT Construction: v3377003,en_US*/

/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
try {window.FB|| (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    var __p;    with (this) {      (function(){var a={},b=function b(i,j){if(!i&&!j)return null;var k={};if(typeof i!=="undefined")k.type=i;if(typeof j!=="undefined")k.signature=j;return k},c=function c(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?"function("+(j.params?j.params.map(function(k){return/\?/.test(k)?"?"+k.replace("?",""):k}).join(","):"")+")"+(j.returns?":"+j.returns:""):undefined)},d=function d(i,j,k){return i},e=function e(i,j,k){if("sourcemeta"in __transform_includes)i.__SMmeta=j;if("typechecks"in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l)}return i},f=function f(i,j,k){return k.apply(i,j)},g=function g(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m},h=function h(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+":"+(m.line||0)+":"+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1}return k.apply(i,j)};if(typeof __transform_includes==="undefined"){__annotator=d;__bodyWrapper=f}else{__annotator=e;if("codeusage"in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a};__bodyWrapper.clearCodeUsage=function(){a={}}}else if("typechecks"in __transform_includes)__bodyWrapper=g;else __bodyWrapper=f}})();
__t=function(a){return a[0]};__w=function(a){return a};
var require,__d;(function(a){var b={},c={},d=["global","require","requireDynamic","requireLazy","module","exports"];require=function(e,f){if(Object.prototype.hasOwnProperty.call(c,e))return c[e];if(!Object.prototype.hasOwnProperty.call(b,e)){if(f)return null;throw new Error("Module "+e+" has not been defined")}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case"module":j=g;break;case"exports":j=g.exports;break;case"global":j=a;break;case"require":j=require;break;case"requireDynamic":j=null;break;case"requireLazy":j=null;break;default:j=require.call(null,h[l])}k.push(j)}g.factory.apply(a,k);c[e]=g.exports;return g.exports};__d=function(e,f,g,h){if(typeof g=="function"){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e)}else c[e]=g}})(this);
__d("ES5Array",[],(function a(b,c,d,e,f,g){var h={};h.isArray=function(i){return Object.prototype.toString.call(i)=="[object Array]"};f.exports=h}),null);
__d("ES5ArrayPrototype",[],(function a(b,c,d,e,f,g){var h={};h.map=function(i,j){if(typeof i!="function")throw new TypeError();var k=void 0,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m};h.forEach=function(i,j){h.map.call(this,i,j)};h.filter=function(i,j){if(typeof i!="function")throw new TypeError();var k=void 0,l=void 0,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l)}return n};h.every=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true};h.some=function(i,j){if(typeof i!="function")throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return-1};f.exports=h}),null);
__d("ES5Date",[],(function a(b,c,d,e,f,g){var h={};h.now=function(){return new Date().getTime()};f.exports=h}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES5StringPrototype",[],(function a(b,c,d,e,f,g){var h={};h.trim=function(){if(this==null)throw new TypeError("String.prototype.trim called on null or undefined");return String.prototype.replace.call(this,/^\s+|\s+$/g,"")};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError("String.prototype.startsWith called on null or undefined");var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l};h.endsWith=function(i){var j=String(this);if(this==null)throw new TypeError("String.prototype.endsWith called on null or undefined");var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o};h.includes=function(i){if(this==null)throw new TypeError("String.prototype.contains called on null or undefined");var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1};h.contains=h.includes;h.repeat=function(i){if(this==null)throw new TypeError("String.prototype.repeat called on null or undefined");var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return"";var l="";while(k){if(k&1)l+=j;if(k>>=1)j+=j}return l};f.exports=h}),null);
__d("ES6Array",[],(function a(b,c,d,e,f,g){"use strict";var h={from:function i(j){if(j==null)throw new TypeError("Object is null or undefined");var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol==="function"?typeof Symbol==="function"?Symbol.iterator:"@@iterator":"@@iterator",p=typeof k==="function",q=typeof n[o]==="function",r=0,s=void 0,t=void 0;if(q){s=typeof m==="function"?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m==="function"?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1}s.length=r;return s}};f.exports=h}),null);
__d("ES6ArrayPrototype",[],(function a(b,c,d,e,f,g){var h={find:function i(j,k){if(this==null)throw new TypeError("Array.prototype.find called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=h.findIndex.call(this,j,k);return l===-1?void 0:this[l]},findIndex:function i(j,k){if(this==null)throw new TypeError("Array.prototype.findIndex called on null or undefined");if(typeof j!=="function")throw new TypeError("predicate must be a function");var l=Object(this),m=l.length>>>0;for(var n=0;n<m;n++)if(j.call(k,l[n],n,l))return n;return-1},fill:function i(j){if(this==null)throw new TypeError("Array.prototype.fill called on null or undefined");var k=Object(this),l=k.length>>>0,m=arguments[1],n=m>>0,o=n<0?Math.max(l+n,0):Math.min(n,l),p=arguments[2],q=p===undefined?l:p>>0,r=q<0?Math.max(l+q,0):Math.min(q,l);while(o<r){k[o]=j;o++}return k}};f.exports=h}),null);
__d("ES6DatePrototype",[],(function a(b,c,d,e,f,g){function h(j){return(j<10?"0":"")+j}var i={toISOString:function j(){if(!isFinite(this))throw new Error("Invalid time value");var k=this.getUTCFullYear();k=(k<0?"-":k>9999?"+":"")+("00000"+Math.abs(k)).slice(0<=k&&k<=9999?-4:-6);return k+"-"+h(this.getUTCMonth()+1)+"-"+h(this.getUTCDate())+"T"+h(this.getUTCHours())+":"+h(this.getUTCMinutes())+":"+h(this.getUTCSeconds())+"."+(this.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"}};f.exports=i}),null);
__d("ES6Number",[],(function a(b,c,d,e,f,g){var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isFinite(l)}),isNaN:function(l){function m(n){return l.apply(this,arguments)}m.toString=function(){return l.toString()};return m}(function(l){return typeof l=="number"&&isNaN(l)}),isInteger:function l(m){return this.isFinite(m)&&Math.floor(m)===m},isSafeInteger:function l(m){return this.isFinite(m)&&m>=this.MIN_SAFE_INTEGER&&m<=this.MAX_SAFE_INTEGER&&Math.floor(m)===m},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={assign:function k(l){if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("ES7ArrayPrototype",["ES5ArrayPrototype","ES5Array"],(function a(b,c,d,e,f,g,h,i){var j=h.indexOf,k=i.isArray;function l(p){return Math.min(Math.max(m(p),0),Number.MAX_SAFE_INTEGER)}function m(p){var q=Number(p);return isFinite(q)&&q!==0?n(q)*Math.floor(Math.abs(q)):q}function n(p){return p>=0?1:-1}var o={includes:function p(q){"use strict";if(q!==undefined&&k(this)&&!(typeof q==="number"&&isNaN(q)))return j.apply(this,arguments)!==-1;var r=Object(this),s=r.length?l(r.length):0;if(s===0)return false;var t=arguments.length>1?m(arguments[1]):0,u=t<0?Math.max(s+t,0):t,v=isNaN(q)&&typeof q==="number";while(u<s){var w=r[u];if(w===q||typeof w==="number"&&v&&isNaN(w))return true;u++}return false}};f.exports=o}),null);
__d("ES7Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError("Object.entries called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]])});return l};j.values=function(k){if(k==null)throw new TypeError("Object.values called on non-object");var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n])});return l};f.exports=j}),null);
__d("ES7StringPrototype",[],(function a(b,c,d,e,f,g){var h={};h.trimLeft=function(){return this.replace(/^\s+/,"")};h.trimRight=function(){return this.replace(/\s+$/,"")};f.exports=h}),null);
/**
 * License: https://www.facebook.com/legal/license/syRHrx41-Q_/
 */
__d("json3",[],(function aa(ba,ca,da,ea,fa,a){"use strict";var b={},c={exports:b};(function(){var ha;(function(){var ia=typeof ha==="function"&&ha.amd,d={"function":true,object:true},e=d[typeof b]&&b&&!b.nodeType&&b,f=d[typeof window]&&window||this,g=e&&d[typeof c]&&c&&!c.nodeType&&typeof ba=="object"&&ba;if(g&&(g.global===g||g.window===g||g.self===g))f=g;function h(k,a){k||(k=f.Object());a||(a=f.Object());var la=k.Number||f.Number,ma=k.String||f.String,na=k.Object||f.Object,l=k.Date||f.Date,oa=k.SyntaxError||f.SyntaxError,pa=k.TypeError||f.TypeError,qa=k.Math||f.Math,i=k.JSON||f.JSON;if(typeof i=="object"&&i){a.stringify=i.stringify;a.parse=i.parse}var ra=na.prototype,m=ra.toString,n,o,p,q=new l(-3509827334573292);try{q=q.getUTCFullYear()==-109252&&q.getUTCMonth()===0&&q.getUTCDate()===1&&q.getUTCHours()==10&&q.getUTCMinutes()==37&&q.getUTCSeconds()==6&&q.getUTCMilliseconds()==708}catch(r){}function s(H){if(s[H]!==p)return s[H];var I;if(H=="bug-string-char-index")I="a"[0]!="a";else if(H=="json")I=s("json-stringify")&&s("json-parse");else{var J,K='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if(H=="json-stringify"){var L=a.stringify,M=typeof L=="function"&&q;if(M){(J=function(){return 1}).toJSON=J;try{M=L(0)==="0"&&L(new la())==="0"&&L(new ma())=='""'&&L(m)===p&&L(p)===p&&L()===p&&L(J)==="1"&&L([J])=="[1]"&&L([p])=="[null]"&&L(null)=="null"&&L([p,m,null])=="[null,null,null]"&&L({a:[J,true,false,null,"\0\b\n\f\r\t"]})==K&&L(null,J)==="1"&&L([1,2],null,1)=="[\n 1,\n 2\n]"&&L(new l(-864e13))=='"-271821-04-20T00:00:00.000Z"'&&L(new l(864e13))=='"+275760-09-13T00:00:00.000Z"'&&L(new l(-621987552e5))=='"-000001-01-01T00:00:00.000Z"'&&L(new l(-1))=='"1969-12-31T23:59:59.999Z"'}catch(r){M=false}}I=M}if(H=="json-parse"){var N=a.parse;if(typeof N=="function")try{if(N("0")===0&&!N(false)){J=N(K);var O=J.a.length==5&&J.a[0]===1;if(O){try{O=!N('"\t"')}catch(r){}if(O)try{O=N("01")!==1}catch(r){}if(O)try{O=N("1.")!==1}catch(r){}}}}catch(r){O=false}I=O}}return s[H]=!!I}if(!s("json")){var t="[object Function]",sa="[object Date]",u="[object Number]",v="[object String]",w="[object Array]",ta="[object Boolean]",x=s("bug-string-char-index");if(!q)var y=qa.floor,ua=[0,31,59,90,120,151,181,212,243,273,304,334],z=function(H,I){return ua[I]+365*(H-1970)+y((H-1969+(I=+(I>1)))/4)-y((H-1901+I)/100)+y((H-1601+I)/400)};if(!(n=ra.hasOwnProperty))n=function(H){var I={},J;if((I.__proto__=null,I.__proto__={toString:1},I).toString!=m)n=function(H){var K=this.__proto__,L=H in(this.__proto__=null,this);this.__proto__=K;return L};else{J=I.constructor;n=function(H){var K=(this.constructor||J).prototype;return H in this&&!(H in K&&this[H]===K[H])}}I=null;return n.call(this,H)};o=function(H,I){var J=0,K,L,M;(K=function(){this.valueOf=0}).prototype.valueOf=0;L=new K();for(M in L)if(n.call(L,M))J++;K=L=null;if(!J){L=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];o=function(H,I){var N=m.call(H)==t,M,O,P=!N&&typeof H.constructor!="function"&&d[typeof H.hasOwnProperty]&&H.hasOwnProperty||n;for(M in H)if(!(N&&M=="prototype")&&P.call(H,M))I(M);for(O=L.length;M=L[--O];P.call(H,M)&&I(M));}}else if(J==2)o=function(H,I){var L={},N=m.call(H)==t,M;for(M in H)if(!(N&&M=="prototype")&&!n.call(L,M)&&(L[M]=1)&&n.call(H,M))I(M)};else o=function(H,I){var N=m.call(H)==t,M,O;for(M in H)if(!(N&&M=="prototype")&&n.call(H,M)&&!(O=M==="constructor"))I(M);if(O||n.call(H,M="constructor"))I(M)};return o(H,I)};if(!s("json-stringify")){var va={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},wa="000000",A=function(H,I){return(wa+(I||0)).slice(-H)},xa="\\u00",ya=function(H){var I='"',J=0,K=H.length,L=!x||K>10,M=L&&(x?H.split(""):H);for(;J<K;J++){var N=H.charCodeAt(J);switch(N){case 8:case 9:case 10:case 12:case 13:case 34:case 92:I+=va[N];break;default:if(N<32){I+=xa+A(2,N.toString(16));break}I+=L?M[J]:H.charAt(J)}}return I+'"'},B=function(H,I,J,K,L,M,N){var O,P,Q,R,S,T,U,V,W,Da,X,Y,Z,$,Ea,Fa;try{O=I[H]}catch(r){}if(typeof O=="object"&&O){P=m.call(O);if(P==sa&&!n.call(O,"toJSON"))if(O>-1/0&&O<1/0){if(z){S=y(O/864e5);for(Q=y(S/365.2425)+1970-1;z(Q+1,0)<=S;Q++);for(R=y((S-z(Q,0))/30.42);z(Q,R+1)<=S;R++);S=1+S-z(Q,R);T=(O%864e5+864e5)%864e5;U=y(T/36e5)%24;V=y(T/6e4)%60;W=y(T/1e3)%60;Da=T%1e3}else{Q=O.getUTCFullYear();R=O.getUTCMonth();S=O.getUTCDate();U=O.getUTCHours();V=O.getUTCMinutes();W=O.getUTCSeconds();Da=O.getUTCMilliseconds()}O=(Q<=0||Q>=1e4?(Q<0?"-":"+")+A(6,Q<0?-Q:Q):A(4,Q))+"-"+A(2,R+1)+"-"+A(2,S)+"T"+A(2,U)+":"+A(2,V)+":"+A(2,W)+"."+A(3,Da)+"Z"}else O=null;else if(typeof O.toJSON=="function"&&(P!=u&&P!=v&&P!=w||n.call(O,"toJSON")))O=O.toJSON(H)}if(J)O=J.call(I,H,O);if(O===null)return"null";P=m.call(O);if(P==ta)return""+O;else if(P==u)return O>-1/0&&O<1/0?""+O:"null";else if(P==v)return ya(""+O);if(typeof O=="object"){for($=N.length;$--;)if(N[$]===O)throw pa();N.push(O);X=[];Ea=M;M+=L;if(P==w){for(Z=0,$=O.length;Z<$;Z++){Y=B(Z,O,J,K,L,M,N);X.push(Y===p?"null":Y)}Fa=X.length?L?"[\n"+M+X.join(",\n"+M)+"\n"+Ea+"]":"["+X.join(",")+"]":"[]"}else{o(K||O,function(H){var Y=B(H,O,J,K,L,M,N);if(Y!==p)X.push(ya(H)+":"+(L?" ":"")+Y)});Fa=X.length?L?"{\n"+M+X.join(",\n"+M)+"\n"+Ea+"}":"{"+X.join(",")+"}":"{}"}N.pop();return Fa}};a.stringify=function(H,I,J){var K,L,M,N;if(d[typeof I]&&I)if((N=m.call(I))==t)L=I;else if(N==w){M={};for(var O=0,P=I.length,Q;O<P;Q=I[O++],(N=m.call(Q),N==v||N==u)&&(M[Q]=1));}if(J)if((N=m.call(J))==u){if((J-=J%1)>0)for(K="",J>10&&(J=10);K.length<J;K+=" ");}else if(N==v)K=J.length<=10?J:J.slice(0,10);return B("",(Q={},Q[""]=H,Q),L,M,K,"",[])}}if(!s("json-parse")){var za=ma.fromCharCode,Aa={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},C,D,E=function(){C=D=null;throw oa()},F=function(){var H=D,I=H.length,J,K,L,M,N;while(C<I){N=H.charCodeAt(C);switch(N){case 9:case 10:case 13:case 32:C++;break;case 123:case 125:case 91:case 93:case 58:case 44:J=x?H.charAt(C):H[C];C++;return J;case 34:for(J="@",C++;C<I;){N=H.charCodeAt(C);if(N<32)E();else if(N==92){N=H.charCodeAt(++C);switch(N){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:J+=Aa[N];C++;break;case 117:K=++C;for(L=C+4;C<L;C++){N=H.charCodeAt(C);if(!(N>=48&&N<=57||N>=97&&N<=102||N>=65&&N<=70))E()}J+=za("0x"+H.slice(K,C));break;default:E()}}else{if(N==34)break;N=H.charCodeAt(C);K=C;while(N>=32&&N!=92&&N!=34)N=H.charCodeAt(++C);J+=H.slice(K,C)}}if(H.charCodeAt(C)==34){C++;return J}E();default:K=C;if(N==45){M=true;N=H.charCodeAt(++C)}if(N>=48&&N<=57){if(N==48&&(N=H.charCodeAt(C+1),N>=48&&N<=57))E();M=false;for(;C<I&&(N=H.charCodeAt(C),N>=48&&N<=57);C++);if(H.charCodeAt(C)==46){L=++C;for(;L<I&&(N=H.charCodeAt(L),N>=48&&N<=57);L++);if(L==C)E();C=L}N=H.charCodeAt(C);if(N==101||N==69){N=H.charCodeAt(++C);if(N==43||N==45)C++;for(L=C;L<I&&(N=H.charCodeAt(L),N>=48&&N<=57);L++);if(L==C)E();C=L}return+H.slice(K,C)}if(M)E();if(H.slice(C,C+4)=="true"){C+=4;return true}else if(H.slice(C,C+5)=="false"){C+=5;return false}else if(H.slice(C,C+4)=="null"){C+=4;return null}E()}}return"$"},G=function(H){var I,J;if(H=="$")E();if(typeof H=="string"){if((x?H.charAt(0):H[0])=="@")return H.slice(1);if(H=="["){I=[];for(;;J||(J=true)){H=F();if(H=="]")break;if(J)if(H==","){H=F();if(H=="]")E()}else E();if(H==",")E();I.push(G(H))}return I}else if(H=="{"){I={};for(;;J||(J=true)){H=F();if(H=="}")break;if(J)if(H==","){H=F();if(H=="}")E()}else E();if(H==","||typeof H!="string"||(x?H.charAt(0):H[0])!="@"||F()!=":")E();I[H.slice(1)]=G(F())}return I}E()}return H},Ba=function(H,I,J){var K=Ca(H,I,J);if(K===p)delete H[I];else H[I]=K},Ca=function(H,I,J){var K=H[I],L;if(typeof K=="object"&&K)if(m.call(K)==w)for(L=K.length;L--;)Ba(K,L,J);else o(K,function(I){Ba(K,I,J)});return J.call(H,I,K)};a.parse=function(H,I){var J,K;C=0;D=""+H;J=G(F());if(F()!="$")E();C=D=null;return I&&m.call(I)==t?Ca((K={},K[""]=J,K),"",I):J}}}a.runInContext=h;return a}if(e&&!ia)h(f,e);else{var i=f.JSON,ja=f.JSON3,ka=false,j=h(f,f.JSON3={noConflict:function(){if(!ka){ka=true;f.JSON=i;f.JSON3=ja;i=ja=null}return j}});f.JSON={parse:j.parse,stringify:j.stringify}}}).call(this)})();var ga=c.exports;fa.exports=ga}),null);
__d("ES",["json3","ES5ArrayPrototype","ES5FunctionPrototype","ES5StringPrototype","ES5Array","ES5Object","ES5Date","ES6Array","ES6Object","ES6ArrayPrototype","ES6DatePrototype","ES6Number","ES7StringPrototype","ES7Object","ES7ArrayPrototype"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w={}.toString,x={"JSON.stringify":h.stringify,"JSON.parse":h.parse},y={"Array.prototype":i,"Function.prototype":j,"String.prototype":k,Object:m,Array:l,Date:n},z={Object:p,"Array.prototype":q,"Date.prototype":r,Number:s,Array:o},A={Object:u,"String.prototype":t,"Array.prototype":v};function B(D){for(var E in D){if(!Object.prototype.hasOwnProperty.call(D,E))continue;var F=D[E],G=E.split(".");if(G.length===2){var H=G[0],I=G[1];if(!H||!I||!window[H]||!window[H][I]){var J=H?window[H]:"-",K=H&&window[H]&&I?window[H][I]:"-";throw new Error("Unexpected state (t11975770): "+(H+", "+I+", "+J+", "+K+", "+E))}}var L=G.length===2?window[G[0]][G[1]]:window[E];for(var M in F){if(!Object.prototype.hasOwnProperty.call(F,M))continue;if(typeof F[M]!=="function"){x[E+"."+M]=F[M];continue}var N=L[M];x[E+"."+M]=N&&/\{\s+\[native code\]\s\}/.test(N)?N:F[M]}}}B(y);B(z);B(A);function C(D,E,F){var G=F?w.call(D).slice(8,-1)+".prototype":D,H=x[G+"."+E]||D[E];if(typeof H==="function"){for(var I=arguments.length,J=Array(I>3?I-3:0),K=3;K<I;K++)J[K-3]=arguments[K];return H.apply(D,J)}else if(H)return H;throw new Error("Polyfill "+G+" does not have implementation of "+E)}f.exports=C}),null);
__d("ES5FunctionPrototype",[],(function a(b,c,d,e,f,g){var h={};h.bind=function(i){if(typeof this!="function")throw new TypeError("Bind must be called on a function");var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)))}l.displayName="bound:"+(j.displayName||j.name||"(?)");l.toString=function m(){return"bound: "+j};return l};f.exports=h}),null);
__d("ie8DontEnum",[],(function a(b,c,d,e,f,g){var h=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","prototypeIsEnumerable","constructor"],i={}.hasOwnProperty,j=function j(){};if({toString:true}.propertyIsEnumerable("toString"))j=function j(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n)}};f.exports=j}),null);
__d("ES5Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!="object"&&m!="function")throw new TypeError("Object prototype may only be a Object or null");k.prototype=l;return new k()};j.keys=function(l){var m=typeof l;if(m!="object"&&m!="function"||l===null)throw new TypeError("Object.keys called on non-object");var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p)});return n};f.exports=j}),null);
__d("ES6Object",["ie8DontEnum"],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={assign:function k(l){if(l==null)throw new TypeError("Object.assign target cannot be null or undefined");l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(r){return l[r]=q[r]})}return l},is:function k(l,m){if(l===m)return l!==0||1/l===1/m;else return l!==l&&m!==m}};f.exports=j}),null);
__d("sdk.babelHelpers",["ES5FunctionPrototype","ES5Object","ES6Object"],(function a(b,c,d,e,f,g,h,i,j){var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n};k._extends=j.assign;k["extends"]=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p]}return o};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m};k.bind=h.bind;f.exports=k}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      (function(a,b){var c="keys",d="values",e="entries",f=function(){var l=h(Array),m=void 0;if(!l)m=function(){function m(n,o){"use strict";this.$ArrayIterator1=n;this.$ArrayIterator2=o;this.$ArrayIterator3=0}m.prototype.next=function(){"use strict";if(this.$ArrayIterator1==null)return{value:b,done:true};var n=this.$ArrayIterator1,o=this.$ArrayIterator1.length,p=this.$ArrayIterator3,q=this.$ArrayIterator2;if(p>=o){this.$ArrayIterator1=b;return{value:b,done:true}}this.$ArrayIterator3=p+1;if(q===c)return{value:p,done:false};else if(q===d)return{value:n[p],done:false};else if(q===e)return{value:[p,n[p]],done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:l?function(n){return n.keys()}:function(n){return new m(n,c)},values:l?function(n){return n.values()}:function(n){return new m(n,d)},entries:l?function(n){return n.entries()}:function(n){return new m(n,e)}}}(),g=function(){var l=h(String),m=void 0;if(!l)m=function(){function m(n){"use strict";this.$StringIterator1=n;this.$StringIterator2=0}m.prototype.next=function(){"use strict";if(this.$StringIterator1==null)return{value:b,done:true};var n=this.$StringIterator2,o=this.$StringIterator1,p=o.length;if(n>=p){this.$StringIterator1=b;return{value:b,done:true}}var q=void 0,r=o.charCodeAt(n);if(r<55296||r>56319||n+1===p)q=o[n];else{var s=o.charCodeAt(n+1);if(s<56320||s>57343)q=o[n];else q=o[n]+o[n+1]}this.$StringIterator2=n+q.length;return{value:q,done:false}};m.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};return m}();return{keys:function n(){throw TypeError("Strings default iterator doesn't implement keys.")},values:l?function(n){return n[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]()}:function(n){return new m(n)},entries:function n(){throw TypeError("Strings default iterator doesn't implement entries.")}}}();function h(l){return typeof l.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"&&typeof l.prototype.values==="function"&&typeof l.prototype.keys==="function"&&typeof l.prototype.entries==="function"}function i(l,m){"use strict";this.$ObjectIterator1=l;this.$ObjectIterator2=m;this.$ObjectIterator3=ES("Object","keys",false,l);this.$ObjectIterator4=0}i.prototype.next=function(){"use strict";var l=this.$ObjectIterator3.length,m=this.$ObjectIterator4,n=this.$ObjectIterator2,o=this.$ObjectIterator3[m];if(m>=l){this.$ObjectIterator1=b;return{value:b,done:true}}this.$ObjectIterator4=m+1;if(n===c)return{value:o,done:false};else if(n===d)return{value:this.$ObjectIterator1[o],done:false};else if(n===e)return{value:[o,this.$ObjectIterator1[o]],done:false}};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};var j={keys:function l(m){return new i(m,c)},values:function l(m){return new i(m,d)},entries:function l(m){return new i(m,e)}};function k(l,m){if(typeof l==="string")return g[m||d](l);else if(ES("Array","isArray",false,l))return f[m||d](l);else if(l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"])return l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();else return j[m||e](l)}ES("Object","assign",false,k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function l(m){return k(m,c)},values:function l(m){return k(m,d)},entries:function l(m){return k(m,e)},generic:j.entries});a.FB_enumerate=k})(typeof global==="undefined"?this:global);
(function(a,b){var c=a.window||a;function d(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}function e(j){var k=j?j.ownerDocument||j:document,l=k.defaultView||c;return!!(j&&(typeof l.Node==="function"?j instanceof l.Node:typeof j==="object"&&typeof j.nodeType==="number"&&typeof j.nodeName==="string"))}function f(j){var k=c[j];if(k==null)return true;if(typeof c.Symbol!=="function")return true;var l=k.prototype;return k==null||typeof k!=="function"||typeof l.clear!=="function"||new k().size!==0||typeof l.keys!=="function"||typeof l.forEach!=="function"}var g=a.FB_enumerate,h=function(){if(!f("Map"))return c.Map;var j="key",k="value",l="key+value",m="$map_",n=void 0,o="IE_HASH_";function h(A){"use strict";if(!t(this))throw new TypeError("Wrong map object type.");s(this);if(A!=null){var B=g(A),C=void 0;while(!(C=B.next()).done){if(!t(C.value))throw new TypeError("Expected iterable items to be pair objects.");this.set(C.value[0],C.value[1])}}}h.prototype.clear=function(){"use strict";s(this)};h.prototype.has=function(A){"use strict";var B=q(this,A);return!!(B!=null&&this._mapData[B])};h.prototype.set=function(A,B){"use strict";var C=q(this,A);if(C!=null&&this._mapData[C])this._mapData[C][1]=B;else{C=this._mapData.push([A,B])-1;r(this,A,C);this.size+=1}return this};h.prototype.get=function(A){"use strict";var B=q(this,A);if(B==null)return b;else return this._mapData[B][1]};h.prototype["delete"]=function(A){"use strict";var B=q(this,A);if(B!=null&&this._mapData[B]){r(this,A,b);this._mapData[B]=b;this.size-=1;return true}else return false};h.prototype.entries=function(){"use strict";return new p(this,l)};h.prototype.keys=function(){"use strict";return new p(this,j)};h.prototype.values=function(){"use strict";return new p(this,k)};h.prototype.forEach=function(A,B){"use strict";if(typeof A!=="function")throw new TypeError("Callback must be callable.");var C=ES(A,"bind",true,B||b),D=this._mapData;for(var E=0;E<D.length;E++){var F=D[E];if(F!=null)C(F[1],F[0],this)}};h.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.entries()};function p(A,B){"use strict";if(!(t(A)&&A._mapData))throw new TypeError("Object is not a map.");if(ES([j,l,k],"indexOf",true,B)===-1)throw new Error("Invalid iteration kind.");this._map=A;this._nextIndex=0;this._kind=B}p.prototype.next=function(){"use strict";if(!this instanceof h)throw new TypeError("Expected to be called on a MapIterator.");var A=this._map,B=this._nextIndex,C=this._kind;if(A==null)return u(b,true);var D=A._mapData;while(B<D.length){var E=D[B];B+=1;this._nextIndex=B;if(E)if(C===j)return u(E[0],false);else if(C===k)return u(E[1],false);else if(C)return u(E,false)}this._map=b;return u(b,true)};p.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this};function q(A,B){if(t(B)){var C=y(B);return C?A._objectIndex[C]:b}else{var D=m+B;if(typeof B==="string")return A._stringIndex[D];else return A._otherIndex[D]}}function r(A,B,C){var D=C==null;if(t(B)){var E=y(B);if(!E)E=z(B);if(D)delete A._objectIndex[E];else A._objectIndex[E]=C}else{var F=m+B;if(typeof B==="string")if(D)delete A._stringIndex[F];else A._stringIndex[F]=C;else if(D)delete A._otherIndex[F];else A._otherIndex[F]=C}}function s(A){A._mapData=[];A._objectIndex={};A._stringIndex={};A._otherIndex={};A.size=0}function t(A){return A!=null&&(typeof A==="object"||typeof A==="function")}function u(A,B){return{value:A,done:B}}h.__isES5=function(){try{Object.defineProperty({},"__.$#x",{});return true}catch(A){return false}}();function v(A){if(!h.__isES5||!Object.isExtensible)return true;else return Object.isExtensible(A)}function w(A){var B=void 0;switch(A.nodeType){case 1:B=A.uniqueID;break;case 9:B=A.documentElement.uniqueID;break;default:return null}if(B)return o+B;else return null}var x=d();function y(A){if(A[x])return A[x];else if(!h.__isES5&&A.propertyIsEnumerable&&A.propertyIsEnumerable[x])return A.propertyIsEnumerable[x];else if(!h.__isES5&&e(A)&&w(A))return w(A);else if(!h.__isES5&&A[x])return A[x]}var z=function(){var A=Object.prototype.propertyIsEnumerable,B=0;return function z(C){if(v(C)){B+=1;if(h.__isES5)Object.defineProperty(C,x,{enumerable:false,writable:false,configurable:false,value:B});else if(C.propertyIsEnumerable){C.propertyIsEnumerable=function(){return A.apply(this,arguments)};C.propertyIsEnumerable[x]=B}else if(e(C))C[x]=B;else throw new Error("Unable to set a non-enumerable property on object.");return B}else throw new Error("Non-extensible objects are not allowed as keys.")}}();return __annotator(h,{name:"Map"})}(),i=function(){if(!f("Set"))return c.Set;function i(k){"use strict";if(this==null||typeof this!=="object"&&typeof this!=="function")throw new TypeError("Wrong set object type.");j(this);if(k!=null){var l=g(k),m=void 0;while(!(m=l.next()).done)this.add(m.value)}}i.prototype.add=function(k){"use strict";this._map.set(k,k);this.size=this._map.size;return this};i.prototype.clear=function(){"use strict";j(this)};i.prototype["delete"]=function(k){"use strict";var l=this._map["delete"](k);this.size=this._map.size;return l};i.prototype.entries=function(){"use strict";return this._map.entries()};i.prototype.forEach=function(k){"use strict";var l=arguments[1],m=this._map.keys(),n=void 0;while(!(n=m.next()).done)k.call(l,n.value,n.value,this)};i.prototype.has=function(k){"use strict";return this._map.has(k)};i.prototype.values=function(){"use strict";return this._map.values()};i.prototype.keys=function(){"use strict";return this.values()};i.prototype[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]=function(){"use strict";return this.values()};function j(k){k._map=new h();k.size=k._map.size}return __annotator(i,{name:"Set"})}();a.Map=h;a.Set=i})(typeof global==="undefined"?this:global);      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","an_https":"an.facebook.com","fbcdn_http":"static.xx.fbcdn.net","fbcdn_https":"static.xx.fbcdn.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"3377003"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"js_sdk_mbasic_share_plugin_init":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPageView","AppEvents.logPurchase","AppEvents.setUserID","AppEvents.getUserID","AppEvents.clearUserID","AppEvents.updateUserProperties","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","AppEvents.setAppVersion","AppEvents.getAppVersion","AppEvents.clearAppVersion","RankingService.hidePlugin","RankingService.showPlugin"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/p0HGCYXNu7N.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}.fb_shrink_active{opacity:1;transform:scale(1, 1);transition-duration:200ms;transition-timing-function:ease-out}.fb_shrink_active:active{opacity:.5;transform:scale(.75, .75)}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_loader{background-color:#f6f7f9;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #29487d;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f9;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});      __d("DOMWrapper",[],(function a(b,c,d,e,f,g){var h,i,j={setRoot:function k(l){h=l},getRoot:function k(){return h||document.body},setWindow:function k(l){i=l},getWindow:function k(){return i||self}};f.exports=j}),null);
__d("dotAccess",[],(function a(b,c,d,e,f,g){function h(i,j,k){var l=j.split(".");do{var m=l.shift();i=i[m]||k&&(i[m]={})}while(l.length&&i);return i}f.exports=h}),null);
__d("guid",[],(function a(b,c,d,e,f,g){function h(){return"f"+(Math.random()*(1<<30)).toString(16).replace(".","")}f.exports=h}),18);
__d("wrapFunction",[],(function a(b,c,d,e,f,g){var h={},i=function i(j,k,l){return function(){var m=k in h?h[k](j,l):j;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m.apply(this,o)}};i.setWrapper=function(j,k){h[k]=j};f.exports=i}),18);
__d("GlobalCallback",["DOMWrapper","dotAccess","guid","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k){var l,m,n={setPrefix:function o(p){l=i(h.getWindow(),p,true);m=p},create:function o(p,q){if(!l)this.setPrefix("__globalCallbacks");var r=j();l[r]=k(p,"entry",q||"GlobalCallback");return m+"."+r},remove:function o(p){var q=p.substring(m.length+1);delete l[q]}};f.exports=n}),null);
__d("sprintf",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(){return String(k[m++])})}f.exports=h}),null);
__d("Log",["sprintf"],(function a(b,c,d,e,f,g,h){var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:"log"](o)}var k={level:-1,Level:i,debug:ES(j,"bind",true,null,"debug",i.DEBUG),info:ES(j,"bind",true,null,"info",i.INFO),warn:ES(j,"bind",true,null,"warn",i.WARNING),error:ES(j,"bind",true,null,"error",i.ERROR)};f.exports=k}),null);
__d("ObservableMixin",[],(function a(b,c,d,e,f,g){function h(){this.__observableEvents={}}h.prototype={inform:function i(j){var k=Array.prototype.slice.call(arguments,1),l=Array.prototype.slice.call(this.getSubscribers(j));for(var m=0;m<l.length;m++){if(l[m]===null)continue;try{l[m].apply(this,k)}catch(n){setTimeout(function(){throw n},0)}}return this},getSubscribers:function i(j){return this.__observableEvents[j]||(this.__observableEvents[j]=[])},clearSubscribers:function i(j){if(j)this.__observableEvents[j]=[];return this},clearAllSubscribers:function i(){this.__observableEvents={};return this},subscribe:function i(j,k){var l=this.getSubscribers(j);l.push(k);return this},unsubscribe:function i(j,k){var l=this.getSubscribers(j);for(var m=0;m<l.length;m++)if(l[m]===k){l.splice(m,1);break}return this},monitor:function i(j,k){if(!k()){var i=ES(function(l){if(k.apply(k,arguments))this.unsubscribe(j,i)},"bind",true,this);this.subscribe(j,i)}return this}};f.exports=h}),null);
__d("UrlMap",["UrlMapConfig"],(function a(b,c,d,e,f,g,h){var i={resolve:function j(k,l){var m=typeof l=="undefined"?location.protocol.replace(":",""):l?"https":"http";if(k in h)return m+"://"+h[k];if(typeof l=="undefined"&&k+"_"+m in h)return m+"://"+h[k+"_"+m];if(l!==true&&k+"_http"in h)return"http://"+h[k+"_http"];if(l!==false&&k+"_https"in h)return"https://"+h[k+"_https"]}};f.exports=i}),null);
__d("QueryString",[],(function a(b,c,d,e,f,g){function h(l){var m=[];ES(ES("Object","keys",false,l).sort(),"forEach",true,function(n){var o=l[n];if(typeof o==="undefined")return;if(o===null){m.push(n);return}m.push(encodeURIComponent(n)+"="+encodeURIComponent(o))});return m.join("&")}function i(l,m){var n={};if(l==="")return n;var o=l.split("&");for(var p=0;p<o.length;p++){var q=o[p].split("=",2),r=decodeURIComponent(q[0]);if(m&&Object.prototype.hasOwnProperty.call(n,r))throw new URIError("Duplicate key: "+r);n[r]=q.length===2?decodeURIComponent(q[1]):null}return n}function j(l,m){return l+(ES(l,"indexOf",true,"?")!==-1?"&":"?")+(typeof m==="string"?m:k.encode(m))}var k={encode:h,decode:i,appendToUrl:j};f.exports=k}),null);
__d("ManagedError",[],(function a(b,c,d,e,f,g){function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j}h.prototype=new Error();h.prototype.constructor=h;f.exports=h}),null);
__d("AssertionError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("Assert",["AssertionError","sprintf"],(function a(b,c,d,e,f,g,h,i){function j(o,p){if(typeof o!=="boolean"||!o)throw new h(p);return o}function k(o,p,q){var r;if(p===undefined)r="undefined";else if(p===null)r="null";else{var s=Object.prototype.toString.call(p);r=/\s(\w*)/.exec(s)[1].toLowerCase()}j(ES(o,"indexOf",true,r)!==-1,q||i("Expression is of type %s, not %s",r,o));return p}function l(o,p,q){j(p instanceof o,q||"Expression not instance of type");return p}function m(o,p){n["is"+o]=p;n["maybe"+o]=function(q,r){if(q!=null)p(q,r)}}var n={isInstanceOf:l,isTrue:j,isTruthy:function o(p,q){return j(!!p,q)},type:k,define:function o(p,q){p=p.substring(0,1).toUpperCase()+p.substring(1).toLowerCase();m(p,function(r,s){j(q(r),s)})}};ES(["Array","Boolean","Date","Function","Null","Number","Object","Regexp","String","Undefined"],"forEach",true,function(o){m(o,ES(k,"bind",true,null,o.toLowerCase()))});f.exports=n}),null);
__d("Type",["Assert"],(function a(b,c,d,e,f,g,h){function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments)}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false}function k(m,n){var o=m.prototype;if(!ES("Array","isArray",false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=="function"){o.__mixins.push(q);q=q.prototype}ES(ES("Object","keys",false,q),"forEach",true,function(r){o[r]=q[r]})}}function l(m,n,o){var p=n&&Object.prototype.hasOwnProperty.call(n,"constructor")?n.constructor:function(){this.parent.apply(this,arguments)};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error("parent type does not inherit from Type");m=m||i;function q(){}q.prototype=m.prototype;p.prototype=new q();if(n)ES("Object","assign",false,p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments)};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1))};p.extend=function(n,o){return l(this,n,o)};return p}ES("Object","assign",false,i.prototype,{instanceOf:function m(n){return j(n,this)}});ES("Object","assign",false,i,{extend:function m(n,o){return typeof n==="function"?l.apply(null,arguments):l(null,n,o)},instanceOf:j});f.exports=i}),null);
__d("sdk.Model",["Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i){var j=h.extend({constructor:function k(l){this.parent();var m={},n=this;ES(ES("Object","keys",false,l),"forEach",true,function(o){m[o]=l[o];n["set"+o]=function(p){if(p===m[o])return this;m[o]=p;n.inform(o+".change",p);return n};n["get"+o]=function(){return m[o]}})}},i);f.exports=j}),null);
__d("sdk.Runtime",["sdk.Model","JSSDKRuntimeConfig"],(function a(b,c,d,e,f,g,h,i){var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new h({AccessToken:"",AutoLogAppEvents:false,ClientID:"",CookieUserID:"",Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:i.locale,LoggedIntoFacebook:undefined,LoginStatus:undefined,Revision:i.revision,Rtl:i.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:"",Version:undefined});ES("Object","assign",false,k,{ENVIRONMENTS:j,isEnvironment:function l(m){var n=this.getEnvironment();return(m|n)===n},isCanvasEnvironment:function l(){return this.isEnvironment(j.CANVAS)||this.isEnvironment(j.PAGETAB)}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l|=j.CANVAS;k.setEnvironment(l)})();f.exports=k}),null);
__d("sdk.Cookie",["QueryString","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){var j=null;function k(n,o,p){n=n+i.getClientID();var q=j&&j!==".";if(q){document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;";document.cookie=n+"=; expires=Wed, 04 Feb 2004 08:00:00 GMT;domain="+location.hostname+";"}var r=new Date(p).toGMTString();document.cookie=n+"="+o+(o&&p===0?"":"; expires="+r)+"; path=/"+(q?"; domain="+j:"")}function l(n){n=n+i.getClientID();var o=new RegExp("\\b"+n+"=([^;]*)\\b");return o.test(document.cookie)?RegExp.$1:null}var m={setDomain:function n(o){j=o;var p=h.encode({base_domain:j&&j!=="."?j:""}),q=new Date();q.setFullYear(q.getFullYear()+1);k("fbm_",p,q.getTime())},getDomain:function n(){return j},loadMeta:function n(){var o=l("fbm_");if(o){var p=h.decode(o);if(!j)j=p.base_domain;return p}},loadSignedRequest:function n(){return l("fbsr_")},setSignedRequestCookie:function n(o,p){if(!o)throw new Error("Value passed to Cookie.setSignedRequestCookie was empty.");k("fbsr_",o,p)},clearSignedRequestCookie:function n(){k("fbsr_","",0)},setRaw:k,getRaw:l};f.exports=m}),null);
__d("Miny",[],(function a(b,c,d,e,f,g){var h="Miny1",i="wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(""),j={encode:function k(l){if(/^$|[~\\]|__proto__/.test(l))return l;var m=l.match(/\w+|\W+/g),n,o=ES("Object","create",false,null);for(n=0;n<m.length;n++)o[m[n]]=(o[m[n]]||0)+1;var p=ES("Object","keys",false,o);p.sort(function(s,t){return o[t]-o[s]});for(n=0;n<p.length;n++){var q=(n-n%32)/32;o[p[n]]=q?q.toString(32)+i[n%32]:i[n%32]}var r="";for(n=0;n<m.length;n++)r+=o[m[n]];p.unshift(h,p.length);p.push(r);return p.join("~")}};f.exports=j}),null);
__d("sdk.UA",[],(function a(b,c,d,e,f,g){var h=navigator.userAgent,i={iphone:/\b(iPhone|iP[ao]d)/.test(h),ipad:/\b(iP[ao]d)/.test(h),android:/Android/i.test(h),nativeApp:/FBAN\/\w+;/i.test(h),nativeAndroidApp:/FB_IAB\/\w+;/i.test(h),nativeInstagramApp:/Instagram/i.test(h)},j=/Mobile/i.test(h),k={ie:"",firefox:"",chrome:"",webkit:"",osx:"",edge:"",operaMini:"",ucWeb:""},l=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(h);if(l){k.ie=l[1]?parseFloat(l[1]):l[4]?parseFloat(l[4]):"";k.firefox=l[2]||"";k.webkit=l[3]||"";if(l[3]){var m=/(?:Chrome\/(\d+\.\d+))/.exec(h);k.chrome=m?m[1]:"";var n=/(?:Edge\/(\d+\.\d+))/.exec(h);k.edge=n?n[1]:""}}var o=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);if(o)k.osx=o[1];var p=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(h);if(p)k.operaMini=p[1];var q=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(h);if(q)k.ucWeb=q[1]||"2.0";function r(t){return ES(t.split("."),"map",true,function(u){return parseFloat(u)})}var s={};ES(ES("Object","keys",false,k),"map",true,function(t){s[t]=function(){return parseFloat(k[t])};s[t].getVersionParts=function(){return r(k[t])}});ES(ES("Object","keys",false,i),"map",true,function(t){s[t]=function(){return i[t]}});s.mobile=function(){return i.iphone||i.ipad||i.android||j};s.mTouch=function(){return i.android||i.iphone||i.ipad};s.inAppBrowser=function(){return i.nativeApp||i.nativeAndroidApp||i.nativeInstagramApp};s.mBasic=function(){return!!(k.ucWeb||k.operaMini)};f.exports=s}),null);
__d("getBlankIframeSrc",["sdk.UA"],(function a(b,c,d,e,f,g,h){function i(){return h.ie()<10?"javascript:false":"about:blank"}f.exports=i}),null);
__d("insertIframe",["GlobalCallback","getBlankIframeSrc","guid"],(function a(b,c,d,e,f,g,h,i,j){function k(l){l.id=l.id||j();l.name=l.name||j();var m=false,n=false,o=function o(){if(m&&!n){n=true;l.onload&&l.onload(l.root.firstChild)}},p=h.create(o);if(document.attachEvent){var q='<iframe id="'+l.id+'" name="'+l.name+'"'+(l.title?' title="'+l.title+'"':"")+(l.className?' class="'+l.className+'"':"")+' style="border:none;'+(l.width?"width:"+l.width+"px;":"")+(l.height?"height:"+l.height+"px;":"")+'" src="'+i()+'" frameborder="0" scrolling="no" allowtransparency="true" onload="'+p+'()"></iframe>';l.root.innerHTML='<iframe src="'+i()+'" frameborder="0" scrolling="no" style="height:1px"></iframe>';m=true;setTimeout(function(){l.root.innerHTML=q;l.root.firstChild.src=l.url;l.onInsert&&l.onInsert(l.root.firstChild)},0)}else{var r=document.createElement("iframe");r.id=l.id;r.name=l.name;r.onload=o;r.scrolling="no";r.style.border="none";r.style.overflow="hidden";if(l.title)r.title=l.title;if(l.className)r.className=l.className;if(l.height!==undefined)r.style.height=l.height+"px";if(l.width!==undefined)if(l.width=="100%")r.style.width=l.width;else r.style.width=l.width+"px";l.root.appendChild(r);m=true;r.src=l.url;l.onInsert&&l.onInsert(r)}}f.exports=k}),null);
__d("sdk.domReady",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){var i,j="readyState"in document?/loaded|complete/.test(document.readyState):!!document.body;function k(){if(!i)return;var n;while(n=i.shift())n();i=null}function l(n){if(i){i.push(n);return}else n()}if(!j){i=[];if(document.addEventListener){document.addEventListener("DOMContentLoaded",k,false);window.addEventListener("load",k,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",k);window.attachEvent("onload",k)}if(document.documentElement.doScroll&&window==window.top){var m=function m(){try{h.getRtl()?document.documentElement.doScroll("right"):document.documentElement.doScroll("left")}catch(n){setTimeout(m,0);return}k()};m()}}f.exports=l}),3);
__d("sdk.Content",["Log","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){var k,l,m={append:function n(o,p){if(!p)if(!k){k=p=document.getElementById("fb-root");if(!p){h.warn('The "fb-root" div has not been created, auto-creating');k=p=document.createElement("div");p.id="fb-root";if(i.ie()||!document.body)j(function(){document.body.appendChild(p)});else document.body.appendChild(p)}p.className+=" fb_reset"}else p=k;if(typeof o=="string"){var q=document.createElement("div");p.appendChild(q).innerHTML=o;return q}else return p.appendChild(o)},appendHidden:function n(o){if(!l){var l=document.createElement("div"),p=l.style;p.position="absolute";p.top="-10000px";p.width=p.height=0;l=m.append(l)}return m.append(o,l)},submitToTarget:function n(o,p){var q=document.createElement("form");q.action=o.url;q.target=o.target;q.method=p?"GET":"POST";m.appendHidden(q);for(var r in o.params)if(Object.prototype.hasOwnProperty.call(o.params,r)){var s=o.params[r];if(s!==null&&s!==undefined){var t=document.createElement("input");t.name=r;t.value=s;q.appendChild(t)}}q.submit();q.parentNode.removeChild(q)}};f.exports=m}),null);
__d("sdk.Impressions",["sdk.Content","Miny","QueryString","sdk.Runtime","UrlMap","getBlankIframeSrc","guid","insertIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){function p(r){var s=k.getClientID();if(!r.api_key&&s)r.api_key=s;r.kid_directed_site=k.getKidDirectedSite();var t=l.resolve("www",true)+"/impression.php/"+n()+"/",u=j.appendToUrl(t,r);if(u.length>2e3)if(r.payload&&typeof r.payload==="string"){var v=i.encode(r.payload);if(v&&v.length<r.payload.length){r.payload=v;u=j.appendToUrl(t,r)}}if(u.length<=2e3){var w=new Image();w.src=u}else{var x=n(),y=h.appendHidden("");o({url:m(),root:y,name:x,className:"fb_hidden fb_invisible",onload:function z(){y.parentNode.removeChild(y)}});h.submitToTarget({url:t,target:x,params:r})}}var q={log:function r(s,t){if(!t.source)t.source="jssdk";p({lid:s,payload:ES("JSON","stringify",false,t)})},impression:p};f.exports=q}),null);
__d("sdk.Scribe",["QueryString","sdk.Runtime","UrlMap"],(function a(b,c,d,e,f,g,h,i,j){function k(m,n){if(typeof n.extra=="object")n.extra.revision=i.getRevision();new Image().src=h.appendToUrl(j.resolve("www",true)+"/common/scribe_endpoint.php",{c:m,m:ES("JSON","stringify",false,n)})}var l={log:k};f.exports=l}),null);
__d("Base64",[],(function a(b,c,d,e,f,g){var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function i(m){m=m.charCodeAt(0)<<16|m.charCodeAt(1)<<8|m.charCodeAt(2);return String.fromCharCode(h.charCodeAt(m>>>18),h.charCodeAt(m>>>12&63),h.charCodeAt(m>>>6&63),h.charCodeAt(m&63))}var j=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function k(m){m=j.charCodeAt(m.charCodeAt(0)-43)<<18|j.charCodeAt(m.charCodeAt(1)-43)<<12|j.charCodeAt(m.charCodeAt(2)-43)<<6|j.charCodeAt(m.charCodeAt(3)-43);return String.fromCharCode(m>>>16,m>>>8&255,m&255)}var l={encode:function m(n){n=unescape(encodeURI(n));var o=(n.length+2)%3;n=(n+"\0\0".slice(o)).replace(/[\s\S]{3}/g,i);return n.slice(0,n.length+o-2)+"==".slice(o)},decode:function m(n){n=n.replace(/[^A-Za-z0-9+\/]/g,"");var o=n.length+3&3;n=(n+"AAA".slice(o)).replace(/..../g,k);n=n.slice(0,n.length+o-3);try{return decodeURIComponent(escape(n))}catch(p){throw new Error("Not valid UTF-8")}},encodeObject:function m(n){return l.encode(ES("JSON","stringify",false,n))},decodeObject:function m(n){return ES("JSON","parse",false,l.decode(n))},encodeNums:function m(n){return String.fromCharCode.apply(String,ES(n,"map",true,function(o){return h.charCodeAt((o|-(o>63))&-(o>0)&63)}))}};f.exports=l}),null);
__d("sdk.SignedRequest",["Base64"],(function a(b,c,d,e,f,g,h){function i(k){if(!k)return null;var l=k.split(".",2)[1].replace(/\-/g,"+").replace(/\_/g,"/");return h.decodeObject(l)}var j={parse:i};f.exports=j}),null);
__d("URIRFC3986",[],(function a(b,c,d,e,f,g){var h=new RegExp("^([^:/?#]+:)?(//([^\\\\/?#@]*@)?(\\[[A-Fa-f0-9:.]+\\]|[^\\/?#:]*)(:[0-9]*)?)?([^?#]*)(\\?[^#]*)?(#.*)?"),i={parse:function j(k){if(ES(k,"trim",true)==="")return null;var l=k.match(h);if(l==null)return null;var m={};m.uri=l[0]?l[0]:null;m.scheme=l[1]?l[1].substr(0,l[1].length-1):null;m.authority=l[2]?l[2].substr(2):null;m.userinfo=l[3]?l[3].substr(0,l[3].length-1):null;m.host=l[2]?l[4]:null;m.port=l[5]?l[5].substr(1)?parseInt(l[5].substr(1),10):null:null;m.path=l[6]?l[6]:null;m.query=l[7]?l[7].substr(1):null;m.fragment=l[8]?l[8].substr(1):null;m.isGenericURI=m.authority===null&&!!m.scheme;return m}};f.exports=i}),18);
__d("createObjectFrom",[],(function a(b,c,d,e,f,g){function h(i,j){var k={},l=ES("Array","isArray",false,j);if(j===undefined)j=true;for(var m=i.length-1;m>=0;m--)k[i[m]]=l?j[m]:j;return k}f.exports=h}),18);
__d("URISchemes",["createObjectFrom"],(function a(b,c,d,e,f,g,h){var i=h(["blob","cmms","fb","fba","fbatwork","fb-ama","fb-workchat","fb-messenger","fb-messenger-public","fb-messenger-group-thread","fb-page-messages","fb-pma","fbcf","fbconnect","fbmobilehome","fbrpc","file","ftp","http","https","mailto","ms-app","intent","itms","itms-apps","itms-services","market","svn+ssh","fbstaging","tel","sms","pebblejs","sftp","whatsapp","moments","flash","fblite","chrome-extension","webcal","fb124024574287414","fb124024574287414rc","fb124024574287414master","fb1576585912599779","fb929757330408142","designpack","fbapi20130214","fb1196383223757595","tbauth","oculus","oculus.store"]),j={isAllowed:function k(l){if(!l)return true;return Object.prototype.hasOwnProperty.call(i,l.toLowerCase())}};f.exports=j}),18);
__d("eprintf",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=ES(k,"map",true,function(p){return String(p)}),n=i.split("%s").length-1;if(n!==m.length)return h("eprintf args number mismatch: %s",ES("JSON","stringify",false,[i].concat(m)));var o=0;return i.replace(/%s/g,function(){return String(m[o++])})}f.exports=h}),null);
__d("ex",["eprintf"],(function a(b,c,d,e,f,g,h){function i(j){for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];var n=ES(l,"map",true,function(p){return String(p)}),o=j.split("%s").length-1;if(o!==n.length)return i("ex args number mismatch: %s",ES("JSON","stringify",false,[j].concat(n)));return i._prefix+ES("JSON","stringify",false,[j].concat(n))+i._suffix}i._prefix="<![EX[";i._suffix="]]>";f.exports=i}),18);
__d("invariant",["ex","sprintf"],(function a(b,c,d,e,f,g,h,i){"use strict";var j=h;function k(l,m){if(!l){var n=void 0;if(m===undefined)n=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{for(var o=arguments.length,p=Array(o>2?o-2:0),q=2;q<o;q++)p[q-2]=arguments[q];n=new Error(j.apply(undefined,[m].concat(p)));n.name="Invariant Violation";n.messageWithParams=[m].concat(p)}n.framesToPop=1;throw n}}f.exports=k}),18);
__d("setHostSubdomain",[],(function a(b,c,d,e,f,g){function h(i,j){var k=i.split(".");if(k.length<3)k.unshift(j);else k[0]=j;return k.join(".")}f.exports=h}),null);
__d("URIBase",["URIRFC3986","URISchemes","ex","invariant","setHostSubdomain"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),n=new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)");function o(r,s,t,u){if(!s)return true;if(s instanceof q){r.setProtocol(s.getProtocol());r.setDomain(s.getDomain());r.setPort(s.getPort());r.setPath(s.getPath());r.setQueryData(u.deserialize(u.serialize(s.getQueryData())));r.setFragment(s.getFragment());r.setIsGeneric(s.getIsGeneric());r.setForceFragmentSeparator(s.getForceFragmentSeparator());return true}s=ES(s.toString(),"trim",true);var v=h.parse(s)||{fragment:null,scheme:null};if(!t&&!i.isAllowed(v.scheme))return false;r.setProtocol(v.scheme||"");if(!t&&m.test(v.host||""))return false;r.setDomain(v.host||"");r.setPort(v.port||"");r.setPath(v.path||"");if(t)r.setQueryData(u.deserialize(v.query||"")||{});else try{r.setQueryData(u.deserialize(v.query||"")||{})}catch(w){return false}r.setFragment(v.fragment||"");if(v.fragment==="")r.setForceFragmentSeparator(true);r.setIsGeneric(v.isGenericURI||false);if(v.userinfo!==null)if(t)throw new Error(j("URI.parse: invalid URI (userinfo is not allowed in a URI): %s",r.toString()));else return false;if(!r.getDomain()&&ES(r.getPath(),"indexOf",true,"\\")!==-1)if(t)throw new Error(j("URI.parse: invalid URI (no domain but multiple back-slashes): %s",r.toString()));else return false;if(!r.getProtocol()&&n.test(s))if(t)throw new Error(j("URI.parse: invalid URI (unsafe protocol-relative URLs): %s",r.toString()));else return false;if(r.getDomain()&&r.getPath()&&!ES(r.getPath(),"startsWith",true,"/"))if(t)throw new Error(j("URI.parse: invalid URI (domain and path where path lacks leading slash): %s",r.toString()));else return false;return true}var p=[];q.isValidURI=function(r,s){"use strict";return o(new q(null,s),r,false,s)};function q(r,s){"use strict";s||k(0);this.$URIBase9=s;this.$URIBase7="";this.$URIBase1="";this.$URIBase6="";this.$URIBase5="";this.$URIBase3="";this.$URIBase4=false;this.$URIBase8={};this.$URIBase2=false;o(this,r,true,s)}q.prototype.setProtocol=function(r){"use strict";i.isAllowed(r)||k(0);this.$URIBase7=r;return this};q.prototype.getProtocol=function(){"use strict";return(this.$URIBase7||"").toLowerCase()};q.prototype.setSecure=function(r){"use strict";return this.setProtocol(r?"https":"http")};q.prototype.isSecure=function(){"use strict";return this.getProtocol()==="https"};q.prototype.setDomain=function(r){"use strict";if(m.test(r))throw new Error(j("URI.setDomain: unsafe domain specified: %s for url %s",r,this.toString()));this.$URIBase1=r;return this};q.prototype.getDomain=function(){"use strict";return this.$URIBase1};q.prototype.setPort=function(r){"use strict";this.$URIBase6=r;return this};q.prototype.getPort=function(){"use strict";return this.$URIBase6};q.prototype.setPath=function(r){"use strict";this.$URIBase5=r;return this};q.prototype.getPath=function(){"use strict";return this.$URIBase5};q.prototype.addQueryData=function(r,s){"use strict";if(Object.prototype.toString.call(r)==="[object Object]")ES("Object","assign",false,this.$URIBase8,r);else this.$URIBase8[r]=s;return this};q.prototype.setQueryData=function(r){"use strict";this.$URIBase8=r;return this};q.prototype.getQueryData=function(){"use strict";return this.$URIBase8};q.prototype.removeQueryData=function(r){"use strict";if(!ES("Array","isArray",false,r))r=[r];for(var s=0,t=r.length;s<t;++s)delete this.$URIBase8[r[s]];return this};q.prototype.setFragment=function(r){"use strict";this.$URIBase3=r;this.setForceFragmentSeparator(false);return this};q.prototype.getFragment=function(){"use strict";return this.$URIBase3};q.prototype.setForceFragmentSeparator=function(r){"use strict";this.$URIBase2=r;return this};q.prototype.getForceFragmentSeparator=function(){"use strict";return this.$URIBase2};q.prototype.setIsGeneric=function(r){"use strict";this.$URIBase4=r;return this};q.prototype.getIsGeneric=function(){"use strict";return this.$URIBase4};q.prototype.isEmpty=function(){"use strict";return!(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES("Object","keys",false,this.getQueryData()).length>0||this.getFragment())};q.prototype.toString=function(){"use strict";var r=this;for(var s=0;s<p.length;s++)r=p[s](r);return r.$URIBase10()};q.prototype.$URIBase10=function(){"use strict";var r="",s=this.getProtocol();if(s)r+=s+":"+(this.getIsGeneric()?"":"//");var t=this.getDomain();if(t)r+=t;var u=this.getPort();if(u)r+=":"+u;var v=this.getPath();if(v)r+=v;else if(r)r+="/";var w=this.$URIBase9.serialize(this.getQueryData());if(w)r+="?"+w;var x=this.getFragment();if(x)r+="#"+x;else if(this.getForceFragmentSeparator())r+="#";return r};q.registerFilter=function(r){"use strict";p.push(r)};q.prototype.getOrigin=function(){"use strict";var r=this.getPort();return this.getProtocol()+"://"+this.getDomain()+(r?":"+r:"")};q.prototype.getQualifiedURIBase=function(){"use strict";return new q(this,this.$URIBase9).qualify()};q.prototype.qualify=function(){"use strict";if(!this.getDomain()){var r=new q(window.location.href,this.$URIBase9);this.setProtocol(r.getProtocol()).setDomain(r.getDomain()).setPort(r.getPort())}return this};q.prototype.setSubdomain=function(r){"use strict";var s=this.qualify().getDomain();return this.setDomain(l(s,r))};q.prototype.getSubdomain=function(){"use strict";if(!this.getDomain())return"";var r=this.getDomain().split(".");if(r.length<=2)return"";else return r[0]};f.exports=q}),18);
__d("sdk.URI",["Assert","QueryString","URIBase"],(function a(b,c,d,e,f,g,h,i,j){var k,l,m=/\.facebook\.com$/,n={serialize:function p(q){return q?i.encode(q):""},deserialize:function p(q){return q?i.decode(q):{}}};k=babelHelpers.inherits(o,j);l=k&&k.prototype;function o(p){"use strict";h.isString(p,"The passed argument was of invalid type.");l.constructor.call(this,p,n)}o.prototype.isFacebookURI=function(){"use strict";return m.test(this.getDomain())};o.prototype.valueOf=function(){"use strict";return this.toString()};o.isValidURI=function(p){"use strict";return j.isValidURI(p,n)};f.exports=o}),null);
__d("Queue",[],(function a(b,c,d,e,f,g){var h={};function i(j){"use strict";this._opts=babelHelpers["extends"]({interval:0,processor:null},j);this._queue=[];this._stopped=true}i.prototype._dispatch=function(j){"use strict";if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error("No processor available")}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES(this._dispatch,"bind",true,this),this._opts.interval)}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift())};i.prototype.enqueue=function(j){"use strict";if(this._opts.processor&&!this._stopped)this._opts.processor.call(this,j);else this._queue.push(j);return this};i.prototype.start=function(j){"use strict";if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this};i.prototype.isStarted=function(){"use strict";return!this._stopped};i.prototype.dispatch=function(){"use strict";this._dispatch(true)};i.prototype.stop=function(j){"use strict";this._stopped=true;if(j)clearTimeout(this._timeout);return this};i.prototype.merge=function(j,k){"use strict";this._queue[k?"unshift":"push"].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this};i.prototype.getLength=function(){"use strict";return this._queue.length};i.get=function(j,k){"use strict";var l;if(j in h)l=h[j];else l=h[j]=new i(k);return l};i.exists=function(j){"use strict";return j in h};i.remove=function(j){"use strict";return delete h[j]};f.exports=i}),null);
__d("emptyFunction",[],(function a(b,c,d,e,f,g){function h(j){return function(){return j}}var i=function i(){};i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this};i.thatReturnsArgument=function(j){return j};f.exports=i}),18);
__d("DOMEventListener",["emptyFunction","invariant","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){var k=false;try{var l=Object.defineProperty({},"passive",{get:function q(){k=true}});window.addEventListener("test",null,l)}catch(m){}var n=void 0,o=void 0;if(window.addEventListener){n=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.addEventListener(s,t.wrapper,k?u:false)};o=function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];r.removeEventListener(s,t.wrapper,k?u:false)}}else if(window.attachEvent){n=function q(r,s,t){t.wrapper=j(t,"entry","DOMEventListener.add "+s);r.attachEvent||i(0);r.attachEvent("on"+s,t.wrapper)};o=function q(r,s,t){r.detachEvent||i(0);r.detachEvent("on"+s,t.wrapper)}}else o=n=h;var p={add:function q(r,s,t){var u=arguments.length<=3||arguments[3]===undefined?false:arguments[3];n(r,s,t,u);return{remove:function v(){o(r,s,t,u)}}},remove:o};f.exports=p}),18);
__d("UserAgent_DEPRECATED",[],(function a(b,c,d,e,f,g){var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(h)return;h=true;var z=navigator.userAgent,A=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),B=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(A){i=A[1]?parseFloat(A[1]):A[5]?parseFloat(A[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var C=/(?:Trident\/(\d+.\d+))/.exec(z);n=C?parseFloat(C[1])+4:i;j=A[2]?parseFloat(A[2]):NaN;k=A[3]?parseFloat(A[3]):NaN;l=A[4]?parseFloat(A[4]):NaN;if(l){A=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=A&&A[1]?parseFloat(A[1]):NaN}else m=NaN}else i=j=k=m=l=NaN;if(B){if(B[1]){var D=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=D?parseFloat(D[1].replace("_",".")):true}else o=false;p=!!B[2];q=!!B[3]}else o=p=q=false}var y={ie:function z(){return x()||i},ieCompatibilityMode:function z(){return x()||n>i},ie64:function z(){return y.ie()&&s},firefox:function z(){return x()||j},opera:function z(){return x()||k},webkit:function z(){return x()||l},safari:function z(){return y.webkit()},chrome:function z(){return x()||m},windows:function z(){return x()||p},osx:function z(){return x()||o},linux:function z(){return x()||q},iphone:function z(){return x()||t},mobile:function z(){return x()||t||u||r||w},nativeApp:function z(){return x()||v},android:function z(){return x()||r},ipad:function z(){return x()||u}};f.exports=y}),18);
__d("htmlSpecialChars",[],(function a(b,c,d,e,f,g){var h=/&/g,i=/</g,j=/>/g,k=/\"/g,l=/\'/g;function m(n){if(typeof n=="undefined"||n===null||!n.toString)return"";if(n===false)return"0";else if(n===true)return"1";return n.toString().replace(h,"&amp;").replace(k,"&quot;").replace(l,"&#039;").replace(i,"&lt;").replace(j,"&gt;")}f.exports=m}),null);
__d("Flash",["DOMEventListener","DOMWrapper","QueryString","UserAgent_DEPRECATED","guid","htmlSpecialChars"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v]}function r(){for(var v in n)if(Object.prototype.hasOwnProperty.call(n,v))q(v)}function s(v){return v.replace(/\d+/g,function(w){return"000".substring(w.length)+w})}function t(v){if(!o){if(k.ie()>=9)h.add(window,"unload",r);o=true}n[v]=v}var u={embed:function v(w,x,y,z){var A=l();w=m(w).replace(/&amp;/g,"&");y=babelHelpers["extends"]({allowscriptaccess:"always",flashvars:z,movie:w},y);if(typeof y.flashvars=="object")y.flashvars=j.encode(y.flashvars);var B=[];for(var C in y)if(Object.prototype.hasOwnProperty.call(y,C)&&y[C])B.push('<param name="'+m(C)+'" value="'+m(y[C])+'">');var D=x.appendChild(p.createElement("span")),E="<object "+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+w+'" '+(y.height?'height="'+y.height+'" ':"")+(y.width?'width="'+y.width+'" ':"")+'id="'+A+'">'+B.join("")+"</object>";D.innerHTML=E;var F=D.firstChild;t(A);return F},remove:q,getVersion:function v(){var w="Shockwave Flash",x="application/x-shockwave-flash",y="ShockwaveFlash.ShockwaveFlash",z;if(navigator.plugins&&typeof navigator.plugins[w]=="object"){var A=navigator.plugins[w].description;if(A&&navigator.mimeTypes&&navigator.mimeTypes[x]&&navigator.mimeTypes[x].enabledPlugin)z=A.match(/\d+/g)}if(!z)try{z=new ActiveXObject(y).GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/);z=Array.prototype.slice.call(z,1)}catch(B){}return z},getVersionString:function v(){var w=u.getVersion();return w?w.join("."):""},checkMinVersion:function v(w){var x=u.getVersion();if(!x)return false;return s(x.join("."))>=s(w)},isAvailable:function v(){return!!u.getVersion()}};f.exports=u}),null);
__d("XDM",["DOMEventListener","DOMWrapper","emptyFunction","Flash","GlobalCallback","guid","Log","UserAgent_DEPRECATED","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var A=z[y],B=q[A];if(!x[A]&&B.isAvailable())return A}}var u={register:function w(x,y){n.debug("Registering %s as XDM provider",x);r.transports.push(x);q[x]=y},create:function w(x){if(!x.whenReady&&!x.onMessage){n.error("An instance without whenReady or onMessage makes no sense");throw new Error("An instance without whenReady or onMessage makes no sense")}if(!x.channel){n.warn("Missing channel name, selecting at random");x.channel=m()}if(!x.whenReady)x.whenReady=j;if(!x.onMessage)x.onMessage=j;var y=x.transport||t(x.blacklist||[]),z=q[y];if(z&&z.isAvailable()){n.debug("%s is available",y);z.init(x);return y}}};u.register("flash",function(){var w=false,x,y=false,z=15e3,A;return{isAvailable:function B(){return k.checkMinVersion("8.0.24")},init:function B(C){n.debug("init flash: "+C.channel);var D={send:function G(H,I,J,K){n.debug("sending to: %s (%s)",I,K);x.postMessage(H,I,K)}};if(w){C.whenReady(D);return}var E=C.root.appendChild(s.document.createElement("div")),F=l.create(function(){l.remove(F);clearTimeout(A);n.info("xdm.swf called the callback");var G=l.create(function(H,I){H=decodeURIComponent(H);I=decodeURIComponent(I);n.debug("received message %s from %s",H,I);C.onMessage(H,I)},"xdm.swf:onMessage");x.init(C.channel,G);C.whenReady(D)},"xdm.swf:load");x=k.embed(C.flashUrl,E,null,{protocol:location.protocol.replace(":",""),host:location.host,callback:F,log:y});A=setTimeout(function(){n.warn("The Flash component did not load within %s ms - verify that the container is not set to hidden or invisible using CSS as this will cause some browsers to not load the components",z)},z);w=true}}}());var v=/\.facebook\.com(\/|$)/;u.register("postmessage",function(){var w=false;return{isAvailable:function x(){return!!s.postMessage},init:function x(y){n.debug("init postMessage: "+y.channel);var z="_FB_"+y.channel,A={send:function B(C,D,E,F){if(s===E){n.error("Invalid windowref, equal to window (self)");throw new Error()}n.debug("sending to: %s (%s)",D,F);var B=function B(){E.postMessage("_FB_"+F+C,D)};if(o.ie()==8||o.ieCompatibilityMode())setTimeout(B,0);else B()}};if(w){y.whenReady(A);return}h.add(s,"message",p(function(event){var B=event.data,C=event.origin||"native";if(!/^(https?:\/\/|native$)/.test(C)){n.debug("Received message from invalid origin type: %s",C);return}if(C!=="native"&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof B!="string"){n.warn("Received message of type %s from %s, expected a string",typeof B,C);return}n.debug("received message %s from %s",B,C);if(B.substring(0,z.length)==z)B=B.substring(z.length);y.onMessage(B,C)},"entry","onMessage"));y.whenReady(A);w=true}}}());f.exports=u}),null);
__d("isFacebookURI",[],(function a(b,c,d,e,f,g){var h=null,i=["http","https"];function j(k){if(!h)h=new RegExp("(^|\\.)facebook\\.com$","i");if(k.isEmpty()&&k.toString()!=="#")return false;if(!k.getDomain()&&!k.getProtocol())return true;return ES(i,"indexOf",true,k.getProtocol())!==-1&&h.test(k.getDomain())}j.setRegex=function(k){h=k};f.exports=j}),null);
__d("sdk.Event",[],(function a(b,c,d,e,f,g){var h={SUBSCRIBE:"event.subscribe",UNSUBSCRIBE:"event.unsubscribe",subscribers:function i(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap},subscribe:function i(j,k){var l=this.subscribers();if(!l[j])l[j]=[k];else if(ES(l[j],"indexOf",true,k)==-1)l[j].push(k);if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.SUBSCRIBE,j,l[j])},unsubscribe:function i(j,k){var l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m,n){if(m==k)l.splice(n,1)});if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.UNSUBSCRIBE,j,l)},monitor:function i(j,k){if(!k()){var l=this,m=function m(){if(k.apply(k,arguments))l.unsubscribe(j,m)};this.subscribe(j,m)}},clear:function i(j){delete this.subscribers()[j]},fire:function i(j){var k=Array.prototype.slice.call(arguments,1),l=this.subscribers()[j];if(l)ES(l,"forEach",true,function(m){if(m)m.apply(this,k)})}};f.exports=h}),null);
__d("JSONRPC",["Log"],(function a(b,c,d,e,f,g,h){function i(j){"use strict";this.$JSONRPC1=0;this.$JSONRPC2={};this.remote=ES(function(k){this.$JSONRPC3=k;return this.remote},"bind",true,this);this.local={};this.$JSONRPC4=j}i.prototype.stub=function(j){"use strict";this.remote[j]=ES(function(){var k={jsonrpc:"2.0",method:j};for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];if(typeof m[m.length-1]=="function"){k.id=++this.$JSONRPC1;this.$JSONRPC2[k.id]=m.pop()}k.params=m;this.$JSONRPC4(ES("JSON","stringify",false,k),this.$JSONRPC3||{method:j})},"bind",true,this)};i.prototype.read=function(j,k){"use strict";var l=ES("JSON","parse",false,j),m=l.id;if(!l.method){if(!this.$JSONRPC2[m]){h.warn("Could not find callback %s",m);return}var n=this.$JSONRPC2[m];delete this.$JSONRPC2[m];delete l.id;delete l.jsonrpc;n(l);return}var o=this,p=this.local[l.method],q;if(m)q=function q(t,u){var v={jsonrpc:"2.0",id:m};v[t]=u;setTimeout(function(){o.$JSONRPC4(ES("JSON","stringify",false,v),k)},0)};else q=function q(){};if(!p){h.error('Method "%s" has not been defined',l.method);q("error",{code:-32601,message:"Method not found",data:l.method});return}l.params.push(ES(q,"bind",true,null,"result"));l.params.push(ES(q,"bind",true,null,"error"));try{var r=p.apply(k||null,l.params);if(typeof r!=="undefined")q("result",r)}catch(s){h.error("Invokation of RPC method %s resulted in the error: %s",l.method,s.message);q("error",{code:-32603,message:"Internal error",data:s.message})}};f.exports=i}),null);
__d("sdk.RPC",["Assert","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){var k=new j(),l=new i(function(n){k.enqueue(n)}),m={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),setInQueue:function n(o){h.isInstanceOf(j,o);o.start(function(p){l.read(p)})},getOutQueue:function n(){return k}};f.exports=m}),null);
__d("hasNamePropertyBug",["guid","UserAgent_DEPRECATED"],(function a(b,c,d,e,f,g,h,i){var j=i.ie()?undefined:false;function k(){var m=document.createElement("form"),n=m.appendChild(document.createElement("input"));n.name=h();j=n!==m.elements[n.name];m=n=null;return j}function l(){return typeof j==="undefined"?k():j}f.exports=l}),null);
__d("isNumberLike",[],(function a(b,c,d,e,f,g){function h(i){return!isNaN(parseFloat(i))&&isFinite(i)}f.exports=h}),null);
__d("sdk.createIframe",["DOMEventListener","getBlankIframeSrc","guid","hasNamePropertyBug","isNumberLike"],(function a(b,c,d,e,f,g,h,i,j,k,l){function m(n){n=ES("Object","assign",false,{},n);var o,p=n.name||j(),q=n.root,r=n.style||{border:"none"},s=n.url,t=n.onload,u=n.onerror;if(k())o=document.createElement('<iframe name="'+p+'"/>');else{o=document.createElement("iframe");o.name=p}delete n.style;delete n.name;delete n.url;delete n.root;delete n.onload;delete n.onerror;var v=ES("Object","assign",false,{frameBorder:0,allowTransparency:true,allowFullscreen:true,scrolling:"no"},n);if(v.width&&l(v.width))o.width=v.width+"px";if(v.height&&l(v.height))o.height=v.height+"px";delete v.height;delete v.width;for(var w in v)if(Object.prototype.hasOwnProperty.call(v,w))o.setAttribute(w,v[w]);ES("Object","assign",false,o.style,r);o.src=i();q.appendChild(o);if(t)var x=h.add(o,"load",function(){x.remove();t()});if(u)var y=h.add(o,"error",function(){y.remove();u()});o.src=s;return o}f.exports=m}),null);
__d("sdk.FeatureFunctor",["invariant"],(function a(b,c,d,e,f,g,h){function i(k,l,m){if(k.features&&l in k.features){var n=k.features[l];if(typeof n==="object"&&typeof n.rate==="number")if(n.rate&&Math.random()*100<=n.rate)return n.value||true;else return n.value?null:false;else return n}return m}function j(k){return function(l,m){arguments.length>=2||h(0);return i(k,l,m)}}f.exports={create:j}}),null);
__d("sdk.feature",["sdk.FeatureFunctor","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i){f.exports=h.create(i)}),null);
__d("sdk.XD",["sdk.Content","sdk.Event","Log","QueryString","Queue","sdk.RPC","sdk.Runtime","sdk.Scribe","sdk.URI","UrlMap","JSSDKXDConfig","XDM","isFacebookURI","sdk.createIframe","sdk.feature","guid"],(function a(b,c,d,e,f,aa,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w=new k(),x=new k(),y=new k(),z,A,B=v(),C=q.useCdn?"cdn":"www",D=u("use_bundle",false)?q.XdBundleUrl:q.XdUrl,E=p.resolve(C,false)+D,F=p.resolve(C,true)+D,G=function G(){if("origin"in location)if(location.origin&&location.origin!=="null")return location.origin;else if(window!==window.parent)try{var U=parent.location.origin;if(U&&U!=="null")return U}catch(V){}return location.protocol+"//"+location.host},H=v(),I=G(),J,K=false,L="Facebook Cross Domain Communication Frame",M={},N=new k();l.setInQueue(N);function O(U){i.info("Remote XD can talk to facebook.com (%s)",U);m.setEnvironment(U==="canvas"?m.ENVIRONMENTS.CANVAS:m.ENVIRONMENTS.PAGETAB)}function P(U,V){if(!V){i.error("No senderOrigin");throw new Error()}var W=/^https?/.exec(V)[0];switch(U.xd_action){case"proxy_ready":var X,Y;if(W=="https"){X=y;Y=A;m.setLoggedIntoFacebook(U.logged_in==="true")}else{X=x;Y=z}if(U.registered){O(U.registered);w=X.merge(w)}i.info("Proxy ready, starting queue %s containing %s messages",W+"ProxyQueue",X.getLength());X.start(function(U){J.send(typeof U==="string"?U:j.encode(U),V,Y.contentWindow,H+"_"+W)});break;case"plugin_ready":i.info("Plugin %s ready, protocol: %s",U.name,W);M[U.name]={protocol:W};if(k.exists(U.name)){var Z=k.get(U.name);i.debug("Enqueuing %s messages for %s in %s",Z.getLength(),U.name,W+"ProxyQueue");(W=="https"?y:x).merge(Z)}break}if(U.data)Q(U.data,V)}function Q(U,V){if(V&&V!=="native"&&!s(new o(V)))return;if(typeof U=="string"){if(/^FB_RPC:/.test(U)){N.enqueue(U.substring(7));return}if(U.substring(0,1)=="{")try{U=ES("JSON","parse",false,U)}catch(W){i.warn("Failed to decode %s as JSON",U);return}else U=j.decode(U)}if(!V)if(U.xd_sig==B)V=U.xd_origin;if(U.xd_action){P(U,V);return}if(U.access_token)m.setSecure(/^https/.test(I));if(U.cb){var X=T._callbacks[U.cb];if(!T._forever[U.cb])delete T._callbacks[U.cb];if(X)X(U)}}function R(U,V){if(U=="facebook"){V.relation="parent.parent";w.enqueue(V)}else{V.relation='parent.frames["'+U+'"]';var W=M[U];if(W){i.debug("Enqueuing message for plugin %s in %s",U,W.protocol+"ProxyQueue");(W.protocol=="https"?y:x).enqueue(V)}else{i.debug("Buffering message for plugin %s",U);k.get(U).enqueue(V)}}}l.getOutQueue().start(function(U){R("facebook","FB_RPC:"+U)});function S(U){if(K)return;var V=g.appendHidden(document.createElement("div")),W=r.create({blacklist:null,root:V,channel:H,flashUrl:q.Flash.path,whenReady:function X(Y){J=Y;var Z={channel:H,origin:I,transport:W,xd_name:U},$="#"+j.encode(Z);if(m.getSecure()!==true)z=t({url:E+$,name:"fb_xdm_frame_http",id:"fb_xdm_frame_http",root:V,"aria-hidden":true,title:L,tabindex:-1});A=t({url:F+$,name:"fb_xdm_frame_https",id:"fb_xdm_frame_https",root:V,"aria-hidden":true,title:L,tabindex:-1})},onMessage:Q});if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_TRANSPORT",extra:{message:"Failed to create a valid transport"}});K=true}var T={rpc:l,_callbacks:{},_forever:{},_channel:H,_origin:I,onMessage:Q,recv:Q,init:S,sendToFacebook:R,inform:function U(V,W,X,Y){R("facebook",{method:V,params:ES("JSON","stringify",false,W||{}),behavior:Y||"p",relation:X})},handler:function U(V,W,X,Y){var Z="#"+j.encode({cb:this.registerCallback(V,X,Y),origin:I+"/"+H,domain:location.hostname,relation:W||"opener"});return(location.protocol=="https:"?F:E)+Z},registerCallback:function U(V,W,X){X=X||v();if(W)T._forever[X]=true;T._callbacks[X]=V;return X},getXDArbiterURL:function U(V){return V?F:E}};h.subscribe("init:post",function(U){S(U.xdProxyName);var V=u("xd_timeout",false);if(V)setTimeout(function(){var W=A&&!!z==x.isStarted()&&!!A==y.isStarted();if(!W)n.log("jssdk_error",{appId:m.getClientID(),error:"XD_INITIALIZATION",extra:{message:"Failed to initialize in "+V+"ms"}})},V)});f.exports=T}),null);
__d("sdk.getContextType",["sdk.Runtime","sdk.UA"],(function a(b,c,d,e,f,g,h,i){function j(){if(i.nativeApp())return 3;if(i.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1}f.exports=j}),null);
__d("sdk.Auth",["sdk.Cookie","sdk.createIframe","DOMWrapper","sdk.feature","sdk.getContextType","guid","sdk.Impressions","Log","ObservableMixin","sdk.Runtime","sdk.Scribe","sdk.SignedRequest","UrlMap","sdk.URI","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w="fblo_",x=365*24*60*60*1e3,y,z,A=new p();function B(J,K){var L=q.getUserID(),M="";if(J)if(J.userID)M=J.userID;else if(J.signedRequest){var N=s.parse(J.signedRequest);if(N&&N.user_id)M=N.user_id}var O=q.getLoginStatus(),P=O==="unknown"&&J||q.getUseCookie()&&q.getCookieUserID()!==M,Q=L&&!J,R=J&&L&&L!=M,S=J!=y,T=K!=(O||"unknown");q.setLoginStatus(K);q.setAccessToken(J&&J.accessToken||null);q.setUserID(M);y=J;var U={authResponse:J,status:K};if(Q||R)A.inform("logout",U);if(P||R)A.inform("login",U);if(S)A.inform("authresponse.change",U);if(T)A.inform("status.change",U);return U}function C(){return y}function D(J,K,L){return function(M){var N;if(M&&M.access_token){var O=s.parse(M.signed_request);K={accessToken:M.access_token,userID:O.user_id,expiresIn:parseInt(M.expires_in,10),signedRequest:M.signed_request};if(M.granted_scopes)K.grantedScopes=M.granted_scopes;if(q.getUseCookie()){var P=K.expiresIn===0?0:ES("Date","now",false)+K.expiresIn*1e3,Q=h.getDomain();if(!Q&&M.base_domain)h.setDomain("."+M.base_domain);h.setSignedRequestCookie(M.signed_request,P);E()}N="connected";B(K,N)}else if(L==="logout"||L==="login_status"){if(M.error&&M.error==="not_authorized")N="not_authorized";else N="unknown";B(null,N);if(q.getUseCookie())h.clearSignedRequestCookie();if(L==="logout"){F();r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_LOGOUT",extra:{args:{fblo:true}}})}}if(M&&M.https==1)q.setSecure(true);if(J)J({authResponse:K,status:q.getLoginStatus()});return K}}function E(){h.setRaw(w,"",0)}function F(){h.setRaw(w,"y",ES("Date","now",false)+x)}function G(J){var K,L=ES("Date","now",false);if(z){clearTimeout(z);z=null}var M=h.getRaw(w)==="y";if(k("getloginstatus_tracking",true))r.log("jssdk_error",{appId:q.getClientID(),error:"PLATFORM_AUTH_GETLOGINSTATUS",extra:{args:{fblo:M}}});if(M){var N="unknown";B(null,N);if(J)J({authResponse:null,status:N});return}var O=D(J,y,"login_status"),P=new u(t.resolve("www",true)+"/connect/ping").setQueryData({client_id:q.getClientID(),response_type:"token,signed_request,code",domain:location.hostname,origin:l(),redirect_uri:v.handler(function(Q){if(k("e2e_ping_tracking",true)){var R={init:L,close:ES("Date","now",false),method:"ping"};o.debug("e2e: %s",ES("JSON","stringify",false,R));n.log(114,{payload:R})}K.parentNode.removeChild(K);if(O(Q))z=setTimeout(function(){G(function(){})},12e5)},"parent"),sdk:"joey",kid_directed_site:q.getKidDirectedSite()});K=i({root:j.getRoot(),name:m(),url:P.toString(),style:{display:"none"}})}var H;function I(J,K){if(!q.getClientID()){o.warn("FB.getLoginStatus() called before calling FB.init().");return}if(J)if(!K&&H=="loaded"){J({status:q.getLoginStatus(),authResponse:C()});return}else A.subscribe("FB.loginStatus",J);if(!K&&H=="loading")return;H="loading";var L=function L(M){H="loaded";A.inform("FB.loginStatus",M);A.clearSubscribers("FB.loginStatus")};G(L)}ES("Object","assign",false,A,{removeLogoutState:E,getLoginStatus:I,fetchLoginStatus:G,setAuthResponse:B,getAuthResponse:C,parseSignedRequest:s.parse,xdResponseWrapper:D});f.exports=A}),null);
__d("sdk.DOM",["Assert","sdk.UA","sdk.domReady"],(function a(b,c,d,e,f,g,h,i,j){var k={};function l(z,A){var B=z.getAttribute(A)||z.getAttribute(A.replace(/_/g,"-"))||z.getAttribute(A.replace(/-/g,"_"))||z.getAttribute(A.replace(/-/g,""))||z.getAttribute(A.replace(/_/g,""))||z.getAttribute("data-"+A)||z.getAttribute("data-"+A.replace(/_/g,"-"))||z.getAttribute("data-"+A.replace(/-/g,"_"))||z.getAttribute("data-"+A.replace(/-/g,""))||z.getAttribute("data-"+A.replace(/_/g,""));return B?String(B):null}function m(z,A){var B=l(z,A);return B?/^(true|1|yes|on)$/.test(B):null}function n(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{return String(z[A])}catch(B){throw new Error("Could not read property "+A+" : "+B.message)}}function o(z,A){h.isTruthy(z,"element not specified");h.isString(A);try{z.innerHTML=A}catch(B){throw new Error("Could not set innerHTML : "+B.message)}}function p(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=" "+n(z,"className")+" ";return ES(B,"indexOf",true," "+A+" ")>=0}function q(z,A){h.isTruthy(z,"element not specified");h.isString(A);if(!p(z,A))z.className=n(z,"className")+" "+A}function r(z,A){h.isTruthy(z,"element not specified");h.isString(A);var B=new RegExp("\\s*"+A,"g");z.className=ES(n(z,"className").replace(B,""),"trim",true)}function s(z,A,B){h.isString(z);A=A||document.body;B=B||"*";if(A.querySelectorAll)return ES("Array","from",false,A.querySelectorAll(B+"."+z));var C=A.getElementsByTagName(B),D=[];for(var E=0,F=C.length;E<F;E++)if(p(C[E],z))D[D.length]=C[E];return D}function t(z,A){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(D,E){return E.toUpperCase()});var B=z.currentStyle||document.defaultView.getComputedStyle(z,null),C=B[A];if(/backgroundPosition?/.test(A)&&/top|left/.test(C))C="0%";return C}function u(z,A,B){h.isTruthy(z,"element not specified");h.isString(A);A=A.replace(/-(\w)/g,function(C,D){return D.toUpperCase()});z.style[A]=B}function v(z,A){var B=true;for(var C=0,D;D=A[C++];)if(!(D in k)){B=false;k[D]=true}if(B)return;if(i.ie()<11)try{document.createStyleSheet().cssText=z}catch(E){if(document.styleSheets[0])document.styleSheets[0].cssText+=z}else{var F=document.createElement("style");F.type="text/css";F.textContent=z;document.getElementsByTagName("head")[0].appendChild(F)}}function w(){var z=document.documentElement&&document.compatMode=="CSS1Compat"?document.documentElement:document.body;return{scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight}}function x(z){h.isTruthy(z,"element not specified");var A=0,B=0;do{A+=z.offsetLeft;B+=z.offsetTop}while(z=z.offsetParent);return{x:A,y:B}}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:j};f.exports=y}),null);
__d("normalizeError",["sdk.UA"],(function a(b,c,d,e,f,g,h){function i(j){var k={line:j.lineNumber||j.line,message:j.message,name:j.name,script:j.fileName||j.sourceURL||j.script,stack:j.stackTrace||j.stack};k._originalError=j;var l=/([\w:\.\/]+\.js):(\d+)/.exec(j.stack);if(h.chrome()&&l){k.script=l[1];k.line=parseInt(l[2],10)}for(var m in k)k[m]==null&&delete k[m];return k}f.exports=i}),null);
__d("sdk.ErrorHandler",["ManagedError","normalizeError","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j){function k(l,m){var n="";function o(t){var u=t._originalError;delete t._originalError;m(t);throw u}function p(t,u){return function(){if(!l)return t.apply(this,arguments);try{n=u;return t.apply(this,arguments)}catch(v){if(v instanceof h)throw v;var w=i(v);w.entry=u;var x=ES(Array.prototype.slice.call(arguments),"map",true,function(y){var z=Object.prototype.toString.call(y);return/^\[object (String|Number|Boolean|Object|Date)\]$/.test(z)?y:y.toString()});w.args=ES("JSON","stringify",false,x).substring(0,200);o(w)}finally{n=""}}}function q(t){if(!t.__wrapper)t.__wrapper=function(){try{return t.apply(this,arguments)}catch(u){window.setTimeout(function(){throw u},0);return false}};return t.__wrapper}function r(t){try{return t&&t.callee&&t.callee.caller?t.callee.caller.name:""}catch(u){return""}}function s(t,u){return function(v,w){var x=u+":"+(n||"[global]")+":"+(v.name||"[anonymous]"+r(arguments));return t(j(v,"entry",x),w)}}if(l){setTimeout=s(setTimeout,"setTimeout");setInterval=s(setInterval,"setInterval");j.setWrapper(p,"entry")}return{guard:p,unguard:q}}f.exports={create:k}}),null);
__d("sdk.ErrorHandling",["sdk.ErrorHandler","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k){var l=k("error_handling",false);f.exports=h.create(l,function(m){j.log("jssdk_error",{appId:i.getClientID(),error:m.name||m.message,extra:m})})}),null);
__d("sdk.Insights",["sdk.Impressions"],(function a(b,c,d,e,f,g,h){var i={TYPE:{NOTICE:"notice",WARNING:"warn",ERROR:"error"},CATEGORY:{DEPRECATED:"deprecated",APIERROR:"apierror"},log:function j(k,l,m){var n={source:"jssdk",type:k,category:l,payload:m};h.log(113,n)},impression:h.impression};f.exports=i}),null);
__d("FB",["sdk.Auth","JSSDKCssConfig","dotAccess","sdk.domReady","sdk.DOM","sdk.ErrorHandling","sdk.Content","DOMWrapper","GlobalCallback","sdk.Insights","Log","sdk.Runtime","sdk.Scribe","JSSDKConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v=void 0,w=void 0,x=j(u,"api.mode"),y={};v=window.FB={};var z={};r.level=0;p.setPrefix("FB.__globalCallbacks");var A=document.createElement("div");o.setRoot(A);k(function(){r.info("domReady");n.appendHidden(A);if(i.rules)l.addCssRules(i.rules,i.components)});s.subscribe("AccessToken.change",function(D){if(!D&&s.getLoginStatus()==="connected")h.getLoginStatus(null,true)});if(j(u,"api.whitelist.length")){w={};ES(u.api.whitelist,"forEach",true,function(D){w[D]=1})}function B(D,E,F,G){var H;if(/^_/.test(F))H="hide";else if(w&&!w[E])H=x;switch(H){case"hide":return;case"stub":return function(){r.warn("The method FB.%s has been removed from the JS SDK.",E)};default:return m.guard(function(){if(H==="warn"){r.warn("The method FB.%s is not officially supported by Facebook and access to it will soon be removed.",E);if(!Object.prototype.hasOwnProperty.call(y,E)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,"FB."+E);t.log("jssdk_error",{appId:s.getClientID(),error:"Private method used",extra:{args:E}});y[E]=true}}function I(O){if(ES("Array","isArray",false,O))return ES(O,"map",true,I);if(O&&typeof O==="object"&&O.__wrapped)return O.__wrapped;return typeof O==="function"&&/^function/.test(O.toString())?m.unguard(O):O}var J=ES(Array.prototype.slice.call(arguments),"map",true,I),K=D.apply(G,J),L,M=true;if(K&&typeof K==="object"){L=ES("Object","create",false,K);L.__wrapped=K;for(var F in K){var N=K[F];if(typeof N!=="function"||F==="constructor")continue;M=false;L[F]=B(N,E+":"+F,F,K)}}if(!M)return L;return M?K:L},E)}}function C(D,E){var F=D?j(v,D,true):v;ES(ES("Object","keys",false,E),"forEach",true,function(G){var H=E[G];if(typeof H==="function"){var I=(D?D+".":"")+G,J=B(H,I,G,E);if(J)F[G]=J}else if(typeof H==="object"||typeof H==="number"){I=(D?D+".":"")+G;if(w&&w[I])F[G]=H}})}s.setSecure(function(){var D=/iframe_canvas|app_runner/.test(window.name),E=/dialog/.test(window.name);if(location.protocol=="https:"&&(window==top||!(D||E)))return true;if(/_fb_https?/.test(window.name))return ES(window.name,"indexOf",true,"_fb_https")!=-1}());ES("Object","assign",false,z,{provide:C});f.exports=z}),null);
__d("ArgumentError",["ManagedError"],(function a(b,c,d,e,f,g,h){function i(j,k){h.prototype.constructor.apply(this,arguments)}i.prototype=new h();i.prototype.constructor=i;f.exports=i}),null);
__d("flattenObject",[],(function a(b,c,d,e,f,g){function h(i){var j={};for(var k in i)if(Object.prototype.hasOwnProperty.call(i,k)){var l=i[k];if(null===l||undefined===l)continue;else if(typeof l=="string")j[k]=l;else j[k]=ES("JSON","stringify",false,l)}return j}f.exports=h}),null);
__d("ApiClientUtils",["ArgumentError","Assert","Log","sdk.URI","flattenObject","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={get:true,post:true,"delete":true,put:true};function o(p){var q=p.shift();i.isString(q,"Invalid path");if(!/^https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;var r,s={};try{r=new k(q)}catch(t){throw new h(t.message,t)}ES(p,"forEach",true,function(x){return s[typeof x]=x});var u=(s.string||"get").toLowerCase();i.isTrue(Object.prototype.hasOwnProperty.call(n,u),m("Invalid method passed to ApiClient: %s",u));var v=s["function"];if(!v)j.warn("No callback passed to the ApiClient");if(s.object)r.addQueryData(l(s.object));var w=r.getQueryData();w.method=u;return{uri:r,callback:v,params:w}}f.exports={parseCallDataFromArgs:o}}),null);
__d("errorCode",[],(function a(b,c,d,e,f,g){"use strict";function h(i){throw new Error('errorCode("'+i+'"): This should not happen. Oh noes!')}f.exports=h}),null);
__d("sdk.safelyParseResponse",["errorCode"],(function a(b,c,d,e,f,g,h){"use strict";function i(k){try{return k===null?j:ES("JSON","parse",false,k)}catch(l){return j}}var j={error:{code:1,error_subcode:1357046,message:"Received Invalid JSON reply.",type:"http"}};i.ERROR=j;f.exports=i}),null);
__d("ApiBatcher",["ApiClientUtils","QueryString","invariant","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){"use strict";var l=50,m=105440539523;function n(o,p){this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;this.executeRequest=o;this.$ApiBatcher3=p}n.prototype.scheduleBatchCall=function(){for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];var r=n.prepareBatchParams(p),s=r.body,t=r.callback,u=r.method,v=r.relative_url,w={method:u,relative_url:v};if(s)w.body=s;this.$ApiBatcher1.push(w);this.$ApiBatcher2.push(t);if(this.$ApiBatcher1.length==l){if(this.$ApiBatcher4)clearTimeout(this.$ApiBatcher4);this.$ApiBatcher5()}else if(!this.$ApiBatcher4)this.$ApiBatcher4=setTimeout(ES(function(){this.$ApiBatcher5()},"bind",true,this),0)};n.prepareBatchParams=function(o){var p=h.parseCallDataFromArgs(o),q=p.uri,r=p.callback,s=p.params.method,t,u=q.removeQueryData("method").toString();if(s.toLowerCase()=="post"){t=i.encode(q.getQueryData());u=q.setQueryData({}).toString()}return{body:t,callback:r,method:s,relative_url:u}};n.prototype.$ApiBatcher5=function(){this.$ApiBatcher1.length>0||j(0);this.$ApiBatcher1.length===this.$ApiBatcher2.length||j(0);var o=this.$ApiBatcher1,p=this.$ApiBatcher2;this.$ApiBatcher1=[];this.$ApiBatcher2=[];this.$ApiBatcher4=null;if(o.length===1){var q=o[0],r=p[0],s=q.body?i.decode(q.body):null;this.executeRequest(q.relative_url,q.method,s,r);return}this.executeRequest("/","POST",{batch:o,include_headers:false,batch_app_id:this.$ApiBatcher3||m},function(t){if(ES("Array","isArray",false,t))ES(t,"forEach",true,function(u,v){p[v](k(u&&u.body))});else ES(p,"forEach",true,function(r){return r({error:{message:"Fatal: batch call failed."}})})})};f.exports=n}),null);
__d("CORSRequest",["wrapFunction","QueryString","errorCode","sdk.safelyParseResponse"],(function a(b,c,d,e,f,g,h,i,j,k){function l(o,p){if(!self.XMLHttpRequest)return null;var q=new XMLHttpRequest(),r=function r(){};if("withCredentials"in q){q.open(o,p,true);q.setRequestHeader("Content-type","application/x-www-form-urlencoded")}else if(self.XDomainRequest){q=new XDomainRequest();try{q.open(o,p);q.onprogress=q.ontimeout=r}catch(s){return null}}else return null;var t={send:function w(x){q.send(x)}},u=h(function(){u=r;if("onload"in t)t.onload(q)},"entry","XMLHttpRequest:load"),v=h(function(){v=r;if("onerror"in t)t.onerror(q)},"entry","XMLHttpRequest:error");q.onload=function(){u()};q.onerror=function(){v()};q.onreadystatechange=function(){if(q.readyState==4)if(q.status==200)u();else v()};return t}function m(o,p,q,r){q.suppress_http_code=1;var s=i.encode(q);if(p!="post"){o=i.appendToUrl(o,s);s=""}var t=l(p,o);if(!t)return false;t.onload=function(u){r(k(u.responseText))};t.onerror=function(u){if(u.responseText)r(k(u.responseText));else r({error:{code:1,error_subcode:1357045,message:"unknown error (empty response)",status:u.status,type:"http"}})};t.send(s);return true}var n={execute:m};f.exports=n}),null);
__d("FlashRequest",["DOMWrapper","Flash","GlobalCallback","QueryString","Queue"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m,n={},o,p;function q(){if(!o)throw new Error("swfUrl has not been set");var t=j.create(function(){m.start(function(v){var w=p.execute(v.method,v.url,v.body);if(!w)throw new Error("Could create request");n[w]=v.callback})}),u=j.create(function(v,w,x){var y;try{y=ES("JSON","parse",false,decodeURIComponent(x))}catch(z){y={error:{type:"SyntaxError",message:z.message,status:w,raw:x}}}n[v](y);delete n[v]});p=i.embed(o,h.getRoot(),null,{log:false,initCallback:t,requestCallback:u})}function r(t,u,v,w){v.suppress_http_code=1;if(!v.method)v.method=u;var x=k.encode(v);if(u==="get"&&t.length+x.length<2e3){t=k.appendToUrl(t,x);x=""}else u="post";if(!m){if(!i.isAvailable())return false;m=new l();q()}m.enqueue({method:u,url:t,body:x,callback:w});return true}var s={setSwfUrl:function t(u){o=u},execute:r};f.exports=s}),null);
__d("JSONPRequest",["DOMWrapper","GlobalCallback","QueryString"],(function a(b,c,d,e,f,g,h,i,j){var k=2e3,l=false;function m(p,q,r,s){var t=document.createElement("script"),u=function w(x){u=function w(){};i.remove(r.callback);s(x);t.parentNode.removeChild(t)};r.callback=i.create(u);if(!r.method)r.method=q;p=j.appendToUrl(p,r);if(!l&&p.length>k){i.remove(r.callback);return false}t.onerror=function(){u({error:{type:"http",message:"unknown error"}})};var v=function v(){setTimeout(function(){u({error:{type:"http",message:"unknown error"}})},0)};if(t.addEventListener)t.addEventListener("load",v,false);else t.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))v()};t.src=p;h.getRoot().appendChild(t);return true}function n(){l=true}var o={execute:m,ignoreMaxQuerystringLength:n,MAX_QUERYSTRING_LENGTH:k};f.exports=o}),null);
__d("ApiClient",["ApiBatcher","ApiClientUtils","Assert","CORSRequest","FlashRequest","flattenObject","JSONPRequest","Log","ObservableMixin","QueryString","UrlMap","ApiClientConfig"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t,u,v,w=n.MAX_QUERYSTRING_LENGTH,x={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true},y=["jsonp","cors","flash"],z=0,A=[],B=0,C;function D(K,L,M,N){var O=B!==0&&z>=B;if(O){A.push(function(){return D(K,L,M,N)});I.inform("request.queued",K,L,M);return}z++;if(v)M=ES("Object","assign",false,{},v,M);M.pretty=M.pretty||0;M=m(M);var P={jsonp:n,cors:k,flash:l},Q={},R=M.access_token||t;if(R)Q.access_token=R;var S=ES("Object","keys",false,Q);if(S.length>0){K=q.appendToUrl(K,Q);ES(S,"forEach",true,function(X){return delete M[X]})}var T;if(M.transport){T=[M.transport];delete M.transport}else T=y;for(var U=0;U<T.length;U++){var V=P[T[U]],W=ES("Object","assign",false,{},M);if(V.execute(K,L,W,N))return}N({error:{type:"no-transport",message:"Could not find a usable transport for request"}})}function E(K,L,M,N,O,P){if(P&&P.error)I.inform("request.error",L,M,N,P,ES("Date","now",false)-O);I.inform("request.complete",L,M,N,P,ES("Date","now",false)-O);z--;if(K)K(P);var Q=A.length>0&&z<B;if(Q){var R=A.shift();R()}}function F(){for(var K=arguments.length,L=Array(K),M=0;M<K;M++)L[M]=arguments[M];var N=i.parseCallDataFromArgs(L),O=N.uri,P=N.callback,Q=N.params,R=Q.method;if(J(O,R))R="post";var S=O.getProtocol()&&O.getDomain()?O.setQueryData({}).toString():r.resolve("graph")+O.getPath();I.inform("request.prepare",S,Q);D(S,R=="get"?"get":"post",Q,ES(E,"bind",true,null,P,O.getPath(),R,Q,ES("Date","now",false)))}function G(){var K;if(!C)C=new h(F,u);(K=C).scheduleBatchCall.apply(K,arguments)}function H(K,L){j.isObject(K);j.isString(K.method,"method missing");if(!L)o.warn("No callback passed to the ApiClient");var M=K.method.toLowerCase().replace(".","_");K.format="json-strings";K.api_key=u;var N=M in x?"api_read":"api",O=r.resolve(N)+"/restserver.php",P=ES(E,"bind",true,null,L,"/restserver.php","get",K,ES("Date","now",false));D(O,"get",K,P)}var I=ES("Object","assign",false,new p(),{setAccessToken:function K(L){t=L},setAccessTokenForClientID:function K(L,M){if(!(t&&u&&u!==M))t=L},getAccessToken:function K(){return t},setClientID:function K(L){u=L},setDefaultParams:function K(L){v=L},setDefaultTransports:function K(L){y=L},setMaxConcurrentRequests:function K(L){B=L},getCurrentlyExecutingRequestCount:function K(){return z},getQueuedRequestCount:function K(){return A.length},rest:H,graph:F,scheduleBatchCall:G,prepareBatchParams:h.prepareBatchParams});function J(K,L){return K.toString().length>w&&L==="get"}l.setSwfUrl(s.FlashRequest.swfUrl);f.exports=I}),null);
__d("sdk.PlatformVersioning",["sdk.Runtime","ManagedError"],(function a(b,c,d,e,f,g,h,i){var j=/^v\d+\.\d\d?$/,k={REGEX:j,assertVersionIsSet:function l(){if(!h.getVersion())throw new i("init not called with valid version")},assertValidVersion:function l(m){if(!j.test(m))throw new i("invalid version specified")}};f.exports=k}),null);
__d("sdk.api",["ApiClient","sdk.PlatformVersioning","sdk.Runtime","sdk.Scribe","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n=m("should_log_response_error",false),o;j.subscribe("ClientID.change",function(q){return h.setClientID(q)});j.subscribe("AccessToken.change",function(q){o=q;h.setAccessToken(q)});h.setDefaultParams({sdk:"joey"});h.subscribe("request.complete",function(q,r,s,t){var u=false;if(t&&typeof t=="object")if(t.error){if(t.error=="invalid_token"||t.error.type=="OAuthException"&&t.error.code==190)u=true}else if(t.error_code)if(t.error_code=="190")u=true;if(u&&o===j.getAccessToken())j.setAccessToken(null)});h.subscribe("request.complete",function(q,r,s,t){if((q=="/me/permissions"&&r==="delete"||q=="/restserver.php"&&s.method=="Auth.revokeAuthorization")&&t===true)j.setAccessToken(null)});h.subscribe("request.error",function(q,r,s,t){if(n&&t.error.type==="http")k.log("jssdk_error",{appId:j.getClientID(),error:"transport",extra:{name:"transport",message:ES("JSON","stringify",false,t.error)}})});function p(q){if(typeof q==="string")if(j.getIsVersioned()){i.assertVersionIsSet();if(!/https?/.test(q)&&q.charAt(0)!=="/")q="/"+q;q=new l(q).setDomain(null).setProtocol(null).toString();if(!i.REGEX.test(q.substring(1,ES(q,"indexOf",true,"/",1))))q="/"+j.getVersion()+q;var r=[q].concat(Array.prototype.slice.call(arguments,1));h.graph.apply(h,r)}else h.graph.apply(h,arguments);else h.rest.apply(h,arguments)}f.exports=p}),null);
__d("legacy:fb.api",["FB","sdk.api"],(function a(b,c,d,e,f,g,h,i){h.provide("",{api:i})}),3);
__d("AppUserPropertyAPIBuiltinField",[],(function a(b,c,d,e,f,g){f.exports={GENDER:"$gender",CITY:"$city",STATE:"$state",ZIPCODE:"$zipcode",COUNTRY:"$country",LANGUAGE:"$language",CURRENCY:"$currency",INSTALL_SOURCE:"$install_source",USER_TYPE:"$user_type",ACCOUNT_CREATED_TIME:"$account_created_time"}}),null);
__d("FBEventsParamList",[],(function a(b,c,d,e,f,g){"use strict";var h="deep",i="shallow";function j(){this.list=[]}j.prototype={append:function l(m,n){this._append(encodeURIComponent(m),n,h)},_append:function l(m,n,o){if(Object(n)!==n)this._appendPrimitive(m,n);else if(o===h)this._appendObject(m,n);else this._appendPrimitive(m,k(n))},_appendPrimitive:function l(m,n){if(n!=null)this.list.push([m,n])},_appendObject:function l(m,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var p=m+"["+encodeURIComponent(o)+"]";this._append(p,n[o],i)}},each:function l(m){var n=this.list;for(var o=0,p=n.length;o<p;o++)m(n[o][0],n[o][1])},toQueryString:function l(){var m=[];this.each(function(n,o){m.push(n+"="+encodeURIComponent(o))});return m.join("&")}};function k(l){if(typeof JSON==="undefined"||JSON===null||!ES("JSON","stringify",false))return Object.prototype.toString.call(l);else return ES("JSON","stringify",false,l)}f.exports=j}),null);
__d("FBEventsUtils",[],(function a(b,c,d,e,f,g){"use strict";var h="console",i="error",j="Facebook Pixel Error",k="Facebook Pixel Warning",l="warn",m=Object.prototype.toString,n=!("addEventListener"in document),o=function o(){},p=window[h]||{},q=window.postMessage||o;function r(w){return ES("Array","isArray",false)?ES("Array","isArray",false,w):m.call(w)==="[object Array]"}function s(w){q({action:"FB_LOG",logType:j,logMessage:w},"*");if(i in p)p[i](j+": "+w)}function t(w){q({action:"FB_LOG",logType:k,logMessage:w},"*");if(l in p)p[l](k+": "+w)}function u(w,x,y){x=n?"on"+x:x;var z=n?"attachEvent":"addEventListener",A=n?"detachEvent":"removeEventListener",B=function B(){w[A](x,B,false);y()};w[z](x,B,false)}function v(w,x,y){var z=w[x];w[x]=function(){var A=z.apply(this,arguments);y.apply(this,arguments);return A}}g.isArray=r;g.logError=s;g.logWarning=t;g.listenOnce=u;g.injectMethod=v}),null);
__d("FBPixelEndpoint",["FBEventsParamList","FBEventsUtils"],(function a(b,c,d,e,f,g,h,i){"use strict";var j="https://www.facebook.com/tr/",k=location.href,l=window.top!==window,m=document.referrer;function n(s,t,u,v){v=v||{};var w=new h();w.append("id",s);w.append("ev",t);w.append("dl",k);w.append("rl",m);w.append("if",l);w.append("ts",new Date().valueOf());w.append("cd",u);for(var x in v)w.append(x,v[x]);return w}function o(s,t,u,v){var w=n(s,t,u,v),x=w.toQueryString();if(2048>(j+"?"+x).length)p(j,x);else q(j,w)}function p(s,t){var u=new Image();u.src=s+"?"+t}function q(s,t){var u="fb"+Math.random().toString().replace(".",""),v=document.createElement("form");v.method="post";v.action=s;v.target=u;v.acceptCharset="utf-8";v.style.display="none";var w=!!(window.attachEvent&&!window.addEventListener),x=w?'<iframe name="'+u+'">':"iframe",y=document.createElement(x);y.src="javascript:false";y.id=u;y.name=u;v.appendChild(y);i.listenOnce(y,"load",function(){t.each(function(u,z){var A=document.createElement("input");A.name=u;A.value=z;v.appendChild(A)});i.listenOnce(y,"load",function(){v.parentNode.removeChild(v)});v.submit()});document.body.appendChild(v)}var r={sendEvent:o};f.exports=r}),null);
__d("FBAppEvents",["ApiClient","FBPixelEndpoint"],(function a(b,c,d,e,f,g,h,i){"use strict";function j(l,m,n,o,p){var q={es:"APP"};if(o!=null)q.vts=o.toString();if(p!=null)q.at=p;i.sendEvent(l.toString(),m,n,q)}function k(l,m,n,o){var p="/"+m+"/user_properties",q={data:[{user_unique_id:l,custom_data:n}]};h.graph(p,"post",q,o)}f.exports={logEvent:j,updateUserProperties:k}}),null);
__d("sdk.AppEvents",["AppUserPropertyAPIBuiltinField","Assert","sdk.Event","sdk.Impressions","sdk.Model","sdk.Runtime","FBAppEvents","sdk.Auth"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p={COMPLETED_REGISTRATION:"fb_mobile_complete_registration",VIEWED_CONTENT:"fb_mobile_content_view",SEARCHED:"fb_mobile_search",RATED:"fb_mobile_rate",COMPLETED_TUTORIAL:"fb_mobile_tutorial_completion",ADDED_TO_CART:"fb_mobile_add_to_cart",ADDED_TO_WISHLIST:"fb_mobile_add_to_wishlist",INITIATED_CHECKOUT:"fb_mobile_initiated_checkout",ADDED_PAYMENT_INFO:"fb_mobile_add_payment_info",ACHIEVED_LEVEL:"fb_mobile_level_achieved",UNLOCKED_ACHIEVEMENT:"fb_mobile_achievement_unlocked",PAGE_VIEW:"fb_page_view",SPENT_CREDITS:"fb_mobile_spent_credits"},q={ACTIVATED_APP:"fb_mobile_activate_app",PURCHASED:"fb_mobile_purchase"},r={APP_USER_ID:"_app_user_id",APP_VERSION:"_appVersion",CURRENCY:"fb_currency",REGISTRATION_METHOD:"fb_registration_method",CONTENT_TYPE:"fb_content_type",CONTENT_ID:"fb_content_id",SEARCH_STRING:"fb_search_string",SUCCESS:"fb_success",MAX_RATING_VALUE:"fb_max_rating_value",PAYMENT_INFO_AVAILABLE:"fb_payment_info_available",NUM_ITEMS:"fb_num_items",LEVEL:"fb_level",DESCRIPTION:"fb_description"},s=/^[0-9a-zA-Z_][0-9a-zA-Z _-]{0,39}$/,t=40,u=s,v=t,w=100,x=100,y=100,z=100,A=ES("Object","values",false,h),B=new l({UserID:"",Version:""});function C(T,U,V,W){var X={ae:1,ev:U,vts:V,canvas:1};if(W)X.cd=W;k.impression({api_key:T,payload:ES("JSON","stringify",false,X)})}function D(T,U,V,W){var X=o.getAuthResponse(),Y=X&&X.accessToken?X.accessToken:null;n.logEvent(T,U,W||{},V,Y)}function E(T,U,V,W){F(U);var X=B.getUserID();if(X!==""){W=W||{};W[r.APP_USER_ID]=X}var Y=B.getVersion();if(Y!==""){W=W||{};W[r.APP_VERSION]=Y}if(m.isCanvasEnvironment())C(T,U,V,W);else D(T,U,V,W)}function F(T){i.isTrue(s.test(T),"Invalid event name: "+T+". It must be between 1 and "+t+" characters, and must be contain only alphanumerics, _, - or spaces, starting with alphanumeric or _.")}function G(T,U,V,W){var X={};X[r.CURRENCY]=V;E(T,q.PURCHASED,U,babelHelpers["extends"]({},W,X))}function H(T){E(T,q.ACTIVATED_APP)}function I(T){E(T,p.PAGE_VIEW)}function J(T){i.isTrue(T.length!==0,"User ID must be set before updateUserProperties can be called.");i.isTrue(T.length<=w,"Invalid user ID: "+T+". It must be no longer than "+w+" characters.")}function K(T){J(T);B.setUserID(T)}function L(){return B.getUserID()}function M(){B.setUserID("")}function N(T){i.isTrue(T.length<=x,"Invalid app version: "+T+". It must be no longer than "+x+" characters.")}function O(T){N(T);B.setVersion(T)}function P(){return B.getVersion()}function Q(){B.setVersion("")}function R(T){i.isTrue(ES("Object","keys",false,T).length<=y,"The total number of user properties cannot exceed "+y+".");for(var U in T){i.isTrue(u.test(U)||ES(A,"includes",true,U),"Invalid user properties key name: "+U+". It must be between 1 and "+v+" characters, and must contain only alphanumerics, _, - or spaces, starting with alphanumeric or _. Or, it must be a pre-defined user property");i.isTrue(T[U].toString().length<=z,"Invalid user properties value: "+T[U]+". It must be no longer than "+z+" characters.")}}function S(T,U,V){var W=L();J(W);R(U);n.updateUserProperties(W,T,U,V)}j.subscribe("init:post",function(T){if(m.getClientID()){if(T.autoLogAppEvents!==undefined){i.isBoolean(T.autoLogAppEvents,"Type of property autoLogAppEvents must be boolean");m.setAutoLogAppEvents(T.autoLogAppEvents)}if(m.getAutoLogAppEvents())I(m.getClientID())}});f.exports={activateApp:H,logEvent:E,logPurchase:G,logPageView:I,assertValidEventName:F,EventNames:p,ParameterNames:r,assertValidUserID:J,setUserID:K,getUserID:L,clearUserID:M,assertValidUserProperties:R,updateUserProperties:S,setAppVersion:O,getAppVersion:P,clearAppVersion:Q,assertValidAppVersion:N}}),null);
__d("legacy:fb.appevents",["Assert","sdk.AppEvents","FB","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){function l(){var m=k.getClientID();h.isTrue(m!==null&&m.length>0,"You need to call FB.init() with App ID first.");return m}j.provide("AppEvents",{logEvent:function m(n,o,p){i.logEvent(l(),n,o,p)},logPurchase:function m(n,o,p){i.logPurchase(l(),n,o,p)},activateApp:function m(){i.activateApp(l())},logPageView:function m(){i.logPageView(l())},setUserID:function m(n){i.setUserID(n)},getUserID:function m(){return i.getUserID()},clearUserID:function m(){i.clearUserID()},updateUserProperties:function m(n,o){i.updateUserProperties(l(),n,o)},setAppVersion:function m(n){i.setAppVersion(n)},getAppVersion:function m(){return i.getAppVersion()},clearAppVersion:function m(){i.clearAppVersion()},EventNames:i.EventNames,ParameterNames:i.ParameterNames})}),3);
__d("resolveURI",[],(function a(b,c,d,e,f,g){function h(i){if(!i)return window.location.href;i=i.replace(/&/g,"&amp;").replace(/\"/g,"&quot;");var j=document.createElement("div");j.innerHTML='<a href="'+i+'"></a>';return j.firstChild.href}f.exports=h}),null);
__d("sdk.Canvas.Environment",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(l){h.remote.getPageInfo(function(m){l(m.result)})}function j(l,m){h.remote.scrollTo({x:l||0,y:m||0})}h.stub("getPageInfo");h.stub("scrollTo");var k={getPageInfo:i,scrollTo:j};f.exports=k}),null);
__d("sdk.DialogUtils",["sdk.Content","sdk.DOM","DOMEventListener","sdk.UA","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){"use strict";var m={isOrientationPotrait:function n(){return window.innerWidth<window.innerHeight},addDoubleClickAction:function n(o,p,q){var r=null;return j.add(o,"click",function(){if(r!==null){clearTimeout(r);r=null;p()}r=setTimeout(function(){r=null},q)})},addIdleDesktopAction:function n(o,p,q){var r=void 0,event=void 0,s=function s(){r=setTimeout(p,q)};s();return j.add(o,"mouseenter",function(){clearTimeout(r);if(!event)event=j.add(o,"mouseleave",function(){s()})})},addMobileOrientationChangeAction:function n(o){if(!k.mobile())return null;var event="onorientationchange"in window?"orientationchange":"resize",p=function p(q){return setTimeout(function(q){return o(q)},50)};return j.add(window,event,p)},applyScreenDimensions:function n(o){if(o==null)return;var p=i.getViewportInfo();o.style.minHeight=p.height||p.width?p.height+"px":"";o.style.top=p.scrollTop?p.scrollTop+"px":""},setDialogPositionToCenter:function n(o,p,q){var r=function r(B){return typeof B==="number"?B:parseInt(B,10)},s=i.getViewportInfo(),t=r(o.offsetWidth),u=r(o.offsetHeight),v=s.scrollLeft+(s.width-t)/2,w=(s.height-u)/2.5;if(v<w)w=v;var x=s.height-u-w,y=(s.height-u)/2;if(q)y=q.scrollTop-q.offsetTop+(q.clientHeight-u)/2;if(y<w)y=w;else if(y>x)y=x;y+=s.scrollTop;if(k.mobile()){var z=100;if(p){z+=(s.height-u)/2;i.addCss(document.body,"fb_reposition")}else{i.addCss(document.body,"fb_hidden");if(l("dialog_resize_refactor",false))document.body.style.width="auto";y=1e4}var A=i.getByClass("fb_dialog_padding",o);if(A.length)A[0].style.height=z+"px"}o.style.left=(v>0?v:0)+"px";o.style.top=(y>0?y:0)+"px"},setDialogPositionToTop:function n(o,p,q){this.setDialogPositionToCenter(o,p,q);var r=i.getViewportInfo(),s=r.scrollTop+(r.height-o.offsetHeight)*.05;i.setStyle(o,"top",s+"px")},setupNewDarkOverlay:function n(){var o=document.createElement("div");o.setAttribute("id","fb_dialog_ipad_overlay");this.applyScreenDimensions(o);return o},setupNewDialog:function n(o){o=o||{};var p=document.createElement("div"),q=o,r=q.onClose;if(o.closeIcon&&r){var s=document.createElement("a");s.className="fb_dialog_close_icon";j.add(s,"click",r);p.appendChild(s)}var t="fb_dialog";t+=" "+(o.classes||"");if(k.ie()){t+=" fb_dialog_legacy";ES(["vert_left","vert_right","horiz_top","horiz_bottom","top_left","top_right","bottom_left","bottom_right"],"forEach",true,function(x){var y=document.createElement("span");y.className="fb_dialog_"+x;p.appendChild(y)})}else t+=k.mobile()?" fb_dialog_mobile":" fb_dialog_advanced";p.className=t;if(o.width){var u=parseInt(o.width,10);if(!isNaN(u))p.style.width=u+"px"}var v=document.createElement("div");if(o.content)h.append(o.content,v);v.className="fb_dialog_content";p.appendChild(v);if(k.mobile()){var w=document.createElement("div");w.className="fb_dialog_padding";p.appendChild(w)}return{dialogElement:p,contentRoot:v}},onDialogHideCleanup:function n(o){var p=document.body;if(o)i.removeCss(p,"fb_reposition");else i.removeCss(p,"fb_hidden")}};f.exports=m}),null);
__d("sdk.fbt",[],(function a(b,c,d,e,f,g){var h={_:function i(j){return typeof j==="string"?j:j[0]}};f.exports=h}),null);
__d("sdk.Dialog",["sdk.Canvas.Environment","sdk.Content","sdk.DialogUtils","sdk.DOM","DOMEventListener","ObservableMixin","sdk.Runtime","Type","sdk.UA","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s=30,t=590,u=500,v=240,w=575;function x(){if(r("dialog_resize_refactor",false)){var A=k.getViewportInfo();if(A.height&&A.width)return{width:Math.min(A.width,u),height:Math.min(A.height,t)}}return null}var y=o.extend({constructor:function y(A,B){this.parent();this.id=A;this.display=B;this._e2e={};if(!z._dialogs){z._dialogs={};z._addOrientationHandler()}z._dialogs[A]=this;this.trackEvent("init")},trackEvent:function A(B,C){if(this._e2e[B])return this;this._e2e[B]=C||ES("Date","now",false);if(B=="close")this.inform("e2e:end",this._e2e);return this},trackEvents:function A(B){if(typeof B==="string")B=ES("JSON","parse",false,B);for(var C in B)if(Object.prototype.hasOwnProperty.call(B,C))this.trackEvent(C,B[C]);return this}},m),z={newInstance:function A(B,C){return new y(B,C)},_dialogs:null,_lastYOffset:0,_overlayListeners:[],_loaderEl:null,_overlayEl:null,_stack:[],_active:null,_forceTabletStyle:null,_closeOnOverlayTap:null,_positionDialogAtTopWhenPortrait:null,get:function A(B){return z._dialogs[B]},_findRoot:function A(B){while(B){if(k.containsCss(B,"fb_dialog"))return B;B=B.parentNode}},_createWWWLoader:function A(B){B=B?B:460;return z.create({content:'<div class="dialog_title">  <a id="fb_dialog_loader_close">    <div class="fb_dialog_close_icon"></div>  </a>  <span>Facebook</span>  <div style="clear:both;"></div></div><div class="dialog_content"></div><div class="dialog_footer"></div>',width:B})},_createMobileLoader:function A(){var B;if(p.nativeApp())B='<div class="dialog_header"></div>';else if(z.isTabletStyle())B='<div class="overlayLoader"><div id="fb_dialog_loader_spinner"></div><a id="fb_dialog_loader_close" href="#">'+q._("Cancel")+"</a></div>";else B='<div class="dialog_header"><table>  <tbody>    <tr>      <td class="header_left">        <label class="touchable_button">          <input type="submit" value="'+q._("Cancel")+'"            id="fb_dialog_loader_close"/>        </label>      </td>      <td class="header_center">        <div>         '+q._("Loading...")+'        </div>      </td>      <td class="header_right">      </td>    </tr>  </tbody></table></div>';return z.create({classes:"loading"+(z.isTabletStyle()?" centered":""),content:B})},_setDialogOverlayStyle:function A(){j.applyScreenDimensions(z._overlayEl)},_showTabletOverlay:function A(B){if(!z.isTabletStyle())return;if(!z._overlayEl){z._overlayEl=j.setupNewDarkOverlay();i.append(z._overlayEl,null)}if(z._closeOnOverlayTap){var C=j.addDoubleClickAction(z._overlayEl,ES(B,"bind",true,this),5e3);z._overlayListeners.push(C)}z._overlayEl.className=""},_hideTabletOverlay:function A(){if(z.isTabletStyle()){z._overlayEl.className="hidden";ES(z._overlayListeners,"forEach",true,function(B){return B.remove()});z._overlayListeners=[]}},showLoader:function A(B,C){if(!B)B=function B(){};var D=function D(){z._hideLoader();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();B()};z._showTabletOverlay(D);if(!z._loaderEl)z._loaderEl=z._findRoot(p.mobile()?z._createMobileLoader():z._createWWWLoader(C));var E=document.getElementById("fb_dialog_loader_close");if(E){k.removeCss(E,"fb_hidden");var F=l.add(E,"click",D);z._overlayListeners.push(F)}z._makeActive(z._loaderEl)},setCloseOnOverlayTap:function A(B){z._closeOnOverlayTap=!!B},setPositionDialogAtTopWhenPortrait:function A(B){z._positionDialogAtTopWhenPortrait=!!B},_hideLoader:function A(){if(z._loaderEl&&z._loaderEl==z._active)z._loaderEl.style.top="-10000px"},_makeActive:function A(B){z._setDialogSizes();z._lowerActive();z._active=B;if(n.isEnvironment(n.ENVIRONMENTS.CANVAS))h.getPageInfo(function(C){z._centerActive(C)});z._centerActive()},_lowerActive:function A(){if(!z._active)return;z._active.style.top="-10000px";z._active=null},_removeStacked:function A(B){z._stack=ES(z._stack,"filter",true,function(C){return C!=B})},_centerActive:function A(B){var C=z._active;if(!C)return;if(z._positionDialogAtTopWhenPortrait&&j.isOrientationPotrait())j.setDialogPositionToTop(C,z.isTabletStyle(),B);else j.setDialogPositionToCenter(C,z.isTabletStyle(),B)},_setDialogSizes:function A(){var B=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(!p.mobile())return;for(var C in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,C)){var D=document.getElementById(C);if(D){D.style.width=z.getDefaultSize().width+"px";if(!B)D.style.height=z.getDefaultSize().height+"px"}}},getDefaultSize:function A(){if(p.mobile()){var B=x();if(B){if(k.getViewportInfo().width<=B.width)B.width=k.getViewportInfo().width-s;if(k.getViewportInfo().height<=B.height)B.height=k.getViewportInfo().height-s;return B}if(p.ipad())return{width:u,height:t};if(p.android())return{width:screen.availWidth,height:screen.availHeight};else{var C=window.innerWidth,D=window.innerHeight,E=C/D>1.2;return{width:C,height:Math.max(D,E?screen.width:screen.height)}}}return{width:w,height:v}},_handleOrientationChange:function A(){var B=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;z._availScreenWidth=B;if(z.isTabletStyle()){z._setDialogSizes(true);z._centerActive();z._setDialogOverlayStyle()}else{var C=z.getDefaultSize().width;for(var D in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,D)){var E=document.getElementById(D);if(E)E.style.width=C+"px"}}},_addOrientationHandler:function A(){if(!p.mobile())return null;z._availScreenWidth=r("dialog_resize_refactor",false)?k.getViewportInfo().width:screen.availWidth;j.addMobileOrientationChangeAction(z._handleOrientationChange)},create:function A(B){var C=j.setupNewDialog(B);i.append(C.dialogElement);if(B.visible)z.show(C.dialogElement);if(typeof B.styles==="object")ES("Object","assign",false,C.dialogElement.style,B.styles);return C.contentRoot},show:function A(B){var C=z._findRoot(B);if(C){z._removeStacked(C);z._hideLoader();z._makeActive(C);z._stack.push(C);if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_show").trackEvent("show")}},hide:function A(B){var C=z._findRoot(B);z._hideLoader();if(C==z._active){z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();if("fbCallID"in B)z.get(B.fbCallID).inform("iframe_hide").trackEvent("hide")}},remove:function A(B){B=z._findRoot(B);if(B){var C=z._active==B;z._removeStacked(B);if(C){z._hideLoader();if(z._stack.length>0)z.show(z._stack.pop());else{z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay()}}else if(z._active===null&&z._stack.length>0)z.show(z._stack.pop());setTimeout(function(){B.parentNode.removeChild(B)},3e3)}},isActive:function A(B){var C=z._findRoot(B);return C&&C===z._active},setForceTabletStyle:function A(B){z._forceTabletStyle=!!B},isTabletStyle:function A(){var B;if(!p.mobile())return false;if(z._forceTabletStyle)return true;if(r("dialog_resize_refactor",false)){var C=x();B=C&&(C.height>=t||C.width>=u)}else B=!!p.ipad();return B}};f.exports=z}),null);
__d("sdk.Extensions",["sdk.UA","JSONRPC","Queue"],(function a(b,c,d,e,f,g,h,i,j){"use strict";var k=new j(),l=new i(function(o){k.enqueue(o)}),m=new j();m.start(function(o){l.read(o)});var n=window._FBSdkExtensions;if(n){window._FBBrowserCallbackHandler=function(o){m.enqueue(ES("JSON","stringify",false,o))};if(h.android())n.initializeCallbackHandler(ES("JSON","stringify",false,{name:"_FBBrowserCallbackHandler"}));k.start(function(o){if(n)n.jsonRPC(o)})}f.exports={local:l.local,remote:l.remote,stub:ES(l.stub,"bind",true,l),supportsExtension:function o(p){if(h.android()&&n)return n.supportsExtension(p);return false},supportsDialog:function o(p){if(h.android()&&n)return n.supportsDialog(p);return false}}}),null);
__d("sdk.Frictionless",["sdk.Auth","sdk.api","sdk.Event","sdk.Dialog"],(function a(b,c,d,e,f,g,h,i,j,k){var l={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function m(){l._allowedRecipients={};i("/me/apprequestformerrecipients",function(n){if(!n||n.error)return;ES(n.data,"forEach",true,function(o){l._allowedRecipients[o.recipient_id]=true})})},init:function m(){l._useFrictionless=true;h.getLoginStatus(function(n){if(n.status=="connected")l._updateRecipients()});j.subscribe("auth.login",function(n){if(n.authResponse)l._updateRecipients()})},_processRequestResponse:function m(n,o){return function(p){var q=p&&p.updated_frictionless;if(l._useFrictionless&&q)l._updateRecipients();if(p){if(!o&&p.frictionless){k._hideLoader();k._restoreBodyPosition();k._hideIPadOverlay()}delete p.frictionless;delete p.updated_frictionless}n&&n(p)}},isAllowed:function m(n){if(!n)return false;if(typeof n==="number")return n in l._allowedRecipients;if(typeof n==="string")n=n.split(",");n=ES(n,"map",true,function(q){return ES(String(q),"trim",true)});var o=true,p=false;ES(n,"forEach",true,function(q){o=o&&q in l._allowedRecipients;p=true});return o&&p}};j.subscribe("init:post",function(m){if(m.frictionlessRequests)l.init()});f.exports=l}),null);
__d("sdk.Native",["Log","sdk.UA"],(function a(b,c,d,e,f,g,h,i){var j="fbNativeReady",k={onready:function l(m){if(!i.nativeApp()){h.error("FB.Native.onready only works when the page is rendered in a WebView of the native Facebook app. Test if this is the case calling FB.UA.nativeApp()");return}if(window.__fbNative&&!this.nativeReady)ES("Object","assign",false,this,window.__fbNative);if(this.nativeReady)m();else{var n=function n(o){window.removeEventListener(j,n);this.onready(m)};window.addEventListener(j,n,false)}}};f.exports=k}),null);
__d("sdk.openMessenger",["sdk.UA"],(function a(b,c,d,e,f,g,h){"use strict";var i="https://itunes.apple.com/us/app/messenger/id454638411",j="https://play.google.com/store/apps/details?id=com.facebook.orca",k=3e3;function l(m){var n=void 0,o=void 0,p=m.link,q=m.app_id;if(h.android()){n="intent://share/#Intent;package=com.facebook.orca;scheme=fb-messenger;S.android.intent.extra.TEXT="+encodeURIComponent(p)+";S.trigger=send_plugin;";if(q)n+="S.platform_app_id="+encodeURIComponent(q)+";";n+="end";o=j}else{n="fb-messenger://share?link="+encodeURIComponent(p);if(q)n+="&app_id="+encodeURIComponent(q);o=i}setTimeout(function(){window.location.href=o},k);window.location.href=n}f.exports=l}),null);
__d("sdk.UIServer",["sdk.Auth","sdk.Extensions","sdk.Content","sdk.DOM","sdk.Dialog","sdk.Event","sdk.Frictionless","Log","sdk.Native","QueryString","sdk.RPC","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap","sdk.XD","createObjectFrom","sdk.feature","sdk.fbt","flattenObject","sdk.getContextType","guid","insertIframe","sdk.openMessenger","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F){var G={transform:function N(O){if(O.params.display==="touch"&&M.canIframe(O.params)&&window.postMessage){O.params.channel=M._xdChannelHandler(O.id,"parent");if(!u.nativeApp())O.params.in_iframe=1;return O}else return M.genericTransform(O)},getXdRelation:function N(O){var P=O.display;if(P==="touch"&&window.postMessage&&O.in_iframe)return"parent";return M.getXdRelation(O)}};function H(N){return N.method=="permissions.oauth"||N.method=="permissions.request"||N.method=="oauth"}var I={"stream.share":{size:{width:670,height:340},url:"sharer.php",transform:function N(O){if(!O.params.u)O.params.u=window.location.toString();O.params.display="popup";return O}},apprequests:{transform:function N(O){O=G.transform(O);O.params.frictionless=n&&n._useFrictionless;if(O.params.frictionless){if(n.isAllowed(O.params.to)){O.params.display="iframe";O.params.in_iframe=true;O.hideLoader=true}O.cb=n._processRequestResponse(O.cb,O.hideLoader)}O.closeIcon=false;return O},getXdRelation:G.getXdRelation},"permissions.oauth":{url:"dialog/oauth",size:{width:u.mobile()?null:475,height:u.mobile()?null:183},transform:function N(O){if(!s.getClientID()){o.error("FB.login() called before FB.init().");return}if(h.getAuthResponse()&&!O.params.scope&&!O.params.auth_type){o.error("FB.login() called when user is already connected.");O.cb&&O.cb({status:s.getLoginStatus(),authResponse:h.getAuthResponse()});return}var P=O.cb,Q=O.id;delete O.cb;var R=O.params.auth_type==="reauthenticate",S=ES("Object","keys",false,ES("Object","assign",false,O.params.response_type?x(O.params.response_type.split(",")):{},{token:true,signed_request:true})).join(",");if(O.params.display==="async"){ES("Object","assign",false,O.params,{client_id:s.getClientID(),origin:B(),response_type:S,domain:location.hostname});O.cb=h.xdResponseWrapper(P,h.getAuthResponse(),"permissions.oauth")}else{if(R)M._xdNextHandler(function(T){P({authResponse:null,status:"not_authorized"})},Q,"opener",true);ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:F(M.xdHandler(P,Q,"opener",h.getAuthResponse(),"permissions.oauth",!R)),origin:B(),response_type:S,domain:location.hostname})}return O}},"auth.logout":{url:"logout.php",transform:function N(O){if(!s.getClientID())o.error("FB.logout() called before calling FB.init().");else if(!h.getAuthResponse())o.error("FB.logout() called without an access token.");else{O.params.next=M.xdHandler(O.cb,O.id,"parent",h.getAuthResponse(),"logout",true);return O}}},"login.status":{url:"dialog/oauth",transform:function N(O){var P=O.cb,Q=O.id;delete O.cb;ES("Object","assign",false,O.params,{client_id:s.getClientID(),redirect_uri:M.xdHandler(P,Q,"parent",h.getAuthResponse(),"login_status",true),origin:B(),response_type:"token,signed_request,code",domain:location.hostname});return O}},pay:{size:{width:555,height:120},connectDisplay:"popup"},live_broadcast:{transform:function N(O){if(O.params.phase==="create")O.size={width:480,height:280};if(O.params.phase==="publish")O.size={width:772,height:540};return O},require_access_token:true},boost:{transform:function N(O){O.size={width:960,height:760};O.params.display="popup";return O}}},J={};function K(N,O){J[O]=true;return function(P){delete J[O];N(P)}}function L(N){if(!y("should_force_single_dialog_instance",true))return false;var O=N.method.toLowerCase();if(O==="pay"&&N.display==="async")return true;return false}var M={Methods:I,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function N(O){if(O.params.display=="dialog"||O.params.display=="iframe")ES("Object","assign",false,O.params,{display:"iframe",channel:M._xdChannelHandler(O.id,"parent.parent")},true);return O},checkOauthDisplay:function N(O){var P=O.scope||O.perms||s.getScope();if(!P)return O.display;var Q=P.split(/\s|,/g);for(var R=0;R<Q.length;R++)if(!t.initSitevars.iframePermissions[ES(Q[R],"trim",true)])return"popup";return O.display},prepareCall:function N(O,P){var Q=O.method.toLowerCase(),R=Object.prototype.hasOwnProperty.call(M.Methods,Q)?ES("Object","assign",false,{},M.Methods[Q]):{},S=C(),T=s.getSecure()||Q!=="auth.status"&&Q!="login.status";ES("Object","assign",false,O,{app_id:s.getClientID(),locale:s.getLocale(),sdk:"joey",access_token:T&&s.getAccessToken()||undefined});if(Q==="share"||Q==="share_open_graph"){O.mobile_iframe=u.mobile()&&(O.mobile_iframe||O.iframe_test);if(O.mobile_iframe)R=ES("Object","assign",false,{},G)}O.display=M.getDisplayMode(R,O);if(!R.url)R.url="dialog/"+Q;if((R.url=="dialog/oauth"||R.url=="dialog/permissions.request")&&(O.display=="iframe"||O.display=="touch"&&O.in_iframe))O.display=M.checkOauthDisplay(O);if(O.display=="popup"&&!R.require_access_token)delete O.access_token;if(s.getIsVersioned()&&R.url.substring(0,7)==="dialog/")R.url=O.version+"/"+R.url;if(L(O)){if(J[Q]){var U='Dialog "'+Q+'" is trying to run more than once.';o.warn(U);P({error_code:-100,error_message:U});return}P=K(P,Q)}var V={cb:P,id:S,size:R.size||M.getDefaultSize(),url:v.resolve(O.display=="touch"?"m":"www",T)+"/"+R.url,params:O,name:Q,dialog:l.newInstance(S,O.display)},W=R.transform?R.transform:M.genericTransform;if(W){V=W(V);if(!V)return}if(O.display==="touch"&&O.in_iframe)V.params.parent_height=window.innerHeight;var X=R.getXdRelation||M.getXdRelation,Y=X(V.params);if(!(V.id in M._defaultCb)&&!("next"in V.params)&&!("redirect_uri"in V.params))V.params.next=M._xdResult(V.cb,V.id,Y,true);if(Y==="parent"||Y==="opener")ES("Object","assign",false,V.params,{channel_url:M._xdChannelHandler(S,Y==="parent"?"parent.parent":"opener")},true);V=M.prepareParams(V);return V},prepareParams:function N(O){if(O.params.display!=="async")delete O.params.method;O.params.kid_directed_site=s.getKidDirectedSite()||O.params.kid_directed_site;O.params=A(O.params);var P=q.encode(O.params);if(!u.nativeApp()&&M.urlTooLongForIE(O.url+"?"+P))O.post=true;else if(P)O.url+="?"+P;return O},urlTooLongForIE:function N(O){return u.ie()&&u.ie()<=8&&O.length>2048},getDisplayMode:function N(O,P){if(P.display==="hidden"||P.display==="none"||P.display==="native")return P.display;var Q=s.isEnvironment(s.ENVIRONMENTS.CANVAS)||s.isEnvironment(s.ENVIRONMENTS.PAGETAB);if(Q&&!P.display)return"async";if(H(P)&&i.supportsDialog("oauth"))return"async";if(u.mobile()||P.display==="touch")return"touch";if(P.display=="iframe"||P.display=="dialog")if(!M.canIframe(P)){o.error('"dialog" mode can only be used when the user is connected.');return"popup"}if(O.connectDisplay&&!Q)return O.connectDisplay;return P.display||(M.canIframe(P)?"dialog":"popup")},canIframe:function N(O){if(s.getAccessToken())return true;if(u.mobile()&&s.getLoggedIntoFacebook())return!!O.mobile_iframe;return false},getXdRelation:function N(O){var P=O.display;if(P==="popup"||P==="touch")return"opener";if(P==="dialog"||P==="iframe"||P==="hidden"||P==="none")return"parent";if(P==="async")return"parent.frames["+window.name+"]"},popup:function N(O){var P=typeof window.screenX!="undefined"?window.screenX:window.screenLeft,Q=typeof window.screenY!="undefined"?window.screenY:window.screenTop,R=typeof window.outerWidth!="undefined"?window.outerWidth:document.documentElement.clientWidth,S=typeof window.outerHeight!="undefined"?window.outerHeight:document.documentElement.clientHeight-22,T=u.mobile()?null:O.size.width,U=u.mobile()?null:O.size.height,V=P<0?window.screen.width+P:P,W=parseInt(V+(R-T)/2,10),X=parseInt(Q+(S-U)/2.5,10),Y=[];if(T!==null)Y.push("width="+T);if(U!==null)Y.push("height="+U);Y.push("left="+W);Y.push("top="+X);Y.push("scrollbars=1");if(O.name=="permissions.request"||O.name=="permissions.oauth"){Y.push("toolbar=0");if(!u.chrome()||u.chrome()<59)Y.push("location=1")}Y=Y.join(",");var N;if(O.post){N=window.open("about:blank",O.id,Y);if(N){M.setLoadedNode(O,N,"popup");j.submitToTarget({url:O.url,target:O.id,params:O.params})}}else{N=window.open(O.url,O.id,Y);if(N)M.setLoadedNode(O,N,"popup")}if(!N)return;if(O.id in M._defaultCb)M._popupMonitor()},setLoadedNode:function N(O,P,Q){if(Q==="iframe")P.fbCallID=O.id;P={node:P,type:Q,fbCallID:O.id};M._loadedNodes[O.id]=P},getLoadedNode:function N(O){var P=typeof O=="object"?O.id:O,Q=M._loadedNodes[P];return Q?Q.node:null},hidden:function N(O){O.className="FB_UI_Hidden";O.root=j.appendHidden("");M._insertIframe(O)},iframe:function N(O){O.className="FB_UI_Dialog";if(O.params.mobile_iframe){l.setForceTabletStyle(true);l.setCloseOnOverlayTap(true);l.setPositionDialogAtTopWhenPortrait(true)}var P=function P(){var R=ES("JSON","stringify",false,{error_code:4201,error_message:z._("User canceled the Dialog flow")});M._triggerDefault(O.id,R)},Q={onClose:P,closeIcon:O.closeIcon===undefined?true:O.closeIcon,classes:l.isTabletStyle()?"centered":""};if(O.params.mobile_iframe)Q.styles={"border-radius":"8px"};O.root=l.create(Q);if(!O.hideLoader)l.showLoader(P,O.size.width);k.addCss(O.root,"fb_dialog_iframe");M._insertIframe(O)},touch:function N(O){if(O.params&&O.params.in_iframe)if(O.ui_created)l.showLoader(function(){M._triggerDefault(O.id,null)},0);else M.iframe(O);else if(u.nativeApp()&&!O.ui_created){O.frame=O.id;p.onready(function(){M.setLoadedNode(O,p.open(O.url+"#cb="+O.frameName),"native")});M._popupMonitor()}else if(!O.ui_created)M.popup(O)},async:function N(O){O.params.redirect_uri=location.protocol+"//"+location.host+location.pathname;delete O.params.access_token;var P=function P(Q){var R=Q.result;if(R&&R.e2e){var S=l.get(O.id);S.trackEvents(R.e2e);S.trackEvent("close");delete R.e2e}O.cb(R)};if(H(O.params)&&i.supportsDialog("oauth")){O.params.method="oauth";O.params.redirect_uri=O.params.next;i.remote.showDialog(O.params,P)}else r.remote.showDialog(O.params,P)},"native":function N(O){E(O.params)},getDefaultSize:function N(){return l.getDefaultSize()},_insertIframe:function N(O){M._loadedNodes[O.id]=false;var P=function P(Q){if(O.id in M._loadedNodes)M.setLoadedNode(O,Q,"iframe")};if(O.post)D({url:"about:blank",root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,onInsert:P,onload:function Q(R){j.submitToTarget({url:O.url,target:R.name,params:O.params})}});else D({url:O.url,root:O.root,className:O.className,width:O.size.width,height:O.size.height,id:O.id,name:O.frameName,onInsert:P})},_handleResizeMessage:function N(O,P){var Q=M.getLoadedNode(O);if(!Q)return;if(P.height)Q.style.height=P.height+"px";if(P.width)Q.style.width=P.width+"px";w.inform("resize.ack",P||{},"parent.frames["+Q.name+"]");if(!l.isActive(Q))l.show(Q);else l._centerActive()},_triggerDefault:function N(O,P){var Q={frame:O};if(P)Q.result=P;M._xdRecv(Q,M._defaultCb[O]||function(){})},_popupMonitor:function N(){var O;for(var P in M._loadedNodes)if(Object.prototype.hasOwnProperty.call(M._loadedNodes,P)&&P in M._defaultCb){var Q=M._loadedNodes[P];if(Q.type!="popup"&&Q.type!="native")continue;var R=Q.node;try{if(R.closed)M._triggerDefault(P,null);else O=true}catch(S){}}if(O&&!M._popupInterval)M._popupInterval=setInterval(M._popupMonitor,100);else if(!O&&M._popupInterval){clearInterval(M._popupInterval);M._popupInterval=null}},_xdChannelHandler:function N(O,P){return w.handler(function(Q){var R=M.getLoadedNode(O);if(!R)return;if(Q.type=="resize")M._handleResizeMessage(O,Q);else if(Q.type=="hide")l.hide(R);else if(Q.type=="rendered"){var S=l._findRoot(R);l.show(S)}else if(Q.type=="fireevent")m.fire(Q.event,Q)},P,true,null)},_xdNextHandler:function N(O,P,Q,R){if(R)M._defaultCb[P]=O;return w.handler(function(S){M._xdRecv(S,O)},Q)+"&frame="+P},_xdRecv:function N(O,P){var Q=M.getLoadedNode(O.frame);if(Q)if(Q.close)try{Q.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=="5")window.focus();M._popupCount--}catch(R){}else if(k.containsCss(Q,"FB_UI_Hidden"))setTimeout(function(){Q.parentNode.parentNode.removeChild(Q.parentNode)},3e3);else if(k.containsCss(Q,"FB_UI_Dialog"))l.remove(Q);delete M._loadedNodes[O.frame];delete M._defaultCb[O.frame];if(O.e2e){var S=l.get(O.frame);S.trackEvents(O.e2e);S.trackEvent("close");delete O.e2e}P(O)},_xdResult:function N(O,P,Q,R){return M._xdNextHandler(function(S){O&&O(S.result&&S.result!=M._resultToken&&ES("JSON","parse",false,S.result))},P,Q,R)+"&result="+encodeURIComponent(M._resultToken)},xdHandler:function N(O,P,Q,R,S,T){return M._xdNextHandler(h.xdResponseWrapper(O,R,S),P,Q,T)}};i.stub("showDialog");r.stub("showDialog");f.exports=M}),null);
__d("sdk.ui",["Assert","sdk.Impressions","Log","sdk.PlatformVersioning","sdk.Runtime","sdk.UIServer","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){function o(p,q){h.isObject(p);h.maybeFunction(q);if(l.getIsVersioned()){k.assertVersionIsSet();if(p.version)k.assertValidVersion(p.version);else p.version=l.getVersion()}p=ES("Object","assign",false,{},p);if(!p.method){j.error('"method" is a required parameter for FB.ui().');return null}if(p.method=="pay.prompt")p.method="pay";var r=p.method;if(p.redirect_uri){j.warn("When using FB.ui, you should not specify a redirect_uri.");delete p.redirect_uri}if((r=="permissions.request"||r=="permissions.oauth")&&(p.display=="iframe"||p.display=="dialog"))p.display=m.checkOauthDisplay(p);if(p.display==="native"&&r!=="send"){j.error('display type "native" not supported');return null}var s=n("e2e_tracking",true);if(s)p.e2e={};var t=m.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==="dialog")u="iframe";else if(u==="none")u="hidden";var v=m[u];if(!v){j.error('"display" must be one of "popup", "dialog", "iframe", "touch", "async", "hidden", or "none"');return null}if(s)t.dialog.subscribe("e2e:end",function(w){w.method=r;w.display=u;j.debug("e2e: %s",ES("JSON","stringify",false,w));i.log(114,{payload:w})});v(t);return t.dialog}f.exports=o}),null);
__d("legacy:fb.auth",["sdk.Auth","sdk.Cookie","sdk.Event","FB","Log","sdk.Runtime","sdk.SignedRequest","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){k.provide("",{getLoginStatus:function p(){return h.getLoginStatus.apply(h,arguments)},getAuthResponse:function p(){return h.getAuthResponse()},getAccessToken:function p(){return m.getAccessToken()||null},getUserID:function p(){return m.getUserID()||m.getCookieUserID()},login:function p(q,r){if(r&&r.perms&&!r.scope){r.scope=r.perms;delete r.perms;l.warn("OAuth2 specification states that 'perms' should now be called 'scope'.  Please update.")}var s=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(babelHelpers["extends"]({method:"permissions.oauth",display:s?"async":"popup",domain:location.hostname},r||{}),q)},logout:function p(q){o({method:"auth.logout",display:"hidden"},q)}});h.subscribe("logout",ES(j.fire,"bind",true,j,"auth.logout"));h.subscribe("login",ES(j.fire,"bind",true,j,"auth.login"));h.subscribe("authresponse.change",ES(j.fire,"bind",true,j,"auth.authResponseChange"));h.subscribe("status.change",ES(j.fire,"bind",true,j,"auth.statusChange"));j.subscribe("init:post",function(p){if(p.status)h.getLoginStatus();if(m.getClientID())if(p.authResponse)h.setAuthResponse(p.authResponse,"connected");else if(m.getUseCookie()){var q=i.loadSignedRequest(),r;if(q){try{r=n.parse(q)}catch(s){i.clearSignedRequestCookie()}if(r&&r.user_id)m.setCookieUserID(r.user_id)}i.loadMeta()}})}),3);
__d("sdk.Canvas.IframeHandling",["DOMWrapper","sdk.RPC"],(function a(b,c,d,e,f,g,h,i){var j=null,k;function l(){var p=h.getWindow().document,q=p.body,r=p.documentElement,s=Math.max(q.offsetTop,0),t=Math.max(r.offsetTop,0),u=q.scrollHeight+s,v=q.offsetHeight+s,w=r.scrollHeight+t,x=r.offsetHeight+t;return Math.max(u,v,w,x)}function m(p){if(typeof p!="object")p={};var q=0,r=0;if(!p.height){p.height=l();q=16;r=4}if(!p.frame)p.frame=window.name||"iframe_canvas";if(k){var s=k.height,t=p.height-s;if(t<=r&&t>=-q)return false}k=p;i.remote.setSize(p);return true}function n(p,q){if(q===undefined&&typeof p==="number"){q=p;p=true}if(p||p===undefined){if(j===null)j=setInterval(function(){m()},q||100);m()}else if(j!==null){clearInterval(j);j=null}}i.stub("setSize");var o={setSize:m,setAutoGrow:n};f.exports=o}),null);
__d("sdk.Canvas.Navigation",["sdk.RPC"],(function a(b,c,d,e,f,g,h){function i(k){h.local.navigate=function(l){k({path:l})};h.remote.setNavigationEnabled(true)}h.stub("setNavigationEnabled");var j={setUrlHandler:i};f.exports=j}),null);
__d("sdk.Canvas.Plugin",["Log","sdk.RPC","sdk.Runtime","sdk.UA","sdk.api"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m="CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000",n="CLSID:444785F1-DE89-4295-863A-D46C3A781394",o=null,p=k.osx()&&k.osx.getVersionParts(),q=!(p&&p[0]>10&&p[1]>10&&(k.chrome()>=31||k.webkit()>=537.71||k.firefox()>=25));function r(B){B._hideunity_savedstyle={};B._hideunity_savedstyle.left=B.style.left;B._hideunity_savedstyle.position=B.style.position;B._hideunity_savedstyle.width=B.style.width;B._hideunity_savedstyle.height=B.style.height;B.style.left="-10000px";B.style.position="absolute";B.style.width="1px";B.style.height="1px"}function s(B){if(B._hideunity_savedstyle){B.style.left=B._hideunity_savedstyle.left;B.style.position=B._hideunity_savedstyle.position;B.style.width=B._hideunity_savedstyle.width;B.style.height=B._hideunity_savedstyle.height}}function t(B){B._old_visibility=B.style.visibility;B.style.visibility="hidden"}function u(B){B.style.visibility=B._old_visibility||"";delete B._old_visibility}function v(B){var C=B.type?B.type.toLowerCase():null,D=C==="application/x-shockwave-flash"||B.classid&&B.classid.toUpperCase()==m;if(!D)return false;var E=/opaque|transparent/i;if(E.test(B.getAttribute("wmode")))return false;for(var F=0;F<B.childNodes.length;F++){var G=B.childNodes[F];if(/param/i.test(G.nodeName)&&/wmode/i.test(G.name)&&E.test(G.value))return false}return true}function w(B){var C=B.type?B.type.toLowerCase():null;return C==="application/vnd.unity"||B.classid&&B.classid.toUpperCase()==n}function x(B){var C=ES("Array","from",false,window.document.getElementsByTagName("object"));C=C.concat(ES("Array","from",false,window.document.getElementsByTagName("embed")));var D=false,E=false;ES(C,"forEach",true,function(G){var H=v(G),I=q&&w(G);if(!H&&!I)return;D=D||H;E=E||I;var J=function J(){if(B.state==="opened")if(H)t(G);else r(G);else if(H)u(G);else s(G)};if(o){h.info("Calling developer specified callback");var K={state:B.state,elem:G};o(K);setTimeout(J,200)}else J()});if(Math.random()<=1/1e3){var F={unity:E,flash:D};l(j.getClientID()+"/occludespopups","post",F)}}i.local.hidePluginObjects=function(){h.info("hidePluginObjects called");x({state:"opened"})};i.local.showPluginObjects=function(){h.info("showPluginObjects called");x({state:"closed"})};i.local.showFlashObjects=i.local.showPluginObjects;i.local.hideFlashObjects=i.local.hidePluginObjects;function y(){t();r()}function z(){u();s()}var A={_setHidePluginCallback:function B(C){o=C},hidePluginElement:y,showPluginElement:z};f.exports=A}),null);
__d("sdk.Canvas.Tti",["sdk.RPC","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i){function j(o,p){var q={appId:i.getClientID(),time:ES("Date","now",false),name:p},r=[q];if(o)r.push(function(s){o(s.result)});h.remote.logTtiMessage.apply(null,r)}function k(){j(null,"StartIframeAppTtiTimer")}function l(o){j(o,"StopIframeAppTtiTimer")}function m(o){j(o,"RecordIframeAppTti")}h.stub("logTtiMessage");var n={setDoneLoading:m,startTimer:k,stopTimer:l};f.exports=n}),null);
__d("legacy:fb.canvas",["Assert","sdk.Canvas.Environment","sdk.Event","FB","sdk.Canvas.IframeHandling","sdk.Canvas.Navigation","sdk.Canvas.Plugin","sdk.RPC","sdk.Runtime","sdk.Canvas.Tti"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){k.provide("Canvas",{setSize:function r(s){h.maybeObject(s,"Invalid argument");return l.setSize.apply(null,arguments)},setAutoGrow:function r(){return l.setAutoGrow.apply(null,arguments)},getPageInfo:function r(s){h.isFunction(s,"Invalid argument");return i.getPageInfo.apply(null,arguments)},scrollTo:function r(s,t){h.maybeNumber(s,"Invalid argument");h.maybeNumber(t,"Invalid argument");return i.scrollTo.apply(null,arguments)},setDoneLoading:function r(s){h.maybeFunction(s,"Invalid argument");return q.setDoneLoading.apply(null,arguments)},startTimer:function r(){return q.startTimer.apply(null,arguments)},stopTimer:function r(s){h.maybeFunction(s,"Invalid argument");return q.stopTimer.apply(null,arguments)},getHash:function r(s){h.isFunction(s,"Invalid argument");return m.getHash.apply(null,arguments)},setHash:function r(s){h.isString(s,"Invalid argument");return m.setHash.apply(null,arguments)},setUrlHandler:function r(s){h.isFunction(s,"Invalid argument");return m.setUrlHandler.apply(null,arguments)}});o.local.fireEvent=ES(j.fire,"bind",true,j);j.subscribe("init:post",function(r){if(p.isEnvironment(p.ENVIRONMENTS.CANVAS)){h.isTrue(!r.hideFlashCallback||!r.hidePluginCallback,"cannot specify deprecated hideFlashCallback and new hidePluginCallback");n._setHidePluginCallback(r.hidePluginCallback||r.hideFlashCallback)}})}),3);
__d("legacy:fb.canvas.plugin",["FB","sdk.Canvas.Plugin"],(function a(b,c,d,e,f,g,h,i){h.provide("Canvas.Plugin",i)}),3);
__d("sdk.Canvas.Prefetcher",["JSSDKCanvasPrefetcherConfig","sdk.Runtime","sdk.api"],(function a(b,c,d,e,f,g,h,i,j){var k={AUTOMATIC:0,MANUAL:1},l=h.sampleRate,m=h.blacklist,n=k.AUTOMATIC,o=[];function p(){var u={object:"data",link:"href",script:"src"};if(n==k.AUTOMATIC)ES(ES("Object","keys",false,u),"forEach",true,function(v){var w=u[v];ES(ES("Array","from",false,document.getElementsByTagName(v)),"forEach",true,function(x){if(x[w])o.push(x[w])})});if(o.length===0)return;j(i.getClientID()+"/staticresources","post",{urls:ES("JSON","stringify",false,o),is_https:location.protocol==="https:"});o=[]}function q(){if(!i.isEnvironment(i.ENVIRONMENTS.CANVAS)||!i.getClientID()||!l)return;if(Math.random()>1/l||m=="*"||~ES(m,"indexOf",true,i.getClientID()))return;setTimeout(p,3e4)}function r(u){n=u}function s(u){o.push(u)}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};f.exports=t}),null);
__d("legacy:fb.canvas.prefetcher",["FB","sdk.Canvas.Prefetcher","sdk.Event","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k){h.provide("Canvas.Prefetcher",i);j.subscribe("init:post",function(l){if(k.isEnvironment(k.ENVIRONMENTS.CANVAS))i._maybeSample()})}),3);
__d("legacy:fb.canvas.presence",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){i.subscribe(i.SUBSCRIBE,j);i.subscribe(i.UNSUBSCRIBE,k);h.stub("useFriendsOnline");function j(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===1)h.remote.useFriendsOnline(true)}function k(l,m){if(l!="canvas.friendsOnlineUpdated")return;if(m.length===0)h.remote.useFriendsOnline(false)}}),3);
__d("legacy:fb.canvas.syncrequests",["sdk.RPC","sdk.Event"],(function a(b,c,d,e,f,g,h,i){h.stub("initPendingSyncRequests");function j(k,l){if(k!="canvas.syncRequestUpdated")return;h.remote.initPendingSyncRequests();i.unsubscribe(i.SUBSCRIBE,j)}i.subscribe(i.SUBSCRIBE,j)}),3);
__d("legacy:fb.event",["FB","sdk.Event","sdk.Runtime","sdk.Scribe","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=[],n=null,o=l("event_subscriptions_log",false);h.provide("Event",{subscribe:function p(q,r){if(o){m.push(q);if(!n)n=setTimeout(function(){k.log("jssdk_error",{appId:j.getClientID(),error:"EVENT_SUBSCRIPTIONS_LOG",extra:{line:0,name:"EVENT_SUBSCRIPTIONS_LOG",script:"N/A",stack:"N/A",message:m.sort().join(",")}});m.length=0;n=null},o)}return i.subscribe(q,r)},unsubscribe:ES(i.unsubscribe,"bind",true,i)})}),3);
__d("legacy:fb.frictionless",["FB","sdk.Frictionless"],(function a(b,c,d,e,f,g,h,i){h.provide("Frictionless",i)}),3);
__d("sdk.MBasicInitializer",["sdk.DOM","sdk.Runtime","sdk.UA","sdk.URI","UrlMap","sdk.fbt","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o=function o(){function q(r){if(!r)return;var s=r.parentNode;if(!s)return;var t=h.getAttr(r,"href")||window.location.href,u=new k(l.resolve("m"));u.setPath("/dialog/share");u.addQueryData("href",encodeURI(t));u.addQueryData("app_id",i.getClientID());u.addQueryData("mbasic_link",1);var v=document.createElement("a");v.style="display:inline-block; zoom:1;";v.textContent=m._("Share to Facebook");v.setAttribute("href",u.toString());v.setAttribute("target","_blank");s.insertBefore(v,r);s.removeChild(r)}if(!n("js_sdk_mbasic_share_plugin_init",false))return;ES(ES("Array","from",false,document.getElementsByTagName("fb:share-button")),"forEach",true,function(r){return q(r)});ES(ES("Array","from",false,document.getElementsByClassName("fb-share-button")),"forEach",true,function(r){return q(r)})};function p(){if(!j.mBasic())return;o()}f.exports={init:p}}),null);
__d("sdk.init",["sdk.Cookie","sdk.ErrorHandling","sdk.Event","sdk.Impressions","Log","ManagedError","sdk.MBasicInitializer","sdk.PlatformVersioning","QueryString","sdk.Runtime","sdk.UA","sdk.URI","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){function u(w){var x=typeof w==="number"&&w>0||typeof w==="string"&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(w);if(x)return w.toString();l.warn("Invalid App Id: Must be a number or numeric string representing the application id.");return null}function v(w){if(q.getInitialized())l.warn("FB.init has already been called - this could indicate a problem");if(q.getIsVersioned()){if(Object.prototype.toString.call(w)!=="[object Object]")throw new m("Invalid argument");if(w.authResponse)l.warn("Setting authResponse is not supported");if(!w.version)w.version=new s(location.href).getQueryData().sdk_version;o.assertValidVersion(w.version);q.setVersion(w.version)}else{if(/number|string/.test(typeof w)){l.warn("FB.init called with invalid parameters");w={apiKey:w}}w=ES("Object","assign",false,{status:true},w||{})}var x=u(w.appId||w.apiKey);if(x!==null)q.setClientID(x);if("scope"in w)q.setScope(w.scope);if(w.cookie){q.setUseCookie(true);if(typeof w.cookie==="string")h.setDomain(w.cookie)}if(w.kidDirectedSite)q.setKidDirectedSite(true);q.setInitialized(true);if(t("js_sdk_impression_on_load",true))k.log(115,{});if(r.mBasic())n.init();j.fire("init:post",w)}setTimeout(function(){var w=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES(ES("Array","from",false,fb_fif_window.document.getElementsByTagName("script")),"forEach",true,function(x){if(x.src){var y=w.exec(x.src);if(y){var z=p.decode(y[2]);for(var A in z)if(Object.prototype.hasOwnProperty.call(z,A)){var B=z[A];if(B=="0")z[A]=0}v(z)}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;i.unguard(window.fbAsyncInit)()}},0);f.exports=v}),null);
__d("legacy:fb.init",["FB","sdk.init"],(function a(b,c,d,e,f,g,h,i){h.provide("",{init:i})}),3);
__d("legacy:fb.ui",["FB","sdk.ui"],(function a(b,c,d,e,f,g,h,i){h.provide("",{ui:i})}),3);
__d("legacy:fb.versioned-sdk",["sdk.Runtime"],(function a(b,c,d,e,f,g,h){h.setIsVersioned(true)}),3);
__d("runOnce",[],(function a(b,c,d,e,f,g){function h(i){var j,k;return function(){if(!j){j=true;k=i()}return k}}f.exports=h}),null);
__d("XFBML",["Assert","sdk.DOM","Log","ObservableMixin","sdk.UA","runOnce"],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={},o={},p=0,q=new k();function r(y,z){return ES(y[z]+"","trim",true)}function s(y){return y.scopeName?y.scopeName+":"+y.nodeName:""}function t(y){return n[r(y,"nodeName").toLowerCase()]||n[s(y).toLowerCase()]}function u(y){var z=ES(r(y,"className").split(/\s+/),"filter",true,function(A){return Object.prototype.hasOwnProperty.call(o,A)});if(z.length===0)return undefined;if(y.getAttribute("fb-xfbml-state")||!y.childNodes||y.childNodes.length===0||y.childNodes.length===1&&y.childNodes[0].nodeType===3||y.children.length===1&&r(y.children[0],"className")==="fb-xfbml-parse-ignore")return o[z[0]]}function v(y){var z={};ES(ES("Array","from",false,y.attributes),"forEach",true,function(A){z[r(A,"name")]=r(A,"value")});return z}function w(y,z,A){var B=document.createElement("div");i.addCss(y,z+"-"+A);ES(ES("Array","from",false,y.childNodes),"forEach",true,function(C){B.appendChild(C)});ES(ES("Array","from",false,y.attributes),"forEach",true,function(C){B.setAttribute(C.name,C.value)});y.parentNode.replaceChild(B,y);return B}function x(y,z,A){h.isTrue(y&&y.nodeType&&y.nodeType===1&&!!y.getElementsByTagName,"Invalid DOM node passed to FB.XFBML.parse()");h.isFunction(z,"Invalid callback passed to FB.XFBML.parse()");var B=++p;j.info("XFBML Parsing Start %s",B);var C=1,D=0,E=function E(){C--;if(C===0){j.info("XFBML Parsing Finish %s, %s tags found",B,D);z();q.inform("render",B,D)}h.isTrue(C>=0,"onrender() has been called too many times")};ES(ES("Array","from",false,y.getElementsByTagName("*")),"forEach",true,function(G){if(!A&&G.getAttribute("fb-xfbml-state"))return;if(G.nodeType!==1)return;var H=t(G)||u(G);if(!H)return;if(l.ie()<9&&G.scopeName)G=w(G,H.xmlns,H.localName);C++;D++;var I=new H.ctor(G,H.xmlns,H.localName,v(G));I.subscribe("render",m(function(){G.setAttribute("fb-xfbml-state","rendered");E()}));var J=function J(){if(G.getAttribute("fb-xfbml-state")=="parsed")q.subscribe("render.queue",J);else{G.setAttribute("fb-xfbml-state","parsed");I.process()}};J()});q.inform("parse",B,D);var F=3e4;setTimeout(function(){if(C>0)j.warn("%s tags failed to render in %s ms",C,F)},F);E()}q.subscribe("render",function(){var y=q.getSubscribers("render.queue");q.clearSubscribers("render.queue");ES(y,"forEach",true,function(z){z()})});ES("Object","assign",false,q,{registerTag:function y(z){var A=z.xmlns+":"+z.localName;h.isUndefined(n[A],A+" already registered");n[A]=z;o[z.xmlns+"-"+z.localName]=z},parse:function y(z,A){x(z||document.body,A||function(){},true)},parseNew:function y(){x(document.body,function(){},false)}});f.exports=q}),null);
__d("legacy:fb.xfbml",["Assert","sdk.Event","FB","XFBML","sdk.domReady","sdk.feature","wrapFunction"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){j.provide("XFBML",{parse:function p(q){h.maybeXfbml(q,"Invalid argument");if(q&&q.nodeType===9)q=q.body;return k.parse.apply(null,arguments)}});k.subscribe("parse",ES(i.fire,"bind",true,i,"xfbml.parse"));k.subscribe("render",ES(i.fire,"bind",true,i,"xfbml.render"));i.subscribe("init:post",function(p){if(p.xfbml)setTimeout(n(ES(l,"bind",true,null,k.parse),"entry","init:post:xfbml.parse"),0)});h.define("Xfbml",function(p){return(p.nodeType===1||p.nodeType===9)&&typeof p.nodeName==="string"});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add("fb")}catch(o){}}),3);
__d("IframePlugin",["sdk.Auth","sdk.DOM","sdk.Event","Log","ObservableMixin","sdk.PlatformVersioning","QueryString","sdk.Runtime","Type","sdk.UA","sdk.URI","UrlMap","sdk.XD","sdk.createIframe","sdk.feature","guid","resolveURI"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){var y={skin:"string",font:"string",width:"string",height:"px",ref:"string",color_scheme:"string"};function z(H,I,J){if(I||I===0)if(I==="100%")H.style.width="100%";else H.style.width=I+"px";if(J||J===0)H.style.height=J+"px"}function A(H){return function(I){var J={width:I.width,height:I.height,pluginID:H};j.fire("xfbml.resize",J)}}var B={string:function H(I){return I},bool:function H(I){return I?/^(?:true|1|yes|on)$/i.test(I):undefined},url:function H(I){return x(I)},url_maybe:function H(I){return I?x(I):I},hostname:function H(I){return I||window.location.hostname},px:function H(I){return/^(\d+)(?:px)?$/.test(I)?parseInt(RegExp.$1,10):undefined},text:function H(I){return I}};function C(H,I){var J=H[I]||H[I.replace(/_/g,"-")]||H[I.replace(/_/g,"")]||H["data-"+I]||H["data-"+I.replace(/_/g,"-")]||H["data-"+I.replace(/_/g,"")]||undefined;return J}function D(H,I,J,K){ES(ES("Object","keys",false,H),"forEach",true,function(L){if(H[L]=="text"&&!J[L]){J[L]=I.textContent||I.innerText||"";I.setAttribute(L,J[L])}K[L]=B[H[L]](C(J,L))})}function E(H){if(H==="100%")return"100%";return H||H==="0"||H===0?parseInt(H,10):undefined}function F(H){if(H)z(H,0,0)}var G=p.extend({constructor:function H(I,J,K,L){this.parent();K=K.replace(/-/g,"_");var M=C(L,"plugin_id");this.subscribe("xd.resize",A(M));this.subscribe("xd.resize.flow",A(M));this.subscribe("xd.resize.flow",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize",ES(function(R){ES("Object","assign",false,this._iframeOptions.root.style,{verticalAlign:"bottom",overflow:""});z(this._iframeOptions.root,E(R.width),E(R.height));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.resize.iframe",ES(function(R){if(R.reposition==="true"&&v("reposition_iframe",false))this.reposition(E(R.width));z(this._iframe,E(R.width),E(R.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID)},"bind",true,this));this.subscribe("xd.sdk_event",function(R){var S=ES("JSON","parse",false,R.data);S.pluginID=M;j.fire(R.event,S,I)});var N=s.resolve("www",true)+"/plugins/"+K+".php?",O={};D(this.getParams(),I,L,O);D(y,I,L,O);ES("Object","assign",false,O,{app_id:o.getClientID(),locale:o.getLocale(),sdk:"joey",kid_directed_site:o.getKidDirectedSite(),channel:t.handler(ES(function(R){return this.inform("xd."+R.type,R)},"bind",true,this),"parent.parent",true)});if(this.shouldIgnoreWidth())O.width=void 0;O.container_width=I.offsetWidth;i.addCss(I,"fb_iframe_widget");var P=w();this.subscribe("xd.verify",function(R){t.sendToFacebook(P,{method:"xd/verify",params:ES("JSON","stringify",false,R.token)})});this.subscribe("xd.refreshLoginStatus",ES(function(){h.removeLogoutState();h.getLoginStatus(ES(this.inform,"bind",true,this,"login.status"),true)},"bind",true,this));var Q=document.createElement("span");ES("Object","assign",false,Q.style,{verticalAlign:"top",width:"0px",height:"0px",overflow:"hidden"});this._element=I;this._ns=J;this._tag=K;this._params=O;this._config=this.getConfig();this._iframeOptions={root:Q,url:N+n.encode(O),name:P,width:this._config.mobile_fullsize&&q.mobile()?void 0:O.width||1e3,height:O.height||1e3,style:{border:"none",visibility:"hidden"},title:this._ns+":"+this._tag+" Facebook Social Plugin",onload:ES(function(){return this.inform("render")},"bind",true,this),onerror:ES(function(){return F(this._iframe)},"bind",true,this)};if(this.isFluid()&&O.width!=="auto"){i.addCss(this._element,"fb_iframe_widget_fluid_desktop");if(!O.width&&this._config.full_width){this._element.style.width="100%";this._iframeOptions.root.style.width="100%";this._iframeOptions.style.width="100%";this._params.container_width=this._element.offsetWidth;this._iframeOptions.url=N+n.encode(this._params)}}},shouldIgnoreWidth:function H(){return q.mobile()&&this.getConfig().mobile_fullsize},process:function H(){if(o.getIsVersioned()){m.assertVersionIsSet();var I=new r(this._iframeOptions.url);this._iframeOptions.url=I.setPath("/"+o.getVersion()+I.getPath()).toString()}var J=ES("Object","assign",false,{},this._params);delete J.channel;var K=n.encode(J);if(this._element.getAttribute("fb-iframe-plugin-query")==K){k.info("Skipping render: %s:%s %s",this._ns,this._tag,K);this.inform("render");return}this._element.setAttribute("fb-iframe-plugin-query",K);this.subscribe("render",ES(function(){this._iframe.style.visibility="visible";if(!this._isIframeResized)F(this._iframe)},"bind",true,this));while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._iframeOptions.root);var L=q.mobile()?120:45;this._timeoutID=setTimeout(ES(function(){F(this._iframe);k.warn("%s:%s failed to resize in %ss",this._ns,this._tag,L)},"bind",true,this),L*1e3);this._iframe=u(this._iframeOptions);if(q.mobile()||J.width==="auto"){i.addCss(this._element,"fb_iframe_widget_fluid");if(!this._iframeOptions.width){ES("Object","assign",false,this._element.style,{display:"block",width:"100%",height:"auto"});ES("Object","assign",false,this._iframeOptions.root.style,{width:"100%",height:"auto"});var M={height:"auto",position:"static",width:"100%"};if(q.iphone()||q.ipad())ES("Object","assign",false,M,{width:"220px","min-width":"100%"});ES("Object","assign",false,this._iframe.style,M)}}},getConfig:function H(){return{}},isFluid:function H(){var I=this.getConfig();return I.fluid},reposition:function H(I){var J=i.getPosition(this._iframe).x,K=i.getViewportInfo().width,L=parseInt(i.getStyle(this._iframe,"width"),10),M={};if(J+I>K&&J>I){this._iframe.style.left=parseInt(i.getStyle(this._iframe,"width"),10)-I+"px";this._isRepositioned=true;M.type="reposition"}else if(this._isRepositioned&&L-I!==0){this._iframe.style.left="0px";this._isRepositioned=false;M.type="restore"}else return;t.sendToFacebook(this._iframe.name,{method:"xd/reposition",params:ES("JSON","stringify",false,M)})},updateLift:function H(){var I=this._iframe.style.width===this._iframeOptions.root.style.width&&this._iframe.style.height===this._iframeOptions.root.style.height;i[I?"removeCss":"addCss"](this._iframe,"fb_iframe_widget_lift")}},l);G.getVal=C;G.withParams=function(H,I){return G.extend({getParams:function J(){return H},getConfig:function J(){return I?I:{}}})};f.exports=G}),null);
__d("PluginConfig",["sdk.feature"],(function a(b,c,d,e,f,g,h){var i={comment_embed:{mobile_fullsize:true},messengerpreconfirmation:{mobile_fullsize:true},messengeraccountconfirmation:{mobile_fullsize:true},messengerbusinesslink:{mobile_fullsize:true},messengertoggle:{mobile_fullsize:true},messengermessageus:{mobile_fullsize:true},post:{fluid:h("fluid_embed",false),mobile_fullsize:true},send_to_messenger:{mobile_fullsize:true}};f.exports=i}),null);
__d("PluginTags",[],(function a(b,c,d,e,f,g){var h={comment_embed:{href:"url",include_parent:"bool"},composer:{action_type:"string",action_properties:"string"},create_event_button:{},follow:{href:"url",layout:"string",show_faces:"bool",size:"string"},like:{href:"url",layout:"string",show_faces:"bool",share:"bool",action:"string",send:"bool",size:"string"},like_box:{href:"string",show_faces:"bool",header:"bool",stream:"bool",force_wall:"bool",show_border:"bool",id:"string",connections:"string",profile_id:"string",name:"string"},page:{href:"string",hide_cta:"bool",hide_cover:"bool",small_header:"bool",adapt_container_width:"bool",show_facepile:"bool",show_posts:"bool",tabs:"string"},messenger_checkbox:{messenger_app_id:"string",page_id:"string",pixel_id:"string",prechecked:"bool",allow_login:"bool",size:"string",origin:"string",user_ref:"string",identity_match:"string"},messengerpreconfirmation:{messenger_app_id:"string",page_id:"string"},messengeraccountconfirmation:{messenger_app_id:"string",page_id:"string",state:"string"},messengerbusinesslink:{messenger_app_id:"string",page_id:"string",state:"string"},messengertoggle:{messenger_app_id:"string",page_id:"string",token:"string",psid:"string"},messengermessageus:{messenger_app_id:"string",page_id:"string",color:"string",size:"string"},send_to_messenger:{messenger_app_id:"string",page_id:"string",color:"string",size:"string",enforce_login:"bool",identity_match:"string",origin:"string"},page_events:{href:"url"},post:{href:"url",show_text:"bool"},profile_pic:{uid:"string",linked:"bool",href:"string",size:"string",facebook_logo:"bool"},send:{href:"url",size:"string"},send_to_mobile:{max_rows:"string",show_faces:"bool",size:"string"}},i={subscribe:"follow",fan:"like_box",likebox:"like_box"};ES(ES("Object","keys",false,i),"forEach",true,function(j){h[j]=h[i[j]]});f.exports=h}),null);
__d("sdk.Arbiter",[],(function a(b,c,d,e,f,g){var h={BEHAVIOR_EVENT:"e",BEHAVIOR_PERSISTENT:"p",BEHAVIOR_STATE:"s"};f.exports=h}),null);
__d("sdk.XFBML.Element",["sdk.DOM","Type","ObservableMixin"],(function a(b,c,d,e,f,g,h,i,j){var k=i.extend({constructor:function l(m){this.parent();this.dom=m},fire:function l(){this.inform.apply(this,arguments)},getAttribute:function l(m,n,o){var p=h.getAttr(this.dom,m);return p?o?o(p):p:n},_getBoolAttribute:function l(m,n){var o=h.getBoolAttr(this.dom,m);return o===null?n:o},_getPxAttribute:function l(m,n){return this.getAttribute(m,n,function(o){var p=parseInt(o,10);return isNaN(p)?n:p})},_getLengthAttribute:function l(m,n){return this.getAttribute(m,n,function(o){if(o==="100%"||o==="auto")return o;var p=parseInt(o,10);return isNaN(p)?n:p})},_getAttributeFromList:function l(m,n,o){return this.getAttribute(m,n,function(p){p=p.toLowerCase();return ES(o,"indexOf",true,p)>-1?p:n})},isValid:function l(){for(var m=this.dom;m;m=m.parentNode)if(m==document.body)return true},clear:function l(){h.html(this.dom,"")}},j);f.exports=k}),null);
__d("sdk.XFBML.IframeWidget",["sdk.Arbiter","sdk.Auth","sdk.Content","sdk.DOM","sdk.Event","sdk.XFBML.Element","guid","insertIframe","QueryString","sdk.Runtime","sdk.ui","UrlMap","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:"load",_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function w(){throw new Error("Inheriting class needs to implement getUrlBits().")},setupAndValidate:function w(){return true},oneTimeSetup:function w(){},getSize:function w(){},getIframeName:function w(){return this._iframeName},getIframeTitle:function w(){return"Facebook Social Plugin"},getChannelUrl:function w(){if(!this._channelUrl){var x=this;this._channelUrl=t.handler(function(y){x.fire("xd."+y.type,y)},"parent.parent",true)}return this._channelUrl},getIframeNode:function w(){return this.dom.getElementsByTagName("iframe")[0]},arbiterInform:function w(event,x,y){t.sendToFacebook(this.getIframeName(),{method:event,params:ES("JSON","stringify",false,x||{}),behavior:y||h.BEHAVIOR_PERSISTENT})},_arbiterInform:function w(event,x,y){var z='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,x,z,y)},getDefaultWebDomain:function w(){return s.resolve("www")},process:function w(x){if(this._done){if(!this._allowReProcess&&!x)return;this.clear()}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire("render");return}if(this._showLoader)this._addLoader();k.addCss(this.dom,"fb_iframe_widget");if(this._visibleAfter!="immediate")k.addCss(this.dom,"fb_hide_iframes");else this.subscribe("iframe.onload",ES(this.fire,"bind",true,this,"render"));var y=this.getSize()||{},z=this.getFullyQualifiedURL();if(y.width=="100%")k.addCss(this.dom,"fb_iframe_widget_fluid");this.clear();o({url:z,root:this.dom.appendChild(document.createElement("span")),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?"fb_rtl":"fb_ltr",height:y.height,width:y.width,onload:ES(this.fire,"bind",true,this,"iframe.onload")});this._resizeFlow(y);this.loaded=false;this.subscribe("iframe.onload",ES(function(){this.loaded=true;if(!this._isResizeHandled)k.addCss(this.dom,"fb_hide_iframes")},"bind",true,this))},generateWidgetPipeIframeName:function w(){v++;return"fb_iframe_"+v},getFullyQualifiedURL:function w(){var x=this._getURL();x+="?"+p.encode(this._getQS());if(x.length>2e3){x="about:blank";var y=ES(function(){this._postRequest();this.unsubscribe("iframe.onload",y)},"bind",true,this);this.subscribe("iframe.onload",y)}return x},_getWidgetPipeShell:function w(){return s.resolve("www")+"/common/widget_pipe_shell.php"},_oneTimeSetup:function w(){this.subscribe("xd.resize",ES(this._handleResizeMsg,"bind",true,this));this.subscribe("xd.resize",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.resize.iframe",ES(this._resizeIframe,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._resizeFlow,"bind",true,this));this.subscribe("xd.resize.flow",ES(this._bubbleResizeEvent,"bind",true,this));this.subscribe("xd.refreshLoginStatus",function(){i.getLoginStatus(function(){},true)});this.subscribe("xd.logout",function(){r({method:"auth.logout",display:"hidden"},function(){})});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=="load")this.subscribe("iframe.onload",ES(this._makeVisible,"bind",true,this));this.subscribe("xd.verify",ES(function(x){this.arbiterInform("xd/verify",x.token)},"bind",true,this));this.oneTimeSetup()},_makeVisible:function w(){this._removeLoader();k.removeCss(this.dom,"fb_hide_iframes");this.fire("render")},_setupAuthRefresh:function w(){i.getLoginStatus(ES(function(x){var y=x.status;l.subscribe("auth.statusChange",ES(function(x){if(!this.isValid())return;if(y=="unknown"||x.status=="unknown")this.process(true);y=x.status},"bind",true,this))},"bind",true,this))},_handleResizeMsg:function w(x){if(!this.isValid())return;this._resizeIframe(x);this._resizeFlow(x);if(!this._borderReset){this.getIframeNode().style.border="none";this._borderReset=true}this._isResizeHandled=true;this._makeVisible()},_bubbleResizeEvent:function w(x){var y={height:x.height,width:x.width,pluginID:this.getAttribute("plugin-id")};l.fire("xfbml.resize",y)},_resizeIframe:function w(x){var y=this.getIframeNode();if(x.reposition==="true")this._repositionIframe(x);x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_resizeFlow:function w(x){var y=this.dom.getElementsByTagName("span")[0];x.height&&(y.style.height=x.height+"px");x.width&&(y.style.width=x.width+"px")},_repositionIframe:function w(x){var y=this.getIframeNode(),z=parseInt(k.getStyle(y,"width"),10),A=k.getPosition(y).x,B=k.getViewportInfo().width,C=parseInt(x.width,10);if(A+C>B&&A>C){y.style.left=z-C+"px";this.arbiterInform("xd/reposition",{type:"horizontal"});this._repositioned=true}else if(this._repositioned){y.style.left="0px";this.arbiterInform("xd/reposition",{type:"restore"});this._repositioned=false}},_addLoader:function w(){if(!this._loaderDiv){k.addCss(this.dom,"fb_iframe_widget_loader");this._loaderDiv=document.createElement("div");this._loaderDiv.className="FB_Loader";this.dom.appendChild(this._loaderDiv)}},_removeLoader:function w(){if(this._loaderDiv){k.removeCss(this.dom,"fb_iframe_widget_loader");if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null}},_getQS:function w(){return ES("Object","assign",false,{api_key:q.getClientID(),locale:q.getLocale(),sdk:"joey",kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute("ref")},this.getUrlBits().params)},_getURL:function w(){var x=this.getDefaultWebDomain(),y="";return x+"/plugins/"+y+this.getUrlBits().name+".php"},_postRequest:function w(){j.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()})}}),v=0;f.exports=u}),null);
__d("sdk.XFBML.Comments",["sdk.Event","sdk.XFBML.IframeWidget","QueryString","sdk.Runtime","JSSDKConfig","sdk.UA","UrlMap"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o=320,p=i.extend({_visibleAfter:"immediate",_refreshOnAuthChange:true,setupAndValidate:function q(){var r={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute("colorscheme"),skin:this.getAttribute("skin"),numposts:this.getAttribute("num-posts",10),width:this._getLengthAttribute("width"),href:this.getAttribute("href"),permalink:this.getAttribute("permalink"),publish_feed:this.getAttribute("publish_feed"),order_by:this.getAttribute("order_by"),mobile:this._getBoolAttribute("mobile"),version:this.getAttribute("version")};if(!r.width&&!r.permalink)r.width=550;if(l.initSitevars.enableMobileComments&&m.mobile()&&r.mobile!==false)r.mobile=true;if(!r.skin)r.skin=r.colorscheme;if(!r.href){r.migrated=this.getAttribute("migrated");r.xid=this.getAttribute("xid");r.title=this.getAttribute("title",document.title);r.url=this.getAttribute("url",document.URL);r.quiet=this.getAttribute("quiet");r.reverse=this.getAttribute("reverse");r.simple=this.getAttribute("simple");r.css=this.getAttribute("css");r.notify=this.getAttribute("notify");if(!r.xid){var s=ES(document.URL,"indexOf",true,"#");if(s>0)r.xid=encodeURIComponent(document.URL.substring(0,s));else r.xid=encodeURIComponent(document.URL)}if(r.migrated)r.href=n.resolve("www")+"/plugins/comments_v1.php?app_id="+k.getClientID()+"&xid="+encodeURIComponent(r.xid)+"&url="+encodeURIComponent(r.url)}else{var t=this.getAttribute("fb_comment_id");if(!t){t=j.decode(document.URL.substring(ES(document.URL,"indexOf",true,"?")+1)).fb_comment_id;if(t&&ES(t,"indexOf",true,"#")>0)t=t.substring(0,ES(t,"indexOf",true,"#"))}if(t){r.fb_comment_id=t;this.subscribe("render",ES(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id},"bind",true,this))}}if(!r.version)r.version=k.getVersion();this._attr=r;return true},oneTimeSetup:function q(){this.subscribe("xd.sdk_event",function(r){h.fire(r.event,ES("JSON","parse",false,r.data))})},getSize:function q(){if(!this._attr.permalink)return{width:this._attr.mobile||this._attr.width==="auto"||this._attr.width==="100%"?"100%":Math.max(this._attr.width,o),height:100}},getUrlBits:function q(){return{name:"comments",params:this._attr}},getDefaultWebDomain:function q(){return n.resolve("www",true)}});f.exports=p}),null);
__d("sdk.XFBML.CommentsCount",["ApiClient","sdk.DOM","sdk.XFBML.Element","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k){var l=j.extend({process:function m(){i.addCss(this.dom,"fb_comments_count_zero");var n=this.getAttribute("href",window.location.href);h.scheduleBatchCall("/v2.1/"+encodeURIComponent(n),{fields:"share"},ES(function(o){var p=o.share&&o.share.comment_count||0;i.html(this.dom,k('<span class="fb_comments_count">%s</span>',p));if(p>0)i.removeCss(this.dom,"fb_comments_count_zero");this.fire("render")},"bind",true,this))}});f.exports=l}),null);
__d("safeEval",[],(function a(b,c,d,e,f,g){function h(i,j){if(i===null||typeof i==="undefined")return;if(typeof i!=="string")return i;if(/^\w+$/.test(i)&&typeof window[i]==="function")return window[i].apply(null,j||[]);return Function('return eval("'+i.replace(/\"/g,'\\"')+'");').apply(null,j||[])}f.exports=h}),null);
__d("sdk.Helper",["sdk.ErrorHandling","sdk.Event","UrlMap","safeEval","sprintf"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m={isUser:function n(o){return o<22e8||o>=1e14&&o<=100099999989999||o>=89e12&&o<=89999999999999||o>=6000001e7&&o<=60000019999999},upperCaseFirstChar:function n(o){if(o.length>0)return o.substr(0,1).toUpperCase()+o.substr(1);else return o},getProfileLink:function n(o,p,q){if(!q&&o)q=l("%s/profile.php?id=%s",j.resolve("www"),o.uid||o.id);if(q)p=l('<a class="fb_link" href="%s">%s</a>',q,p);return p},invokeHandler:function n(o,p,q){if(o)if(typeof o==="string")h.unguard(k)(o,q);else if(o.apply)h.unguard(o).apply(p,q||[])},fireEvent:function n(o,p){var q=p._attr.href;p.fire(o,q);i.fire(o,q,p)},executeFunctionByName:function n(o){var p=Array.prototype.slice.call(arguments,1),q=o.split("."),r=q.pop(),s=window;for(var t=0;t<q.length;t++)s=s[q[t]];return s[r].apply(this,p)}};f.exports=m}),null);
__d("sdk.XFBML.LoginButton",["sdk.Helper","IframePlugin","Log","sdk.ui","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=i.extend({constructor:function n(o,p,q,r){this.parent(o,p,q,r);var s=i.getVal(r,"on_login"),t=null,u=this._iframeOptions.name;if(s){t=function t(v){if(v.error_code){j.debug("Plugin Return Error (%s): %s",v.error_code,v.error_message||v.error_description);return}h.invokeHandler(s,null,[v])};this.subscribe("login.status",t)}this.subscribe("xd.login_button_dialog_open",function(v){k(ES("JSON","parse",false,v.params),function(w){h.invokeHandler(t,null,[w]);l.sendToFacebook(u,{method:"loginReload",params:ES("JSON","stringify",false,w)})})})},shouldIgnoreWidth:function n(){return false},getParams:function n(){return{scope:"string",perms:"string",size:"string",login_text:"text",show_faces:"bool",max_rows:"string",show_login_face:"bool",registration_url:"url_maybe",auto_logout_link:"bool",one_click:"bool",show_banner:"bool",auth_type:"string",default_audience:"string",use_continue_as:"bool",button_type:"string",width:"px",height:"px"}}});f.exports=m}),null);
__d("escapeHTML",[],(function a(b,c,d,e,f,g){var h=/[&<>\"\'\/]/g,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;","/":"&#x2F;"};function j(k){return k.replace(h,function(l){return i[l]})}f.exports=j}),null);
__d("sdk.XFBML.Name",["ApiClient","escapeHTML","sdk.Event","sdk.XFBML.Element","sdk.Helper","Log","sdk.Runtime"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o={}.hasOwnProperty,p=k.extend({process:function q(){ES("Object","assign",false,this,{_uid:this.getAttribute("uid"),_firstnameonly:this._getBoolAttribute("first-name-only"),_lastnameonly:this._getBoolAttribute("last-name-only"),_possessive:this._getBoolAttribute("possessive"),_reflexive:this._getBoolAttribute("reflexive"),_objective:this._getBoolAttribute("objective"),_linked:this._getBoolAttribute("linked",true),_subjectId:this.getAttribute("subject-id")});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire("render");return}var r=[];if(this._firstnameonly)r.push("first_name");else if(this._lastnameonly)r.push("last_name");else r.push("name");if(this._subjectId){r.push("gender");if(this._subjectId==n.getUserID())this._reflexive=true}j.monitor("auth.statusChange",ES(function(){if(!this.isValid()){this.fire("render");return true}if(!this._uid||this._uid=="loggedinuser")this._uid=n.getUserID();if(!this._uid)return;h.scheduleBatchCall("/v1.0/"+this._uid,{fields:r.join(",")},ES(function(s){if(o.call(s,"error")){m.warn("The name is not found for ID: "+this._uid);return}if(this._subjectId==this._uid)this._renderPronoun(s);else this._renderOther(s);this.fire("render")},"bind",true,this))},"bind",true,this))},_renderPronoun:function q(r){var s="",t=this._objective;if(this._subjectId){t=true;if(this._subjectId===this._uid)this._reflexive=true}if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._possessive)if(this._reflexive)s="your own";else s="your";else if(this._reflexive)s="yourself";else s="you";else switch(r.gender){case"male":if(this._possessive)s=this._reflexive?"his own":"his";else if(this._reflexive)s="himself";else if(t)s="him";else s="he";break;case"female":if(this._possessive)s=this._reflexive?"her own":"her";else if(this._reflexive)s="herself";else if(t)s="her";else s="she";break;default:if(this._getBoolAttribute("use-they",true))if(this._possessive)if(this._reflexive)s="their own";else s="their";else if(this._reflexive)s="themselves";else if(t)s="them";else s="they";else if(this._possessive)if(this._reflexive)s="his/her own";else s="his/her";else if(this._reflexive)s="himself/herself";else if(t)s="him/her";else s="he/she";break}if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);this.dom.innerHTML=s},_renderOther:function q(r){var s="",t="";if(this._uid==n.getUserID()&&this._getBoolAttribute("use-you",true))if(this._reflexive)if(this._possessive)s="your own";else s="yourself";else if(this._possessive)s="your";else s="you";else if(r){if(null===r.first_name)r.first_name="";if(null===r.last_name)r.last_name="";if(this._firstnameonly&&r.first_name!==undefined)s=i(r.first_name);else if(this._lastnameonly&&r.last_name!==undefined)s=i(r.last_name);if(!s)s=i(r.name);if(s!==""&&this._possessive)s+="'s"}if(!s)s=i(this.getAttribute("if-cant-see","Facebook User"));if(s){if(this._getBoolAttribute("capitalize",false))s=l.upperCaseFirstChar(s);if(r&&this._linked)t=l.getProfileLink(r,s,this.getAttribute("href",null));else t=s}this.dom.innerHTML=t}});f.exports=p}),null);
__d("UnicodeUtils",["invariant"],(function a(b,c,d,e,f,g,h){"use strict";var i=55296,j=56319,k=56320,l=57343,m=/[\uD800-\uDFFF]/;function n(w){return i<=w&&w<=l}function o(w,x){0<=x&&x<w.length||h(0);if(x+1===w.length)return false;var y=w.charCodeAt(x),z=w.charCodeAt(x+1);return i<=y&&y<=j&&k<=z&&z<=l}function p(w){return m.test(w)}function q(w,x){return 1+n(w.charCodeAt(x))}function r(w){if(!p(w))return w.length;var x=0;for(var y=0;y<w.length;y+=q(w,y))x++;return x}function s(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(!p(w))return w.substr(x,y);var z=w.length;if(z<=0||x>z||y<=0)return"";var A=0;if(x>0){for(;x>0&&A<z;x--)A+=q(w,A);if(A>=z)return""}else if(x<0){for(A=z;x<0&&0<A;x++)A-=q(w,A-1);if(A<0)A=0}var B=z;if(y<z)for(B=A;y>0&&B<z;y--)B+=q(w,B);return w.substring(A,B)}function t(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(x<0)x=0;if(y<0)y=0;var z=Math.abs(y-x);x=x<y?x:y;return s(w,x,z)}function u(w){var x=[];for(var y=0;y<w.length;y+=q(w,y))x.push(w.codePointAt(y));return x}var v={getCodePoints:u,getUTF16Length:q,hasSurrogateUnit:p,isCodeUnitInSurrogateRange:n,isSurrogatePair:o,strlen:r,substring:t,substr:s};f.exports=v}),null);
__d("isNode",[],(function a(b,c,d,e,f,g){function h(i){var j=i?i.ownerDocument||i:document,k=j.defaultView||window;return!!(i&&(typeof k.Node==="function"?i instanceof k.Node:typeof i==="object"&&typeof i.nodeType==="number"&&typeof i.nodeName==="string"))}f.exports=h}),18);
__d("isTextNode",["isNode"],(function a(b,c,d,e,f,g,h){function i(j){return h(j)&&j.nodeType==3}f.exports=i}),18);
__d("containsNode",["isTextNode"],(function a(b,c,d,e,f,g,h){function i(j,k){if(!j||!k)return false;else if(j===k)return true;else if(h(j))return false;else if(h(k))return i(j,k.parentNode);else if("contains"in j)return ES(j,"contains",true,k);else if(j.compareDocumentPosition)return!!(j.compareDocumentPosition(k)&16);else return false}f.exports=i}),18);
__d("sdk.XFBML.Quote",["sdk.DOM","DOMEventListener","IframePlugin","UnicodeUtils","sdk.UA","sdk.XD","containsNode","sdk.feature"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){"use strict";var p="fb-quotable",q=155,r=70,s="",t=null,u=[],v=false,w=null,x=l.mobile();function y(D){var E=D.getRangeAt(0),F=E.startContainer;return F.nodeType===3?F.parentNode:F}function z(D){if(!document.getSelection||x)return;var E=document.getSelection();if(E.rangeCount===0){B();return}var F=u.length;B();if(F){var G=false;for(var H=0;H<F;H++)if(n(u[H],E.focusNode)){G=true;break}if(!G)return}s=E.toString();if(s===""){B();return}s=ES(s.toString().replace(/\s+/g," "),"trim",true);var I=Number(o("sharequotelimit",500));if(k.strlen(s)>I)s=k.substr(s,0,I-3)+"...";else s=k.substr(s,0,I);if(!v&&w){y(E).appendChild(w);var J=A(E);w.style.left=J.x+"px";w.style.top=J.y+"px"}}function A(D){var E=w&&w.offsetWidth,F=E?w.offsetHeight:r,G=E?w.offsetWidth:q,H=D.getRangeAt(0),I=document.createElement("span"),J=document.createElement("span"),K=document.createRange();K.setStart(H.startContainer,H.startOffset);K.insertNode(I);var L=document.createRange();L.setStart(H.endContainer,H.endOffset);L.insertNode(J);var M=I.offsetTop-F,N=I.offsetLeft+(J.offsetLeft-I.offsetLeft)/2-G/2;I.parentNode.removeChild(I);J.parentNode.removeChild(J);return{x:N,y:M}}function B(){s="";if(!v&&w)w.style.left="-9999px"}var C=j.extend({constructor:function D(E,F,G,H){if(t)return t;this.parent(E,F,G,H);v=h.getAttr(E,"layout")==="button";w=E;w.style.position="absolute";w.style.display="";i.add(document,"keyup",z);i.add(document,"mouseup",z);this.subscribe("xd.getTextSelection",ES(function(){m.sendToFacebook(this._iframeOptions.name,{method:"setTextSelection",params:ES("JSON","stringify",false,{text:s})});B()},"bind",true,this));u=ES(ES("Array","from",false,document.getElementsByTagName("*")),"filter",true,function(I){return I.nodeName.toLowerCase()==="article"||h.containsCss(I,p)});B();t=this;return t},getParams:function D(){return{href:"url",layout:"string"}}});f.exports=C}),null);
__d("sdk.XFBML.Save",["sdk.Content","sdk.DialogUtils","sdk.DOM","sdk.Event","IframePlugin","QueryString","sdk.UA","sdk.XD","sdk.createIframe"],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";var q=void 0,r=l.extend({constructor:function s(t,u,v,w){this.parent(t,u,v,w);var x=n.mobile();this.subscribe("xd.savePluginGetBlankIframe",ES(function(y){var z=void 0,A=void 0,B=void 0,C=function C(H){if(H)j.removeCss(H,"fb_invisible")},D=function D(H){if(H)j.addCss(H,"fb_invisible")};if(x){z=i.setupNewDarkOverlay();D(z);h.append(z);i.addDoubleClickAction(z,function(){return ES(B,"forEach",true,D)},5e3)}A=this.setupNewIframeDialog(ES("JSON","parse",false,y.data),y.fromIframe,ES("JSON","parse",false,y.isHTTPS));D(A);h.append(A);B=[A,z];var E=function E(){ES(B,"forEach",true,D);i.onDialogHideCleanup(x);clearInterval(q)},F=void 0;this.subscribe("xd.savePluginShowIframe",ES(function(){k.fire("savePlugin:hideDialog");ES(B,"forEach",true,C);this.positionOnScreen(A,z);if(!x&&!F)F=i.addIdleDesktopAction(A,E,7e3)},"bind",true,this));this.subscribe("xd.savePluginHideIframe",function(){return E()});k.subscribe("savePlugin:hideDialog",function(){return E()});var G=setInterval(function(){var H=document.getElementsByName(y.fromIframe);if(H.length===0){clearTimeout(G);E();ES(B,"forEach",true,function(t){t&&t.parentNode.removeChild(t)})}},500)},"bind",true,this))},positionOnScreen:function s(t,u){var v,w=n.mobile();if(w)(function(){var x=function x(t,u){if(u!=null)i.setDialogPositionToCenter(u,w);i.setDialogPositionToCenter(t,w)};x(t,u);i.addMobileOrientationChangeAction(function(y){x(t,u)});q=setInterval(function(){return x(t,u)},100)})();else{j.setStyle(t,"position","fixed");j.setStyle(t,"top","20px");j.setStyle(t,"right","20px")}},setupNewIframeDialog:function s(t,u,v){var w="#"+m.encode({forIframe:u}),x=i.setupNewDialog();p({url:o.getXDArbiterURL(v)+w,name:"blank_"+this._iframeOptions.name,root:x.contentRoot,tabindex:-1});j.addCss(x.contentRoot,"fb_dialog_iframe");ES("Object","assign",false,x.dialogElement.style,t.style||{});j.setStyle(x.dialogElement,"width",t.width+"px");j.setStyle(x.dialogElement,"height",t.height+"px");ES(t.classList,"forEach",true,function(y){return j.addCss(x.dialogElement,y)});j.removeCss(x.dialogElement,"fb_dialog_advanced");return x.dialogElement},getParams:function s(){return{uri:"url",url_category:"string",size:"string"}}});f.exports=r}),null);
__d("sdk.XFBML.ShareButton",["IframePlugin","sdk.UA","sdk.ui"],(function a(b,c,d,e,f,g,h,i,j){"use strict";var k=h.extend({constructor:function l(m,n,o,p){this.parent(m,n,o,p);this.subscribe("xd.shareTriggerMobileIframe",function(q){var r=ES("JSON","parse",false,q.data);j({method:"share",href:r.href,mobile_iframe:i.mobile()})})},getParams:function l(){return{href:"url",layout:"string",mobile_iframe:"bool",type:"string",size:"string"}}});f.exports=k}),null);
__d("sdk.XFBML.Video",["Assert","sdk.Event","IframePlugin","ObservableMixin","sdk.XD"],(function a(b,c,d,e,f,g,h,i,j,k,l){function m(p){"use strict";this.$VideoCache1=p.isMuted;this.$VideoCache2=p.volume;this.$VideoCache3=p.timePosition;this.$VideoCache4=p.duration}m.prototype.update=function(p){"use strict";if(p.isMuted!==undefined)this.$VideoCache1=p.isMuted;if(p.volume!==undefined)this.$VideoCache2=p.volume;if(p.timePosition!==undefined)this.$VideoCache3=p.timePosition;if(p.duration!==undefined)this.$VideoCache4=p.duration};m.prototype.isMuted=function(){"use strict";return this.$VideoCache1};m.prototype.getVolume=function(){"use strict";return this.$VideoCache1?0:this.$VideoCache2};m.prototype.getCurrentPosition=function(){"use strict";return this.$VideoCache3};m.prototype.getDuration=function(){"use strict";return this.$VideoCache4};function n(p,q,r){"use strict";this.$VideoController1=p;this.$VideoController2=q;this.$VideoController3=r}n.prototype.play=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"play",params:ES("JSON","stringify",false,{})})};n.prototype.pause=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"pause",params:ES("JSON","stringify",false,{})})};n.prototype.seek=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"seek",params:ES("JSON","stringify",false,{target:p})})};n.prototype.mute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"mute",params:ES("JSON","stringify",false,{})})};n.prototype.unmute=function(){"use strict";l.sendToFacebook(this.$VideoController1,{method:"unmute",params:ES("JSON","stringify",false,{})})};n.prototype.setVolume=function(p){"use strict";h.isNumber(p,"Invalid argument");l.sendToFacebook(this.$VideoController1,{method:"setVolume",params:ES("JSON","stringify",false,{volume:p})})};n.prototype.isMuted=function(){"use strict";return this.$VideoController3.isMuted()};n.prototype.getVolume=function(){"use strict";return this.$VideoController3.getVolume()};n.prototype.getCurrentPosition=function(){"use strict";return this.$VideoController3.getCurrentPosition()};n.prototype.getDuration=function(){"use strict";return this.$VideoController3.getDuration()};n.prototype.subscribe=function(event,p){"use strict";h.isString(event,"Invalid argument");h.isFunction(p,"Invalid argument");this.$VideoController2.subscribe(event,p);return{release:ES(function(){this.$VideoController2.unsubscribe(event,p)},"bind",true,this)}};var o=j.extend({constructor:function p(q,r,s,t){this.parent(q,r,s,t);this._videoController=null;this._sharedObservable=null;this._sharedVideoCache=null;this.subscribe("xd.onVideoAPIReady",function(u){this._sharedObservable=new k();this._sharedVideoCache=new m(ES("JSON","parse",false,u.data));this._videoController=new n(this._iframeOptions.name,this._sharedObservable,this._sharedVideoCache);i.fire("xfbml.ready",{type:"video",id:t.id,instance:this._videoController})});this.subscribe("xd.stateChange",function(u){this._sharedObservable.inform(u.state)});this.subscribe("xd.cachedStateUpdateRequest",function(u){this._sharedVideoCache.update(ES("JSON","parse",false,u.data))})},getParams:function p(){return{allowfullscreen:"bool",autoplay:"bool",controls:"bool",href:"url",show_captions:"bool",show_text:"bool"}},getConfig:function p(){return{fluid:true,full_width:true}}});f.exports=o}),null);
__d("legacy:fb.xfbml.plugins",["IframePlugin","PluginConfig","PluginTags","XFBML","sdk.feature","sdk.XFBML.Comments","sdk.XFBML.CommentsCount","sdk.XFBML.LoginButton","sdk.XFBML.Name","sdk.XFBML.Quote","sdk.XFBML.Save","sdk.XFBML.ShareButton","sdk.XFBML.Video"],(function a(b,c,d,e,f,g,h,i,j,k,l){var m={comments:c("sdk.XFBML.Comments"),comments_count:c("sdk.XFBML.CommentsCount"),login_button:c("sdk.XFBML.LoginButton"),name:c("sdk.XFBML.Name"),quote:c("sdk.XFBML.Quote"),save:c("sdk.XFBML.Save"),share_button:c("sdk.XFBML.ShareButton"),video:c("sdk.XFBML.Video")},n=l("plugin_tags_blacklist",[]);ES(ES("Object","keys",false,j),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:h.withParams(j[o],i[o])})});ES(ES("Object","keys",false,m),"forEach",true,function(o){if(ES(n,"indexOf",true,o)!==-1)return;k.registerTag({xmlns:"fb",localName:o.replace(/_/g,"-"),ctor:m[o]})})}),3);
    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"3377003","namespace":"FB","message":"'+e.message+'"}}');}
+(function ($, window, undef) {

  'use strict';


  function rowToObject(cell) {
    var obj = {};
    var properties = Object.getOwnPropertyNames(cell);

    // sorting is important for catching numbered properties below
    // name sure the un-numbered name is first
    properties.sort();

    properties.forEach(function (key) {
      var val = cell[key].$t;

      // don't bother with empty values
      // which also means properties will not be set for empty values!
      if (val === '') return;

      if (key.substring(0, 4) === 'gsx$') {
        var name = key.substr(4);

        // the only tricky thing is to turn the property value into an array
        // if the property name has variations that end in a number
        // Address, Address1, Address2... etc.
        var num = name.charAt(name.length - 1);
        if (/^\d+$/.test(num)) { // indexed propery
          name = name.substr(0, name.length - 1);
          var arr = obj[name];

          // if arr is not an array, but exists its the unnumbered value: ex. Address
          // replace its position with an array and push it in first
          if (!Array.isArray(arr)) {
            obj[name] = [];
            if (arr) obj[name].push(arr);
          }

          obj[name].push(val);
        } else obj[name] = val; // the basic case for a name/value pair
      }
    });

    return obj;
  }


}(jQuery, window));
/*
 * heatmap.js v2.0.5 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license
 *
 * :: 2016-09-05 01:16
 */
(function(a,b,c){if(typeof module!=="undefined"&&module.exports){module.exports=c()}else if(typeof define==="function"&&define.amd){define(c)}else{b[a]=c()}})("h337",this,function(){var a={defaultRadius:40,defaultRenderer:"canvas2d",defaultGradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{}};var b=function h(){var b=function d(a){this._coordinator={};this._data=[];this._radi=[];this._min=10;this._max=1;this._xField=a["xField"]||a.defaultXField;this._yField=a["yField"]||a.defaultYField;this._valueField=a["valueField"]||a.defaultValueField;if(a["radius"]){this._cfgRadius=a["radius"]}};var c=a.defaultRadius;b.prototype={_organiseData:function(a,b){var d=a[this._xField];var e=a[this._yField];var f=this._radi;var g=this._data;var h=this._max;var i=this._min;var j=a[this._valueField]||1;var k=a.radius||this._cfgRadius||c;if(!g[d]){g[d]=[];f[d]=[]}if(!g[d][e]){g[d][e]=j;f[d][e]=k}else{g[d][e]+=j}var l=g[d][e];if(l>h){if(!b){this._max=l}else{this.setDataMax(l)}return false}else if(l<i){if(!b){this._min=l}else{this.setDataMin(l)}return false}else{return{x:d,y:e,value:j,radius:k,min:i,max:h}}},_unOrganizeData:function(){var a=[];var b=this._data;var c=this._radi;for(var d in b){for(var e in b[d]){a.push({x:d,y:e,radius:c[d][e],value:b[d][e]})}}return{min:this._min,max:this._max,data:a}},_onExtremaChange:function(){this._coordinator.emit("extremachange",{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0){var a=arguments[0];var b=a.length;while(b--){this.addData.call(this,a[b])}}else{var c=this._organiseData(arguments[0],true);if(c){if(this._data.length===0){this._min=this._max=c.value}this._coordinator.emit("renderpartial",{min:this._min,max:this._max,data:[c]})}}return this},setData:function(a){var b=a.data;var c=b.length;this._data=[];this._radi=[];for(var d=0;d<c;d++){this._organiseData(b[d],false)}this._max=a.max;this._min=a.min||0;this._onExtremaChange();this._coordinator.emit("renderall",this._getInternalData());return this},removeData:function(){},setDataMax:function(a){this._max=a;this._onExtremaChange();this._coordinator.emit("renderall",this._getInternalData());return this},setDataMin:function(a){this._min=a;this._onExtremaChange();this._coordinator.emit("renderall",this._getInternalData());return this},setCoordinator:function(a){this._coordinator=a},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}};return b}();var c=function i(){var a=function(a){var b=a.gradient||a.defaultGradient;var c=document.createElement("canvas");var d=c.getContext("2d");c.width=256;c.height=1;var e=d.createLinearGradient(0,0,256,1);for(var f in b){e.addColorStop(f,b[f])}d.fillStyle=e;d.fillRect(0,0,256,1);return d.getImageData(0,0,256,1).data};var b=function(a,b){var c=document.createElement("canvas");var d=c.getContext("2d");var e=a;var f=a;c.width=c.height=a*2;if(b==1){d.beginPath();d.arc(e,f,a,0,2*Math.PI,false);d.fillStyle="rgba(0,0,0,1)";d.fill()}else{var g=d.createRadialGradient(e,f,a*b,e,f,a);g.addColorStop(0,"rgba(0,0,0,1)");g.addColorStop(1,"rgba(0,0,0,0)");d.fillStyle=g;d.fillRect(0,0,2*a,2*a)}return c};var c=function(a){var b=[];var c=a.min;var d=a.max;var e=a.radi;var a=a.data;var f=Object.keys(a);var g=f.length;while(g--){var h=f[g];var i=Object.keys(a[h]);var j=i.length;while(j--){var k=i[j];var l=a[h][k];var m=e[h][k];b.push({x:h,y:k,value:l,radius:m})}}return{min:c,max:d,data:b}};function d(b){var c=b.container;var d=this.shadowCanvas=document.createElement("canvas");var e=this.canvas=b.canvas||document.createElement("canvas");var f=this._renderBoundaries=[1e4,1e4,0,0];var g=getComputedStyle(b.container)||{};e.className="heatmap-canvas";this._width=e.width=d.width=b.width||+g.width.replace(/px/,"");this._height=e.height=d.height=b.height||+g.height.replace(/px/,"");this.shadowCtx=d.getContext("2d");this.ctx=e.getContext("2d");e.style.cssText=d.style.cssText="position:absolute;left:0;top:0;";c.style.position="relative";c.appendChild(e);this._palette=a(b);this._templates={};this._setStyles(b)}d.prototype={renderPartial:function(a){if(a.data.length>0){this._drawAlpha(a);this._colorize()}},renderAll:function(a){this._clear();if(a.data.length>0){this._drawAlpha(c(a));this._colorize()}},_updateGradient:function(b){this._palette=a(b)},updateConfig:function(a){if(a["gradient"]){this._updateGradient(a)}this._setStyles(a)},setDimensions:function(a,b){this._width=a;this._height=b;this.canvas.width=this.shadowCanvas.width=a;this.canvas.height=this.shadowCanvas.height=b},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height);this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(a){this._blur=a.blur==0?0:a.blur||a.defaultBlur;if(a.backgroundColor){this.canvas.style.backgroundColor=a.backgroundColor}this._width=this.canvas.width=this.shadowCanvas.width=a.width||this._width;this._height=this.canvas.height=this.shadowCanvas.height=a.height||this._height;this._opacity=(a.opacity||0)*255;this._maxOpacity=(a.maxOpacity||a.defaultMaxOpacity)*255;this._minOpacity=(a.minOpacity||a.defaultMinOpacity)*255;this._useGradientOpacity=!!a.useGradientOpacity},_drawAlpha:function(a){var c=this._min=a.min;var d=this._max=a.max;var a=a.data||[];var e=a.length;var f=1-this._blur;while(e--){var g=a[e];var h=g.x;var i=g.y;var j=g.radius;var k=Math.min(g.value,d);var l=h-j;var m=i-j;var n=this.shadowCtx;var o;if(!this._templates[j]){this._templates[j]=o=b(j,f)}else{o=this._templates[j]}var p=(k-c)/(d-c);n.globalAlpha=p<.01?.01:p;n.drawImage(o,l,m);if(l<this._renderBoundaries[0]){this._renderBoundaries[0]=l}if(m<this._renderBoundaries[1]){this._renderBoundaries[1]=m}if(l+2*j>this._renderBoundaries[2]){this._renderBoundaries[2]=l+2*j}if(m+2*j>this._renderBoundaries[3]){this._renderBoundaries[3]=m+2*j}}},_colorize:function(){var a=this._renderBoundaries[0];var b=this._renderBoundaries[1];var c=this._renderBoundaries[2]-a;var d=this._renderBoundaries[3]-b;var e=this._width;var f=this._height;var g=this._opacity;var h=this._maxOpacity;var i=this._minOpacity;var j=this._useGradientOpacity;if(a<0){a=0}if(b<0){b=0}if(a+c>e){c=e-a}if(b+d>f){d=f-b}var k=this.shadowCtx.getImageData(a,b,c,d);var l=k.data;var m=l.length;var n=this._palette;for(var o=3;o<m;o+=4){var p=l[o];var q=p*4;if(!q){continue}var r;if(g>0){r=g}else{if(p<h){if(p<i){r=i}else{r=p}}else{r=h}}l[o-3]=n[q];l[o-2]=n[q+1];l[o-1]=n[q+2];l[o]=j?n[q+3]:r}k.data=l;this.ctx.putImageData(k,a,b);this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(a){var b;var c=this.shadowCtx;var d=c.getImageData(a.x,a.y,1,1);var e=d.data[3];var f=this._max;var g=this._min;b=Math.abs(f-g)*(e/255)>>0;return b},getDataURL:function(){return this.canvas.toDataURL()}};return d}();var d=function j(){var b=false;if(a["defaultRenderer"]==="canvas2d"){b=c}return b}();var e={merge:function(){var a={};var b=arguments.length;for(var c=0;c<b;c++){var d=arguments[c];for(var e in d){a[e]=d[e]}}return a}};var f=function k(){var c=function h(){function a(){this.cStore={}}a.prototype={on:function(a,b,c){var d=this.cStore;if(!d[a]){d[a]=[]}d[a].push(function(a){return b.call(c,a)})},emit:function(a,b){var c=this.cStore;if(c[a]){var d=c[a].length;for(var e=0;e<d;e++){var f=c[a][e];f(b)}}}};return a}();var f=function(a){var b=a._renderer;var c=a._coordinator;var d=a._store;c.on("renderpartial",b.renderPartial,b);c.on("renderall",b.renderAll,b);c.on("extremachange",function(b){a._config.onExtremaChange&&a._config.onExtremaChange({min:b.min,max:b.max,gradient:a._config["gradient"]||a._config["defaultGradient"]})});d.setCoordinator(c)};function g(){var g=this._config=e.merge(a,arguments[0]||{});this._coordinator=new c;if(g["plugin"]){var h=g["plugin"];if(!a.plugins[h]){throw new Error("Plugin '"+h+"' not found. Maybe it was not registered.")}else{var i=a.plugins[h];this._renderer=new i.renderer(g);this._store=new i.store(g)}}else{this._renderer=new d(g);this._store=new b(g)}f(this)}g.prototype={addData:function(){this._store.addData.apply(this._store,arguments);return this},removeData:function(){this._store.removeData&&this._store.removeData.apply(this._store,arguments);return this},setData:function(){this._store.setData.apply(this._store,arguments);return this},setDataMax:function(){this._store.setDataMax.apply(this._store,arguments);return this},setDataMin:function(){this._store.setDataMin.apply(this._store,arguments);return this},configure:function(a){this._config=e.merge(this._config,a);this._renderer.updateConfig(this._config);this._coordinator.emit("renderall",this._store._getInternalData());return this},repaint:function(){this._coordinator.emit("renderall",this._store._getInternalData());return this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(a){if(this._store.getValueAt){return this._store.getValueAt(a)}else if(this._renderer.getValueAt){return this._renderer.getValueAt(a)}else{return null}}};return g}();var g={create:function(a){return new f(a)},register:function(b,c){a.plugins[b]=c}};return g});