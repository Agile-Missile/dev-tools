import type { MiniOptions } from './types/type-mini-options.js';

export const defaultMiniOptions: MiniOptions = {
  projectCwd: process.cwd(),
  miniprogram: {
    appid: 'place-your-appid-here',
    type: 'miniProgram',
  },
};
