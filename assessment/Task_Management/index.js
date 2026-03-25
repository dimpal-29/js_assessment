class CustomerFormHandler{

constructor(){

this.form=document.getElementById("taskForm")
this.taskList=document.getElementById("taskList")
this.message=document.getElementById("message")

this.tasks=JSON.parse(localStorage.getItem("tasks"))||[]

this.form.addEventListener("submit",(e)=>this.handleSubmit(e))

this.displayTasks()

}

validateForm(title,desc,date,priority,status){

if(title.length<10){
this.showMessage("Title must be at least 10 characters")
return false
}

if(!desc||!date||!priority||!status){
this.showMessage("All fields required")
return false
}

return true

}

showMessage(msg){

this.message.innerText=msg

setTimeout(()=>{
this.message.innerText=""
},2000)

}

saveToLocalStorage(){

localStorage.setItem("tasks",JSON.stringify(this.tasks))

}

clearForm(){

this.form.reset()

}

handleSubmit(e){

e.preventDefault()

let title=document.getElementById("title").value
let desc=document.getElementById("desc").value
let date=document.getElementById("date").value
let priority=document.getElementById("priority").value
let status=document.getElementById("status").value

if(!this.validateForm(title,desc,date,priority,status)){
return
}

let task={
title,
desc,
date,
priority,
status
}

this.tasks.push(task)

this.saveToLocalStorage()

this.displayTasks()

this.clearForm()

this.showMessage("Task Added Successfully")

}

displayTasks(){

this.taskList.innerHTML=""

this.tasks.forEach((task,index)=>{

let li=document.createElement("li")

li.innerHTML=`

<b>${task.title}</b><br>
${task.desc}<br>
${task.date}<br>
${task.priority}<br>
${task.status}<br>

<button class="edit" onclick="app.editTask(${index})">Edit</button>

<button class="delete" onclick="app.deleteTask(${index})">Delete</button>

`

this.taskList.appendChild(li)

})

}

deleteTask(index){

this.tasks.splice(index,1)

this.saveToLocalStorage()

this.displayTasks()

this.showMessage("Task Deleted")

}

editTask(index){

let task=this.tasks[index]

document.getElementById("title").value=task.title
document.getElementById("desc").value=task.desc
document.getElementById("date").value=task.date
document.getElementById("priority").value=task.priority
document.getElementById("status").value=task.status

this.deleteTask(index)

}

}

const app=new CustomerFormHandler()