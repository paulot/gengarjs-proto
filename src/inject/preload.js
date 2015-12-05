// Code that will be preloaded in the webpage

let instance = null;

class BrowserUtils {
  constructor() {
    if (instance) return instance;
    this.currentFrame = '';
    this.parentFrame = '';
    this.window = window;
    this.document = document;
  }

  _toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  getFrames() {
    return this._toArray(this.document.getElementsByTagName('iframe')).map((el) => {
      return el.name
    });
  }

  switchToFrame(frame) {
  }

}

export let bla = new BrowserUtils();
