export function mod(x, y) {
  return ((x % y) + y) % y;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function near(num1, num2, threshold) {
  return Math.abs(num1 - num2) <= threshold;
}

export function shuffle(array) {
    let temporaryValue, randomIndex;
    let currentIndex = array.length;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

