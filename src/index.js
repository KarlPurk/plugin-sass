/* global __moduleName */
let fetch;
let translate;
let styles;

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


export { fetch, translate };
