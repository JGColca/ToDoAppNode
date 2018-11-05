const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let list = []


app.post("/todo", function (req, res, next) {
    
    let task = req.body
    
    let findTask = list.find(function (listTask) {
        return listTask.taskName == task.taskName
    })
    console.log(findTask)
    if (findTask != null) {
        findTask.taskCheckBox = task.taskCheckBox
        findTask.taskCompleteTime = task.taskCompleteTime

    } else {
        list.push(task)
    }
    console.log
      
})          
        
    
       
    
   


app.get("/todo", function (req, res, next) {

    //let task = { task: "Wash the Car", priority : "high" }
    res.json(list)
})

app.delete("/todo", function (req, res, next) {

    let index = req.body.indexNumber
    list.splice(index,1)
    res.send("Task Deleted")
})


app.listen(port, function () {
    console.log("Server is running...")
})

