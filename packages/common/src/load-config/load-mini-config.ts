import type { PartialDeep } from 'type-fest';
import {
  mergeOptions,
  searchConfig,
  type UserConfigExport,
} from '@armit/config-loader';
import { configFileName } from '../constants.js';
import { defaultMiniOptions } from '../default-options.js';
import type { MiniConfigBase } from '../define-config/define-config.js';
import type { MiniOptions } from '../types/type-mini-options.js';
import { type ConfigLoaderOptions } from './types.js';

export const loadMiniConfig = async (
  configEnv: MiniConfigBase,
  projectCwd: string,
  overrideOptions: PartialDeep<MiniOptions> = {},
  configLoaderOptions: ConfigLoaderOptions = {
    configFile: configFileName,
    esmLoaderOptions: {
      externals: [/^@mini\/.*/],
    },
  }
): Promise<MiniOptions> => {
  const { configFile, esmLoaderOptions } = configLoaderOptions;
  const data = await searchConfig<UserConfigExport<PartialDeep<MiniOptions>>>(
    configFile,
    projectCwd,
    {
      esm: {
        ...esmLoaderOptions,
        projectCwd,
      },
    }
  );

  let localData = {};
  if (typeof data?.config === 'function') {
    localData = await data?.config(configEnv);
  } else {
    localData = data?.config || {};
  }
  // Merge user local config with default configure options.
  const localConfigOptions = mergeOptions<MiniOptions>(
    defaultMiniOptions,
    localData
  );

  const mergedConfigOptions = mergeOptions<MiniOptions>(
    localConfigOptions,
    overrideOptions
  );

  const finalData = mergeOptions<MiniOptions>(mergedConfigOptions, {
    projectCwd,
  });

  return finalData;
};
