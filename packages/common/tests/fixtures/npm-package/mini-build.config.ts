import path, { join } from "path";
import { defineConfig } from "../../../src/index.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

export default defineConfig({
    miniprogram:{
        appid: 'wx0a60ec391e1c8dee',
        privateKeyPath:join(path.dirname(__filename),'.cache/private.wx0a60ec391e1c8dee.key'),
        projectPath:'./',
        type:'miniGame'
    }
})