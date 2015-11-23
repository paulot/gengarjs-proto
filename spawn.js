// Spawns the process for the app
import Proc from 'child_process';
import Electron from 'electron-prebuilt';
import path from 'path';

let bootstrapPath = path.join(__dirname, 'src', 'bootstrap.js');
let child = Proc.spawn(Electron, [bootstrapPath].concat(process.argv), {stdio: 'inherit'});

child.on('error', (err) => {
  throw new Error(err);
})

child.on('exit', (code) => {
  process.exit(code);
});
