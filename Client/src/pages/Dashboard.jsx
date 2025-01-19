import React from 'react';
import { Trophy, Target } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Great! keep it up</span>
        </div>
      </div>
      <div className="alert rounded-md p-5 bg-green-800">
                <h1>These are dummy data. we are working hard to make it functional.</h1>
            </div>
      {/* Stats Overview */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Tasks</p>
            <p className="text-2xl font-bold">123</p>
            <p className="text-green-400">30 completed</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Hours Studied</p>
            <p className="text-2xl font-bold">40</p>
            <p className="text-purple-400">+5 from last week</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Streak</p>
            <p className="text-2xl font-bold">500</p>
            <p className="text-orange-400">days</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Productivity</p>
            <p className="text-2xl font-bold">200%</p>
            <p className="text-blue-400">above average</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Study Hours</h3>
          <div className="h-48 flex items-end space-x-2">
            {[4, 6, 3, 7, 5, 8, 6].map((value, index) => (
              <div
                key={index}
                className="bg-purple-600 rounded-t w-full"
                style={{ height: `${value * 12}%` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Goals Completed</h3>
          <div className="h-48 flex items-end space-x-2">
            {[5, 7, 4, 8, 6, 9, 7].map((value, index) => (
              <div
                key={index}
                className="bg-blue-600 rounded-t w-full"
                style={{ height: `${value * 10}%` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Games played</h3>
          <div className="h-48 flex items-end space-x-2">
            {[5, 7, 4, 8, 6, 9, 7].map((value, index) => (
              <div
                key={index}
                className="bg-green-600 rounded-t w-full"
                style={{ height: `${value * 10}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement & Leaderboard */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" />
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
          </div>
          <div className="space-y-4">
            {['Study Champion', 'Perfect Week', 'Goal Crusher'].map((achievement) => (
              <div key={achievement} className="flex items-center gap-4 bg-gray-700 p-3 rounded-lg">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-blue-500" />
            <h3 className="text-lg font-semibold">Leaderboard</h3>
          </div>
          <div className="space-y-4">
            {['Alex', 'Sarah', 'John'].map((name, index) => (
              <div key={name} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">#{index + 1}</span>
                  <span>{name}</span>
                </div>
                <span className="text-purple-400">{1000 - index * 100} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;