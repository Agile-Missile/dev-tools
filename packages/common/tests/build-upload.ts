import { getDirname } from '@armit/file-utility';
import { createMiniProject, upload } from '../src/index.js';
import { loadMiniOptions } from './load-mini-options.js';
const projectCwd = getDirname(import.meta.url, 'fixtures/native-demo');

const miniOptions = await loadMiniOptions(projectCwd, {});

const project = await createMiniProject(projectCwd, miniOptions);

const uploadResult = await upload(project, {
  version: '1.0.0',
});

console.log('uploadResult', uploadResult);
