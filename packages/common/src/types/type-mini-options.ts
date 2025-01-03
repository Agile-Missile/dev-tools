import type { MiniProgramOptions } from './type-miniprogram.js';

export type MiniOptions = {
  projectCwd: string;
  /**
   * The personalized configurations of `miniprogram`
   */
  miniprogram: MiniProgramOptions;
};
