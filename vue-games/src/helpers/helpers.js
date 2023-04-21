export function randInt(low, high) {
  const rndDec = Math.random();
  return Math.floor(rndDec * (high - low + 1) + low);
}

export function getRandom(max) {
  return Math.floor(Math.random() * max);
}