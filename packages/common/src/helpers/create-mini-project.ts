import ci, { type Project } from 'miniprogram-ci';
import { join } from 'path';
import { loadPrivateKey } from '../load-config/load-private-key.js';
import type { MiniOptions } from '../types/type-mini-options.js';

export const createMiniProject = async (
  projectCwd: string,
  miniOptions: MiniOptions
): Promise<Project> => {
  if (!miniOptions) {
    throw new Error('Provide mini build config');
  }

  const lastPrivateKey = await loadPrivateKey(projectCwd, miniOptions);

  const {
    appid,
    type = 'miniProgram',
    projectPath = 'miniprogram',
    ...rest
  } = miniOptions.miniprogram;

  return new ci.Project({
    appid,
    type,
    projectPath: join(projectCwd, projectPath),
    privateKey: lastPrivateKey,
    ...rest,
  });
};
