"use strict";
Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
};
