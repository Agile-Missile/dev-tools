import { createCommand } from '@agilejs/commander';
import { PreviewCommand, type PreviewCommandArgs } from './handler.js';

export const previewCmd = createCommand<PreviewCommandArgs>(
  'preview',
  {
    command: 'preview',
    describe: `Automatically preview miniprogram assets`,
    builder(args) {
      return args
        .example(
          `$0 mini preview -k="/.cache/private.xxxxxxxx.key" --mv="1.0.0" --md="This is a test"`,
          'Preview matched `fast-glob` files to remote ftp server'
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
        })
        .option('format', {
          type: 'string',
          default: 'image',
          describe: `The format of the qrcode. support: image, base64, terminal`,
        })
        .option('output', {
          type: 'string',
          default: '.dist',
          describe: `The output of the qrcode`,
        })
        .option('filename', {
          type: 'string',
          default: 'preview.png',
          describe: `The filename of the qrcode`,
        });
    },
  },
  PreviewCommand
);
