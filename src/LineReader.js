import readline from "readline";

export class LineReader {
  constructor(stream) {
    this._stream = stream;
  }

  async *lines() {
    const rl = readline.createInterface({
      input: this._stream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      yield line;
    }
  }
}
