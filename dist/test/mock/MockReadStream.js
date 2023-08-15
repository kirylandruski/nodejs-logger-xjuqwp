"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockReadStream = void 0;
const stream_1 = require("stream");
class MockReadStream extends stream_1.Readable {
    constructor(content, options) {
        super(options);
        this.content = content;
        this.cursor = 0;
    }
    _read(size) {
        const chunk = this.content.slice(this.cursor, this.cursor + size);
        this.cursor += size;
        if (chunk) {
            this.push(chunk);
        }
        else {
            this.push(null); // Signal end of data.
        }
    }
}
exports.MockReadStream = MockReadStream;
