export class MockWriteStream {
  constructor() {
    this._content = "";
  }

  write(data, cb) {
    this._content += data;
    cb(null, true);
  }

  content() {
    return this._content;
  }
}
