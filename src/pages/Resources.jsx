import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpenText, FilePlus2, BadgeInfo } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetResources } from "@/hooks/useResources";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PropTypes from "prop-types";

function Resources({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { data: resourcesData, isLoading } = useGetResources();

  const navigate = useNavigate();

  const addResource = () => {
    // Navigate Add Resource Page
    navigate("/dashboard/add-resource");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Resources</h1>
        {user?.userType === "Admin" && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={addResource}>
                    <FilePlus2 className="h-6 w-6 font-bold" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Add Resource</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {resourcesData && resourcesData.length === 0 && (
          <Alert variant="destructive" className="lg:md:w-[600px]">
            <BadgeInfo className="h-4 w-4" />
            <AlertTitle>No Resources Available!</AlertTitle>
            <AlertDescription>
              No resources have been shared at the moment. Please check back
              later.
            </AlertDescription>
          </Alert>
        )}

        {isLoading
          ? Array((resourcesData ?? []).length)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border rounded shadow p-3">
                  <Skeleton className="w-full h-40 mb-4" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-1/2 h-5 mb-4" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))
          : (resourcesData ?? []).map((card, index) => (
              <Card key={index}>
                <CardHeader className="p-0">
                  <img
                    src={card?.thumbnail}
                    alt="Card Image"
                    className="w-full h-auto rounded-t"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{card?.title}</CardTitle>
                  <CardDescription>
                    {card?.description
                      ? card.description.split(" ").slice(0, 10).join(" ") +
                        (card.description.split(" ").length > 10 ? "..." : "")
                      : ""}
                  </CardDescription>
                  <CardDescription className="mt-3 font-medium">
                    PKR {card?.price || 500}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 flex justify-center">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/dashboard/resource-details/${card.id}`)
                    }
                  >
                    <BookOpenText className="h-4 w-4 mr-2" /> View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </>
  );
}

// props validation
Resources.propTypes = {
  title: PropTypes.string,
};

export default Resources;
