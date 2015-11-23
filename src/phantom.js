import app from 'app';

let instance = null;

export class Phantom {
  constructor(gengar) {
    if (instance) return instance;
    else instance = this;

    this.gengar = gengar;
  }

  exit(code) {
    this.gengar.exit(code);
  }
}
