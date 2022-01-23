"use strict";
// Current day element
const currentDay = $("#currentDay");
// Get current day and date using Moment.js library
const nowDay = moment().format("dddd");
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
  const hour = $(e.target).attr("data-hour");
  const task = $(`#input-${hour}`).val();
  addTask(hour, task);
};

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
    console.log(`new task: ${newTask}`);
    // Get the previous tasks
    const prevTasks = getTasks();
    console.log(`prev task: ${prevTasks}`);
    // Assign new tasks to old tasks object
    const updateTasks = Object.assign(prevTasks, newTask);
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
    const taskInput = document.createElement("textarea");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("id", `input-${startHour}`);
    taskInput.classList.add("form-control");
    // Set value
    inputCol.append(taskInput);
    // Save column
    const saveCol = document.createElement("td");
    saveCol.classList.add("col-1", "text-center", "align-middle");
    row.append(saveCol);
    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.addEventListener("click", saveTask);
    saveBtn.setAttribute("data-hour", `${startHour}`);
    saveBtn.classList.add("btn", "btn-outline-secondary", "btn-lg");
    saveCol.append(saveBtn);
    // Save icon inside button
    const saveIcon = document.createElement("i");
    saveIcon.setAttribute("data-hour", `${startHour}`);
    saveIcon.classList.add("fas", "fa-save");
    saveBtn.append(saveIcon);
    // Increment start hour
    startHour++;
  }
};

createTimeblocks();

displayTasks();
