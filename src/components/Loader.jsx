import { GraduationCap } from "lucide-react";
import React, { useState, useEffect } from "react";

const Loader = ({
  showProgressBar = true,
  showMessages = true,
  customMessage = null,
}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Loading... Please wait...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);

    const messages = [
      "Loading... Please wait...",
      "Preparing content...",
      "Taking a bit longer...",
      "Almost there...",
    ];

    let index = 0; // Start from the first message
    const messageInterval = setInterval(() => {
      setMessage(messages[index]); // Set the current message
      index = (index + 1) % messages.length; // Move to the next message, looping back to the start
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
      <div className="flex flex-col items-center">
        {/* Loader Icon */}
        <div className="relative w-32 h-32 mb-4">
          <div
            className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"
            style={{ borderTopColor: "#3B82F6" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="text-4xl text-blue-500 animate-bounce" />
          </div>
        </div>

        {/* Progress Bar */}
        {showProgressBar && (
          <div
            className="w-64 h-4 bg-gray-200 rounded-full mb-4 overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Message */}
        {showMessages && (
          <p className="text-gray-700 text-center normal-case" aria-live="polite">
            {message} {/* Show customMessage if provided */}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
