
export default class FileReader {
  constructor() {
    this.bytes = new Uint8Array(0);
    this.pointer = 0;
  }

  setFile(bytes) {
    this.bytes = bytes;
    this.pointer = 0;
  }

  isEOF() {
    return this.pointer >= this.bytes.length - 1;
  }

  readNext() {
    if (!this.isEOF())
      return this.bytes[this.pointer++];
    else
      throw "EOF";
  }

  canRead(count) {
    return this.pointer + count <= this.bytes.length;
  }

  readArray(count) {
    if (this.canRead(count))
      return new Array(count).fill(0).map(() => this.readNext());
    else
      throw "EOF";
  }
}
