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

// Save task
const saveTask = (e) => {
  const inputID = e.target.getAttribute("data-hour");
  console.log(inputID);
  const inputValue = document.querySelector(`#input-${inputID}`).value;
  console.log(inputValue);
};

// Timeblocks table
const timeblocks = document.querySelector("#timeblocks");

// Create timeblocks dynamically
const createTimeblocks = () => {
  let startHour = 9;
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
    taskInput.setAttribute("id", `input-${startHour}`);
    taskInput.classList.add("form-control");
    inputCol.append(taskInput);
    // Save column
    const saveCol = document.createElement("td");
    saveCol.classList.add("col-1", "text-center");
    row.append(saveCol);
    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.addEventListener("click", saveTask);
    saveBtn.setAttribute("data-hour", `${startHour}`);
    saveBtn.classList.add("btn", "btn-outline-secondary");
    // saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.innerHTML = "Save";
    saveCol.append(saveBtn);
    // Increment start hour
    startHour++;
  }
};

createTimeblocks();

// const buttons = document.getElementsByClassName("saveBtn");
// buttons.forEach((btn) => {
//   btn.addEventListener("click", console.log("hi"));
// });

// // Capture user input
// const testSubmit = (e) => {
//   // // Prevent form submit default action
//   // e.preventDefault();
//   const testInput = document.querySelector("#test");
//   // Initials value
//   console.log(testInput.value);
// };

// // Test submit button
// const testBtn = document.querySelector("#testBtn");
// testBtn.addEventListener("click", testSubmit);

// // Array to store tasks
// const dailyTasks = [];

// // Function to get previous tasks
// const getTasks = () => {
//   const tasks = localStorage.getItem("tasks");
//   // If not null
//   if (tasks) {
//     // Return the tasks as an object
//     return JSON.parse(tasks);
//   } else {
//     // Return empty object
//     return {};
//   }
// };

// // Save to local storage
// // Function to add task
// const addTask = (hour, task) => {
//   // Create new task
//   const newTask = { [hour]: task };
//   // Get the previous tasks
//   const prevTasks = getTasks();
//   // Assign new tasks to old tasks object
//   const updateTasks = Object.assign(newTask, prevTasks);
//   // Save the tasks to local storage
//   localStorage.setItem("tasks", JSON.stringify(updateTasks));
//   // Open high scores table
//   displayTasks();
// };

// // Display tasks
// const displayTasks = () => {
//   //
// };
