import React from 'react';
import { Trophy, Users, Star } from 'lucide-react';

function GameRoom() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Game Room</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-500" />
                        <span>1,234 points</span>
                    </div>
                </div>
            </div>
            <div className="alert rounded-md p-5 bg-green-800">
                <h1>realtime multiplayer games comming soon!</h1>
            </div>
            {/* Featured Game */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
                    alt="Featured Game"
                    className="w-full h-48 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">Math Challenge</h2>
                    <p className="text-gray-400 mb-4">
                        Test your mathematical skills against other players in real-time!
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
                        Play Now
                    </button>
                </div>
            </div>

            {/* Game List */}
            <div className="grid grid-cols-3 gap-8">
                {[
                    { name: 'Quiz Master', players: 12, difficulty: 'Medium' },
                    { name: 'Memory Match', players: 8, difficulty: 'Easy' },
                    { name: 'Logic Puzzle', players: 15, difficulty: 'Hard' },
                ].map((game) => (
                    <div key={game.name} className="bg-gray-800 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold">{game.name}</h3>
                            <div className="flex">
                                {[1, 2, 3].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= game.difficulty.length
                                                ? 'text-yellow-500'
                                                : 'text-gray-600'
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
                            Join Game
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameRoom;