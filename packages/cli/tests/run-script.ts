import { getDirname } from '@armit/file-utility';
import { runTsScript } from '@hyperse/exec-program';

export const runScript = async (program: string, args: readonly string[]) => {
  return runTsScript(program, args, {
    env: {
      TS_NODE_PATHS_PROJECT: getDirname(
        import.meta.url,
        '../tsconfig.dev.json'
      ),
    },
  });
};
