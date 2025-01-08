import { AbstractHandler, type CommandArgv } from '@agilejs/commander';

export type MiniCommandArgs = CommandArgv<{
  /**
   * Specified the projects root directory, it's optional
   * @alias (-p)
   * @default process.cwd()
   */
  projectCwd: string;
}>;

export class MiniCommand extends AbstractHandler<MiniCommandArgs> {
  async handle() {
    return Promise.resolve();
  }
}
