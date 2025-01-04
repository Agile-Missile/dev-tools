import { type CliMain, type CliOptions, createCli } from '@agilejs/commander';
import { getDirname } from '@armit/file-utility';
import { readPackageData } from '@armit/package';
import { uploadCmd } from '../upload/define.js';

export async function bootstrap(
  options: Partial<CliOptions> = {}
): Promise<CliMain> {
  // __dirname
  const curDirName = getDirname(import.meta.url);

  // Read cli package json data.
  const packageJson = readPackageData({
    cwd: curDirName,
  });

  if (packageJson) {
    // Check if newer cli version here
    // FIXME: Disable update notifier for temporary, cause of the npm mirror registry is not stable.
    // Check if newer cli version at `flat info` command.
    // await updateNotifier({
    //   pkg: {
    //     name: packageJson?.name || '',
    //     version: packageJson?.version || '',
    //   },
    //   shouldNotifyInNpmScript: true,
    //   registry: 'https://registry.npmmirror.com',
    // });
  }

  // Register built-in commands.
  const armitCli = createCli({
    context: '@mini',
    packageJson,
    ...options,
  }).register(uploadCmd);

  return armitCli;
}
