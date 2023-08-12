import { MockReadStream } from "./mock/MockReadStream.js";
import { LineReader } from "../src/LineReader.js";
import { expect } from "chai";

describe("LineReader", () => {
  const createTestCase = (rawContent, expectedLines) => {
    it(`should read ${JSON.stringify(expectedLines)} lines`, async () => {
      const readStream = new MockReadStream(rawContent);
      const lineReader = new LineReader(readStream);

      const result = [];
      for await (const l of lineReader.lines()) {
        result.push(l);
      }

      expect(result).to.deep.eq(expectedLines);
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
