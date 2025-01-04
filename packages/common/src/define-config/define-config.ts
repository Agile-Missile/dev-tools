import type { PartialDeep } from 'type-fest';
import {
  type ConfigEnvBase,
  defineConfig as myDefineConfig,
  type UserConfigExport,
} from '@armit/config-loader';
import type { requireResolve } from '../helpers/require-resolve.js';
import type { MiniOptions } from '../types/type-mini-options.js';

export interface MiniConfigBase extends ConfigEnvBase {
  /**
   * The current project directory.
   */
  projectCwd: string;
  /**
   * The command of the current process.
   */
  command: 'build' | 'serve' | 'static';
  /**
   * Expose `env`.`resolve` to allow dynamic resolve `esm` node modules from `flatjs-evolve.config.ts`
   * @example
   * ```ts
   * export default defineConfig((env) => {
   *   console.log(env.resolve(import.meta.url, 'tailwindcss'));
   *   ...
   * }
   * // Note may you need to change `module` to `ESNext` at your `tsconfig.json`
   * `tsconfig.json`
   * {
   *   "module": "ESNext"
   * }
   * ```
   */
  resolve: typeof requireResolve;
}

type DefineConfigFn = (
  userConfig: UserConfigExport<PartialDeep<MiniOptions>, MiniConfigBase>
) => UserConfigExport<PartialDeep<MiniOptions>, MiniConfigBase>;

export const defineConfig: DefineConfigFn = (
  userConfig: UserConfigExport<PartialDeep<MiniOptions>, MiniConfigBase>
) => {
  return myDefineConfig(userConfig);
};
