import { createCommand, createSubCommands } from '@agilejs/commander';
import { terminalColor } from '@agilejs/terminal';
import { type CheckCommandArgs, UploadCommand } from './handler.js';

export const uploadCmd = createCommand<CheckCommandArgs>(
  'upload',
  {
    command: 'upload',
    describe: 'Upload mini-app to the server.',
    builder(args: any) {
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
        .option('projectCwd', {
          alias: 'p',
          type: 'string',
          default: process.cwd(),
          describe: `Specified the project root directory, it's optional`,
        });
      return createSubCommands(program);
    },
  },
  UploadCommand
);
