const locale = "EN-en";
const timezone = "Asia/Manila";

// export function formatTime(v) {
//   return new Date(Date.UTC(...v)).toLocaleString(locale, {
//     year: "2-digit",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     timeZone: timezone,
//   });
// }

// format 2022-W20
export function getCurrentWeekinPHPFormat() {
  const date = new Date();
  const nDay = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - nDay + 3);
  const n1stThursday = date.valueOf();
  date.setMonth(0, 1);

  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  }

  const year = date.getFullYear();
  const week = 1 + Math.ceil((n1stThursday - date) / 604800000);
  if (week < 10) {
    return `${year}-W0${week}`;
  }
  return `${year}-W${week}`;
}

export function getTodayDate(subDays?: number ) {
  let today = new Date();
  let date;
  if (subDays) {
    today.setDate(today.getDate() - subDays);
    date = today.toISOString().slice(0, 10).replace(/-/g, "-");
  } else {
    date = today.toISOString().slice(0, 10);
  }

  return date;
}

export const quicksort = (array, callback = (item) => item) => {
  if (array.length <= 1) {
    return array;
  }

  var pivotItem = array[0],
    pivotValue = callback(pivotItem);

  var left = [];
  var right = [];

  for (var i = 1; i < array.length; i++) {
    var currentItem = array[i],
      currentItemValue = callback(currentItem);
    currentItemValue < pivotValue
      ? left.push(currentItem)
      : right.push(currentItem);
  }

  return quicksort(left, callback).concat(
    pivotItem,
    quicksort(right, callback)
  );
};


export function subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
  }
