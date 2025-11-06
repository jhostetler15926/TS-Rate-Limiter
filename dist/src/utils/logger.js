"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = logInfo;
exports.logError = logError;
function logInfo(message) {
    console.log(`ℹ️  ${message}`);
}
function logError(message) {
    console.error(`❌ ${message}`);
}
