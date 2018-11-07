import moment from "moment";

const timestringToDatetime = timestring => {
  const newDate = new Date();
  const hours = Number(timestring.substring(0, 2));
  const minutes = Number(timestring.substring(3, 5));
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
};

const datetimeToTimestring = datetime => {
  const newMoment = new moment(new Date(datetime));
  return newMoment.format("HH:mm");
};

export { timestringToDatetime, datetimeToTimestring };
