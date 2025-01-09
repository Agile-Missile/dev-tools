import ci from 'miniprogram-ci';
import type {
  IInnerUploadOptions,
  TPluginInfo,
  TSubPackageInfo,
} from 'miniprogram-ci/dist/@types/ci/upload.js';
import type { IProject } from 'miniprogram-ci/dist/@types/types/core.js';
import ora from 'ora';
import { formatProgressMsg } from '../helpers/format-progress-msg.js';
import type { MiniCiOptions } from '../types/type-ci-options.js';

export type UploadResult = {
  subPackageInfo?: TSubPackageInfo;
  pluginInfo?: TPluginInfo;
  devPluginId?: string;
};

export const upload = async (
  project: IProject,
  uploadOptions: Omit<IInnerUploadOptions, 'onProgressUpdate' | 'project'>,
  cliOptions: MiniCiOptions = {}
): Promise<UploadResult> => {
  const { exitProcess = true } = cliOptions;

  const spinner = ora(`Miniprogram Upload start \n`).start();
  return new Promise((resolve, reject) => {
    ci.upload({
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
