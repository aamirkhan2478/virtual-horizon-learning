import React, { useState, useEffect } from "react";
import { FiUpload, FiCheckCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { useSubmitAssignment } from "@/hooks/useResources";

const SubmitAssignment = ({ title }) => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [marked, setMarked] = useState(false);
  const [marks, setMarks] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resourceId, assignmentId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const { mutate, isLoading } = useSubmitAssignment(onSuccess, onError);
  const { toast } = useToast();

  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;

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
  }, [submitted, marked, title]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const goToAssignmentsPage = () => {
    navigate(`/dashboard/${resourceId}/assignments`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setLoading(true);

    if (!file) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please upload a file.",
      });
      document.getElementById("file").focus();
      setLoading(false);
      return;
    }

    // Create a FormData object to hold the data
    const formData = new FormData();
    formData.append("file", file); // File uploaded by the user
    formData.append("resourceId", assignmentId);
    formData.append("userId", user.id);

    // Log the data to verify its structure
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    mutate(formData, {
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Assignment Submitted Successfully!",
          className: "bg-green-500 text-white",
        });
        setLoading(false);
        navigate(`/dashboard/resource-details/${resourceId}`);
      },
      onError: (error) => {
        onError(error);
        setLoading(false);
      },
    });

    // setTimeout(() => {
    //   setSubmitted(true);
    //   setLoading(false);
    // }, 2000);
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Assignment Submitted Successfully!",
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
    console.log(error);

    // Get the error message
    const errorMessage =
      error?.response?.data?.message || // Use message if available
      error?.response?.data?.error || // Use error field if available
      "Something went wrong"; // Default fallback message

    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errorMessage,
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Assignment Submission</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={goToAssignmentsPage}
              >
                <ArrowRight className="h-6 w-6 font-bold" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Go Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                  <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                </div>
                <input
                  id="file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf, .docx"
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-500 normal-case">
                {file.name}
              </p>
            )}
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
