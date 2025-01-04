import { AbstractHandler, type CommandArgv } from '@agilejs/commander';

export type CheckCommandArgs = CommandArgv<{
  /**
   * Specified the projects root directory,it's optional
   * it empty array, we should build project with root: process.cwd()
   * @alias (-p)
   * @default `process.cwd()``
   */
  projectCwd: string;
}>;

export class UploadCommand extends AbstractHandler<CheckCommandArgs> {
  async handle() {
    return Promise.resolve();
  }
}
