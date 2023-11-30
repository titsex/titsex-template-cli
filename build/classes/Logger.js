"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const COLORS = {
    NONE: '\x1b[0',
    CYAN: '\x1b[36',
    RED: '\x1b[31',
    YELLOW: '\x1b[33',
};
const FONT_WEIGHT = {
    NONE: 'm',
    BOLD: ';1m',
};
class Logger {
    static errorLogPrefix = `[${COLORS.RED + FONT_WEIGHT.BOLD}ERROR${COLORS.NONE + FONT_WEIGHT.NONE}]`;
    static infoLogPrefix = `[${COLORS.CYAN + FONT_WEIGHT.BOLD}INFO${COLORS.NONE + FONT_WEIGHT.NONE}]`;
    static time() {
        return `${COLORS.YELLOW + FONT_WEIGHT.NONE}${new Date().toLocaleTimeString()}${COLORS.NONE}${FONT_WEIGHT.BOLD}`;
    }
    static info(...data) {
        console.log(`${Logger.infoLogPrefix} ${Logger.time()}`, ...data);
    }
    static error(...data) {
        console.log(`${Logger.errorLogPrefix} ${Logger.time()}`, ...data);
    }
}
exports.default = Logger;
