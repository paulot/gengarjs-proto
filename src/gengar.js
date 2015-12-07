import { Cli } from './cli';
import BrowserWindow from 'browser-window';
import vm from 'vm';
import Path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import { Phantom } from './phantom';
import { ipcMain } from 'electron';

let instance = null;

export class Gengar {
  constructor(app) {
    if (instance) return instance;
    else instance = this;

    this.windows = [];
    this.app = app;
    this.document = null;
    this.window = null;

    ipcMain.on('update-document', (event, document) => {
      this.document = document;
      event.returnValue = document;
    });

    ipcMain.on('update-window', (event, window) => {
      this.window = window;
      event.returnValue = true;
    });

    let self = this;

    this.sandbox = {
      console: console,
      get document() { return self.document },
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
