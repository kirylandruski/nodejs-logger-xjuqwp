"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoizeOnce = void 0;
function memoizeOnce(fn) {
    let invoked = false;
    let result = null;
    return function () {
        if (!invoked) {
            result = fn();
            invoked = true;
        }
        return result;
    };
}
exports.memoizeOnce = memoizeOnce;
