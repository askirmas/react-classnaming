"use strict";
exports.__esModule = true;
var $keys = Object.keys, $defineProperty = Object.defineProperty, classNameKey = "className";
exports["default"] = classNaming;
function classNaming() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _classNaming(args.pop(), args.pop());
}
function _classNaming(classNames, className) {
    var _a;
    var keys = $keys(classNames), length = keys.length;
    for (var i = length; i--;) {
        var key = keys[i], value = classNames[key];
        if (typeof value === "string")
            keys[i] = value;
    }
    var classString = "" + (!className
        ? ""
        : className + " ") + keys
        .join(" "), $return = (_a = {},
        _a[classNameKey] = classString,
        _a);
    $defineProperty($return, "toString", {
        value: function () { return classString; }
    });
    return $return;
}
