import moment from "moment";

/**
 * Returns date today with passed in timestring, required format: HH:MM
 * @param {String} timestring
 */
const timestringToDatetime = timestring => {
  const newDate = new Date();
  const hours = Number(timestring.substring(0, 2));
  const minutes = Number(timestring.substring(3, 5));
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
};

/**
 * Converts a date representation into a time string of format HH:MM
 * @param {Date} datetime
 */
const datetimeToTimestring = datetime => {
  const newMoment = new moment(new Date(datetime));
  return newMoment.format("HH:mm");
};

/**
 * Returns the most recent monday as counted from the given date
 * @param {Date} date
 */
const getMonday = date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

/**
 * Offsets a date by a given number of days
 * @param {Date} date Initial date to count from
 * @param {Number} offset Number of days to count up (positive) or down (negative)
 */
const offsetDate = (date, offset) => {
  return new Date(Number(new Date(date)) + offset * 3600 * 24 * 1000);
};

/**
 * Converts a time span between two dates in a nicely readable form
 * @param {Date} from
 * @param {Date} to
 */
const getTimeSpanString = (from, to) => {
  const fromText = moment(from).format("DD");
  const toText = moment(to).format("DD");
  const fromMonth = moment(from).format("MMM");
  const toMonth = moment(to).format("MMM");
  const fromYear = from.getFullYear();
  const toYear = to.getFullYear();
  if (fromYear !== toYear) {
    return `${fromText}. ${fromMonth} ${fromYear} - ${toText}. ${toMonth} ${toYear}`;
  } else if (fromMonth !== toMonth) {
    return `${fromText}. ${fromMonth} - ${toText}. ${toMonth} ${fromYear}`;
  } else {
    return `${fromText}. - ${toText}. ${moment(from).format("MMMM")} ${fromYear}`;
  }
};

/**
 * Returns an array of all days of the week starting from a given monday
 * @param {Date} monday Date of the monday to begin the week with
 */
const getWeek = monday => {
  let week = [];
  let iter = monday;

  for (let i = 0; i < 7; i++) {
    iter = offsetDate(monday, i);
    week.push({
      weekday: moment(iter).format("ddd"),
      date: iter,
      formattedDate: moment(iter).format("DD. MMM")
    });
  }

  return week;
};

export {
  timestringToDatetime,
  datetimeToTimestring,
  getMonday,
  offsetDate,
  getTimeSpanString,
  getWeek
};
