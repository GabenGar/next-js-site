/**
 * @param duration In milliseconds.
 */
export async function sleep(duration = 1000) {
  const result = new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

  return result;
}
