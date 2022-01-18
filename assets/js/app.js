"use strict";
// - Select page elements by Id -
// Current day element
const currentDay = $("#currentDay");
// Set current day using momentjs
currentDay.text(moment().format("dddd"));
