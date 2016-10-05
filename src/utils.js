export function mod(x, y) {
  return ((x % y) + y) % y;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function near(num1, num2, threshold) {
  return Math.abs(num1 - num2) <= threshold;
}