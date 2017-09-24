var SubstituionMassConfusion = require("..")
var browserify = require("browserify")
var PKG_PATH = __dirname + "/bundle/package.json"
var NO_PARSE = [
	__dirname + "/bundle/node_modules/b/node_modules/c/fake_index.js"
]

describe("Browserify Substitution Mass Confusion", function() {
	it("must substitute modules", function*() {
		var b = browserify(__dirname + "/bundle", {
			noParse: NO_PARSE,
			plugin: [[SubstituionMassConfusion, {package: PKG_PATH}]]
		})

		var js = (yield b.bundle.bind(b)).toString()
		js.must.not.include("Real hello")
		js.must.include("Fake hello")
	})

	it("must substitute nested modules", function*() {
		var b = browserify(__dirname + "/bundle", {
			noParse: NO_PARSE,
			plugin: [[SubstituionMassConfusion, {package: PKG_PATH}]]
		})

		var js = (yield b.bundle.bind(b)).toString()
		js.must.not.include("Real bye")
		js.must.include("Fake bye")
	})

	describe("Browserify.prototype.bundle", function() {
		it("must substitute modules ", function*() {
			var b = browserify(__dirname + "/bundle", {noParse: NO_PARSE})
			b.plugin(SubstituionMassConfusion, {package: PKG_PATH})
			var js = (yield b.bundle.bind(b)).toString()
			js.must.not.include("Real hello")
			js.must.include("Fake hello")
		})
	})
})
