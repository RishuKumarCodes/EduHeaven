import { useState } from "react";
import { toast } from "react-toastify";
import { BotMessageSquare, X, ArrowUp, Loader } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const apikey = "AIzaSyC-zMJyRt8UuSutFmBLGW5Ou4hROtLxLrk";

const Ai = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Chat messages
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setLoading(true);
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage = { type: "user", text: question, time: currentTime };
    setMessages((prev) => [...prev, userMessage]);     

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: question }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data && data.candidates && data.candidates.length > 0) {
        const generatedResponse =
          data.candidates[0]?.content?.parts[0]?.text || "No response found";
        const aiMessage = { type: "ai", text: generatedResponse, time: currentTime };
        setMessages((prev) => [...prev, aiMessage]);
        toast.success("Response generated successfully!");
      } else {
        toast.error("No response from AI model");
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    } finally {
      setLoading(false);
      setQuestion(""); // Clear input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      generateQuestion();
    }
  };

  const closeModal = () => {
    setMessages([]); // Clear messages when modal is closed
    document.getElementById("my_modal_1").close();
  };

  return (
    <div id="manishai" className="cursor-pointer">
      <button
        className="flex gap-3 bg-purple-800 shadow-[0_4px_100px_rgba(176,71,255,0.7)] hover:bg-purple-900 px-5 py-2.5 rounded-xl text-white font-semibold transition duration-200 transform hover:scale-105 ml-9 hover:shadow-[0_4px_100px_rgba(176,71,255,1)]"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <BotMessageSquare />
        Ask AI
      </button>

      <dialog
        id="my_modal_1"
        className="modal backdrop:bg-black/50 bg-transparent shadow-sm min-w-[380px] w-1/3 h-5/6"
      >
        <div className="modal-box bg-gray-800 rounded-2xl w-full h-full text-white flex flex-col overflow-hidden">
          {/* Nav-bar */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold px-4 py-2">Ask AI</h3>
            <button
              onClick={closeModal}
              className="hover:bg-red-600 py-2 px-4"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

{/* {gif part pls change the gif  if needed } */}
          {messages.length === 0 && (
  <div className="m-6 flex flex-col items-center space-y-15">
  <p className="text-lg font-semibold text-center">
      Hey! Welcome to <span className="text-purple-400">EduHaven Bot</span> 🎉<br />
      How can I help you today?
    </p>

    <img
      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExam9nM2hrdW9rMzF0cXJzYWZ2b2ZrdTkyaG9nbnEyZndjYmYyOWh0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NeQoAaKp2hhLt6Ayq1/giphy.gif"
      alt="Welcome"
      className="mt-20 w-40 h-40 rounded-full"

    />
    
  </div>
)}


          {/* Chat area */}
          <div className="m-6 flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.type === "user" ? "items-end" : "items-start"
                }`}
              >
                <p
                  className={`py-2 px-4 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-100 text-blue-700"
                      : " bg-green-100 text-green-700"
                  }`}
                >
                  {msg.text}
                </p>
                <span className="text-sm text-gray-400 mt-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="modal-action text-center flex mb-4 px-4 gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question here..."
                className="w-full p-3 rounded-full outline-none bg-gray-900 focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <button
              onClick={generateQuestion}
              className={`text-white font-bold p-3 rounded-full transition-all shadow-[0_4px_20px_rgba(176,71,255,0.3)] hover:shadow-[0_4px_70px_rgba(176,71,255,0.4)] ${
                loading
                  ? "bg-gray-900 cursor-not-allowed"
                  : "bg-purple-800 hover:bg-purple-700"
              }`}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <ArrowUp />}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Ai;
