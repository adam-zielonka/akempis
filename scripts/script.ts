const text = await Deno.readTextFile("o.txt");

let lastLine = "";
let lastChapter = "";
let lastBook = "";

let date = new Date("2025-04-23");
let lp = 1;
const brakeDate = new Date("2025-06-24");

console.log("lp;data;księga;rozdział;tytuł");

text.split("\n").forEach((line) => {
  if (line.match(/^\d+$/)) {
    return;
  }

  if (lastLine === "KSIĘGA") {
    lastLine = "";
    return;
  }

  if (lastLine === "Rozdział") {
    // console.log(lastBook, lastChapter, line);
    const stirngDate = date.toLocaleString("pl-PL", { weekday: "long", month: "long", day: "numeric" })
    console.log([lp, stirngDate, lastBook, lastChapter, line].join(";"));

    date.setDate(date.getDate() + 1);
    if (date.getDay() === 2) {
      console.log(";;;;");
      date.setDate(date.getDate() + 1);
    }
    if (date.getTime() > brakeDate.getTime() && date.getMonth() < 9) {
      date = new Date("2025-10-01");
      return;
    }
    lp++;
    lastLine = "";
    return;
  }

  if (line.match(/^KSIĘGA/)) {
    // console.log(line);
    lastLine = "KSIĘGA";
    lastBook = line;
    return;
  }

  if (line.match(/^Rozdział/)) {
    // console.log(line);
    lastLine = "Rozdział";
    lastChapter = line;
    return;
  }

  // const [_, value] = line.match(/^(\d+)./) || [];
  // if (value) {
  //   console.log(date.toLocaleString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  //   date.setDate(date.getDate() + 1);
  //   if (date.getDay() === 2) {
  //     date.setDate(date.getDate() + 1);
  //   }
  //   console.log(lastBook, lastChapter, value);
  // }
});
