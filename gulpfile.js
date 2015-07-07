// ---------------------------------------------------------------------------------------------------------------------
// { region Dependencies
require('coffee-script/register');
var gulp        = require('gulp');
var inject      = require('gulp-inject');
var concat      = require('gulp-concat');
var filter      = require('gulp-filter');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var minifyHTML  = require('gulp-minify-html');
var ts          = require('gulp-typescript');
var coffee      = require('gulp-coffee');
var rename      = require("gulp-rename");
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');
var jade        = require('gulp-jade');
var less        = require('gulp-less');
// } endregion
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// { region Config
var sources3rdParty = {
    'jquery':       {dev: true, prod: true,     streams: ['./client/src/3rdparty/jquery/2.1.4.js']},
    'bootstrap':    {dev: true, prod: true,     streams: ['./client/src/3rdparty/bootstrap/js/bootstrap.js',    './client/src/3rdparty/bootstrap/css/**/*.css']},
    'less':         {dev: true, prod: false,    streams: ['./client/src/3rdparty/typescript/engine.js',         './client/src/3rdparty/less/compiler.js']},
    'typescript':   {dev: true, prod: false,    streams: ['./client/src/3rdparty/typescript/engine.js',         './client/src/3rdparty/typescript/compiler.js']},
    'coffeescript': {dev: true, prod: false,    streams: ['./client/src/3rdparty/coffeescript/compiler.js']},
    'easeljs':      {dev: true, prod: true,     streams: ['./client/src/3rdparty/easeljs/0.8.1.js']}
};

var sourcesAppModules = {};
injectModule(sourcesAppModules, "main");

// } endregion
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// { region Dev
gulp.task('default', ['dev']);

gulp.task('all', function(finish){
    runSequence('dev', 'prod', finish);
});

gulp.task('dev', function(finish){
    runSequence('dev-create-temp', 'dev-css', 'dev-js', 'dev-destroy-temp', finish);
});

gulp.task('dev-create-temp', function() {
    return gulp.src('./temp', {read: false})
        .pipe(clean());
});

gulp.task('dev-css', function() {
    var streams = gulp.src(
        get3RDPartySources(true, false, ["css", "less"])
        .concat(getAppMduleSources(true, false, ["css", "less"]))
    );
    //

    return gulp.src('./client/src/app/main/template/index.jade')
        .pipe(inject(streams, {
            starttag: '// inject:css',
            endtag: '// endinject',
            ignorePath: "/client/src/",
            transform: function (filepath) {
                var type = (filepath.substr(filepath.lastIndexOf(".")).toLowerCase() == ".less")?'stylesheet/less':'stylesheet';
                return 'link(rel="' + type + '" type="text/css" href="' + filepath + '")';
            }
        }))
        .pipe(gulp.dest('./temp'));
});

gulp.task('dev-js', function() {
    var streams = gulp.src (
        get3RDPartySources(false, true, ["js", "ts"])
        .concat(getAppMduleSources(true, false, ["js", "ts", "coffee"]))
        .concat(get3RDPartySources(true, false, ["js", "ts"], ['less', 'typescript', 'coffeescript']))
    );

    //
    return gulp.src('./temp/index.jade')
        .pipe(inject(streams, {
            starttag: '// inject:js',
            endtag: '// endinject',
            ignorePath: "/client/src/",
            transform: function (filepath) {
                var ext     = filepath.substr(filepath.lastIndexOf(".") + 1).toLowerCase();
                switch (ext) {
                    case 'ts':      type = "type='text/typescript'";   break;
                    case 'coffee':  type = "type='text/coffeescript'"; break;
                    default:        type = "";                  break;
                }

                return 'script( ' + type + ' src="' + filepath + '")';
            }
        }))
        .pipe(gulp.dest('./client/src'));
});

gulp.task('dev-destroy-temp', function() {
    return gulp.src('./temp', {read: false})
        .pipe(clean());
});
// } endregion
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// { region Prod
gulp.task('prod', function(finish) {
    runSequence(
        'prod-create-temp',
        'prod-jquery',
        'prod-bootstrap',
        'prod-easeljs',
        'prod-app',
        'prod-inject-index',
        'prod-destroy-temp',
    finish);
});

gulp.task('prod-create-temp', function() {
    return gulp.src('./temp', {read: false})
        .pipe(clean());
});

gulp.task('prod-jquery', function(finish){
    runSequence(
        'prod-jquery-js',
        finish);
});

gulp.task('prod-jquery-js', function() {
    return gulp.src(get3RDPartySources(false, true, ["js"], ["jquery"]))
        .pipe(uglify())
        .pipe(gulp.dest('./client/public/lib/jquery/'));
});

gulp.task('prod-bootstrap', function(finish){
    runSequence(
        'prod-bootstrap-js',
        'prod-bootstrap-css',
        finish);
});

gulp.task('prod-bootstrap-js', function(end) {
    return gulp.src(get3RDPartySources(false, true, ["js"], ["bootstrap"]))
        .pipe(uglify())
        .pipe(gulp.dest('./client/public/lib/bootstrap/'));
});

gulp.task('prod-bootstrap-css', function(end) {
    return gulp.src(get3RDPartySources(false, true, ["css"], ["bootstrap"]))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest('./client/public/lib/bootstrap/'));
});

gulp.task('prod-easeljs', function(finish){
    runSequence(
        'prod-easeljs-js',
        finish);
});

gulp.task('prod-easeljs-js', function() {
    return gulp.src(get3RDPartySources(false, true, ["js"], ["easeljs"]))
        .pipe(uglify())
        .pipe(gulp.dest('./client/public/lib/easeljs/'));
});

gulp.task('prod-app', function(finish){
    runSequence(
        'prod-app-ts',
        'prod-app-coffee',
        'prod-app-js',
        'prod-app-concat-scripts',
        'prod-app-less',
        'prod-app-css',
        'prod-app-concat-styles',
        'prod-app-html',
        'prod-app-media',
        'prod-app-jade',
        finish);
});

gulp.task('prod-app-ts', function() {
    return gulp.src(getAppMduleSources(false, true, ["ts"]), {base: "./client/src"})
        .pipe(ts())
        .pipe(rename({
            extname: ".ts"
        }))
        .pipe(gulp.dest('./temp/'));
});

gulp.task('prod-app-coffee', function() {
    return gulp.src(getAppMduleSources(false, true, ["coffee"]), {base: "./client/src"})
        .pipe(coffee({
            bare: true
        }))
        .pipe(rename({
            extname: ".coffee"
        }))
        .pipe(gulp.dest('./temp/'));
});

gulp.task('prod-app-js', function() {
    return gulp.src(getAppMduleSources(false, true, ["js"]), {base: "./client/src"})
        .pipe(gulp.dest('./temp/'));
});

gulp.task('prod-app-concat-scripts', function() {
    var streams = getAppMduleSources(false, true, ["js", "ts", "coffee"]);
    for (var i in streams) streams[i]  = "./temp/" + streams[i].split("./client/src/").join("");

    return gulp.src(streams)
        .pipe(concat('script.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./client/public/lib/app/'));
});

gulp.task('prod-app-less', function() {
    return gulp.src(getAppMduleSources(false, true, ["less"]), {base: "./client/src"})
        .pipe(less())
        .pipe(rename({
            extname: ".less"
        }))
        .pipe(gulp.dest('./temp/'));
});

gulp.task('prod-app-css', function() {
    return gulp.src(getAppMduleSources(false, true, ["css"]), {base: "./client/src"})
        .pipe(filter('**/*.css'))
        .pipe(gulp.dest('./temp/'));
});

gulp.task('prod-app-concat-styles', function() {
    var streams = getAppMduleSources(false, true, ["css", "less"]);
    for (var i in streams) streams[i]  = "./temp/" + streams[i].split("./client/src/").join("");

    return gulp.src(streams)
        .pipe(concat('style.css'))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest('./client/public/lib/app/'));
});

gulp.task('prod-app-jade', function() {
    return gulp.src(getAppMduleSources(false, true, ["jade"]), {base: "./client/src"})
        .pipe(jade({
            pretty:         true,
        }))
        .pipe(minifyHTML({
            conditionals:   true,
            spare:          true
        }))
        .pipe(rename({
            extname: ".jade"
        }))
        .pipe(gulp.dest('./client/public/'));
});

gulp.task('prod-app-html', function() {
    return gulp.src(getAppMduleSources(false, true, ["html"]), {base: "./client/src"})
        .pipe(minifyHTML({
            conditionals:   true,
            spare:          true
        }))
        .pipe(gulp.dest('./client/public/'));
});

gulp.task('prod-app-media', function() {
    return gulp.src(getAppMduleSources(false, true, ["jpg", "jpeg", "gif", "png"]), {base: "./client/src"})
        .pipe(gulp.dest('./client/public/'));
});

gulp.task('prod-inject-index', function() {
    var stream = gulp.src([
        "./client/public/lib/jquery/**/*.*",
        "./client/public/lib/bootstrap/**/*.*",
        "./client/public/lib/easeljs/**/*.*",
        "./client/public/lib/app/**/*.*"
    ]);

    return gulp.src('./client/src/app/main/template/index.jade')
        .pipe(inject(stream, {
            starttag: '// inject:css',
            endtag: '// endinject',
            ignorePath: "/client/public/",
            transform: function (filepath) {
                var ext     =  filepath.substr(filepath.lastIndexOf(".")+1).toLowerCase();
                if (ext == "css") return 'link(rel="stylesheet" type="text/css" href="' + filepath + '")';

            }
        }))
        .pipe(inject(stream, {
            starttag: '// inject:js',
            endtag: '// endinject',
            ignorePath: "/client/public/",
            transform: function (filepath) {
                var ext     =  filepath.substr(filepath.lastIndexOf(".")+1).toLowerCase();
                if (ext == "js") return 'script( src="' + filepath + '")';
            }
        }))
        .pipe(jade({
            pretty:         true,
        }))
        .pipe(minifyHTML({
            conditionals:   true,
            spare:          true
        }))
        .pipe(gulp.dest('./client/public'));
});

gulp.task('prod-destroy-temp', function() {
    return gulp.src('./temp', {read: false})
        .pipe(clean());
});
// } endregion
// ---------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------
// { region Helpers
function injectModule(modules, name) {
    modules[name] = {
        dev:        true,
        prod:       true,
        streams:    [
            './client/src/app/' + name + '/script/**/*.js',
            './client/src/app/' + name + '/script/**/*.ts',
            './client/src/app/' + name + '/script/**/*.coffee',
            './client/src/app/' + name + '/bootstrap.js',
            './client/src/app/' + name + '/bootstrap.ts',
            './client/src/app/' + name + '/bootstrap.coffee',
            './client/src/app/' + name + '/**/*.css',
            './client/src/app/' + name + '/**/*.less',
            './client/src/app/' + name + '/template/**/*.html',
            './client/src/app/' + name + '/template/**/*.jade',
            './client/src/app/' + name + '/media/**/*.jpg',
            './client/src/app/' + name + '/media/**/*.jpeg',
            './client/src/app/' + name + '/media/**/*.gif',
            './client/src/app/' + name + '/media/**/*.png'
        ]
    };
}

function get3RDPartySources(dev, prod, types, modules) { return getSources(sources3rdParty, dev, prod, types, modules); }

function getAppMduleSources(dev, prod, types, modules) { return getSources(sourcesAppModules, dev, prod, types, modules); }

function getSources(collection, dev, prod, types, modules) {
    var sources = [];
    for (var id in collection) {
        var source  =  collection[id];
        if (!modules || source == modules || (modules && modules.indexOf(id) >= 0))
            if ((dev && source.dev) || (prod && source.prod)) sources = sources.concat(source.streams);
    }
    //
    var i       = 0;
    while (i < sources.length) {
        var stream  = sources[i];
        var type    = stream.substr(stream.lastIndexOf(".")+1).toLowerCase();
        if (types && type != types && types.indexOf(type) < 0) sources.splice(i, 1);
        else i++;
    }

    return sources;
}
// } endregion
// ---------------------------------------------------------------------------------------------------------------------
