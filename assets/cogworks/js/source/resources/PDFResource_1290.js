define([], function() {
    return [function(require, module, exports) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor)
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor
            }
        }();
        var _get = function get(_x2, _x3, _x4) {
            var _again = true;
            _function: while (_again) {
                var object = _x2,
                    property = _x3,
                    receiver = _x4;
                _again = false;
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined
                    } else {
                        _x2 = parent;
                        _x3 = property;
                        _x4 = receiver;
                        _again = true;
                        desc = parent = undefined;
                        continue _function
                    }
                } else if ("value" in desc) {
                    return desc.value
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined
                    }
                    return getter.call(receiver)
                }
            }
        };

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
        }
        var createHash = require("../helpers/createHash");
        var Resource = require("./Resource");
        var PDFResource = function(_Resource) {
            _inherits(PDFResource, _Resource);
            _createClass(PDFResource, null, [{
                key: "isNameValid",
                value: function isNameValid(name) {
                    return Resource.isNameValid(name) && /\.(?:pdf)$/i.test(name)
                }
            }]);

            function PDFResource(name) {
                var value = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];
                _classCallCheck(this, PDFResource);
                _get(Object.getPrototypeOf(PDFResource.prototype), "constructor", this).call(this, name);
                this.name = name;
                this.value = value;
            }
            _createClass(PDFResource, [{
                key: "getHash",
                value: function getHash(context) {
                    return createHash(this.value)
                }
            }, {
                key: "serialize",
                value: function serialize() {
                    var obj = _get(Object.getPrototypeOf(PDFResource.prototype), "serialize", this).call(this);
                    obj.name = this.name;
                    obj.value = this.value;
                    return obj
                }
            }, {
                key: "unserialize",
                value: function unserialize(obj) {
                    _get(Object.getPrototypeOf(PDFResource.prototype), "unserialize", this).call(this, obj);
                    this.name = obj.name;
                    this.value = obj.value;
                }
            }]);
            return PDFResource
        }(Resource);
        module.exports = PDFResource
    }, {
        "../helpers/createHash": 553,
        "./Resource": 1256
    }]
});