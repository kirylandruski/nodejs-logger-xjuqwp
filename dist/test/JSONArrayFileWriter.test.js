"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const JSONArrayFileWriter_1 = require("../src/JSONArrayFileWriter");
const MockWriteStream_1 = require("./mock/MockWriteStream");
describe("JSONArrayWriter", () => {
    let writeStream;
    let writer;
    beforeEach(() => {
        writeStream = new MockWriteStream_1.MockWriteStream();
        writer = new JSONArrayFileWriter_1.JSONArrayFileWriter(writeStream);
    });
    const createTestCase = (items) => {
        it(`should write ${JSON.stringify(items)} array`, async () => {
            for (const item of items) {
                await writer.write(item);
            }
            await writer.close();
            (0, chai_1.expect)(writeStream.getContent()).to.equal(JSON.stringify(items));
        });
    };
    createTestCase([]);
    createTestCase([{ key1: "value1" }]);
    createTestCase([{ key1: "value1" }, { key2: "value2", key3: "value3" }]);
    createTestCase([{ a: "aa" }, { b: "bb", d: "dd" }, { c: "cc" }]);
    createTestCase([{ a: null }, { b: 111, d: 3 }, { c: 4 }, {}]);
});
