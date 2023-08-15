"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockReadStream_1 = require("./mock/MockReadStream");
const LineReader_1 = require("../src/LineReader");
describe("LineReader", () => {
    const createTestCase = (rawContent, expectedLines) => {
        it(`should read ${JSON.stringify(expectedLines)} lines`, async () => {
            const readStream = new MockReadStream_1.MockReadStream(rawContent);
            const lineReader = new LineReader_1.LineReader(readStream);
            const result = [];
            for await (const l of lineReader.read()) {
                result.push(l);
            }
            (0, chai_1.expect)(result).to.deep.eq(expectedLines);
        });
    };
    createTestCase("", []);
    createTestCase("ab", ["ab"]);
    createTestCase("ab\r\ncd", ["ab", "cd"]);
    createTestCase("ab\ncd", ["ab", "cd"]);
    createTestCase("ab\n\ncd", ["ab", "", "cd"]);
    createTestCase("ab\n\ncd\n", ["ab", "", "cd"]);
    createTestCase("ab\n\ncd\n\n", ["ab", "", "cd", ""]);
});
