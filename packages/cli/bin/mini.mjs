#!/usr/bin/env node
import { terminalColor } from '@agilejs/terminal';
import { bootstrap } from '../index.js';

bootstrap()
  .then((cli) => {
    cli.parse(process.argv.slice(2));
  })
  .catch((err) => {
    console.log(`${terminalColor(['red'])('@mini/cli')} `, err);
  });
