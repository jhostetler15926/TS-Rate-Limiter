export function now(): number {
  return Date.now();
}

export function isWithinWindow(timestamp: number, windowMs: number): boolean {
  return now() - timestamp < windowMs;
}
