import { JSONArrayWriter } from "./JSONArrayWriter.js";
import { LineReader } from "./LineReader.js";
import { LogLineParser } from "./LogLineParser.js";

export class LogProcessor {
  constructor(inputStream, outputStream, filter, transformer, errorHandler) {
    this._outputWriter = new JSONArrayWriter(outputStream);
    this._inputReader = new LineReader(inputStream);
    this._filter = filter;
    this._transformer = transformer;
    this._errorHandler = errorHandler;
  }

  async process() {
    try {
      for await (const line of this._inputReader.lines()) {
        let result;
        try {
          const parsed = LogLineParser.parseLogLine(line);
          if (this._filter(parsed)) {
            result = this._transformer(parsed);
          }
        } catch (e) {
          // Forward only log line processing errors to the handler.
          // For other errors, like read/write, throw immediately and exit the function.
          if (this._errorHandler) {
            this._errorHandler(e);
          } else {
            throw e;
          }
        }
        if (result) {
          await this._outputWriter.push(result);
        }
      }
    } finally {
      await this._outputWriter.close();
    }
  }
}
