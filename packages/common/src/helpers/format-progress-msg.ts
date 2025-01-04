import chalk, { type ChalkInstance } from 'chalk';
import type { MiniProgramCI } from 'miniprogram-ci/dist/@types/types/ci.js';
import { isString } from '@dimjs/lang';

const ColorMap: Record<MiniProgramCI.ITaskStatus['status'], ChalkInstance> = {
  doing: chalk.yellow,
  done: chalk.green,
  fail: chalk.red,
  warn: chalk.yellow,
};

export const formatProgressMsg = (task: MiniProgramCI.ITaskStatus | string) => {
  const temp: string[] = [];
  if (isString(task)) {
    temp.push(task);
  } else {
    temp.push(`[status]:`);
    temp.push(ColorMap[task.status](task.status));
    temp.push(`[message]:`);
    temp.push(task.message);
  }
  return temp.join(' ');
};
