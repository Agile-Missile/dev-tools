import { getDirname } from '@armit/file-utility';
import { createMiniProject, upload } from '../src/index.js';
import { loadMiniOptions } from './load-mini-options.js';

describe('test upload', () => {
  const projectCwd = getDirname(import.meta.url, 'fixtures/native-demo');

  it('test upload', async () => {
    const miniOptions = await loadMiniOptions(projectCwd, {});
    const project = await createMiniProject(projectCwd, miniOptions);
    expect(project).toBeDefined();

    const uploadResult = await upload(project, {
      version: '1.0.0',
    });

    expect(uploadResult).toBeDefined();
    expect(uploadResult.subPackageInfo).toBeDefined();
    expect(uploadResult.pluginInfo).toBeDefined();
    expect(uploadResult.devPluginId).toBeUndefined();
  });
});
