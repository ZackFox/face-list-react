import { ExpItem } from "../store/types";
import { numToWord } from "./numToWord";

const getExperienceTerm = (data: ExpItem[]) => {
  if (!data.length) return "нет";

  let total = data.reduce((count, item) => {
    const msStart = Date.parse(item.dateStart);
    const msEnd = Date.parse(item.dateEnd);
    count += msEnd - msStart;
    return count;
  }, 0);

  const msInDay = 1000 * 60 * 60 * 24;
  const days = total / msInDay;
  if (days < 30) return "менее месяца";

  const months = Math.floor((days % 365) / 30);
  const years = Math.floor(days / 365);

  const Y = years ? numToWord(years) : "";
  const M = numToWord(months, ["месяц", "месяца", "месяцев"]);
  return `${Y} ${M}`;
};

export default getExperienceTerm;
