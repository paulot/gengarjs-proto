import app from 'app';
import CrashReporter from 'crash-reporter';
import { Cli } from './cli';
import { Gengar } from './gengar';

let gengar = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('gpu-process-crashed', () => {
  console.log('gpu-process-crashed');
})

app.on('ready', () => {
  CrashReporter.start();
  gengar = new Gengar(app);

  let cli = new Cli();
  cli.parse();

  if (cli.script) {
    gengar.runJavaScript(cli.script);
  }
});

