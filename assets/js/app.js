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

// {/* <tr class="table-secondary">
//   <th scope="row" class="col-1 text-center align-middle">9 am</th>
//   <td class="col-10"><input class="form-control" type="text"></td>
//   <td class="col-1 text-center"><button class="btn btn-outline-success">Save</button></td>
// </tr> */}

// Set colour based on time
const rowColour = (inputHour) => {
  const currentHour = moment().hour();
  console.log(`hour: ${currentHour}`);
  if (inputHour < currentHour) {
    console.log("Past");
    return "table-secondary";
  } else if (inputHour > currentHour) {
    console.log("Future");
    return "table-primary";
  } else {
    console.log("Present");
    return "table-success";
  }
};

// Timeblocks table
const timeblocks = document.querySelector("#timeblocks");

// Create timeblocks dynamically
const createTimeblocks = () => {
  let startHour = 0;
  for (let i = 0; i <= 8; i++) {
    // Convert start hour to time
    const hour = moment().hour(startHour).format("hh a");
    // Create a new table row
    const row = document.createElement("tr");
    row.setAttribute("id", `row-${startHour}`);
    // Dynamically color rows
    const rowClass = rowColour(startHour);
    row.classList.add(rowClass);
    timeblocks.append(row);
    // Time column
    const timeCol = document.createElement("th");
    timeCol.classList.add("col-1", "text-center", "align-middle");
    timeCol.textContent = hour;
    row.append(timeCol);
    // Input column
    const inputCol = document.createElement("td");
    inputCol.classList.add("col-10");
    row.append(inputCol);
    // User task Input
    const taskInput = document.createElement("input");
    taskInput.setAttribute("type", "text");
    taskInput.classList.add("form-control");
    inputCol.append(taskInput);
    // Save column
    const saveCol = document.createElement("td");
    saveCol.classList.add("col-1", "text-center");
    row.append(saveCol);
    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("btn", "btn-outline-secondary");
    saveBtn.textContent = "Save";
    saveCol.append(saveBtn);
    // Increment start hour
    startHour++;
  }
};

createTimeblocks();
