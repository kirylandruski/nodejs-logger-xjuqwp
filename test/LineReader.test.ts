import { expect } from "chai";

import { MockReadStream } from "./mock/MockReadStream";
import { LineReader } from "../src/LineReader";

describe("LineReader", () => {
  const createTestCase = (rawContent: string, expectedLines: string[]) => {
    it(`should read ${JSON.stringify(expectedLines)} lines`, async () => {
      const readStream = new MockReadStream(rawContent);
      const lineReader = new LineReader(readStream);
      const result = [];
      for await (const l of lineReader.read()) {
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
