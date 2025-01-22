import React from "react";

const EventPopup = ({ event, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-bold mb-2">{`Event on Day ${event.day}`}</h2>
          <p className="text-sm text-gray-600 mb-4">
            {event.title ? `Title: ${event.title}` : "No events available for this day."}
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default EventPopup;
