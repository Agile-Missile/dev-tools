import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'path';
import type { PartialDeep } from 'type-fest';
import { AbstractHandler, type CommandArgv } from '@agilejs/commander';
import {
  createMiniProject,
  loadMiniConfig,
  type MiniConfigBase,
  type MiniOptions,
  preview,
  requireResolve,
} from '@agilejs/common';

export type PreviewCommandArgs = CommandArgv<{
  /**
   * Specified the projects root directory,it's optional
   * it empty array, we should build project with root: process.cwd()
   * @alias (-p)
   * @default `process.cwd()``
   */
  projectCwd: string;

  /**
   * The private key that will be used to upload
   */
  privateKey: string;

  /**
   * The version that will be used to upload
   * @default `1.0.0`
   */
  miniVer: string;

  /**
   * The description that will be used to upload
   * @default `''`
   */
  miniDesc: string;

  /**
   * The format of the qrcode
   * @default `image`
   */
  format?: 'base64' | 'image' | 'terminal';

  /**
   * The output of the qrcode
   * @default `.dist`
   */
  output?: string;

  /**
   * The filename of the qrcode
   * @default `preview.png`
   */
  filename?: string;
}>;

export class PreviewCommand extends AbstractHandler<PreviewCommandArgs> {
  private getProjectCwd() {
    return resolve(process.cwd(), this.args.projectCwd);
  }

  async handle() {
    this.logger.info('preview start...');
    const projectCwd = this.getProjectCwd();
    const {
      privateKey: privateKeyPath,
      miniVer = '1.0.0',
      miniDesc = '',
      format = 'image',
      output = join(projectCwd, '.dist'),
      filename = 'preview.png',
    } = this.args;

    const command: MiniConfigBase = {
      projectCwd,
      command: 'build',
      resolve: requireResolve,
    };

    try {
      const overrideOptions: PartialDeep<MiniOptions> = {
        miniprogram: {
          privateKeyPath,
        },
      };

      const miniOptions = await loadMiniConfig(
        command,
        projectCwd,
        overrideOptions
      );

      const project = await createMiniProject(projectCwd, miniOptions);

      if (!existsSync(output)) {
        mkdirSync(output, { recursive: true });
      }

      const qrcodeOutputDest = join(output, filename);

      const res = await preview(project, {
        version: miniVer,
        desc: miniDesc,
        qrcodeOutputDest: qrcodeOutputDest,
        qrcodeFormat: format,
      });
      this.logger.info(JSON.stringify(res));
      return;
    } catch (error: any) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
