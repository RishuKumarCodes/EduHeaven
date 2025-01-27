import { Route, Routes } from "react-router-dom";
import GameRoom from "./GameRoom";
import TicTacToe from "./games/tic-tac-toe/TicTacToe.jsx";
import Snake from "./games/SnakeGame.jsx";
import TypingGame from "./games/TypingGame";

const GameRoutes = () => {
  return (
    <Routes>
      <Route index element={<GameRoom />} />
      <Route path="tic-tac-toe" element={<TicTacToe />} />
      <Route path="snake" element={<Snake />} />
      <Route path="typing-game" element={<TypingGame />} />
    </Routes>
  );
};

export default GameRoutes;
