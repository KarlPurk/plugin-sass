# plugin-sass

[![Build Status](https://travis-ci.org/KevCJones/plugin-sass.svg?branch=master)](https://travis-ci.org/KevCJones/plugin-sass)
[![Dependency Status](https://david-dm.org/KevCJones/plugin-sass.svg)](https://david-dm.org/KevCJones/plugin-sass)

[SystemJS](https://github.com/systemjs/systemjs)
[SASS](http://sass-lang.com) loader plugin. Can easily be installed with
[jspm](http://jspm.io) package manager.

```sh
$ jspm install scss=github:KevCJones/plugin-sass
```

This version of the plugin will not use the css to modify your page, it will
be up to you how to use it. Therefore injecting or using the css output is done
inside your resolved promise.

```js
System.import('./style.scss!').then(function(css){
  //inject css in head?
  //pass css into angular2 @component styles tag [up to you]
});
```

or synchronously

```js
import styles from './style.scss!';
//styles will contain your css ready again for what you need
```

You can also use the [older syntax](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax)
, known as the indented syntax (or sometimes just "_Sass_")

```js
System.import('./style.sass!scss').then(function(css){
  //inject your css anywhere you need
});
```

## Compile Targets

### Style

By default, `plugin-sass` does NOT inject compiled css into a `<style>` tag in the `<head>`. It instead returns your css as a string.

### String for angular 2

`plugin-sass` was a modification of the original plugin specifically because we needed a string that was for use in the @component decorator. It was different
enough to feel like a new plugin.

```js
import style from './style.scss!';

@Component({
    template: '...',
    styles: [style]
})
```

## Importing from jspm

You can import scss files from jspm packages *from within scss files* using the `jspm:` prefix. For example, if you have jspm installed `twbs/bootstrap-sass`:

```scss
@import 'jspm:bootstrap-sass/assets/stylesheets/bootstrap';
```

## Testing the plugin

```sh
$ npm install -g gulp
...
$ npm install
...
$ jspm install
```

Now you can test runtime compilation

```sh
$ gulp test:runtime
```

bundling

```sh
$ gulp test:bundle
```

or static bundling

```sh
$ gulp test:bundleStatic
```

After that open [http://localhost:3000](http://localhost:3000) in the browser
of your choice.
