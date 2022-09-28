let intervalId;
let speed;

export function useAutoScroll({ baseMs = 400, xInc = 0, yInc = 1, min = 1, max = 10, value = min } = {}) {
  if (!speed) speed = value;

  function getIntervalTime() {
    return baseMs / Math.min(Math.max(min, speed), max);
  }

  function start() {
    if (intervalId) return;

    intervalId = setInterval(
      () => scrollBy(xInc, yInc),
      getIntervalTime()
    );
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function setSpeed(newSpeed) {
    if (newSpeed < min || max < newSpeed) {
      throw new Error(`newSpeed out of range: ${newSpeed}`);
    }

    speed = Number(newSpeed);

    if (intervalId) {
      stop();
      start();
    }
  }

  return [() => speed, setSpeed, start, stop];
}