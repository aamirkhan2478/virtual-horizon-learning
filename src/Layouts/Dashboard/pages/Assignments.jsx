import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "../components/ui/button";
import { ArrowRight, Download, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Assignments = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Assignment 1: General Knowledge",
      fileUrl: "/files/assignment1.pdf",
    },
    {
      id: 2,
      title: "Assignment 2: Science Quiz",
      fileUrl: "/files/assignment2.pdf",
    },
    {
      id: 3,
      title: "Assignment 3: History Research",
      fileUrl: "/files/assignment3.pdf",
    },
  ]);

  const { resourceId } = useParams();

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
        {assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{assignment.title}</h2>
            </div>
            <div className="flex items-center space-x-2">
              {/* Download Button */}
              <Button
                size="icon"
                variant="link"
                href={assignment.fileUrl}
                download
              >
                <Download className="h-5 w-5" />
              </Button>
              {/* Upload Button */}
              <Button
                size="icon"
                onClick={() => goToSubmitAssignment(assignment.id)}
              >
                <UploadCloud className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ))}
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
