import localFont from "next/font/local";
import { useState } from "react";

let subjects = [
  {
    title: "Mathe",
    tasks: [
      {
        title: "S. 33/14",
        date: new Date(2024, 9, 26),
        checked: false,
        alarmed: false
      }
    ]
  },
  {
    title: "Bio",
    tasks: [
      {
        title: "S. 33 lesen",
        date: new Date(2024, 9, 27), // Month: Oct == 9
        checked: false,
        alarmed: false
      }
    ]
  }
]

const subjectNames = subjects.map(subject => subject.title)

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0])
  const [selectedDate, setSelectedDate] = useState(new Date())

  function showDialog(){
    const dialog = document.getElementById("addDialog");
    dialog.show()
  }
  function hideDialog(){
    const dialog = document.getElementById("addDialog");

    const selectedDateFormatted = new Date(selectedDate);
    subjects.filter(subject => subject.title === selectedSubject)[0].tasks.push({title: taskTitle, date: selectedDateFormatted, checked: false})

    setTaskTitle("")
    setSelectedSubject(subjectNames[0])
    setSelectedDate(Date.now())
    dialog.close()
  }
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <dialog id="addDialog">
        <select value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
          {subjectNames.map(subjectName => <option value={subjectName}>{subjectName}</option>)}
        </select>
        <input value={taskTitle} onChange={(event)=>setTaskTitle(event.target.value)}></input>
        <input value={selectedDate} type="date" onChange={(event)=>setSelectedDate(event.target.value)}></input>
        <button class="submit" onClick={hideDialog}>Hinzuf&uuml;gen</button>
      </dialog>
      <button class="additem" onClick={showDialog}>+</button>
      <div className="main">
        <div className="subjects">
          {subjects.map(subject => <Subject title={subject.title} tasks={subject.tasks}></Subject>)}
        </div>
      </div>
    </main>
  );
}

function isExpired(taskDate) {
  const today = new Date()
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  return (taskDate <= tomorrow)
} 

function checkForDeadline() {
  for (let i = 0; i < subjects.length; i++) {
    const tasks = subjects[i].tasks
    for (let j = 0; j < tasks.length; j++) {
      if (isExpired(tasks[j].date) && !tasks[j].checked && !tasks[j].alarmed) {
        tasks[j].alarmed = true
        alert("alarm")
      }
    }
  }
}

setInterval(checkForDeadline, 10000)

export function Subject(props) {

  function saveSwitchState(newState, task) {
    const isToggled = newState == "on"
    console.log(isToggled)
    //task.checked = isToggled
  }

  return (
    <div className="subject">
    <div className="subjectname"><span>{props.title}</span></div> 
    <div className="tasks">
        {props.tasks.map(task => 
          <div className="task">
            <input onChange={event => saveSwitchState(event.target.value, task)} type="checkbox"/>
            <span className={isExpired(task.date) ? "expired" : ""}>{task.title}</span>
          </div>
        )}
    </div>
    </div>
  )
}

