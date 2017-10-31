## Babel plugin to auto-polyfill For Better or Worse

This plugin uses the [fbow](https://github.com/subhaze/fbow) library to auto-polyfill code based on usage. It looks for expressions that match any available expression within fbow and, if matched, adds an import for the fbow polyfill at the top of the entry file.
