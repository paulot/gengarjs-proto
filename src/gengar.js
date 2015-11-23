import { Cli } from './cli';
import BrowserWindow from 'browser-window';
import vm from 'vm';
import Path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import { Phantom } from './phantom';

let instance = null;

export class Gengar {
  constructor(app) {
    if (instance) return instance;
    else instance = this;

    this.windows = [];
    this.app = app;

    this.sandbox = {
      console: console,
      require: this._require,
      phantom: new Phantom(this),
      setTimeout: setTimeout
    }
  }

  _require(module) {
    switch(module) {
      case 'gengar':
        return this;
      case 'webpage':
        return require('./webpage');
      default:
        return require(module);
    }
  }

  runJavaScript(scriptPath) {
    return vm.runInNewContext(fs.readFileSync(scriptPath), this.sandbox, scriptPath);
  }

  registerWindow(window) {
    this.windows.push(window);
  }

  exit(code) {
    return Promise.map(this.windows, (window) => {
      return window.close();
    }).then(() => {
      process.exit(code || 0);
    });
  }
}
