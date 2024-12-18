import React, { useEffect, useState } from "react";
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
import { useScores } from "@/hooks/useResources";

function ViewScore({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();

  // State for filtering
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch scores
  const { data: scores, isLoading, isError } = useScores(id);

  // Handle filters
  const filteredScores = scores?.filter((score) => {
    const matchesName =
      !searchName ||
      score.studentName.toLowerCase().includes(searchName.toLowerCase());
    const matchesType = !filterType || score.type === filterType;
    return matchesName && matchesType;
  });

  const columns = [
    ...(user.userType === "Teacher"
      ? [
          {
            header: "Student Name",
            accessorKey: "studentName",
          },
        ]
      : []),
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Obtained Marks",
      accessorKey: "obtainedMarks",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const goToResourceDetails = () => {
    navigate(`/dashboard/resource-details/${id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-500">Loading scores...</p>
      </div>
    );
  }

  if (isError || !scores) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-red-500">
          Failed to load scores. Please try again later.
        </p>
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-500">No scores available.</p>
      </div>
    );
  }

  return (
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

      {/* Filter Section */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        {/* Search by Name - Only for Teachers */}
        {user.userType === "Teacher" && (
          <div className="flex-1">
            <label
              htmlFor="searchName"
              className="block text-gray-700 font-medium mb-1"
            >
              Filter by Student Name:
            </label>
            <input
              id="searchName"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter student name"
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}

        {/* Filter by Type - Available for Both Teachers and Students */}
        <div className="flex-1">
          <label
            htmlFor="filterType"
            className="block text-gray-700 font-medium mb-1"
          >
            Filter by Type:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Types</option>
            <option value="Quiz">Quiz</option>
            <option value="Assignment">Assignment</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredScores}
        columnId={"name"}
        filterBy={"Student Name"}
        showFilterInput={false}
      />
    </div>
  );
}

export default ViewScore;
