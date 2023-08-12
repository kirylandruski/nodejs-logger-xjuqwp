export function memoizeOnce(fn) {
  let invoked = false;
  let result = null;

  return function () {
    if (!invoked) {
      result = fn();
      invoked = true;
    }
    return result;
  };
}
