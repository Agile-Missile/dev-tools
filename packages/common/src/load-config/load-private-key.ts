import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { MiniOptions } from '../types/type-mini-options.js';

export const loadPrivateKey = async (
  projectCwd: string,
  miniOptions: MiniOptions
): Promise<string> => {
  const { privateKey, privateKeyPath } = miniOptions.miniprogram;

  if (privateKey) {
    return privateKey;
  }

  if (privateKeyPath) {
    const privateKey = readFileSync(
      resolve(projectCwd, privateKeyPath),
      'utf-8'
    );
    return privateKey;
  }

  throw new Error('Private key is not found');
};
