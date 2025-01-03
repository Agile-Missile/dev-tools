import ci from 'miniprogram-ci';
import type {
  TPluginInfo,
  TSubPackageInfo,
} from 'miniprogram-ci/dist/@types/ci/upload.js';
import type { MiniProgramCore } from 'miniprogram-ci/dist/@types/types/core.js';
import ora from 'ora';

export type UploadResult = {
  subPackageInfo?: TSubPackageInfo;
  pluginInfo?: TPluginInfo;
  devPluginId?: string;
};

export const packNpm = async (
  project: MiniProgramCore.IPreCompileProject,
  uploadOptions: Omit<MiniProgramCore.IPackNpmOptions, 'project'>
): Promise<MiniProgramCore.IWarnItem[]> => {
  const spinner = ora(`Miniprogram Pack Npm start \n`).start();
  return new Promise((resolve, reject) => {
    ci.packNpm(project, {
      ...uploadOptions,
    })
      .then((res) => {
        spinner.succeed('Miniprogram Pack Npm success');
        resolve(res);
      })
      .catch((err) => {
        spinner.fail('Miniprogram Pack Npm failed');
        reject(err);
      })
      .finally(() => {
        spinner.stop();
      });
  });
};
