import { promisify } from "util";

export class JSONArrayWriter {
  constructor(stream) {
    this._isEmpty = true;
    this._streamWrite = promisify(stream.write.bind(stream));
  }

  async push(e) {
    if (this._isEmpty) {
      await this._streamWrite("[");
    } else {
      await this._streamWrite(",");
    }

    await this._streamWrite(JSON.stringify(e));
    this._isEmpty = false;
  }

  async close() {
    if (this._isEmpty) {
      await this._streamWrite("[");
    }

    await this._streamWrite("]");
  }
}
