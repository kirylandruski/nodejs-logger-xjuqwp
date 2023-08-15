"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineReader = void 0;
const readline_1 = __importDefault(require("readline"));
class LineReader {
    constructor(input) {
        this.input = input;
    }
    async *read() {
        const rl = readline_1.default.createInterface({
            input: this.input,
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            yield line;
        }
    }
}
exports.LineReader = LineReader;
