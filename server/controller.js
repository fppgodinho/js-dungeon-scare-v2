"use strict";
var express             = require('express');
var servletPlay         = require("./servlet/play");


function ServerController() {
    var _instance           = {};
    _instance.toString      = function() { return "[server.controller]"; };

    var _router             = express.Router();
    _router.use(function(req, res, next) { console.log(new Date(Date.now()).toTimeString() + " " + req.ip + ":" + req.originalUrl); next(); });
    _router.all('/servlet/:controller', function(req, res, next) {
        var controller = req.params.controller;
        switch(controller) {
            case "play": servletPlay.render(req, res); break;
            default:
                res.status(404);
                res.send(_instance.get404());
                break;
        }
    });
    _instance.getRouter     = function() { return _router; };

    var _app                = express();
    _instance.getApp        = function() { return _app; };
    _app.locals.pretty      = true;
    _app.use(_router);
    _instance.setJade       = function(path, ext) {
        ext                 = ext || "jade";
        _instance.getJade   = function(){ return path; };
        _app.set('views', path);
        _app.locals.basedir = path ;
        _app.engine('.' + ext, require('jade').__express);
    };

    _instance.setStatic     = function(path) {
        _instance.getStatic = function(){ return path; };
        _router.use('/', express.static(path));
    };

    _instance.set404        = function(message) {
        _instance.get404    = function(){ return message; };
        _router.use(function(req, res, next) {
            res.status(404);
            res.send(message);
        });
    };

    _instance.setIndex      = function(path) {
        _instance.getIndex  = function(){ return path; };
        _router.all('/', function(req, res, next) {
            res.render(path);
        });
    };

    _instance.bindTo        = function(port) {
        _instance.getPort   = function(){ return port; };

        var _server         = _app.listen(port, function() {
            var host        = _server.address().address;
            var port        = _server.address().port;
            console.log('Listening at http://%s:%s', host, port);
        });
        _instance.getServer = function() { return _server; };
    };

    return _instance;
}

module.exports              = ServerController;