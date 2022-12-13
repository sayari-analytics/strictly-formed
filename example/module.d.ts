interface NodeModule {
  hot?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accept(fn: () => void): void
    dispose(fn: () => void): void
  }
}
