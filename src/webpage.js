import BrowserWindow from 'browser-window';
import Promise from 'bluebird';
import Debug from 'debug';
import { Gengar } from './gengar';

let gengar = new Gengar();

export function create(options) {
  let page = new Webpage(options);
  gengar.registerWindow(page);
  return page;
}

export class Webpage {
  constructor(options) {
    options = options || { width: 800, height: 600 };
    this.window = new BrowserWindow(options);
    this.window.setTitle('GengarJS');
    this.log = Debug('webpage');

    this.window.on('closed', () => {
      this.window = null;
    }.bind(this));


    let logger = (eventName) => {
      this.window.on(eventName, () => { this.log(eventName) }.bind(this))
    }.bind(this);

    logger('unresponsive');
    logger('responsive');
    logger('close');

    let weblogger = (eventName) => {
      this.window.webContents.on(eventName, () => { this.log(eventName) }.bind(this))
    }.bind(this);

    weblogger('did-finish-load');
    weblogger('dom-ready');
    weblogger('did-fail-load');
  }
  
  /**
   * Opens a webpage
   *
   * open(url)
   * open(url, callback)
   * open(url, httpConf)
   * open(url, httpConf, callback)
   * open(url, operation, data)
   * open(url, operation, data, callback)
   * open(url, operation, data, headers, callback)
   */
  open(url, arg1, arg2, arg3, arg4) {
    switch(arguments.length) {
      case 1:
        return this.openUrl(url);
      case 2:
        if (typeof arg1 == 'function')
          return this.openUrl(url, null, null, arg1)
        else
          return this.openUrl(url, arg1);
      case 3:
        if (typeof arg2 == 'function')
          return this.openUrl(url, arg1, null, arg2);
        else
          return this.openUrl(url, { operation: arg1, data: arg2 });
      case 4:
        return this.openUrl(url, { operation: arg1, data: arg2 }, null, arg3);
      case 5:
        return this.openUrl(url, { operation: arg1, data: arg2, headers: arg3 }, null, arg4);
    }
    throw new Error('open: Arguments are missing or incomplete. Please refer to the docs.');
  }

  /** 
   * Opens a url.
   * @param {String} url: The url of the page to load.
   * @param {Object} httpConf: Http configuration to load the page with,
   *                 operation = http method (currently only 'get' is supported)
   *                 data = placeholder for post data
   *                 headers = custom headers to use
   *                 httpReferrer = referrer
   *                 userAgent = user agent of the browser
   * @param {Object} settings: Additional settings (not currently supported)
   * @param {Function} callback: Callback to trigger once the page is loaded.
   */
  openUrl(url, httpConf, settings, callback) {
    // TODO: Implement settings
    // TODO: Implement proper callback handling (see examples/titlePage.js)
    // TODO: Implement post request support
    if (httpConf && httpConf.operation == 'post') {
      throw new Error('POST operations are currently not supported, see: https://github.com/atom/electron/issues/2816');
    }

    if (typeof httpConf == 'string') httpConf = { operation: httpConf };

    let options = {};
    if (httpConf && httpConf.headers) options.extraHeaders = httpConf.headers;
    if (httpConf && httpConf.userAgent) options.userAgent = httpConf.userAgent;
    if (httpConf && httpConf.httpReferrer) options.extraHeaders = httpConf.httpReferrer;

    if (callback) {
      let status = 'success';
      let setFail = () => { status = 'fail' };

      this.window.webContents.on('did-fail-load', setFail);
      this.window.webContents.once('did-finish-load', () => {
        this.window.webContents.removeListener('did-fail-load', setFail);
        callback(status);
      }.bind(this));
    }

    this.window.loadURL(url, options);
  }

  goBack() {
    return new Promise((resolve) => {
      this.window.webContents.goBack();
      this.window.webContents.once('did-finish-load', resolve);
    });
  }

  goForward() {
    return new Promise((resolve) => {
      this.window.webContents.goForward();
      this.window.webContents.once('did-finish-load', resolve);
    });
  }

  reload() {
    return new Promise((resolve) => {
      this.window.webContents.reload();
      this.window.webContents.once('did-finish-load', resolve);
    });
  }

  stop() {
    this.window.webContents.stop();
  };
    

  injectCSS(css) {
    return this.window.webContents.insertCSS(css);
  }


  release() {
    console.log('(gengar) webpage.release() is deprecated, please use webpage.close()');
    return this.close();
  }

  get url() {
    return this.window.webContents.getURL();
  }

  get title() {
    return this.window.webContents.getTitle();
  }

  get canGoBack() {
    return this.window.webContents.canGoBack();
  }

  get canGoForward() {
    return this.window.webContents.canGoForward();
  }

  set onClosing(func) {
    this.window.on('close', func);
  }

  close() {
    return new Promise((resolve, reject) => {
      this.window.once('closed', () => {
        resolve();
      });
      // TODO: figure out why app is crashing without setTimeout
      setTimeout(() => {
        this.window.close();
      }.bind(this), 1000);
    }.bind(this));
  }
}
