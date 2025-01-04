import { join } from 'node:path';
import { getDirname } from '@armit/file-utility';
import { createMiniProject } from '../src/index.js';
import { loadMiniOptions } from './load-mini-options.js';

describe('test create mini project', () => {
  const projectCwd = getDirname(import.meta.url, 'fixtures/native-demo');

  it('test create mini project', async () => {
    const miniOptions = await loadMiniOptions(projectCwd, {});
    const project = await createMiniProject(projectCwd, miniOptions);
    expect(project).toBeDefined();
    expect(project['_appid']).toBe('wx0a60ec391e1c8dee');
    expect(project['_type']).toBe('miniProgram');
    expect(project['_projectPath']).toBe(join(projectCwd, './'));
    expect(project['_privateKey']).toBe('place-your-private-key-here');
  });
});
