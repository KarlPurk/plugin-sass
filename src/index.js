/* global __moduleName */
let fetch;
let translate;
let bundle;
let styles;

if (typeof window !== 'undefined') {
  fetch = load => {
    return System.import('./sass-inject', { name: __moduleName })
      .then(inject => inject.default(load))
      .then(css => styles = css);
  };
  translate = function(load) {
      load.metadata.format = 'amd';
      return new Promise(function(resolve, reject) {
        var css = styles.trim().replace('\n', '');
        var output = 'def' + 'ine(function() {\nreturn "' + css + '";\n});';
        resolve(output);
      });
  };

} else {
  // setting format = 'defined' means we're managing our own output
  translate = load => {
    load.metadata.format = 'defined';
  };
  bundle = function bundler(loads, opts) {
    return System.import('./sass-builder', { name: __moduleName })
      .then(builder => builder.default.call(System, loads, opts));
  };
}

export { fetch, translate, bundle };
