'use babel'
// Handles command line argument parsing
import Commander from 'commander'

export class Cli {
  constructor() {
    this.program = Commander;

    this.program
      .arguments('<script>', 'The script to run in GengarJS.')
      .option('-d, --debug', 'Turn debugging on')
      .action(function (script) {
        this.script = script;
      }.bind(this));
  }

  parse() {
    return this.program.parse(process.argv);
  }

  get debug() {
    return this.program.debug;
  }
}
