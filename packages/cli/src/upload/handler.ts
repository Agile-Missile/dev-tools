import { resolve } from 'path';
import type { PartialDeep } from 'type-fest';
import { AbstractHandler, type CommandArgv } from '@agilejs/commander';
import {
  createMiniProject,
  loadMiniConfig,
  type MiniConfigBase,
  type MiniOptions,
  requireResolve,
  upload,
} from '@mini/common';

export type UploadCommandArgs = CommandArgv<{
  /**
   * Specified the projects root directory,it's optional
   * it empty array, we should build project with root: process.cwd()
   * @alias (-p)
   * @default `process.cwd()``
   */
  projectCwd: string;

  /**
   * The private key that will be used to upload
   * @alias (-k)
   */
  privateKey: string;

  /**
   * The version that will be used to upload
   * @alias (-mv)
   * @default `1.0.0`
   */
  miniVer: string;

  /**
   * The description that will be used to upload
   * @alias (-md)
   * @default `''`
   */
  miniDesc: string;
}>;

export class UploadCommand extends AbstractHandler<UploadCommandArgs> {
  private getProjectCwd() {
    return resolve(process.cwd(), this.args.projectCwd);
  }

  async handle() {
    this.logger.info('upload start...');
    const {
      privateKey: privateKeyPath,
      miniVer = '1.0.0',
      miniDesc = '',
    } = this.args;
    const projectCwd = this.getProjectCwd();

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

      const res = await upload(project, {
        version: miniVer,
        desc: miniDesc,
      });
      this.logger.info(JSON.stringify(res));
    } catch (error: any) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
