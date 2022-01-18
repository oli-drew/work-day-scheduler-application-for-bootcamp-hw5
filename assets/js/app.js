"use strict";
// - Select page elements by Id -
// Current day element
const currentDay = $("#currentDay");

// Get current day using Moment.js library
const nowDay = moment().format("dddd");
// Get current day using Moment.js library
const nowDate = moment().format("DD/MM/YY");
// Add current day and date to currentDay element
currentDay.text(`${nowDay} (${nowDate})`);
