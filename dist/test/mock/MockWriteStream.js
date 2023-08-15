"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockWriteStream = void 0;
const stream_1 = require("stream");
class MockWriteStream extends stream_1.Writable {
    constructor(options) {
        super(options);
        this.content = "";
    }
    _write(chunk, encoding, callback) {
        this.content += chunk;
        callback();
    }
    getContent() {
        return this.content;
    }
}
exports.MockWriteStream = MockWriteStream;
