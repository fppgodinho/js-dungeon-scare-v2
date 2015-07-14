"use strict";
Object.defineProperty(Object.prototype, "addGetterSetter", {
    configurable:   false,
    enumerable:     false,
    value:          function(prop, getter, setter) {
        return Object.defineProperty(this, prop, {
            get: getter,
            set: setter
        });
    }
});
