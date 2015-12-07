import { ipcRenderer } from 'electron';

let instance = null;

export default class BrowserUtils {
  constructor() {
    if (instance) return instance;
    this.currentFrame = '';
    this.window = window;
    this.document = document;
    this._updateVars();
  }

  _updateVars() {
    console.log(this.document);
    console.log(this.document == ipcRenderer.sendSync('update-document', this.document));
    ipcRenderer.sendSync('update-window', this.window);
  }

  _toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  _getFrames() {
    return this._toArray(this.document.getElementsByTagName('iframe'));
  }

  get framesCount() {
    return this._getFrames().length;
  }

  get frameUrl() {
    return this.window.location.href;
  }

  get frameTitle() {
    return this.document.title;
  }

  get framePlainText() {
    // TODO: Implement this
    return;
  }

  get frameName() {
    return this.currentFrame;
  }

  getFrames() {
    return this._getFrames().map((el) => {
      return el.name
    });
  }

  evaluateJavaScript(src) {
    let document = this.document;
    let window = this.window;
    return eval(src);
  }

  switchToFrame(frameName) {
    const index = this.getFrames().indexOf(frameName);
    if (index > -1) {
      let frame = this._getFrames()[index];
      this.currentFrame = frameName;
      this.document = frame.contentDocument;
      this.window = frame.contentWindow;
    }
  }

  swtichToParent() {
    this.document = this.window.parent.document;
    this.window = this.window.parent.window;
  }
}
