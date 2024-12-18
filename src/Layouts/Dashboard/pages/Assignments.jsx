import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "../components/ui/button";
import { ArrowRight, Download, Lock, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignmentList } from "@/hooks/useResources";
import Loader from "@/components/Loader";

const Assignments = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { resourceId } = useParams();
  const { data: assignments, isLoading } = useAssignmentList(resourceId);
  // console.log(assignments);
  const navigate = useNavigate();

  const goToResourceDetails = () => {
    navigate(`/dashboard/resource-details/${resourceId}`);
  };

  const goToSubmitAssignment = (assignmentId) => {
    navigate(`/dashboard/${resourceId}/submit-assignment/${assignmentId}`);
  };

  const renderAssignmentList = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Available Assignments</h1>
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
          // Assuming assignments is coming as a prop or state
          assignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              {/* Assignment Details */}
              <div>
                <h2 className="text-xl font-semibold">
                  {assignment?.description}
                </h2>
                <p className="text-gray-600">
                  Total Marks ({assignment?.totalMarks})
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                {/* Download Button */}
                {assignment?.uploadedFilePath && (
                  <a
                    href={assignment?.uploadedFilePath}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="icon" variant="link">
                      <Download className="h-5 w-5" />
                    </Button>
                  </a>
                )}

                {/* Conditional Rendering of Upload/Lock Icon */}
                {assignment?.isSubmitted ? (
                  <Lock className="h-5 w-5 text-gray-400 text-xl" />
                ) : (
                  // Show Upload Icon if isSubmitted is false
                  <Button
                    size="icon"
                    onClick={() => goToSubmitAssignment(assignment?.id)}
                  >
                    <UploadCloud className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {renderAssignmentList()}
    </div>
  );
};

export default Assignments;
