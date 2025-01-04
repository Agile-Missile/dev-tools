import { existsSync } from 'fs';
import { join } from 'path';
import terminalImage from 'terminal-image';
import { getDirname } from '@armit/file-utility';
import { createMiniProject, preview } from '../src/index.js';
import { loadMiniOptions } from './load-mini-options.js';

describe('test preview', () => {
  const projectCwd = getDirname(import.meta.url, 'fixtures/native-demo');

  it('test preview', async () => {
    const miniOptions = await loadMiniOptions(projectCwd, {});
    const project = await createMiniProject(projectCwd, miniOptions);
    expect(project).toBeDefined();

    const qrcodeOutputDest = join(projectCwd, '.cache/preview.png');

    const previewResult = await preview(project, {
      version: '1.0.0',
      qrcodeFormat: 'image',
      qrcodeOutputDest: qrcodeOutputDest,
    });

    const fileExists = existsSync(qrcodeOutputDest);

    console.log(
      await terminalImage.file(qrcodeOutputDest, {
        width: '50%',
        height: '50%',
        preserveAspectRatio: true,
      })
    );

    expect(previewResult).toBeDefined();
    expect(fileExists).toBeTruthy();
  });
});
