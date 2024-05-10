import Logger from '@class/Logger'

import { clearLine, moveCursor } from 'node:readline'
import type { LoaderReturnType } from '@types'
import { stdout } from 'node:process'

export function useLoader(): LoaderReturnType {
	const states = ['|', '/', '—', '\\']

	let position = 0
	let loader: null | NodeJS.Timeout = null

	const startLoader = () => {
		loader = setInterval(() => {
			Logger.info(`${states[position]} Install dependencies...`)

			setTimeout(() => {
				moveCursor(stdout, 0, -1)
				clearLine(stdout, 1)

				position = position === states.length - 1 ? 0 : position + 1
			}, 150)
		}, 250)
	}
	const stopLoader = () => clearInterval(loader as NodeJS.Timeout)

	return [startLoader, stopLoader]
}
