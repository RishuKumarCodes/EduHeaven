import React, { useState, useEffect } from 'react';
import { Clock, Coffee } from 'lucide-react';

function StudyRoom() {
    const [time, setTime] = useState({ hours: 0, minutes: 45, seconds: 30 });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const newSeconds = prevTime.seconds - 1;
                    if (newSeconds < 0) {
                        const newMinutes = prevTime.minutes - 1;
                        if (newMinutes < 0) {
                            const newHours = prevTime.hours - 1;
                            if (newHours < 0) {
                                setIsRunning(false);
                                return { hours: 0, minutes: 0, seconds: 0 };
                            }
                            return { hours: newHours, minutes: 59, seconds: 59 };
                        }
                        return { ...prevTime, minutes: newMinutes, seconds: 59 };
                    }
                    return { ...prevTime, seconds: newSeconds };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => setIsRunning(true);
    const handleReset = () => {
        setIsRunning(false);
        setTime({ hours: 0, minutes: 45, seconds: 30 });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Study Room</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400">Next goal: 2 hours</span>
                    <span className="text-gray-400">Total uptime today: 4 hours</span>
                    {/* <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Coffee className="w-5 h-5" />
                        Take a break
                    </button> */}
                </div>
            </div>
            <div className="alert rounded-md p-5 bg-green-800">
                <h1>dummy-UI how it would look in future.</h1>
            </div>
            {/* Timer Section */}
            <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center justify-center">
                <h1>Study-Timer | Break | short-break</h1>
                <div className="text-center">
                    <div className="text-6xl font-bold mb-4">
                        <span>{String(time.hours).padStart(2, '0')}</span>
                        <span className="text-gray-400">:</span>
                        <span>{String(time.minutes).padStart(2, '0')}</span>
                        <span className="text-gray-400">:</span>
                        <span>{String(time.seconds).padStart(2, '0')}</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleStart}
                            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
                        >
                            {isRunning ? 'Pause' : 'Start'}
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
            {/* notes and todos. */}
            <div className=" p-8 rounded-xl flex items-center justify-center gap-9">
                <div className="bg-gray-800 p-8 rounded-xl ">
                    <h2>add new tasks</h2>
                    <br />
                    <button
                        onClick={handleStart}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
                    >
                        +
                    </button>
                </div>
                <div className=" bg-gray-800 p-8 rounded-xl ">
                    <h2>add new note</h2>
                    <br />
                    <button
                        onClick={handleStart}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
                    >
                        +
                    </button>
                </div>
                <div className=" bg-gray-800 p-8 rounded-xl ">
                    <h1>friends active:</h1>
                    <br />
                    <p>George</p>
                    <p>Rahul</p>
                    <p>Mukesh</p>
                </div>
                <div className=" bg-gray-800 p-8 rounded-xl ">
                    <h1>CALENDER</h1>
                    <h1>Today's wednesday</h1>
                    <h2>9: 45 pm</h2>
                    <br />
                    <div className="calender">
                        <div className="row flex w-full justify-between my-4">
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>1</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>2</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>3</div>
                        </div>
                        <div className="row flex w-full justify-between my-4">
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>1</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>2</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>3</div>
                        </div>
                        <div className="row flex w-full justify-between my-4">
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>1</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>2</div>
                            <div className=' bg-purple-600 px-2.5 rounded-sm'>3</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Discussion Rooms */}
            <div className="grid grid-cols-3 gap-8">
                {['Room 1', 'Room 2', 'Room 3'].map((room) => (
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