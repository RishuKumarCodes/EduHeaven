import { useState, useRef, useEffect } from "react";

function NotesComponent() {
  const [notes, setNotes] = useState([
    { text: "", heading: "", date: new Date() },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const historyRef = useRef(null);
  const textAreaRef = useRef(null);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const addNewNote = () => {
    const newNote = { text: "", heading: "", date: new Date() };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentPage(notes.length);
  };

  const deleteNote = () => {
    if (notes.length > 1) {
      setNotes((prevNotes) =>
        prevNotes.filter((_, index) => index !== currentPage),
      );
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    } else {
      setNotes([{ text: "", heading: "", date: new Date() }]);
      setCurrentPage(0);
    }
  };

  const goToNextPage = () => {
    if (currentPage < notes.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNoteChange = (event) => {
    const updatedText = event.target.value;
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === currentPage ? { ...note, text: updatedText } : note,
      ),
    );
  };

  const handleHeadingChange = (event) => {
    const updatedHeading = event.target.value.toUpperCase();
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === currentPage ? { ...note, heading: updatedHeading } : note,
      ),
    );
  };

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectDate = (date) => {
    const updatedNotes = [...notes];
    const existingNote = updatedNotes.find(
      (note) => note.date.toDateString() === new Date(date).toDateString(),
    );

    if (existingNote) {
      const index = updatedNotes.indexOf(existingNote);
      setCurrentPage(index);
    }
    //else {
    //  const newNote = { text: "", heading: "", date: new Date(date) };
    //  updatedNotes.push(newNote);
    //  setCurrentPage(updatedNotes.length - 1);
    //}

    updatedNotes[currentPage].date = new Date(date);
    setNotes(updatedNotes);
    setSelectedDate(new Date(date));
    setIsHistoryOpen(false);
  };

  const handleScroll = () => {
    if (textAreaRef.current) {
      setScrollPosition(textAreaRef.current.scrollTop);
      setScrollHeight(textAreaRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      setScrollHeight(textAreaRef.current.scrollHeight);
    }
  }, []);

  // Function to update month
  const updateMonth = (increment) => {
    const newMonth = currentMonth + increment;
    if (newMonth >= 0 && newMonth <= 11) {
      setCurrentMonth(newMonth);
    } else {
      const newYear = increment > 0 ? currentYear + 1 : currentYear - 1;
      setCurrentYear(newYear);
      setCurrentMonth(increment > 0 ? 0 : 11);
    }
  };

  // Calculate the number of days in the month
  const firstDayOfMonth = new Date(currentYear, currentMonth).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Handlee&family=Roboto:wght@700&display=swap"
      />
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold">
            Notes{" "}
            <span className="text-lg">
              {notes.length > 0 ? `${currentPage + 1}/${notes.length}` : "1/1"}
            </span>
          </div>
          <div className="flex space-x-4">
            <span className="cursor-pointer" onClick={toggleHistory}>
              <i className="icon-calendar-heart">📅</i>
            </span>
            <span
              className={`cursor-pointer ${currentPage === 0 ? "text-gray-600" : ""}`}
              onClick={goToPreviousPage}
            >
              &lt;
            </span>
            <span
              className={`cursor-pointer ${currentPage === notes.length - 1 ? "text-gray-500" : ""}`}
              onClick={goToNextPage}
            >
              &gt;
            </span>
          </div>
        </div>

        {isHistoryOpen && (
          <div
            ref={historyRef}
            className="absolute top-16 right-0 bg-gray-700 text-white rounded-lg p-4 shadow-lg w-64 z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => updateMonth(-1)}>{"<"}</button>
              <span className="font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentYear}
              </span>
              <button onClick={() => updateMonth(1)}>{">"}</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center font-bold">
                  {day}
                </div>
              ))}
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="text-center"></div>
              ))}
              {[...Array(daysInMonth)].map((_, index) => {
                const date = new Date(currentYear, currentMonth, index + 1);
                return (
                  <div
                    key={index}
                    className={`p-2 text-center cursor-pointer rounded transition-colors duration-200 ${selectedDate?.toDateString() === date.toDateString()
                        ? "bg-blue-500 text-white"
                        : "hover:bg-sky-400 hover:text-black"
                      }`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      selectDate(date);
                    }}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-between space-x-4 text-blue-500 mb-4">
          <input
            type="text"
            value={notes[currentPage]?.heading}
            onChange={handleHeadingChange}
            placeholder="Heading"
            className="bg-transparent border-b border-[rgba(176,71,255,0.7)] outline-none font-bold"
            style={{
              fontFamily: "Roboto, sans-serif",
              color: "rgba(255, 223, 186, 1)",
            }}
          />
          <div className="space-x-4">
            <span className="cursor-pointer" onClick={addNewNote}>
              <i className="icon-add-page outline-none">➕</i>
            </span>
            <span className="cursor-pointer" onClick={deleteNote}>
              <i className="icon-trash">🗑️</i>
            </span>
          </div>
        </div>

        <div
          className="relative w-full h-64 overflow-hidden"
          style={{ lineHeight: "39px" }}
        >
          <div className="absolute top-0 right-0 text-sm text-cyan-400 p-2">
            {notes[currentPage]?.date.toLocaleDateString()}
          </div>

          <div
            className="absolute w-full pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 38px, rgba(176,71,255,0.7) 39px )`,
              backgroundSize: "100% 40px",
              transform: `translateY(-${scrollPosition}px)`,
              height: `${scrollHeight}px`,
            }}
          ></div>
          <textarea
            ref={textAreaRef}
            id="area"
            className="relative w-full h-full bg-transparent text-[rgb(243,240,240)] p-2 outline-none resize-none font-mono "
            style={{
              lineHeight: "39px",
              paddingTop: "10px",
              paddingBottom: "10px",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
            placeholder="Write your notes here..."
            onScroll={handleScroll}
            value={notes[currentPage]?.text}
            onChange={handleNoteChange}
          ></textarea>
        </div>
      </div>
    </>
  );
}


export default NotesComponent;
