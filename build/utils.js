"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoader = void 0;
const Logger_1 = __importDefault(require("./classes/Logger"));
const readline_1 = require("readline");
const process_1 = require("process");
function useLoader() {
    const states = ['|', '/', '—', '\\'];
    let position = 0;
    let loader = null;
    const startLoader = () => {
        loader = setInterval(() => {
            Logger_1.default.info(`${states[position]} Install dependencies...`);
            setTimeout(() => {
                (0, readline_1.moveCursor)(process_1.stdout, 0, -1);
                (0, readline_1.clearLine)(process_1.stdout, 1);
                position = position === states.length - 1 ? 0 : position + 1;
            }, 150);
        }, 250);
    };
    const stopLoader = () => clearInterval(loader);
    return [startLoader, stopLoader];
}
exports.useLoader = useLoader;
