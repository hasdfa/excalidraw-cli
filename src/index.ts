import { Command, flags } from '@oclif/command'
import { computeUserInputs } from './compute'

class ExcalidrawCli extends Command {
    static description = 'Parses Excalidraw JSON schemas into images (PNG, JPEG, WebP)'

    static flags = {
        version: flags.version({char: 'v'}),
        help: flags.help({char: 'h'}),
        quiet: flags.boolean({ char: 'q', description: 'disable console outputs' }),
        theme: flags.string({
            char: 't',
            description: 'theme for the output image',
            options: ['light', 'dark'],
            default: 'light'
        }),
        format: flags.string({
            char: 'f',
            description: 'output image format',
            options: ['png', 'jpeg', 'webp'],
            default: 'png'
        })
    }

    static args = [
        {
            name: 'input',
            description: 'Excalidraw file path / directory path',
            required: false,
            default: '{cwd}'
        },
        {
            name: 'output',
            description: 'Output image file path / directory path',
            required: false,
            default: '{cwd}'
        }
    ]

    async run() {
        computeUserInputs(this.parse(ExcalidrawCli))
    }
}

export = ExcalidrawCli
