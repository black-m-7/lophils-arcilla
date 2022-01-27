import { useState, useEffect } from "react";

const messages = [
  {
    date: new Date(2022, 0, 12, 4, 4, 0, 0),
    emailSubject: "New project 3 {NEW-10707/1715}",
    sender: {
      name: "Leo M'anoban",
      email: "sbtest.khr@gmail.com"
    },
    receiver: {
      name: "Isabel Bowen",
      email: "sbtest.isabel@gmail.com"
    },
    content: 
    `Leo M'anoban \n
    12 Jan 2021 03:41 PM
    `,
    tags: [
      "New Project 3/admin",
      "New Project 3",
      "Mountain Homes Construction/New Matter",
      "Mountain Homes Construction"
    ]
  },
  {
    date: new Date(2022, 0, 12, 3, 41, 0, 0),
    emailSubject: "New project 1 {NEW-10708/1716}",
    sender: {
      name: "Leo M'anoban",
      email: "sbtest.khr@gmail.com"
    },
    receiver: {
      name: "Isabel Bowen",
      email: "sbtest.isabel@gmail.com"
    },
    content: 
    `Leo M'anoban\n
    12 Jan 2021 03:41 PM
    `,
    tags: [
      "Mountain Homes Construction",
      "New Project 1",
      "New Project 3/admin",
      "New Project 3",
      "Mountain Homes onstruction/New Matter",
      "Test"
    ]
  },
  {
    date: new Date(2022, 0, 12, 3, 41, 0, 0),
    emailSubject: "Related Email Test_Barrister_Brief {JON-9001/540}",
    sender: {
      name: "Leo M'anoban",
      email: "sbtest.khr@gmail.com"
    },
    receiver: {
      name: "Isabel Bowen",
      email: "sbtest.isabel@gmail.com"
    },
    content: 
    `Leo M'anoban\n
    12 Jan 2021 03:41 PM
    `,
    tags: [
      "Jona Alonzo/ABCD Inc. Dispute MES",
      "Jona Alonzo",
      "Test 1",
      "Test 2"
    ]
  },
  {
    date: new Date(2022, 0, 12, 3, 41, 0, 0),
    emailSubject: "With Matter Number 3 {NEW-10708/1716}",
    sender: {
      name: "Leo M'anoban",
      email: "sbtest.khr@gmail.com"
    },
    receiver: {
      name: "Isabel Bowen",
      email: "sbtest.isabel@gmail.com"
    },
    content: 
    `Leo M'anoban\n
    12 Jan 2021 03:41 PM
    `,
    tags: [
      "With Matter Number 3/admin",
      "With Matter Number 3",
      "Test 1",
      "Test 2",
      "Test 3"
    ]
  },
]
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getTimeElapsed(date) {
  const now = new Date()
  const nowTime = now.getTime()
  const dateTime = date.getTime()

  let timeDiff =  (nowTime - dateTime) / 1000
  const seconds = Math.floor(timeDiff % 60)
  timeDiff = Math.floor(timeDiff / 60);
  const minutes = timeDiff % 60
  timeDiff = Math.floor(timeDiff / 60);
  const hours = timeDiff % 24;
  timeDiff = Math.floor(timeDiff / 24);
  const days = timeDiff;
  return {
    seconds,
    minutes,
    hours,
    days
  }
}

function App() {
  const [unread, setUnread] = useState([messages[0],messages[1],messages[2]])
  const [read, setRead] = useState([messages[3]])
  const [checked, setChecked] = useState([]);
  const [isChecked , setIsChecked] = useState(false);
  const save = () => {
    if(checked) {
      setRead([...read, ...checked])
    }
  } 
  const deleteItem = () => {
    if(checked) {
      let newUnread = unread
      let newRead = read
      checked.forEach((c) => {
        if (unread.includes(c)) {
          newUnread = newUnread.filter((e) => {return e !== c})
        } 
        if (read.includes(c)) {
          newRead = newRead.filter((e) => {return e !== c})
        }
      })
      setUnread(newUnread)
      setRead(newRead)
    }
  }

  useEffect(() => {
    if (isChecked) {
      setChecked([...read, ...unread])
    }
  }, [isChecked, read, unread]);
  

  return (
    <div className="w-3/6 m-auto divide-y divide-neutral-200">
      <header className="flex justify-between mx-2 my-4">
        <div className="flex divide-x divide-neutral-200">
          <div>
            <input className="mr-2" type="checkbox" onChange={() => {setIsChecked(prev => !prev)}}/>
            <button onClick={()=>save()} className="px-4 py mr-2 rounded-md border border-emerald-200 bg-emerald-100 text-xs text-emerald-600">SAVE</button>
            <button className="px-4 py mr-2 rounded-md border border-neutral-200 bg-neutral-100 text-xs text-neutral-600">MANAGE FITLERS</button>
          </div>
          <div>
            <button onClick={()=>deleteItem()} className="px-4 py mx-2 rounded-md border border-red-200 bg-red-100 text-xs text-red-600">DELETE</button>
          </div>
        </div>
        <div>
        ‹ 50 of 150 ›
        </div>
      </header>
      <main>
        <div className="mb-10">
          <div className=" flex justify-between text-sm text-neutral-500 m-2">
            <div>UNREAD</div>
            <div className="rounded-full bg-neutral-500 text-neutral-200 px-2 py-1">{unread.length}˅</div>
          </div>
          <div>{unread.sort((a,b) => a.date.getTime()-b.date.getTime()).map((msg, i) => <Message key={i} message={msg} category="unread" read={{read, setRead}} unread={{unread, setUnread}} checked={{checked, setChecked}} allChecked={isChecked}/>)}</div>
          
        </div>
        <div className="opacity-60">
          <div className=" flex justify-between text-sm text-neutral-500 m-2">
              <div>Recently Saved</div>
              <div className="rounded-full bg-neutral-500 text-neutral-200 px-2 py-1">{read.length}˅</div>
            </div>
            <div>{read.sort((a,b) => a.date.getTime()-b.date.getTime()).map((msg, i) => <Message key={i} message={msg} category="read" read={{read, setRead}} unread={{unread, setUnread}} checked={{checked, setChecked}} allChecked={isChecked}/>)}</div>
          </div>
      </main>
    </div>
  );
}

function Message(props) {
  const { message, category, read, unread, checked, allChecked } = props
  const [ opened, setOpened ] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const timeElapsed = getTimeElapsed(message.date)

  const handleClick = () => {
    if (category === "unread") {
      read.setRead([...read.read, message])
      const newUnread = unread.unread.filter((e) => {return e !== message})
      unread.setUnread(newUnread)
    } else {
      unread.setUnread([...unread.unread, message])
      const newRead = read.read.filter((e) => {return e !== message})
      read.setRead(newRead)
    }
  }

  const handleCheck = () => {
    setIsChecked(prev=>!prev)
  }

  useEffect(()=>{
    if(isChecked) {
      checked.setChecked([...checked.checked, message])
    }else {
      let newChecked = checked.checked
      newChecked = newChecked.filter((e) => {return e!==message})
      checked.setChecked(newChecked)
    }
    console.log(checked.checked)
  },[isChecked])
  
  if (opened) {
    return (
      <div className="border border-neutral-200 rounded-lg p-2 divide-y divide-dashed divide-neutral-200">
        <div className="flex justify-between items-center m-2">
          <div className="flex items-center">
            <input checked={allChecked? true: false} className="mr-4" type="checkbox" onChange={()=>handleCheck()}></input>
            <div className={`w-3.5 h-3.5 mr-4 ${category === "unread" ? "bg-green-600" : "bg-red-600"} rounded-full`} onClick={()=>handleClick()}/>
            <div className="mr-4 px-2 h-12 py-px flex flex-col bg-neutral-100 border-neutral-200 rounded border">
              <div>{message.date.getDate()}</div>
              <div className="text-xs">{months[message.date.getMonth()]}</div>
            </div>
            <div className="mr-4 bg-neutral-600 text-neutral-200 w-7 h-7 rounded-full justify-center items-center flex">TA</div>
            <div className="flex flex-col" onClick={() => setOpened(false)}>
              <div>Fwd: {message.emailSubject}</div>
              <div className="text-xs text-neutral-600">{message.sender.name} ‹{message.sender.email}› {monthsFull[message.date.getMonth()]} {message.date.getDate()}, {message.date.getFullYear()} at {message.date.getHours() > 12 ? message.date.getHours()-12 : message.date.getHours()}:{message.date.getMinutes() < 10 ? `0${message.date.getMinutes()}` : message.date.getMinutes()}{message.date.getHours() > 12 ? 'PM' : 'AM'}</div>
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="mr-4 h-5 bg-yellow-100 text-yellow-400 px-px text-xs rounded">
              {timeElapsed.days ? `${timeElapsed.days}days` : timeElapsed.hours ? `${timeElapsed.hours}hrs` : timeElapsed.minutes ? `${timeElapsed.minutes}mins` : `${timeElapsed.seconds}sec`}
            </div>
            <div>˅</div>
          </div>
        </div>
        <div className="flex flex-row justify-between m-2 my-4 p-2 relative">
          <div>
            {message.content.split("\n").map((e,i) => <div key={i}>{e}</div>)}
            <br/>
            ---------- Forwarded Message ---------- <br/>
            From: {message.sender.name} ‹{message.sender.email}› <br/>
            Date: {message.date.toString()} <br/>
            Subject: {message.emailSubject} <br/>
            To: {message.receiver.name} ‹{message.receiver.email}›
          </div>
          <div className="flex flex-wrap w-2/5 justify-end absolute right-1">
            {message.tags.map((tag, index) => {
              if(index < 3) {
                return <div key={index} className="m-1 p-px text-xs text-sky-600 bg-sky-100 border-sky-200 border rounded-md">{tag}</div>
              } else return <></>
            })}
            {message.tags.length > 3 ? <div className="m-1 p-px text-xs text-sky-600 bg-sky-100 border-sky-200 border rounded-md">{`${message.tags.length - 3}+`}</div> : <></>}
          </div>
        </div>
      </div>
    )
  } else {
    return (
        <div className="border border-neutral-200 rounded-lg p-2 flex justify-between items-center m-2">
          <div className="flex items-center">
            <input checked={allChecked? true: false} className="mr-4" type="checkbox" onChange={()=>handleCheck()}></input>
            <div className={`w-3.5 h-3.5 mr-4 ${category === "unread" ? "bg-green-600" : "bg-red-600"} rounded-full`} onClick={() => handleClick()}/>
            <div className="mr-4 px-2 h-12 py-px flex flex-col bg-neutral-100 border-neutral-200 rounded border">
              <div>{message.date.getDate()}</div>
              <div className="text-xs">{months[message.date.getMonth()]}</div>
            </div>
            <div className="mr-4 bg-neutral-600 text-neutral-200 w-7 h-7 rounded-full justify-center items-center flex">TA</div>
            <div className="flex flex-col" onClick={() => setOpened(true)}>
              <div>Fwd: {message.emailSubject}</div>
              <div className="text-xs text-neutral-600">{message.sender.name} ‹{message.sender.email}› {monthsFull[message.date.getMonth()]} {message.date.getDate()}, {message.date.getFullYear()} at {message.date.getHours() > 12 ? message.date.getHours()-12 : message.date.getHours()}:{message.date.getMinutes() < 10 ? `0${message.date.getMinutes()}` : message.date.getMinutes()}{message.date.getHours() > 12 ? 'PM' : 'AM'}</div>
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="flex flex-col">
              <div className="m-1 p-px text-xs text-sky-600 bg-sky-100 border-sky-200 border rounded-md">{message.tags[0]}</div>
              <div className="flex flex-row justify-end">
                <div className="mr-1 p-px text-xs text-sky-600 bg-sky-100 border-sky-200 border rounded-md">{message.tags[1]}</div>
                <div className=" p-px text-xs text-sky-600 bg-sky-100 border-sky-200 border rounded-md">{`${message.tags.length - 2}+`}</div>
              </div>
            </div>
            <div className="m-4 h-5 bg-yellow-100 text-yellow-400 px-px text-xs rounded">
              {timeElapsed.days ? `${timeElapsed.days}days` : timeElapsed.hours ? `${timeElapsed.hours}hrs` : timeElapsed.minutes ? `${timeElapsed.minutes}mins` : `${timeElapsed.seconds}sec`}
            </div>
            <div>{`>`}</div>
          </div>
        </div>
    )
  }
}

export default App;
