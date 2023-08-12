import EventEmitter from "events";

export class MockReadStream extends EventEmitter {
  constructor(content, chunkSize = 10) {
    super();
    this._content = content;
    this._cursor = 0;
    this._chunkSize = chunkSize;
    this._intervalId = null;
  }

  resume() {
    if (this._intervalId) {
      return;
    }

    this._intervalId = setInterval(() => {
      const chunk = this.read(this._chunkSize);
      if (chunk) {
        this.emit("data", chunk);
      } else {
        this.pause();
        this.emit("end");
      }
    }, 0);
  }

  pause() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  read(size) {
    const chunk = this._content.slice(this._cursor, this._cursor + size);
    this._cursor += size;
    return chunk;
  }
}
