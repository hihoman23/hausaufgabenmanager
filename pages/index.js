import { getPermission, sendNotification } from "@/helper/notifier";
import { useEffect, useState, useReducer } from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const subjectNames = ["Mathe", "Bio", "Phy", "Deu", "Eng", "Fra", "Chem", "Mu", "Sp"]

function makeSubject(name) {
  this.title = name;
  this.tasks = [];
}

let subjects = subjectNames.map(name => new makeSubject(name))

// let subjects = [
//   {
//     title: "Mathe",
//     tasks: [
//       {
//         title: "Test",
//         date: new Date(2024, 10, 30),
//         checked: false
//       },
//       {
//         title: "Test",
//         date: new Date(2024, 9, 27),
//         checked: false
//       }
//     ]
//   },
//   {
//   title: "Bio",
//     tasks: [
//       {
//         title: "Test",
//         date: new Date(2024, 10, 30),
//         checked: false
//       },
//       {
//         title: "Test",
//         date: new Date(2024, 10, 30),
//         checked: false
//       }
//     ]
//   }
// ]

let subjectNum = 0;

let forceUpdates = []
function forceUpdate(){
  for (let i = 0; i < forceUpdates.length; i++) {
    forceUpdates[i]()
  }
}

export default function Home() {
  const [,forceUpdate] = useReducer(x => x + 1, 0);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0])
  const [selectedDate, setSelectedDate] = useState(new Date())

  forceUpdates.push(forceUpdate)

  useEffect (() => {
    getPermission(window)
  }, [])

  function tasksAvailable() {
      const tasks = subjects.flatMap(subject => subject.tasks);
      return tasks.length !== 0;
  }

  function showDialog(){
    const dialog = document.getElementById("addDialog");
    setDialogOpen(true)
    dialog.show()
  }

  function closeDialog() {
    const dialog = document.getElementById("addDialog");
    setDialogOpen(false)
    setTaskTitle("")
    setSelectedSubject(subjectNames[0])
    setSelectedDate(new Date())
    dialog.close()

  }

  function hideDialog(){
    const dialog = document.getElementById("addDialog");
    setDialogOpen(false)
    const selectedDateFormatted = new Date(selectedDate + " 0:0:0");
    if (taskTitle !== "") {
      subjects.filter(subject => subject.title === selectedSubject)[0].tasks.push({title: taskTitle, date: selectedDateFormatted, checked: false, alarmed: false})
    }

    setTaskTitle("")
    setSelectedSubject(subjectNames[0])
    setSelectedDate(new Date())
    dialog.close()
  }
  return (
    <div className={inter.className} style={{height: '100vh'}}>
    <div className="flex flex-start justify-between p-4">
    <div className="ml-4 mt-4">
    <Image
      src="/logo.png"
      width={150}
      height={110}
      alt="Logo"
    />
    </div>
    <div className="flex flex-center items-center">
      <span className="text-xl">SchoolCHECK</span>
    </div>
    <div style={{width: '150px'}}></div>
    </div>
    <main className={`flex flex-col gap-8 row-start-2 items-center text-gray-700`}>
      <button class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2" 
      onClick={showDialog}>
       <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-700 dark:fill-white" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
       Aufgabe hinzuf&uuml;gen
      </button>

       
      <div className="subjects">
        
          {
            tasksAvailable() ?
            subjects.map(subject => (subject.tasks.length !== 0) ? <Subject title={subject.title} tasks={subject.tasks}></Subject>: "")
            :
            <span>Du hast keine Aufgaben</span>
          }
      </div>

      <dialog id="addDialog">
        
        <div className="border-2 flex flex-col p-12 rounded-md space-y-4 bg-slate-300">
        <div className="cancel">
        <svg onClick={closeDialog} fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
            {subjectNames.map(subjectName => <option value={subjectName}>{subjectName}</option>)}
          </select>
          <input value={taskTitle} onChange={(event)=>setTaskTitle(event.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aufgabe" required />
          <input class="datepicker bg-gray-50 text-black dark:bg-gray-700 dark:text-white" value={selectedDate} type="date" onChange={(event)=>setSelectedDate(event.target.value)}></input>
          <button onClick={hideDialog} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Hinzuf&uuml;gen</button>
        </div>
      </dialog>
    </main>
    </div>
  );
}

function isExpired(taskDate) {
  const today = new Date()
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  return (taskDate <= tomorrow)
} 

function deleteTask(tasks, task) {
  const taskIndex = tasks.indexOf(task)
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }
  forceUpdate()
}

function checkForDeadline() {
  let expired = false
  let toDelete = []
  for (let i = 0; i < subjects.length; i++) {
    const tasks = subjects[i].tasks
    for (let j = 0; j < tasks.length; j++) {
      if (isExpired(tasks[j].date) && !tasks[j].checked && !tasks[j].alarmed) {
        if (tasks[j].date < new Date()) {
          toDelete.push({tasks: tasks, task: tasks[j]})
        } else {
          expired = true
          tasks[j].alarmed = true
        }
      }
    }
  }
  for (let i = 0; i < toDelete.length; i++) {
    deleteTask(toDelete[i].tasks, toDelete[i].task)
  }
  if (expired) {
    sendNotification()
  }
}

setInterval(checkForDeadline, 10000)


export function Subject(props) {
  
  function saveSwitchState(newState, task) {
    task.checked = newState
  }

  function generateID() {
    subjectNum++;
    return "a"+subjectNum
  }

  return (
    <div className="subject">
    <div className="subjectname"><span className="text-xl">{props.title}</span></div> 
    <div className="tasks">
      {props.tasks.sort((task1, task2) => task1.date - task2.date).map(task => 
        <div className="task">
          <input className="checkbox" id={generateID()} onChange={event => saveSwitchState(event.target.checked, task)} type="checkbox"/>
          <label htmlFor={"a"+subjectNum}>{task.title}</label>
          {
            isExpired(task.date) &&
            <div className="expired">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"/></svg>
            </div>
          }
          <div onClick={() => deleteTask(props.tasks, task)}> 
            <svg className="deletetask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

