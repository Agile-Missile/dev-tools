export type MiniProgramOptions = {
  /**
   * APP ID
   */
  appid: string;
  /**
   * The path of the private key
   */
  privateKey?: string;
  /**
   * The path of the private key
   */
  privateKeyPath?: string;
  /**
   * MP name: `wxmp-demo`
   */
  projectname?: string;
  /**
   * The path of the project
   *
   * @default: `./miniprogram`
   */
  projectPath?: string;
  /**
   * The type of the project
   *
   * @default: `miniProgram`
   */
  type?: 'miniProgram' | 'miniGame' | 'miniProgramPlugin' | 'miniGamePlugin';
  /**
   * The ignores of the project
   */
  ignores?: string[];
  /**
   * The target platform of the project
   */
  targetPlatform?: string;
  /**
   * The compile defines of the project
   */
  compileDefines?: {
    [key: string]: string;
  };
};
