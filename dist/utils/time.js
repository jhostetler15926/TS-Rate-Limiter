"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = now;
exports.isWithinWindow = isWithinWindow;
function now() {
    return Date.now();
}
function isWithinWindow(timestamp, windowMs) {
    return now() - timestamp < windowMs;
}
