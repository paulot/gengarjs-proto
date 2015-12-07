// Code that will be preloaded in the webpage
import BrowserUtils from './browserUtils';
import ipcRenderer from 'electron';

let browserUtils = new BrowserUtils();


window.browserUtils = browserUtils;
