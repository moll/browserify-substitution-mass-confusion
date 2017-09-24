Browserify Substitution Mass Confusion
======================================
[![NPM version][npm-badge]](https://www.npmjs.com/package/browserify-substitution-mass-confusion)

Browserify Substitution Mass Confusion is a plugin for [Browserify][browserify] that **allows substituting modules** through the `package.json`'s' `browser` field in **nested modules**. By default Browserify only substitutes modules listed in the `browser` field in the same module the `package.json` file lives in. This expands it to work on all dependencies.

[npm-badge]: https://img.shields.io/npm/v/browserify-substitution-mass-confusion.svg
[browserify]: https://github.com/browserify/browserify


Installing
----------
```sh
npm install browserify-substitution-mass-confusion
```

Browserify Substitution Mass Confusion follows [semantic versioning](http://semver.org), so feel free to depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


Using
-----
Enable the plugin and pass it a path to your `package.json` via the `package` option that contains the `browser` field you'd like to apply recursively.

```sh
browserify --plugin [ browserify-substitution-mass-confusion --package package.json ] --entry foo.js
```

Ideally I would've liked it to automatically find your `package.json` file, but I don't yet know how to implement that.

For example, to ensure React gets included in its minified form:
```json
{
  "private": true,

  "dependencies": {
    "react": "",
    "react-dom": ""
  },

  "browser": {
    "react": "react/dist/react.min.js",
    "react-dom": "react-dom/dist/react-dom.min.js",
  }
}
```

Without Browserify Substitution Mass Confusion it'd work in your own files, the moment you `require` a dependency that in turn does `require("react")`, you'd get two Reacts — one minified and one not.


License
-------
Browserify Substitution Mass Confusion is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find Browserify Substitution Mass Confusion needs improving, please don't hesitate to type to me now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/browserify-substitution-mass-confusion/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
