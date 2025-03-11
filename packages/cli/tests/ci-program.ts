import { createCli } from '@agilejs/commander';
import { getDirname } from '@armit/file-utility';
import { readPackageData } from '@armit/package';
import { miniCommand } from '../src/main/define.js';

// __dirname
const curDirName = getDirname(import.meta.url);

// Read cli package json data.
const packageJson = readPackageData({
  cwd: curDirName,
});

void createCli({
  context: '@mini',
  packageJson,
})
  .register(miniCommand)
  .parse(process.argv.slice(2));
