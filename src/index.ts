#!/usr/bin/env node

import { readdirSync } from 'fs'
import { join } from 'path'

const templatesPath = join(__dirname, '..', 'templates')
const templates = readdirSync(templatesPath)

console.log(templates)
