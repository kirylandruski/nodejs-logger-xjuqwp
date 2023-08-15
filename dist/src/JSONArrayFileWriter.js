"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONArrayFileWriter = void 0;
const util_1 = require("util");
class JSONArrayFileWriter {
    constructor(output) {
        this.outputWrite = (0, util_1.promisify)(output.write.bind(output));
        this.isEmpty = true;
    }
    async write(e) {
        if (this.isEmpty) {
            await this.outputWrite("[");
        }
        else {
            await this.outputWrite(",");
        }
        await this.outputWrite(JSON.stringify(e));
        this.isEmpty = false;
    }
    async close() {
        if (this.isEmpty) {
            await this.outputWrite("[");
        }
        await this.outputWrite("]");
    }
}
exports.JSONArrayFileWriter = JSONArrayFileWriter;
