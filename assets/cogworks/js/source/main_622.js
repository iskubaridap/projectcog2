define([], function() {
    return [function(require, module, exports) {
        (function(global) {
            "use strict";
            require("babelify/polyfill");
            var Application = require("./base/Application.js");
            var $ = global.$ = require("jquery");
            var app = global.app = new Application;
            var doc = global.doc = $(document);
            var win = global.win = $(window);
            var bod = global.bod = $(document.body);
            var html = global.html = doc.find("html");
            $(function() {
                app.init()
            })
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./base/Application.js": 9,
        "babelify/polyfill": 642,
        "jquery": 1063
    }]
});