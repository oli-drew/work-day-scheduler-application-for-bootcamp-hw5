"use strict";
// - Select page elements by Id -
// Current day element
const currentDay = $("#currentDay");

// Get current day using Moment.js library
const nowDay = moment().format("dddd");
// Get current day using Moment.js library
const nowDate = moment().format("DD/MM/YYYY");
// Add current day and date to currentDay element
currentDay.text(`${nowDay} (${nowDate})`);

// Check if date is past/present/future
const pastFuturePresent = (inputDate) => {
  const date = moment(inputDate);
  const todayStart = moment().startOf("day");
  const todayEnd = moment().endOf("day");
  if (date.isBefore(todayStart)) {
    return "Past";
  } else if (date.isAfter(todayEnd)) {
    return "Future";
  } else {
    return "Present";
  }
};
