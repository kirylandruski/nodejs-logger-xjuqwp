import { Readable, ReadableOptions } from "stream";

export class MockReadStream extends Readable {
  private content: string;
  private cursor: number;

  constructor(content: string, options?: ReadableOptions) {
    super(options);
    this.content = content;
    this.cursor = 0;
  }

  override _read(size: number): void {
    const chunk = this.content.slice(this.cursor, this.cursor + size);
    this.cursor += size;
    if (chunk) {
      this.push(chunk);
    } else {
      this.push(null); // Signal end of data.
    }
  }
}
