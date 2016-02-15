/* global __moduleName */
let fetch;
let translate;
let bundle;
let styles = {};

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

  fetch = function bundler(load, opts) {
    return System.import('./sass-inject-build', { name: __moduleName })
      .then(builder => return builder.default.call(System, load, opts))
      .then(function(css){
          //i'm not thrilled here but i cant see a way yet to pass between hooks
          //since on bundle it appears to lose handle ALL the fetch in a single sitting
          return styles[load.name] = css.replace(/\n$/, '');
      });

  };

  translate = function(load) {
      load.metadata.format = 'amd';
      return new Promise(function(resolve, reject) {
        var css = styles[load.name].trim().replace('\n', '');
        var output = 'def' + 'ine(function() {\nreturn "' + css + '";\n});';
        resolve(output);
      });
  };
}

export { fetch, translate };
