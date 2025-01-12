import { existsSync, rmSync } from 'node:fs';
import { join } from 'path';
import { getDirname } from '@armit/file-utility';
import { runScript } from './run-script.js';

describe('@agilejs/cli `preview`', () => {
  const fixtureCwd = getDirname(import.meta.url);
  const program = join(fixtureCwd, 'ci-program.ts');
  const miniprogramCwd = join(fixtureCwd, 'fixtures');
  const miniprogramKey = join(
    miniprogramCwd,
    '.cache/private.wx0a60ec391e1c8dee.key'
  );
  const dist = join(miniprogramCwd, '.dist');

  beforeEach(() => {
    if (existsSync(dist)) {
      rmSync(dist, { recursive: true });
    }
  });

  it('Should output correct help information for `preview`', async () => {
    const { stdout } = await runScript(program, ['mini', 'preview', '-h']);
    expect(stdout).toStrictEqual(expect.stringContaining(`Options:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-p, --project-cwd`));
    expect(stdout).toStrictEqual(expect.stringContaining(`Globals:`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-h, --help`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-v, --version`));
    expect(stdout).toStrictEqual(expect.stringContaining(`-l, --log-level`));
  });

  it('Preview miniprogram', async () => {
    const { stdout } = await runScript(program, [
      'mini',
      'preview',
      '-p',
      miniprogramCwd,
      '--privateKey',
      miniprogramKey,
      '--miniVer',
      '1.2.2',
      '--miniDesc',
      'test',
      '--format',
      'image',
      '--output',
      dist,
      '--filename',
      'preview01.png',
    ]);
    const distFile = join(dist, 'preview01.png');
    expect(stdout).toStrictEqual(expect.stringContaining(`preview start...`));
    expect(existsSync(distFile)).toBe(true);
  });
});
