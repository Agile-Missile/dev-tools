import type { PartialDeep } from 'type-fest';
import { requireResolve } from '../src/helpers/require-resolve.js';
import { loadMiniConfig, type MiniConfigBase } from '../src/index.js';
import type { MiniOptions } from '../src/types/type-mini-options.js';

export const loadMiniOptions = async (
  projectCwd: string,
  overrideOptions: PartialDeep<MiniOptions> = {}
) => {
  const command: MiniConfigBase = {
    projectCwd,
    command: 'build',
    resolve: requireResolve,
  };

  return await loadMiniConfig(command, projectCwd, overrideOptions);
};
