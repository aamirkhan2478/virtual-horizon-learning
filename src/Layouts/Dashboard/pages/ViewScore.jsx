import React, { useEffect } from "react";
import DataTable from "../components/DataTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ViewScore({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Updated columns
  const columns = [
    ...(user.userType === "Teacher"
      ? [
          {
            header: "Student Name",
            accessorKey: "name",
          },
        ]
      : []),
    {
      header: "Obtained Marks",
      accessorKey: "obtainedMarks",
    },
    {
      header: "Total Marks",
      accessorKey: "totalMarks",
    },
    {
      header: "Score (%)",
      accessorKey: "score",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  // Updated data
  const data = [
    {
      name: "Alice Johnson",
      obtainedMarks: 95,
      totalMarks: 100,
      score: 95,
      status: "Pass",
    },
    {
      name: "Bob Smith",
      obtainedMarks: 88,
      totalMarks: 100,
      score: 88,
      status: "Pass",
    },
    {
      name: "Charlie Davis",
      obtainedMarks: 76,
      totalMarks: 100,
      score: 76,
      status: "Pass",
    },
    {
      name: "Diana Wilson",
      obtainedMarks: 40,
      totalMarks: 100,
      score: 40,
      status: "Fail",
    },
    {
      name: "Ella Brown",
      obtainedMarks: 58,
      totalMarks: 100,
      score: 58,
      status: "Fail",
    },
    {
      name: "Frank Wright",
      obtainedMarks: 85,
      totalMarks: 100,
      score: 85,
      status: "Pass",
    },
    {
      name: "George King",
      obtainedMarks: 67,
      totalMarks: 100,
      score: 67,
      status: "Pass",
    },
    {
      name: "Hannah White",
      obtainedMarks: 72,
      totalMarks: 100,
      score: 72,
      status: "Pass",
    },
    {
      name: "Ivy Green",
      obtainedMarks: 35,
      totalMarks: 100,
      score: 35,
      status: "Fail",
    },
    {
      name: "Jack Black",
      obtainedMarks: 50,
      totalMarks: 100,
      score: 50,
      status: "Fail",
    },
    {
      name: "Kara Blue",
      obtainedMarks: 92,
      totalMarks: 100,
      score: 92,
      status: "Pass",
    },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const goToResourceDetails = () => {
    navigate(`/dashboard/resource-details/${id}`);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold md:text-2xl text-gray-800">
            View Scores
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
        <DataTable
          columns={columns}
          data={data}
          columnId={"name"}
          filterBy={"Student Name"}
        />
      </div>
    </>
  );
}

export default ViewScore;
