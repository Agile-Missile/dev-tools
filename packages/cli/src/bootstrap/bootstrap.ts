import { type CliMain, type CliOptions, createCli } from '@agilejs/commander';
import { getDirname } from '@armit/file-utility';
import { readPackageData } from '@armit/package';
import { miniCommand } from '../main/define.js';

export async function bootstrap(
  options: Partial<CliOptions> = {}
): Promise<CliMain> {
  // __dirname
  const curDirName = getDirname(import.meta.url);

  // Read cli package json data.
  const packageJson = readPackageData({
    cwd: curDirName,
  });

  // Register built-in commands.
  const miniCli = createCli({
    context: '@mini',
    packageJson,
    ...options,
  }).register(miniCommand);

  return miniCli;
}
