export function memoizeOnce<T extends () => any>(fn: T): T {
  let invoked = false;
  let result: ReturnType<T> | null = null;

  return function (): ReturnType<T> {
    if (!invoked) {
      result = fn();
      invoked = true;
    }
    return result as ReturnType<T>;
  } as T;
}
