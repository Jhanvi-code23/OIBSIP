const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");

const pendingList=document.querySelector("#pendingList");
const completedList=document.querySelector("#completedList");

const pendingEmpty=document.querySelector("#pendingEmpty");
const completedEmpty=document.querySelector("#completedEmpty");

const totalTasks= document.querySelector("#totalTasks");
const pendingCount= document.querySelector("#pendingCount");
const completedCount= document.querySelector("#completedCount");
const pendingBadge=document.querySelector("#pendingBadge");
const completedBadge=document.querySelector("#completedBadge");

const progressPercent=document.querySelector("#progressPercent");
const donutChart = document.querySelector(".donut-chart");






//add task- working: user types a task in the input field and clicks the add button, the task is added to the pending list and the input field is cleared.
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //storing the tasks in local storage so that they persist even after the page is refreshed


function saveTasks(){ //function to save the tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask); //adding a click event listener to the add button
taskInput.addEventListener("keypress", function(event){ //adding a keypress event listener to the input field
    if (event.key === "Enter"){ //checking if the key pressed is Enter
        addTask(); //calling the addTask function
    }
});



function addTask() {
    const taskText = taskInput.value.trim(); //trim removes whitespace from both ends of a string
    if (taskText === ""){
        alert("Please enter a task");
        return;
    }
    

    // task object bnayenge- kyuki aage jaakr timestamp, status, text sb store krna hoga
    const task = {
       id: Date.now(), //unique id for each task
       text: taskText, //task text
       completed: false, //task status
       createdAt: new Date().toLocaleString(), //timestamp for each task
       completedAt: null //timestamp for completed task
    };

    tasks.push(task); //added the task object to the tasks array

    saveTasks(); //to save the tasks in local storage

    renderTasks(); //to display the tasks in the pending list
    taskInput.value = ""; //clear the input field after adding the task

    console.log(tasks);
}






function renderTasks(){ //to display the tasks in the pending list
    pendingList.innerHTML=""; //clear the pending list before rendering the tasks
    completedList.innerHTML=""; //clear the completed list before rendering the tasks

    //remove the mascot when task is added
    const pendingTasks = tasks.filter(task => !task.completed); //filtering the tasks array to get the pending tasks
    const completedTasks = tasks.filter(task => task.completed); //filtering the tasks array to get the completed tasks

    //empty states
    pendingEmpty.style.display = pendingTasks.length === 0 ? "flex" : "none"; //if there are no pending tasks, display the mascot
    completedEmpty.style.display = completedTasks.length === 0 ? "flex" : "none"; //if there are no completed tasks, display the mascot


    //updating the badge counts and the mascot display based on the number of pending and completed tasks
    pendingBadge.textContent = `${pendingTasks.length} Pending`; //updating the pending tasks count
    completedBadge.textContent = `${completedTasks.length} Completed`; //updating the completed tasks count
    

    //updating the progress bar and the donut chart based on the number of pending and completed tasks
        totalTasks.textContent = tasks.length; //updating the total tasks count
        pendingCount.textContent = pendingTasks.length; //updating the pending tasks count
        completedCount.textContent = completedTasks.length; //updating the completed tasks count
        
    //Donut chart
    let progress = 0;
    if (tasks.length !==0){
        progress = Math.round((completedTasks.length / tasks.length) * 100); //calculating the progress percentage
    }

    progressPercent.textContent = `${progress}%`; //updating the progress percentage

    donutChart.style.setProperty("--progress", `${progress}%`); //updating the progress percentage in the donut chart






    tasks.forEach(function(task){ //traversing the tasks array one by one
        const taskCard=document.createElement("div"); //creating a div element for each task mtlb <div></div> section create hua
        taskCard.classList.add("task-card"); //<div class="task-card"></div> jaisa bnn gya
        if (task.completed) {
            taskCard.classList.add("completed"); //adding the completed class to the task card if the task is completed
        }
        else {
            taskCard.classList.add("pending"); //adding the pending class to the task card if the task is pending
        }
    
        //adding the task text and timestamp to the div element
        const taskText=document.createElement("h3"); //creating a h3 element for the task text
        taskText.textContent = task.text; //setting the task text

        const taskTime=document.createElement("p"); //creating a p element for the timestamp
        if(task.completed){
        taskTime.textContent = "Completed: " + task.completedAt;
        }

        else{
        taskTime.textContent = "Added: " + task.createdAt;
        }






        //adding the task actions to the div element
        const taskActions = document.createElement("div"); //creating a div element for the task actions
        taskActions.classList.add("task-actions"); //adding the task-actions class to the div element

        const completeBtn = document.createElement("button"); //creating a button element for the complete action
        completeBtn.classList.add("complete-btn"); //adding the complete-btn class to the button element
        completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; //adding the check icon to the button element
        completeBtn.addEventListener("click", function(){ //adding a click event listener to the complete button
            task.completed = true; //setting the task status to completed
            task.completedAt = new Date().toLocaleString(); //setting the timestamp for the completed task

            saveTasks(); //to save the tasks in local storage
            renderTasks(); //re-rendering the tasks to update the UI
        });


        const editBtn = document.createElement("button"); //creating a button element for the edit action
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; //adding the edit icon to the button element
        editBtn.addEventListener("click", function(){ //adding a click event listener to the edit button
            const updatedTask = prompt("Edit the task:", task.text); //prompting the user to edit the task
            if (updatedTask !== null && updatedTask.trim() !== "") { //checking if the user entered a valid task
                task.text = updatedTask.trim(); //updating the task text
                saveTasks(); //to save the tasks in local storage
                renderTasks(); //re-rendering the tasks to update the UI
            }
        });


        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'; //adding the trash icon to the button element
        deleteBtn.addEventListener("click", function(){ //adding a click event listener to the delete button
            tasks = tasks.filter(function(item){
                return item.id !== task.id; //filtering the tasks array to remove the task with the matching id
            })
            saveTasks(); //to save the tasks in local storage
            renderTasks(); //re-rendering the tasks to update the UI
        });


        const undoBtn = document.createElement("button");
        undoBtn.classList.add("undo-btn");
        undoBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'; //adding the undo icon to the button element
        undoBtn.addEventListener("click", function(){ //adding a click event listener to the undo button
            task.completed = false; //setting the task status to pending
            task.completedAt = null; //removing the timestamp for the completed task
            saveTasks();
            renderTasks(); //re-rendering the tasks to update the UI
        });




        
        if (task.completed) {
            taskActions.appendChild(undoBtn); //adding the undo button to the task actions div
        }
        else{
            taskActions.appendChild(completeBtn); //adding the complete button to the task actions div
        }

        if (!task.completed) {
            taskActions.appendChild(completeBtn);
        }
        if (!task.completed) {
            taskActions.appendChild(editBtn);
        }
        taskActions.appendChild(deleteBtn); //adding the delete button to the task actions div



        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");
        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskTime);
        taskCard.appendChild(taskInfo);
        taskCard.appendChild(taskActions);

        if (task.completed) {
            completedList.appendChild(taskCard);
        } else {
            pendingList.appendChild(taskCard);
        }

    });
}

//clear workspace 
        clearBtn.addEventListener("click", function(){

            if(tasks.length === 0){
                alert("There are no tasks to clear!");
                return;
            }

            const confirmClear = confirm("Are you sure you want to clear all tasks?");

            if(confirmClear){
                tasks = [];
                saveTasks();
                renderTasks();
            }

        });

renderTasks();
