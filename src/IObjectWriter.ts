interface IObjectWriter {
  write(e: object): Promise<void>;

  close(): Promise<void>;
}
