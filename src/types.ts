type PackageManagerType = 'npm' | 'yarn' | 'pnpm'

export type LoaderReturnType = [startLoader: () => void, stopLoader: () => void]

export interface IPrompt {
    template: string
    path: string
    isDepsNeedInstall: boolean
    packageManager: PackageManagerType
}
