"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    level = LogLevel.INFO;
    setLevel(level) {
        this.level = level;
    }
    debug(message, ...args) {
        if (this.level <= LogLevel.DEBUG) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    }
    info(message, ...args) {
        if (this.level <= LogLevel.INFO) {
            console.log(`[INFO] ${message}`, ...args);
        }
    }
    warn(message, ...args) {
        if (this.level <= LogLevel.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }
    error(message, ...args) {
        if (this.level <= LogLevel.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map