import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "General Knowledge",
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris",
          explanation: "Paris is the capital and most populous city of France.",
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
          explanation:
            "Mars is often called the Red Planet due to its reddish appearance.",
        },
        {
          id: 3,
          question: "Who painted the Mona Lisa?",
          options: [
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Michelangelo",
          ],
          correctAnswer: "Leonardo da Vinci",
          explanation:
            "The Mona Lisa was painted by Italian Renaissance artist Leonardo da Vinci.",
        },
      ],
      completed: false,
    },
    {
      id: 2,
      title: "Science Quiz",
      questions: [
        {
          id: 1,
          question: "What is the chemical symbol for water?",
          options: ["Wa", "H2O", "Hy", "O2"],
          correctAnswer: "H2O",
          explanation:
            "H2O is the chemical formula for water, representing two hydrogen atoms and one oxygen atom.",
        },
        {
          id: 2,
          question: "What is the largest organ in the human body?",
          options: ["Brain", "Liver", "Skin", "Heart"],
          correctAnswer: "Skin",
          explanation:
            "The skin is the largest organ of the human body, covering an area of about 20 square feet in adults.",
        },
      ],
      completed: false,
    },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const handleReviewAnswers = () => {
    setReviewMode(true);
  };

  const handleNextQuestion = useCallback(() => {
    if (
      selectedAnswer[currentQuestion] ===
      selectedQuiz.questions[currentQuestion].correctAnswer
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer("");
    setTimeLeft(30);

    if (currentQuestion + 1 < selectedQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      setQuizzes(
        quizzes.map((q) =>
          q.id === selectedQuiz.id ? { ...q, completed: true } : q
        )
      );
    }
  }, [selectedAnswer, selectedQuiz, currentQuestion, quizzes]);

  useEffect(() => {
    if (selectedQuiz && timeLeft > 0 && !showResult && !isReviewing) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, isReviewing, selectedQuiz, handleNextQuestion]);

  const handleQuizSelect = (quiz) => {
    if (!quiz.completed) {
      setSelectedQuiz(quiz);
      setCurrentQuestion(0);
      setSelectedAnswer("");
      setScore(0);
      setShowResult(false);
      setTimeLeft(30);
      setIsReviewing(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: answer,
    }));
  };

  const handleReviewQuiz = () => {
    console.log("clicked");

    setIsReviewing(true);
    setCurrentQuestion(0);
  };

  const handleRestartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setIsReviewing(false);
  };

  const renderQuestion = () => {
    const question = selectedQuiz.questions[currentQuestion];
    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-3 text-left rounded-lg ${
                selectedAnswer[currentQuestion] === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${isReviewing && option === question.correctAnswer ? "bg-green-500 text-white" : ""}`}
              disabled={isReviewing}
            >
              {option}
            </button>
          ))}
        </div>
        {isReviewing && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </motion.div>
    );
  };

  const renderProgressBar = () => {
    const progress =
      ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const renderTimer = () => {
    return (
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
        <FaClock className="text-gray-500 mr-1" />
        <span className="text-xl font-bold">{timeLeft}</span>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold">Quiz Completed!</h2>
        <p className="text-xl">
          Your score: {score} out of {selectedQuiz.questions.length}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleReviewAnswers}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="View Correct answers"
          >
            View Correct Answers
          </button>
          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Back to Quiz List
          </button>
        </div>


        <Separator />
        {reviewMode && (
          <div className="text-left">
            <h3 className="text-2xl font-bold mb-6">Correct Answers</h3>
            {selectedQuiz.questions.map((question, questionIndex) => (
              <div key={question.id} className="mb-8">
                <h4 className="text-xl font-semibold mb-4">
                  {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        option === question.correctAnswer
                          ? "bg-green-100" // Highlight the correct answer in green
                          : selectedAnswer[questionIndex] === option
                            ? "bg-red-100" // Highlight the wrong user-selected answer in red
                            : "bg-gray-100"
                      }`}
                    >
                      {option}
                      {option === question.correctAnswer && (
                        <FaCheckCircle className="inline-block ml-2 text-green-500" />
                      )}
                      {selectedAnswer[questionIndex] === option &&
                        option !== question.correctAnswer && (
                          <FaTimesCircle className="inline-block ml-2 text-red-500" />
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const renderQuizList = () => {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
        {quizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 bg-white rounded-lg shadow-md flex justify-between items-center ${quiz.completed ? "opacity-50" : ""}`}
          >
            <div>
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.questions.length} questions</p>
            </div>
            {quiz.completed ? (
              <Lock className="text-gray-400 text-xl" />
            ) : (
              <button
                onClick={() => handleQuizSelect(quiz)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Start Quiz
              </button>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {selectedQuiz ? (
        !showResult ? (
          <>
            {renderProgressBar()}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                Question {currentQuestion + 1} of{" "}
                {selectedQuiz.questions.length}
              </h1>
              {renderTimer()}
            </div>
            <AnimatePresence mode="wait">{renderQuestion()}</AnimatePresence>
            {!isReviewing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`px-6 py-2 rounded-lg ${
                    selectedAnswer
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  {currentQuestion === selectedQuiz.questions.length - 1
                    ? "Finish"
                    : "Next"}
                </button>
              </div>
            )}
            {isReviewing &&
              currentQuestion < selectedQuiz.questions.length - 1 && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
          </>
        ) : (
          renderResult()
        )
      ) : (
        renderQuizList()
      )}
    </div>
  );
};

export default Quizzes;
