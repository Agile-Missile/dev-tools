import ci from 'miniprogram-ci';
import type { IInnerUploadOptions } from 'miniprogram-ci/dist/@types/ci/upload.js';
import type { IProject } from 'miniprogram-ci/dist/@types/types/index.js';
import ora from 'ora';
import { formatProgressMsg } from '../helpers/format-progress-msg.js';
import type { MiniCiOptions } from '../types/type-ci-options.js';

export const preview = async (
  project: IProject,
  uploadOptions: Omit<
    IInnerUploadOptions,
    'onProgressUpdate' | 'project' | 'test'
  >,
  cliOptions: MiniCiOptions = {}
) => {
  const { exitProcess = true } = cliOptions;

  const spinner = ora(`Miniprogram Preview start \n`).start();
  return new Promise((resolve, reject) => {
    ci.preview({
      test: true,
      project,
      ...uploadOptions,
      onProgressUpdate: (task) => {
        spinner.text = formatProgressMsg(task);
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        spinner.stop();
        if (exitProcess) {
          process.exit(0);
        }
      });
  });
};
