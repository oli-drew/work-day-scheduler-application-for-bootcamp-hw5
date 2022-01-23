"use strict";
// Current day element
const currentDay = $("#currentDay");
// Get current day using Moment.js library
const nowDay = moment().format("dddd");
// Get current day using Moment.js library
const nowDate = moment().format("MMMM Do");
// Add current day and date to currentDay element
currentDay.text(`${nowDay}, ${nowDate}`);

// Set colour based on time
const rowColour = (inputHour) => {
  const currentHour = moment().hour();
  if (inputHour < currentHour) {
    return "table-secondary";
  } else if (inputHour > currentHour) {
    return "table-primary";
  } else {
    return "table-success";
  }
};

// Timeblocks table
const timeblocks = document.querySelector("#timeblocks");

// Create timeblocks dynamically
const createTimeblocks = () => {
  let startHour = 0;
  const dayLength = 8;
  for (let i = 0; i <= dayLength; i++) {
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
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveCol.append(saveBtn);
    // Increment start hour
    startHour++;
  }
};

createTimeblocks();
