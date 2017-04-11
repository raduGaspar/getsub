#!/usr/bin/env node
const lib = require('../lib/index.js');
const args = process.argv.slice(2);

let files;
let opts = {};

// supported arguments and their respective methods
const knownArgs = {
  '-s': (val) => {
    files = val;
    Object.assign(opts, { search: true });
  },
  '-v': val => files = val,
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

// parse arguments and provided values
const argsMap = {};
let current;
args.forEach((val) => {
  if (knownArgs[val]) {
    current = val;
    argsMap[current] = [];
  }
  if (current !== val) {
    argsMap[current].push(val);
  }
});

// call knownArgs methods with provided arguments
Object.keys(argsMap).forEach((key) => {
  knownArgs[key](argsMap[key]);
});

if (files) {
  files.forEach(file => lib.getSubtitle(file, opts));
}
