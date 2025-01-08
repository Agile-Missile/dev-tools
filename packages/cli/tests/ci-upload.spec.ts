import { join } from 'path';
import { getDirname } from '@armit/file-utility';
import { runScript } from './run-script.js';

describe('@mini/cli `upload`', () => {
  const fixtureCwd = getDirname(import.meta.url);
  const program = join(fixtureCwd, 'ci-program.ts');
  const miniprogramCwd = join(fixtureCwd, 'fixtures');
  const miniprogramKey = join(
    miniprogramCwd,
    '.cache/private.wx0a60ec391e1c8dee.key'
  );

  it('Should output correct help information for `upload`', async () => {
    const { stdout } = await runScript(program, ['mini', 'upload', '-h']);
    expect(stdout).toStrictEqual(expect.stringContaining(`Options:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-p, --project-cwd`));
    expect(stdout).toStrictEqual(expect.stringContaining(`Globals:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-h, --help`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-v, --version`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-l, --log-level`));
  });

  it('Upload miniprogram', async () => {
    const { stdout } = await runScript(program, [
      'mini',
      'upload',
      '-p',
      miniprogramCwd,
      '-k',
      miniprogramKey,
      '--miniVer',
      '1.2.2',
      '--miniDesc',
      'test',
    ]);

    console.log(stdout);

    expect(stdout).toStrictEqual(expect.stringContaining(`upload start...`));
  });
});
