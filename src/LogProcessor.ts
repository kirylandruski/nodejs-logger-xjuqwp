import { LogLineParser } from "./LogLineParser";
import { ILogLine } from "./ILogLine";

interface LogProcessStrategy {
  filter: (l: ILogLine) => boolean;
  transform: (l: ILogLine) => object;
  handleError?: (error: any) => void;
}

export class LogProcessor {
  constructor(
    private inputReader: IAsyncStringIterator,
    private outputWriter: IObjectWriter,
    private processStrategy: LogProcessStrategy,
  ) {}

  async process() {
    try {
      for await (const line of this.inputReader.read()) {
        let result;
        try {
          const parsed = LogLineParser.parseLogLine(line);
          if (this.processStrategy.filter(parsed)) {
            result = this.processStrategy.transform(parsed);
          }
        } catch (e) {
          // Forward only log line processing errors to the handler.
          // For other errors, like read/write, throw immediately and exit the function.
          if (this.processStrategy.handleError) {
            this.processStrategy.handleError(e);
          } else {
            throw e;
          }
        }
        if (result) {
          await this.outputWriter.write(result);
        }
      }
    } finally {
      await this.outputWriter.close();
    }
  }
}
