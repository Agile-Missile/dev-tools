export type ConfigLoaderOptions = {
  configFile: string;
  esmLoaderOptions: {
    externals: Array<RegExp | string>;
    projectCwd?: string;
  };
};
