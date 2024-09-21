import { Plus, Trash } from "lucide-react";
import { useState } from "react";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "multiple-choice", options: ["", ""], correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions);
    // Here you would typically send the questions to your backend or perform further processing
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Question {questionIndex + 1}</h2>
              <button
                type="button"
                onClick={() => removeQuestion(questionIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
            <input
              type="text"
              value={question.question}
              onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
              placeholder="Enter question"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              required
            />
            <select
              value={question.type}
              onChange={(e) => updateQuestion(questionIndex, "type", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="fill-in-the-blank">Fill in the Blank</option>
            </select>
            {question.type !== "fill-in-the-blank" && (
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-grow p-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Plus /> Add Option
                </button>
              </div>
            )}
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => updateQuestion(questionIndex, "correctAnswer", e.target.value)}
              placeholder="Correct Answer"
              className="w-full p-2 border border-gray-300 rounded-lg mt-4"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="inline-block mr-2" /> Add Question
        </button>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
