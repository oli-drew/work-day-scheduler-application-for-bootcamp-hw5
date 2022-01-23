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
  const hour = e.target.getAttribute("data-hour");
  console.log(hour);
  const task = document.querySelector(`#input-${hour}`).value;
  console.log(task);
  addTask(hour, task);
};

// Disable Save and Input for that hour

// // Array to store tasks
const dailyTasks = [];

// // Function to get previous tasks
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  // If not null
  if (tasks) {
    // Return the tasks as an object
    return JSON.parse(tasks);
  } else {
    // Return empty object
    return {};
  }
};

// Function to add task to local storage
const addTask = (hour, task) => {
  if (task) {
    // Create new task
    const newTask = { [hour]: task };
    // Get the previous tasks
    const prevTasks = getTasks();
    // Assign new tasks to old tasks object
    const updateTasks = Object.assign(newTask, prevTasks);
    console.log(updateTasks);
    // Save the tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }
};

// Display tasks
const displayTasks = () => {
  const tasks = getTasks();
  // Convert to array
  const tasksArr = Object.entries(tasks);
  // Loop over tasks array
  tasksArr.forEach(([key, value]) => {
    const input = document.querySelector(`#input-${key}`);
    input.value = value;
  });
};

// Timeblocks table
const timeblocks = document.querySelector("#timeblocks");

// Create timeblocks dynamically
const createTimeblocks = () => {
  let startHour = 8;
  const dayLength = 10;
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
    // Set value
    // taskInput.value = displayTasks();
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

displayTasks();
