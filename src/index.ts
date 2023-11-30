#!/usr/bin/env node
import Logger from '@class/Logger'

import { readdirSync, cpSync } from 'fs'
import { exec } from 'child_process'
import { useLoader } from '@utils'
import { prompt } from 'enquirer'
import { IPrompt } from '@types'
import { cwd } from 'process'
import { join } from 'path'

const templatesPath = join(__dirname, '..', 'templates')
const templates = readdirSync(templatesPath)

prompt<IPrompt>([
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
                const state = this.state as unknown as Record<string, unknown>
                if ('answers' in state) return !(state.answers as IPrompt).isDepsNeedInstall
            }

            return true
        },
    },
])
    .then(async (answer) => {
        const path = join(cwd(), answer.path)

        cpSync(join(templatesPath, answer.template), path, { recursive: true })

        if (answer.isDepsNeedInstall) {
            const [startLoader, stopLoader] = useLoader()

            exec(`${answer.packageManager} install`, { cwd: path })
                .on('spawn', startLoader)
                .on('exit', () => {
                    stopLoader()
                    Logger.info('Dependencies have been successfully installed')
                })
        }
    })
    .catch(() => Logger.error('The template generation has not been completed'))
