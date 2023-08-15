import { createReadStream, createWriteStream } from "fs";
import { program } from "commander";

import { LogProcessor } from "./LogProcessor";
import {
  validateDirExists,
  validateFileNotExists,
  validateFileExists,
} from "./utils/validateFs";
import { LineReader } from "./LineReader";
import { JSONArrayFileWriter } from "./JSONArrayFileWriter";
import { ILogLine } from "./ILogLine";

async function main() {
  program.requiredOption("--input <char>").requiredOption("--output <char>");
  program.parse();
  const options = program.opts();

  await validateFileExists(options["input"]);
  await validateFileNotExists(options["output"]);
  await validateDirExists(options["output"]);

  const processor = new LogProcessor(
    new LineReader(createReadStream(options["input"])),
    new JSONArrayFileWriter(createWriteStream(options["output"])),
    {
      filter: (line: ILogLine) => line.level().toLowerCase() === "error",
      transform: (line: ILogLine) => ({
        timestamp: line.time().valueOf(),
        loglevel: line.level(),
        transactionId: line.payload().transactionId,
        err: line.payload().err,
      }),
      handleError: (e: any) => {
        console.error(e);
      },
    },
  );

  await processor.process();
}

main().catch((e) => console.error(e.message));
