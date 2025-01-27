import React from "react";
import { Trophy, Users, Star } from "lucide-react";
import LionComponent from "./LionComponent";
import { Link } from "react-router-dom";

function GameRoom() {
  const games = [
    {
      name: "Hungry Snake",
      difficulty: "Easy",
      path: "snake",
    },
    {
      name: "Tic-Tac-Toe",
      difficulty: "Medium",
      path: "tic-tac-toe",
    },
    {
      name: "Space-Type",
      difficulty: "Medium",
      path: "typing-game",
    },

  ];
  return (
    <>
      {/* nav-bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Game Room</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            <span>1,234 points</span>
          </div>
        </div>
      </div>

      {/* hero-section */}
      <div className="w-[svw] h-[50vh] pb-5">
        <div className="absolute h-1/2 w-[calc(100vw-6rem)] right-0 overflow-hidden ">
          <div className="relative bottom-[45%] left-[30%]">
            <LionComponent />
          </div>
        </div>
        <div className=" flex flex-col justify-center h-full">
          <h1 className=" relative text-[5vw] font-extrabold text-purple-500 py-3 px-28 select-none">
            Enough grinding,
          </h1>
          <h2 className=" relative text-[4vw] font-semibold text-purple-200 py-3 px-28 select-none">
            time to chill & relax!
          </h2>
        </div>
      </div>

      {/* games */}
      <div className="grid grid-cols-3 gap-8">
        {games.map((game) => (
          <Link
            key={game.name}
            to={game.path}
            className="bg-gray-800 p-6 rounded-xl transition duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">{game.name}</h3>
              <div className="flex">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= game.difficulty.length
                        ? "text-yellow-500"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Users className="w-4 h-4" />
              <span>single-player</span>
            </div>
            <div className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-center">
              Start Game
            </div>
          </Link>
        ))}
      </div>

        {/* notice */}
      <div className="space-y-8 mt-8">
        <div className="alert rounded-md p-5 bg-gray-800">
          <h1>realtime multiplayer games are comming soon!</h1>
        </div>

        {/* Game List */}
        <div className="grid grid-cols-3 gap-8">
          {[
            { name: "Quiz Master", players: 0, difficulty: "Medium" },
            // { name: "Memory Match", players: 0, difficulty: "Easy" },
            // { name: "Logic Puzzle", players: 0, difficulty: "Hard" },
          ].map((game) => (
            <div key={game.name} className="bg-gray-800 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">{game.name}</h3>
                <div className="flex">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= game.difficulty.length
                          ? "text-yellow-500"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Users className="w-4 h-4" />
                <span>{game.players} playing</span>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg w-full">
                comming soon!
              </button>
            </div>
          ))}
        </div>

        {/* breathing-space */}
        <div className="h-[200px]"></div>
      </div>
    </>
  );
}

export default GameRoom;
