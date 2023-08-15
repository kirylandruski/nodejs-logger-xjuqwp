"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const commander_1 = require("commander");
const LogProcessor_1 = require("./LogProcessor");
const validateFs_1 = require("./utils/validateFs");
const LineReader_1 = require("./LineReader");
const JSONArrayFileWriter_1 = require("./JSONArrayFileWriter");
async function main() {
    commander_1.program.requiredOption("--input <char>").requiredOption("--output <char>");
    commander_1.program.parse();
    const options = commander_1.program.opts();
    await (0, validateFs_1.validateFileExists)(options["input"]);
    await (0, validateFs_1.validateFileNotExists)(options["output"]);
    await (0, validateFs_1.validateDirExists)(options["output"]);
    const processor = new LogProcessor_1.LogProcessor(new LineReader_1.LineReader((0, fs_1.createReadStream)(options["input"])), new JSONArrayFileWriter_1.JSONArrayFileWriter((0, fs_1.createWriteStream)(options["output"])), {
        filter: (line) => line.level().toLowerCase() === "error",
        transform: (line) => ({
            timestamp: line.time().valueOf(),
            loglevel: line.level(),
            transactionId: line.payload().transactionId,
            err: line.payload().err,
        }),
        handleError: (e) => {
            console.error(e);
        },
    });
    await processor.process();
}
main().catch((e) => console.error(e.message));
