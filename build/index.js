#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./classes/Logger"));
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const _utils_1 = require("./utils");
const enquirer_1 = require("enquirer");
const process_1 = require("process");
const path_1 = require("path");
const templatesPath = (0, path_1.join)(__dirname, '..', 'templates');
const templates = (0, fs_1.readdirSync)(templatesPath);
(0, enquirer_1.prompt)([
    {
        name: 'template',
        type: 'select',
        choices: templates,
        message: 'Select a template',
    },
    {
        name: 'path',
        type: 'input',
        message: 'Type a folder name',
        required: true,
    },
    {
        name: 'isDepsNeedInstall',
        type: 'confirm',
        message: 'Install dependencies?',
    },
    {
        name: 'packageManager',
        type: 'select',
        choices: ['npm', 'yarn', 'pnpm'],
        message: 'Select the package manager',
        skip() {
            if ('state' in this) {
                const state = this.state;
                if ('answers' in state)
                    return !state.answers.isDepsNeedInstall;
            }
            return true;
        },
    },
])
    .then(async (answer) => {
    const path = (0, path_1.join)((0, process_1.cwd)(), answer.path);
    (0, fs_1.cpSync)((0, path_1.join)(templatesPath, answer.template), path, { recursive: true });
    if (answer.isDepsNeedInstall) {
        const [startLoader, stopLoader] = (0, _utils_1.useLoader)();
        (0, child_process_1.exec)(`${answer.packageManager} install`, { cwd: path })
            .on('spawn', startLoader)
            .on('exit', () => {
            stopLoader();
            Logger_1.default.info('Dependencies have been successfully installed');
        });
    }
})
    .catch(() => Logger_1.default.error('The template generation has not been completed'));
