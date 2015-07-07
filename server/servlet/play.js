"use strict";
var fs = require('fs');

function ServletPlay() {
    var _instance       = {};

    _instance.render    = function (req, res) {
        fs.readFile( __dirname + '/play.xml', 'utf8', function (err, data) {
            res.header('Content-Type','text/xml').send(data);
        });
    };

    return _instance;
}

module.exports              = new ServletPlay();