import { Button } from "@/Layouts/Dashboard/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { useGetResource, useAssignResource } from "@/hooks/useResources";
import { ArrowRight, Banknote, FileText, UserCheck, Video } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PaymentButton from "@/Layouts/Dashboard/components/PaymentButton";
import { useCreateNotification } from "@/hooks/useNotification";
import { useQueryClient } from "react-query";
import { toast } from "../components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Loader from "@/components/Loader";

function ResourceDetails({ title }) {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useAssignResource();
  const { mutate: sendNotification, isLoading: sendingNotification } =
    useCreateNotification();

  const Resources = () => {
    // Navigate Resources Page
    navigate("/dashboard/resources");
  };

  const videoPage = () => {
    // Navigate Resources Page
    navigate(`/dashboard/video-page/${id}`);
  };

  const { data, isLoading } = useGetResource(id);

  if (isLoading) {
    return <Loader showMessages={false} showProgressBar={false} />;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const checkPermission = () => {
    if (user.userType === "Student" && data.isBuyer) {
      return true;
    }

    if (user.userType === "Teacher" && data.isAssigned) {
      return true;
    }

    if (user.userType === "Admin") {
      return true;
    }
  };

  const assignResource = () => {
    mutate(
      { resourceId: Number(id) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("resource");
        },
      }
    );
  };

  const sendNotificationToAdmin = () => {
    sendNotification(
      {
        title: "Resource Request",
        message: `${user.name} requested for meeting with ${data.assignTeacher} for course ${data.title}`,
        teacherEmail: data.assignTeacherEmail,
        studentEmail: user.email,
        courseTitle: data.title,
      },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Request Sent!",
            description: "Request sent to admin.",
            className: "bg-green-500 text-white",
          });
        },
      }
    );
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white shadow-lg rounded-lg">
          {/* Left Column (Details) */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{data?.title}</h1>
            <p className="text-gray-600">{data?.description}</p>

            {/* Resource Information */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Banknote className="mr-1" /> {data?.price} PKR
              </span>
              <span className="flex items-center">
                {data?.type === "Video" ? (
                  <Video className="mr-1 text-blue-500" />
                ) : data?.type === "PDF" ? (
                  <FileText className="mr-1 text-red-500" />
                ) : null}
                {data?.type}
              </span>
            </div>

            {/* Teacher Information */}
            {data?.assignTeacher && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 md:mb-2">
                  Teacher Details
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src={data?.assignTeacherPic}
                    alt={data?.assignTeacher}
                    className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      {data?.assignTeacher}
                    </h3>
                    <p className="text-gray-600 normal-case text-sm md:text-base">
                      {data?.assignTeacherEmail}
                    </p>
                  </div>
                  {user.userType === "Student" && data.isBuyer && (
                    <div className="flex flex-col items-start mt-3 sm:mt-0">
                      <Button
                        className="w-full sm:w-auto"
                        onClick={sendNotificationToAdmin}
                        disabled={data.status && data.status === "pending"}
                      >
                        {sendingNotification ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </>
                        ) : (
                          "Request a meeting"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Conditional Student Meeting Request */}

            {/* Call to Action */}
            {checkPermission() && (
              <>
                <Button
                  className="mt-4"
                  onClick={
                    data?.type === "PDF"
                      ? () => window.open(data.pdf, "_blank")
                      : videoPage
                  }
                >
                  Get Started
                </Button>
              </>
            )}

            <>
              {/* Generate Quiz Button for Teacher */}
              {user?.userType === "Teacher" && data.isAssigned && (
                <>
                  <Button
                    className="mt-4 ml-3 bg-green-600 hover:bg-green-500 focus:bg-green-500"
                    onClick={() => navigate(`/dashboard/${id}/generate-quiz`)}
                  >
                    Generate Quiz
                  </Button>
                  <Button
                    className="mt-4 ml-3 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500"
                    onClick={() => navigate(`/dashboard/${id}/add-assignment`)}
                  >
                    Add Assignment
                  </Button>
                </>
              )}
              {/* View Quizzes Button for Student */}
              {user?.userType === "Student" && data.isBuyer && (
                <>
                  <Button
                    className="mt-4 ml-3 bg-green-600 hover:bg-green-500"
                    onClick={() => navigate(`/dashboard/${id}/quizzes`)}
                  >
                    View Quizzes
                  </Button>
                  <Button
                    className="mt-4 ml-3 bg-blue-600 hover:bg-blue-500"
                    onClick={() => navigate(`/dashboard/${id}/assignments`)}
                  >
                    View Assignments
                  </Button>
                </>
              )}
            </>

            {/* Payment Button for Students */}
            {user?.userType === "Student" && !data.isBuyer && (
              <PaymentButton amount={data?.price} resourceId={data.id} />
            )}

            {/* Assign Button for Teachers */}
            {user?.userType === "Teacher" && !data.isAssigned && (
              <Button size="sm" className="mt-4" onClick={assignResource}>
                <UserCheck className="h-4 w-4 mr-2" /> Assign
              </Button>
            )}
          </div>

          {/* Right Column (Image) */}
          <div className="flex justify-center items-center">
            <img
              src={data?.thumbnail}
              alt={`${data?.title} thumbnail`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </>
  );
}

// props validation
ResourceDetails.propTypes = {
  title: PropTypes.string,
};

export default ResourceDetails;
