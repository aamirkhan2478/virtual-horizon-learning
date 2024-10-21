import React, { useState, useEffect } from "react";
import { FiUpload, FiCheckCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SubmitAssignment = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [marked, setMarked] = useState(false);
  const [marks, setMarks] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating real-time updates
    const timer = setTimeout(() => {
      if (submitted && !marked) {
        setMarked(true);
        setMarks(85);
        setFeedback(
          "Great work! Your understanding of the subject is evident."
        );
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [submitted, marked]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Assignment Submission
      </h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Assignment
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX (MAX. 10MB)
                  </p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                  accept=".pdf, .docx"
                />
              </label>
            </div>
            {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Comments
            </label>
            <textarea
              id="comment"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional instructions or comments..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
            ) : (
              "Submit Assignment"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-center text-green-500">
            <FiCheckCircle className="w-16 h-16" />
          </div>
          <p className="text-center text-xl font-semibold text-gray-800">
            Assignment submitted successfully!
          </p>
          <p className="text-center text-gray-600">
            Your marks will be available once the teacher has reviewed your
            assignment.
          </p>
          {marked && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Your Results
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">
                  Marks Obtained:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {marks}/100
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Teacher's Feedback:
                </h3>
                <p className="text-gray-600 bg-white p-4 rounded-lg">
                  {feedback}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitAssignment;
