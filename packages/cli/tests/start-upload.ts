import { join } from 'path';
import { getDirname } from '@armit/file-utility';
import { runScript } from './run-script.js';

const fixtureCwd = getDirname(import.meta.url);
const program = join(fixtureCwd, 'ci-program.ts');
const miniprogramCwd = join(fixtureCwd, 'fixtures');
const miniprogramKey = join(
  miniprogramCwd,
  '.cache/private.wx0a60ec391e1c8dee.key'
);

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
