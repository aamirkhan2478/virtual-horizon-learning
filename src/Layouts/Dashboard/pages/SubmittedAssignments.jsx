import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import { Download, Lock, Pencil, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSubmittedAssignments,
  useUpdateAssigmentScore,
} from "@/hooks/useResources";
import Loader from "@/components/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Layouts/Dashboard/components/ui/dialog";
import { Input } from "@/Layouts/Dashboard/components/ui/input";
import { useToast } from "../components/ui/use-toast";

const SubmittedAssignments = ({ title }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [score, setScore] = useState("");

  const { mutate } = useUpdateAssigmentScore(onSuccess, onError);
  const { toast } = useToast();

  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { id } = useParams();
  const { data: submittedAssignments, isLoading } = useSubmittedAssignments(id);
  const navigate = useNavigate();

  const goToResourceDetails = () => {
    navigate(`/dashboard/resource-details/${id}`);
  };

  const openScoreDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setScore(""); // Reset score input
    setIsDialogOpen(true);
  };

  const closeScoreDialog = () => {
    setIsDialogOpen(false);
    setSelectedAssignment(null);
  };

  const handleScoreSubmit = () => {
    console.log(
      `Selected Assignment ID: ${selectedAssignment.submissionId}\nScore for Assignment ${selectedAssignment.submissionId}: ${score}\nStudent ID: ${selectedAssignment.studentId}`
    );

    // Update Assignment score in the API
    mutate(
      {
        assignmentId: selectedAssignment.submissionId,
        score: score,
        submittedBy: selectedAssignment.studentId,
      },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Assignment Updated Successfully!",
            className: "bg-green-500 text-white",
          });
          closeScoreDialog(); // Close the modal on success
        },
        onError: (error) => {
          console.error(error);
          onError(error);
        },
      }
    );

    closeScoreDialog();
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Resource Added Successfully!",
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

    // Show toast
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errorMessage,
    });
  }

  const renderAssignmentList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Submitted Assignments</h1>
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

      {isLoading ? (
        <Loader showProgressBar={false} />
      ) : (
        submittedAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id || index} // Fallback to index if `assignment.id` is missing
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            {/* Assignment Details */}
            <div>
              <h2 className="text-xl font-semibold">
                {assignment?.assignmentDescription}
              </h2>
              <div className="flex-row mt-2">
                <p className="text-gray-600 text-sm">
                  Student Name : {assignment?.studentName}
                </p>
                <p className="text-gray-600 text-sm">
                  Obtained Marks : {assignment?.score}
                </p>
                <p className="text-gray-600 text-sm">
                  Total Marks : {assignment?.totalMarks}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2">
              {/* Download Button */}
              {assignment?.submittedFilePath && (
                <a
                  href={assignment?.submittedFilePath}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="icon" variant="link">
                    <Download className="h-5 w-5" />
                  </Button>
                </a>
              )}

              {/* Conditional Rendering */}
              {assignment?.score > 0 ? (
                <Lock className="h-5 w-5 text-gray-400 text-xl" />
              ) : (
                <Button
                  size="icon"
                  onClick={() => openScoreDialog(assignment)} // Open Shadcn modal
                >
                  <Pencil className="h-5 w-5" />
                </Button>
              )}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {renderAssignmentList()}

      {/* Shadcn Dialog for Scoring */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Assignment</DialogTitle>
            <DialogDescription className="normal-case">
              Provide marks for the selected assignment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p>
              <strong>Assignment:</strong>{" "}
              {selectedAssignment?.assignmentDescription}
            </p>
            <p>
              <strong>Student:</strong> {selectedAssignment?.studentName}
            </p>

            {/* Input for Score */}
            <div>
              <label htmlFor="score" className="block font-medium mb-2">
                Enter Score:
              </label>
              <Input
                id="score"
                type="number"
                placeholder="Enter score"
                min="0"
                value={score}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setScore(value < 0 ? 0 : value);
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeScoreDialog}>
              Cancel
            </Button>
            <Button onClick={handleScoreSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmittedAssignments;
