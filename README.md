# Windows 93 Module Manager

## What is mm?

The Windows 93 Module Manager, hereon referred to as `mm`, is a simple package manager for Windows 93. Unlike `pkg93`, another very awesome Windows 93 package manager, `mm` loads packages that are compiled into modules with a specified format, allowing `mm` to easily load and unload packages.

## Why use mm?

* Less boilerplate - there is no need to provide install and uninstall scripts, as `mm` handles that for you
* More self-contained - the goal of `mm` modules is to contain almost all of the package's content inside a single module
* More freedom to the user - users are free to alias `mm` modules to whatever they'd like
* Loads modules dynamically - `mm` uses SystemJS, a dynamic JavaScript module loader

## How to use?

Here's a very simple listing of `mm` commands:
```
mm help: show help screen
mm load <name> <url>: loads a module from a url
mm unload <name>: unloads a module and removes it from the system
mm reload <name>: unloads and loads a module
```

## What is the module format?

The module format is extremely simple. All you have to do is export an object called `leApp` which corresponds to the app's `le._apps` entry.

You can do that with either of the following methods, depending on your module system:
```js
export const leApp = { /* insert app here */ } // note: needs transpilation
exports.leApp = { /* insert app here */ }
```

## Want to contribute?

Please feel free to do so! All contributions are very welcome.

## Why is this README worded so oddly?

I wrote this at 6:30 AM with absolutely zero sleep.
