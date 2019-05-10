export function numToAge(number: number, forms: string[]): string {
  // ['год', 'года', 'лет']
  const cases = [2, 0, 1, 1, 1, 2];
  let index;

  if (number % 100 > 4 && number % 100 < 20) {
    index = 2;
  } else if (number % 10 < 5) {
    index = cases[number % 10];
  } else {
    index = cases[5];
  }
  return `${number} ${forms[index]}`;
}
