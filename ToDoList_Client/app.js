
let taskNameTextBox = document.getElementById('taskNameTextBox')
let addTaskButton = document.getElementById('addTaskButton')
let getTasksButton = document.getElementById('getTasksButton')
let saveTasksButton = document.getElementById('saveTasksButton')
let tasksList = document.getElementById('tasksList')



const TASKS_URL = "http://localhost:3000/todo"

let tasksArray
let d = new Date();
let currentTime = formatDate(d, "dddd h:mmtt d MMM yyyy")

function getAllTasks(completion) {
  $.get(TASKS_URL, function (taskData) {
    completion(taskData)
  })
}

getAllTasks(function (tasks) {
  tasksList.innerHTML = ""
  tasksArray = tasks

  displayTasks()
})

addTaskButton.addEventListener('click', function () {
  


  fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskName: taskNameTextBox.value,
      taskCreatedAt: currentTime
      
    })
  }).then(function (response) {
    return response.text()
  }).then(function (text) {
    console.log(text)
    })
})

function getAllTasks(completion) {
  $.get(TASKS_URL, function (taskData) {
    completion(taskData)
  })
}

  getTasksButton.addEventListener('click', function () {
    getAllTasks(function (tasks) {
      tasksArray = tasks
      
      displayTasks()
    })
})

function createTaskItem(task, index) {
  d = new Date();
  currentTime = formatDate(d, "dddd h:mmtt d MMM yyyy")
  
  if (task.taskCheckBox == "checked"){
    let taskCompleteID = ("taskCompleted" + index)
    return `<li class ="tasks" id = "liItem${index}">
            <label>${task.taskName}</label>  <button id="deleteTaskButton${index}" onclick="deleteTask(${index})">Delete Task</button>
            <label id = "taskCreated${index}">Task Created At : ${task.taskCreatedAt}<label>
            <input type = "checkbox" id ="checkbox${index}" onclick = "completedDate(tasksArray[${index}], ${index})" ${task.taskCheckBox}>Task Completed</input>
            <label id = "${taskCompleteID}">Task Completed At : ${task.taskCompleteTime}<label>
            </li>`
  }
  else {
    return `<li class ="tasks" id = "liItem${index}">
            <label>${task.taskName}</label>  <button id="deleteTaskButton${index}" onclick="deleteTask(${index})">Delete Task</button>
            <label id = "taskCreated${index}">Task Created At : ${task.taskCreatedAt}<label>
            <input type = "checkbox" id ="checkbox${index}" onclick = "completedDate(tasksArray[${index}], ${index})" ${task.taskCheckBox}>Task Completed</input>
            </li>`
}
}

function completedDate(task, index) {
  let checkBox = ("checkbox" + index)
  let liID = ("liItem" + index)
  let taskCompleteID = ("taskCompleted" + index)
  let liItem = document.getElementById(liID) 
  let checkBoxItem = document.getElementById(checkBox)
  if (checkBoxItem.checked) {
    
    
    task.taskCheckBox = "checked"
    task.taskCompleteTime = currentTime
    //console.log(task)
    d = new Date();
    currentTime = formatDate(d, "dddd h:mmtt d MMM yyyy")
    liItem.insertAdjacentHTML("beforeend", `<label id = "${taskCompleteID}">Task Completed At : ${task.taskCompleteTime}<label>`)
    
  } else {
    let removeTime = document.getElementById(taskCompleteID)
    removeTime.parentNode.removeChild(removeTime)
    task.taskCheckBox = ""
    task.taskCompleteTime = ""
    
  }
}



function displayTasks() {
  tasksList.innerHTML = ""
  
  for (let index = 0; index < tasksArray.length; index++) {

    let task = tasksArray[index]
    //console.log(task)
    tasksList.insertAdjacentHTML("beforeend", createTaskItem(task,index))
    
  }
  
}

function deleteTask(index){
    

  fetch('http://localhost:3000/todo', {
    method: 'DELETE',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      indexNumber : index

    })
  }).then(function (response) {
    return response.text()
  }).then(function (text) {
    console.log(text)
  })
  getAllTasks(function (tasks) {
    tasksArray = tasks

    displayTasks()
  })
}

saveTasksButton.addEventListener('click', function () {
  console.log(tasksArray)  
  for (let index = 0; index < tasksArray.length; index++) {
    let task = tasksArray[index]
    console.log(task.taskName)
    console.log(task)
    fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskName: task.taskName,
      taskCreatedAt: task.taskCreatedAt,
      taskCheckBox : task.taskCheckBox,
      taskCompleteTime: task.taskCompleteTime

    })
  })
}
})














function formatDate(date, format, utc) {
  var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
    var s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
};