import { getDirname } from '@armit/file-utility';
import { packNpm } from '../src/handler/pack-npm.js';
import { createMiniProject } from '../src/index.js';
import { loadMiniOptions } from './load-mini-options.js';

describe('test pack npm', () => {
  const projectCwd = getDirname(import.meta.url, 'fixtures/npm-package');

  it('test pack npm', async () => {
    const miniOptions = await loadMiniOptions(projectCwd, {});
    const project = await createMiniProject(projectCwd, miniOptions);
    expect(project).toBeDefined();

    const uploadResult = await packNpm(project, {
      reporter: (result) => {
        console.log('reporter', result);
      },
    });

    expect(uploadResult).toBeDefined();
  });
});
