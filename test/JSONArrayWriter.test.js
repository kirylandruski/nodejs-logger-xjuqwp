import { expect } from "chai";

import { JSONArrayWriter } from "../src/JSONArrayWriter.js";
import { MockWriteStream } from "./mock/MockWriteStream.js";

describe("JSONArrayWriter", () => {
  let writeStream;
  let writer;

  beforeEach(() => {
    writeStream = new MockWriteStream();
    writer = new JSONArrayWriter(writeStream);
  });

  const createTestCase = (items) => {
    it(`should write ${JSON.stringify(items)} array`, async () => {
      for (const item of items) {
        await writer.push(item);
      }
      await writer.close();
      expect(writeStream.content()).to.equal(JSON.stringify(items));
    });
  };

  createTestCase([]);
  createTestCase([{ key1: "value1" }]);
  createTestCase([{ key1: "value1" }, { key2: "value2", key3: "value3" }]);
  createTestCase([{ a: "aa" }, { b: "bb", d: "dd" }, { c: "cc" }]);
  createTestCase([{ a: null }, { b: 111, d: 3 }, { c: 4 }, {}]);
});
