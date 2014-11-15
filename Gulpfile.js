var gulp = require('gulp');
var _ = require('lodash');
var nodemon = require('gulp-nodemon');

try {
  var vars = require('./config/_local');
} catch(e) {
  vars = {};
}

gulp.task('set', function(){
  _.forEach(vars, function(val, name) {
    process.env[name] = val;
  });
});

gulp.task('serve', function(){
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['node_modules/**/*.**']
  });
});

gulp.task('default', ['set', 'serve']);
