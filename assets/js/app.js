"use strict";
// - Select page elements by Id -
// Current day element
const currentDay = $("#currentDay");

// Get current day using Moment.js library
const nowDay = moment().format("dddd");
// Get current day using Moment.js library
// const nowDate = moment().format("DD/MM/YYYY");
// const nowDate = moment().format("ll");
const nowDate = moment().format("MMMM Do");
// Add current day and date to currentDay element
currentDay.text(`${nowDay}, ${nowDate}`);

// // Check if date is past/present/future
// const pastFuturePresent = (inputDate) => {
//   const date = moment(inputDate);
//   const todayStart = moment().startOf("day");
//   const todayEnd = moment().endOf("day");
//   if (date.isBefore(todayStart)) {
//     return "Past";
//   } else if (date.isAfter(todayEnd)) {
//     return "Future";
//   } else {
//     return "Present";
//   }
// };

// Check hour
const pastPresentFuture = (inputHour) => {
  const currentHour = moment().hour();
  console.log(`hour: ${currentHour}`);
  if (inputHour < currentHour) {
    console.log("Past");
  } else if (inputHour > currentHour) {
    console.log("Future");
  } else {
    console.log("Present");
  }
};
