interface IAsyncStringIterator {
  read(): AsyncGenerator<string, void, void>;
}
