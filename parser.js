import { createReadStream, createWriteStream } from "fs";
import { program } from "commander";

import { LogProcessor } from "./src/LogProcessor.js";
import {
  validateDirExists,
  validateFileDoesntExists,
  validateFileExists,
} from "./src/utils/validateFs.js";

async function main() {
  program.requiredOption("--input <char>").requiredOption("--output <char>");
  program.parse();
  const options = program.opts();

  await validateFileExists(options.input);
  await validateFileDoesntExists(options.output);
  await validateDirExists(options.output);

  const processor = new LogProcessor(
    createReadStream(options.input),
    createWriteStream(options.output),
    (line) => line.level().toLowerCase() === "error",
    (line) => ({
      timestamp: line.time().valueOf(),
      loglevel: line.level(),
      transactionId: line.payload().transactionId,
      err: line.payload().err,
    }),
  );

  await processor.process();
}

main().catch((e) => console.error(e.message));
