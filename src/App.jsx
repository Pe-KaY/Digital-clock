import { useEffect, useState } from "react"
import "./App.css"

function App() {
  // define time variable which is a new Date Object
  const [time, setTime] = useState(new Date())
  // this will be used to set the clock mode between 12hours clock and 24 hours clock
  const [mode, setMode] = useState("12Hours")

  // extract hours ,minutes and seconds from the time object
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // formats time by adding "0" if it a single digit
  // example 7:00 will be 07:00 same with minutes and seconds
  function timeformat(t) {
    return `${t.toString().padStart(2, "0")}`
  }

  // this is a 24 Hour clock format as default
  function twentyFourHour() {
    return `${timeformat(hours)}:${timeformat(minutes)}:${timeformat(seconds)}`
  }

  // convert the  24 hour clock format to 12 hour clock
  function twelveHour() {
    const gmthours = hours > 12 ? hours - 12 : hours
    const amOrpm = hours >= 12 ? "pm" : "am"
    return `${timeformat(gmthours)}:${timeformat(minutes)}:${timeformat(
      seconds
    )}${amOrpm}`
  }

  // this function switches the mode start variable between 12hour and 24hour clock
  function switchMode() {
    const currentMode = mode === "24Hours" ? "12Hours" : "24Hours"
    setMode(currentMode)
  }

  // this is the function that will display the clock based on the mode
  function displayClock() {
    if (mode === "12Hours") {
      return twelveHour()
    }
    return twentyFourHour()
  }

  useEffect(() => {
    // update the time every second by assigning new Date to get updated time
    let intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      // cleans up the interval before unmounting
      clearInterval(intervalId)
      console.log("interval cleared")
    }
  }, [])

  return (
    <div id="clock">
      <div className="clock__wrapper">
        <h1>DIGITAL CLOCK</h1>
        <p className="clockdisplay">{displayClock()}</p>
        <div className="clock__clockmodeWrapper">
          <i className="fa-solid fa-rotate" onClick={switchMode}></i>
          <p>{mode}</p>
        </div>
      </div>
    </div>
  )
}

export default App
