#! /usr/bin/env node

var thenga = require("../thengascript.js")
var yargs = require("yargs");
var fs = require('fs');

function run(file) {
  fs.readFile(file, 'utf8', function(err, code) {
    thenga.compile(code);
  });
}

var argv = yargs.usage("$0 command filename")
  .command("run [file]", "execute the script passed", yargs => {
    yargs
      .positional('file', {
        describe: 'the file that is entry point to your program',
        default: 'index.js'
      });
  },
  argv => {
      run(argv.file);
    })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
