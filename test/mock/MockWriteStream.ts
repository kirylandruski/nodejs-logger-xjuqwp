import { Writable, WritableOptions } from "stream";

export class MockWriteStream extends Writable {
  private content: string;

  constructor(options?: WritableOptions) {
    super(options);
    this.content = "";
  }

  override _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    this.content += chunk;
    callback();
  }

  getContent(): string {
    return this.content;
  }
}
