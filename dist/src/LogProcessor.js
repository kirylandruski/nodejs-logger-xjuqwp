"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogProcessor = void 0;
const LogLineParser_1 = require("./LogLineParser");
class LogProcessor {
    constructor(inputReader, outputWriter, processStrategy) {
        this.inputReader = inputReader;
        this.outputWriter = outputWriter;
        this.processStrategy = processStrategy;
    }
    async process() {
        try {
            for await (const line of this.inputReader.read()) {
                let result;
                try {
                    const parsed = LogLineParser_1.LogLineParser.parseLogLine(line);
                    if (this.processStrategy.filter(parsed)) {
                        result = this.processStrategy.transform(parsed);
                    }
                }
                catch (e) {
                    // Forward only log line processing errors to the handler.
                    // For other errors, like read/write, throw immediately and exit the function.
                    if (this.processStrategy.handleError) {
                        this.processStrategy.handleError(e);
                    }
                    else {
                        throw e;
                    }
                }
                if (result) {
                    await this.outputWriter.write(result);
                }
            }
        }
        finally {
            await this.outputWriter.close();
        }
    }
}
exports.LogProcessor = LogProcessor;
