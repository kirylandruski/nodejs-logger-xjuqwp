import readline, { ReadLineOptions } from "readline";

export class LineReader implements IAsyncStringIterator {
  private readonly input: NodeJS.ReadableStream;

  constructor(input: NodeJS.ReadableStream) {
    this.input = input;
  }

  async *read(): AsyncGenerator<string, void, void> {
    const rl = readline.createInterface({
      input: this.input,
      crlfDelay: Infinity,
    } as ReadLineOptions);

    for await (const line of rl) {
      yield line;
    }
  }
}
