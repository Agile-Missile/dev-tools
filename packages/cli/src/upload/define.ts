import { createCommand } from '@agilejs/commander';
import { type CheckCommandArgs, UploadCommand } from './handler.js';

export const uploadCmd = createCommand<CheckCommandArgs>(
  'upload',
  {
    command: 'upload',
    describe: `Automatically upload miniprogram assets`,
    builder(args) {
      return args
        .example(
          `$0 mini upload -k="/.cache/private.xxxxxxxx.key" --mv="1.0.0" --md="This is a test"`,
          'Upload matched `fast-glob` files to remote ftp server'
        )
        .option('key', {
          alias: 'k',
          type: 'string',
          default: '',
          describe: `The private key that will be used to upload`,
        })
        .option('miniVer', {
          type: 'string',
          default: '1.0.0',
          describe: `The version of the miniprogram uploaded`,
        })
        .option('miniDesc', {
          type: 'string',
          default: '',
          describe: `The description of the miniprogram uploaded`,
        });
    },
  },
  UploadCommand
);
