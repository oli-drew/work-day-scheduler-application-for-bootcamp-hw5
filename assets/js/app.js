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

// Function to get previous tasks
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
    const updateTasks = Object.assign(prevTasks, newTask);
    // Save the tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }
};

// Display tasks function
const displayTasks = () => {
  // Convert to array
  const tasksArr = Object.entries(getTasks());
  // Loop over tasks array
  tasksArr.forEach(([key, value]) => {
    $(`#input-${key}`).val(value);
  });
};

// Reset Inputs
const resetInputs = () => {
  $("td").each(function () {
    $(this).find(":input").val("");
  });
};

// Clear tasks in localstorage
const clearTasks = () => {
  localStorage.removeItem("tasks");
  resetInputs();
};

// CLear tasks button
const clearBtn = $("#clearTasks").click(clearTasks);

// Create timeblocks dynamically
const createTimeblocks = () => {
  // Timeblocks table
  const timeblocks = $("#timeblocks");
  for (let i = 0; i <= dayLength; i++) {
    // Convert start hour to time
    const hour = moment().hour(startHour).format("hh a");
    // Dynamically color rows
    const rowClass = rowColour(startHour);
    // Create a new table row
    const row = $(`<tr id="row-${startHour}" class="${rowClass}"></tr>`);
    timeblocks.append(row);
    // Time column
    const timeCol = $(
      `<th class="col-1 text-center align-middle">${hour}</th>`
    );
    row.append(timeCol);
    // Input column
    const inputCol = $(`<td class="col-10"></td>`);
    row.append(inputCol);
    // User task Input
    const taskInput = $(
      `<textarea id="input-${startHour}" type="text" class="form-control"></textarea>`
    );
    inputCol.append(taskInput);
    // Save column
    const saveCol = $(`<td class="col-1 text-center align-middle"></td>`);
    row.append(saveCol);
    // Save button
    const saveBtn = $(
      `<button data-hour="${startHour}" class="btn btn-outline-secondary btn-lg"></button>`
    );
    saveBtn.click(saveTask);
    saveCol.append(saveBtn);
    // Save icon inside button
    const saveIcon = $(`<i data-hour="${startHour}" class="fas fa-save"></i>`);
    saveBtn.append(saveIcon);
    // Increment start hour
    startHour++;
  }
};

// Settings
let startHour;
let dayLength;
// Settings function with default of 9 to 5
const settings = (dayStart = 9, dayEnd = 17) => {
  startHour = dayStart;
  dayLength = dayEnd - dayStart;
  createTimeblocks();
  displayTasks();
};

// 8am to 6pm working day
settings(8, 18);

// Future development will allow users to set working hours in settings modal
