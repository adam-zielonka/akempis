export function formatDate(date: Date) {
  return date.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" });
}

export function calculateSplit(number: number, length: number) {
  const split = Math.ceil(number / length);
  const ranges = [];
  let start = 1;

  for (let i = 1; i < length; i++) {
    ranges.push([start, start + split - 1]);
    start += split;
  }

  ranges.push([start, number]);

  return ranges;
}

export function printSplit(split: number[]) {
  return `${split[0]}-${split[1]}`;
}
