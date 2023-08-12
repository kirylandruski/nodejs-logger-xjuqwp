import { JSONArrayWriter } from "./JSONArrayWriter.js";
import { LineReader } from "./LineReader.js";
import { LogLineParser } from "./LogLineParser.js";

export class LogProcessor {
  constructor(inputStream, outputStream, filter, transformer) {
    this._outputWriter = new JSONArrayWriter(outputStream);
    this._inputReader = new LineReader(inputStream);
    this._filter = filter;
    this._transformer = transformer;
  }

  async process() {
    for await (const line of this._inputReader.lines()) {
      const parsed = LogLineParser.parseLogLine(line);
      if (this._filter(parsed)) {
        await this._outputWriter.push(this._transformer(parsed));
      }
    }
    await this._outputWriter.close();
  }
}
