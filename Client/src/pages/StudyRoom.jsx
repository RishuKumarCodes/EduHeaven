import React, { useState, useEffect } from "react";
import { Clock, Coffee } from "lucide-react";
import EventPopup from '../components/eventPopup'
function StudyRoom() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 }); // Start timer from zero
  const [isRunning, setIsRunning] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get the current month, year, and day information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week 
  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1); // Days [1, 2, ..., daysInMonth]
  const [selectedDay, setSelectedDay] = useState(null); // Selected day for the popup

  // Dummy events for demonstration
  

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1; // Increment seconds
          if (newSeconds === 60) {
            const newMinutes = prevTime.minutes + 1; // Increment minutes
            if (newMinutes === 60) {
              const newHours = prevTime.hours + 1; // Increment hours
              return { hours: newHours, minutes: 0, seconds: 0 }; // Reset minutes and seconds when hours increase
            }
            return { ...prevTime, minutes: newMinutes, seconds: 0 }; // Reset seconds when minutes increase
          }
          return { ...prevTime, seconds: newSeconds }; // Just increment seconds
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  useEffect(() => {
    // Set up an interval to update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    
    return () => clearInterval(timer);
  }, []);

  // const handleStart = () => setIsRunning(true);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev); // Toggle between start and pause
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset timer to zero
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const events = {
    5: { title: "Meeting", description: "Project discussion", time: "10:00 AM", location: "Zoom" },
    15: { title: "Workshop", description: "React Workshop", time: "2:00 PM", location: "Office" },
  };

  const handleDayClick = (day) => {
     const event = events[day] || { title: "No events for this day." };
    if (event) {
      setSelectedDay({ day, ...event }); // Set the selected day's event data
    }
  };

  const handleClosePopup = () => {
    setSelectedDay(null); // Close the popup
  };

  // Render blank spaces for the first week
  const blankDays = Array(firstDayOfMonth).fill(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Study Room</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Next goal: 2 hours</span>
          <span className="text-gray-400">Total uptime today: 4 hours</span>
        </div>
      </div>
      {/* Timer Section */}
      <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center justify-center">
        <h1 className="text-lg">Timer</h1>
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">
            <span>{String(time.hours).padStart(2, "0")}</span>
            <span className="text-gray-400">:</span>
            <span>{String(time.minutes).padStart(2, "0")}</span>
            <span className="text-gray-400">:</span>
            <span>{String(time.seconds).padStart(2, "0")}</span>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleStartPause}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Notes and Todos */}
      <div className="grid grid-cols-1 gap-8">
        {/* Other sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl text-white">Add new tasks</h2>
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
              +
            </button>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl text-white">Add new note</h2>
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
              +
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold text-white">Calendar</h1>
          <h2 className="text-xl text-gray-300">Today's {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDate.getDay()]}</h2>
          <h3 className="text-xl text-gray-400 mb-4"> {new Date(currentTime.getTime()).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</h3>
          <br />
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="px-4 py-2 bg-purple-700 rounded">
                Prev
              </button>
              <h2 className="text-lg font-bold">
                {currentDate.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <button onClick={handleNextMonth} className="px-4 py-2 bg-purple-700 rounded">
                Next
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Day Labels */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-bold text-gray-500">
                  {day}
                </div>
              ))}

              {/* Blank Days */}
              {blankDays.map((_, index) => (
                <div key={`blank-${index}`} className="p-3"></div>
              ))}

              {/* Calendar Days */}
              {daysArray.map((day) => {
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          const hasEvent = events.hasOwnProperty(day);

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`flex items-center justify-center p-3 rounded-lg text-white cursor-pointer transition-all duration-200 ease-in-out 
                ${isToday ? "bg-purple-600 hover:bg-purple-700" : ""}
                ${hasEvent && !isToday ? "bg-purple-500 hover:bg-purple-700" : ""}
                ${!isToday && !hasEvent ? "bg-gray-700 hover:bg-purple-600" : ""}`}
            >
              {day}
            </div>
          );
        })}
            </div>
          </div>
        </div>
      </div>
      {selectedDay && <EventPopup event={selectedDay} onClose={handleClosePopup} />}

      {/* Discussion Rooms */}
      <div className="grid grid-cols-3 gap-8">
        {["Room 1", "Room 2", "Room 3"].map((room) => (
          <div key={room} className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">{room}</h3>
            <p className="text-gray-400 text-sm mb-4">4 students studying</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg w-full">
              Join Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyRoom;
