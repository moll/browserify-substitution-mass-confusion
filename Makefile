NODE = node
NODE_OPTS = --use-strict
BROWSERIFY = ./node_modules/.bin/browserify
BROWSERIFY_OPTS =
BROWSERIFY_OPTS += --no-detect-globals
BROWSERIFY_OPTS += --plugin \[ . --package ./test/bundle/package.json \]
TEST_OPTS = test/**/*_test.js

love:
	@echo "Feel like makin' love."

test/bundle/public/index.js: test/bundle/public
	@echo "Compiling $@…"
	@$(BROWSERIFY) $(BROWSERIFY_OPTS) --entry ./test/bundle --outfile "$@"

test/bundle/public:; mkdir -p "$@"

test:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R dot $(TEST_OPTS)

spec:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R spec $(TEST_OPTS)

autotest:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R dot --watch $(TEST_OPTS)

autospec:
	@$(NODE) $(NODE_OPTS) ./node_modules/.bin/_mocha -R spec --watch $(TEST_OPTS)

pack:
	@file=$$(npm pack); echo "$$file"; tar tf "$$file"

publish:
	npm publish

tag:
	git tag "v$$($(NODE) -e 'console.log(require("./package").version)')"

clean:
	rm -f *.tgz
	npm prune --production

.PHONY: love
.PHONY: test/bundle/public/index.js
.PHONY: test spec autotest autospec
.PHONY: pack publish tag
.PHONY: clean
