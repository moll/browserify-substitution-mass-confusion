var Fs = require("fs")
var Path = require("path")
var resolve = require("resolve").sync
var EMPTY = Object.prototype

module.exports = function(browserify, opts) {
	if (opts.package == null) throw new Error("Please set --package")
	var pkgPath = opts.package
	var pkg = readJson(pkgPath)
	var dir = Path.dirname(pkgPath)

	var subs = reduce(pkg.browser || EMPTY, function(subs, to, from) {
		if (isPath(from)) return subs
		if (isPath(to)) subs[from] = resolve(to, {basedir: dir})
		else subs[from] = to
		return subs
	}, {})

	Object.assign(browserify._mdeps.options.modules, subs)
}

function reduce(obj, fn, sum) {
	for (var key in obj) sum = fn(sum, obj[key], key)
	return sum
}

function isPath(path) { return path[0] === "." || path[0] === "/" }
function readJson(path) { return JSON.parse(Fs.readFileSync(path)) }
