import { expect } from "chai";

import { JSONArrayFileWriter } from "../src/JSONArrayFileWriter";
import { MockWriteStream } from "./mock/MockWriteStream";

describe("JSONArrayWriter", () => {
  let writeStream: MockWriteStream;
  let writer: JSONArrayFileWriter;

  beforeEach(() => {
    writeStream = new MockWriteStream();
    writer = new JSONArrayFileWriter(writeStream);
  });

  const createTestCase = (items: any[]) => {
    it(`should write ${JSON.stringify(items)} array`, async () => {
      for (const item of items) {
        await writer.write(item);
      }
      await writer.close();
      expect(writeStream.getContent()).to.equal(JSON.stringify(items));
    });
  };

  createTestCase([]);
  createTestCase([{ key1: "value1" }]);
  createTestCase([{ key1: "value1" }, { key2: "value2", key3: "value3" }]);
  createTestCase([{ a: "aa" }, { b: "bb", d: "dd" }, { c: "cc" }]);
  createTestCase([{ a: null }, { b: 111, d: 3 }, { c: 4 }, {}]);
});
