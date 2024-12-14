import Loader from "@/components/Loader";
import {
  useGenerateQuiz,
  useGetResource,
  useSaveQuiz,
} from "@/hooks/useResources";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowRight, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "../components/ui/button";
const GenerateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [prompt, setPrompt] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetResource(id);
  const { mutate, isLoading: generating } = useGenerateQuiz(onSuccess, onError);
  const { mutate: saveQuiz, isLoading: saving } = useSaveQuiz();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader showProgressBar={false} />;
  }

  const generateQuiz = () => {
    setLoading(false);
    mutate({ userPrompt: prompt });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saveData = {
      resource_id: Number(id),
      questions,
    };
    saveQuiz(saveData);
  };

  function onSuccess(data) {
    console.log("data", data?.data?.questions);
    setQuestions(data?.data?.questions);
  }

  function onError(error) {
    console.error("Error generating quiz:", error);
  }

  const goToResourceDetails = () => {
    navigate(`/dashboard/resource-details/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">
          Generate Quiz ({data.title})
        </h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={goToResourceDetails}
              >
                <ArrowRight className="h-6 w-6 font-bold" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Go Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generateQuiz();
              }
            }}
            placeholder="Enter prompt..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            required
          />
          <p className="text-sm text-gray-500 normal-case">
            <b>Example Prompt:</b> <br />
            Make a quiz on &apos;Your Title&apos; with 10 questions and 4
            options each. Each question should have one correct answer.
          </p>
        </div>

        {generating ? (
          <Loader showMessages={false} showProgressBar={false} />
        ) : (
          <div className="text-left">
            <h3
              className={`text-2xl font-bold mb-6 ${loading ? "hidden" : "block"}`}
            >
              Generated Quiz
            </h3>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8">
                <h4 className="text-xl font-semibold mb-4 normal-case">
                  {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg normal-case ${
                        option === question.correctAnswer && "bg-green-100"
                      }`}
                    >
                      {option}
                      {option === question.correctAnswer && (
                        <FaCheckCircle className="inline-block ml-2 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex">
          <Button
            disabled={questions.length === 0}
            type="submit"
            className="w-50 mr-3 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {saving ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <SaveIcon size={20} className="inline-block mr-2" /> Save Quiz
              </>
            )}
          </Button>
          <Button
            disabled={questions.length === 0 || prompt === ""}
            type="button"
            onClick={generateQuiz}
            className="w-50 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ReloadIcon size={20} className="inline-block mr-2" /> Regenerate
            Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuiz;
