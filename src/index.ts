#!/usr/bin/env node

import { prompt } from 'enquirer'
import { readdirSync } from 'fs'
import { join } from 'path'

const templatesPath = join(__dirname, '..', 'templates')
const templates = readdirSync(templatesPath)

prompt([
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
    },
]).then(console.log) // TODO: copy template to specified path.
