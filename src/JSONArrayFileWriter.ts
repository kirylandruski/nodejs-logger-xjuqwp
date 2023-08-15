import { promisify } from "util";

export class JSONArrayFileWriter implements IObjectWriter {
  private readonly outputWrite: (buffer: string) => Promise<void>;
  private isEmpty: boolean;

  constructor(output: NodeJS.WritableStream) {
    this.outputWrite = promisify(output.write.bind(output));
    this.isEmpty = true;
  }

  async write(e: any): Promise<void> {
    if (this.isEmpty) {
      await this.outputWrite("[");
    } else {
      await this.outputWrite(",");
    }

    await this.outputWrite(JSON.stringify(e));
    this.isEmpty = false;
  }

  async close(): Promise<void> {
    if (this.isEmpty) {
      await this.outputWrite("[");
    }

    await this.outputWrite("]");
  }
}
