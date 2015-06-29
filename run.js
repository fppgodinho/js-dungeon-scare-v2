"use strict";
var serverController    = require("./server/controller");

var development         = new serverController();
development.setJade(__dirname + "/client/src", "jade"); // Dev version will be rendered on the fly so lets set it up
development.setIndex(__dirname + '/client/src/index.jade'); // Dev version is non-precompiled...
development.setStatic(__dirname + "/client/src");
development.set404('(404) What ya looking for?!'); // Left for last as it should only get tested if nothing else was
development.bindTo(3000);

var staging             = new serverController();
staging.setStatic(__dirname + "/client/public");
staging.set404('(404) What ya looking for?!'); // Left for last as it should only get tested if nothing else was
staging.bindTo(3001);
