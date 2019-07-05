export function getRange(current: number, last: number) {
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < last && i > 1) {
      range.push(i);
    }
  }
  range.push(last);

  let item;
  const rangeWithDots = [];

  for (let i of range) {
    if (item) {
      if (i - item === 2) {
        rangeWithDots.push(item + 1);
      } else if (i - item !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    item = i;
  }

  return rangeWithDots;
}
