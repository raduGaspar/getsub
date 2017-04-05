#!/usr/bin/env node
const lib = require('../lib/index.js');
const args = process.argv.slice(2);

let file;
let opts = {};
const knownArgs = {
  '-s': (val) => {
    file = val;
    Object.assign(opts, { search: true });
  },
  '-v': val => file = val,
  '-l': val => Object.assign(opts, { language: val }),
  '-h': () => {
    const help = `
      [-s file] Displays available subtitle for given video file
                (will ignore all other arguments)
      [-v file] Downloads subtitle for given video file
      [-l lang] Sets subtitle download language (defaults to 'en')

      [-h]      Display supported commands
    `;
    console.log(help);
  },
};

for (let i = 0; i < args.length; i++) {
  const method = knownArgs[args[i].trim()];
  if (method) {
    const nextParam = args[i+1];
    method(knownArgs[nextParam] ? null : nextParam);
  }
}

lib.getSubtitle(file, opts);
