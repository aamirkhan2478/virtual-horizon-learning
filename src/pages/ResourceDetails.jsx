import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetResource } from "@/hooks/useResources";
import { ArrowRight, ShoppingBasket, UserCheck } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResourceDetails({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const navigate = useNavigate();
  const { id } = useParams();
  
  const Resources = () => {
    // Navigate Resources Page
    navigate("/dashboard/resources");
  };

  const videoPage = () => {
    // Navigate Resources Page
    navigate(`/dashboard/video-page/${id}`);
  };
  
  const { data, isLoading } = useGetResource(id);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Generate a random price between 100 and 1000
  const randomPrice = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Resource Details</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={Resources}>
                <ArrowRight className="h-6 w-6 font-bold" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Go Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {data && (
        <div className="mt-6">
          <img
            src={data.thumbnail}
            alt={`${data.title} thumbnail`}
            className="w-full h-full object-fill mb-6 rounded shadow"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
              <p className="text-gray-600">{data.description}</p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-sm font-medium text-gray-500">
                Price: {randomPrice} PKR
              </span>
              {data.type === "PDF" ? (
                <Button
                  className="mt-4"
                  onClick={() => window.open(data.pdf, "_blank")}
                >
                  Get Started
                </Button>
              ) : data.type === "Video" ? (
                <Button className="mt-4" onClick={videoPage}>
                  Get Started
                </Button>
              ) : null}

              {user?.userType === "Student" && (
                <Button size="sm" className="mt-4">
                  <ShoppingBasket className="h-4 w-4 mr-2" /> Buy
                </Button>
              )}
              {user?.userType === "Teacher" && (
                <Button size="sm" className="mt-4">
                  <UserCheck className="h-4 w-4 mr-2" /> Assign
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResourceDetails;