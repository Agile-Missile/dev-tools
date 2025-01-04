import { getDirname } from '@armit/file-utility';
import { requireResolve } from '../src/helpers/require-resolve.js';
import { loadMiniConfig, type MiniConfigBase } from '../src/index.js';

describe('test load mini config', () => {
  const projectCwd = getDirname(import.meta.url, 'fixtures/load-config');

  it('test load mini config', async () => {
    const command: MiniConfigBase = {
      projectCwd,
      command: 'build',
      resolve: requireResolve,
    };

    const miniOptions = await loadMiniConfig(command, projectCwd, {});

    expect(miniOptions).toBeDefined();
    expect(miniOptions.miniprogram.appid).toBe('wx0a60ec391e1c8dee');
    expect(miniOptions.miniprogram.type).toBe('miniProgram');
    expect(miniOptions.miniprogram.privateKey).toBe(
      'place-your-private-key-here'
    );
    expect(miniOptions.miniprogram.projectPath).toBe('./');
  });
});
