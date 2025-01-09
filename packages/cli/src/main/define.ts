import { createCommand, createSubCommands } from '@agilejs/commander';
import { terminalColor } from '@agilejs/terminal';
import { previewCmd } from '../preview/define.js';
import { uploadCmd } from '../upload/define.js';
import { MiniCommand, type MiniCommandArgs } from './handler.js';

export const miniCommand = createCommand<MiniCommandArgs>(
  'mini',
  {
    command: 'mini',
    describe: 'The normallized mini pipeline',
    builder(args) {
      const program = args
        .demandCommand(
          1,
          `${terminalColor(['black', 'red'])('ERR!')} ${terminalColor([
            'red',
            'magenta',
          ])(
            ' A sub-command is required. Pass -h to see all available commands and options.\n'
          )}`
        )
        .option('project-cwd', {
          alias: 'p',
          type: 'string',
          // we must have default value for this.
          default: process.cwd(),
          describe: `Specified the project root directory, it's optional`,
        });
      return createSubCommands(program, uploadCmd, previewCmd);
    },
  },
  MiniCommand
);
