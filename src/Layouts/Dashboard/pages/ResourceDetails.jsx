import { Button } from "@/Layouts/Dashboard/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { useGetResource, useAssignResource } from "@/hooks/useResources";
import { ArrowRight, UserCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PaymentButton from "@/Layouts/Dashboard/components/PaymentButton";
import { useCreateNotification } from "@/hooks/useNotification";
import { useQueryClient } from "react-query";
import { toast } from "../components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

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
    return <div>Loading...</div>;
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
              {data.assignTeacher && (
                <>
                  <h2 className="mt-5 text-xl font-semibold">
                    Teacher Details
                  </h2>
                  <ul className="ml-5">
                    <li className="list-disc">{data.assignTeacher}</li>
                    <li className="list-disc">{data.assignTeacherEmail}</li>
                  </ul>
                  {user.userType === "Student" && (
                    <>
                      <Button
                        className="mt-3"
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
                      <p className="mt-5">
                        {data.status && data.status === "pending" ? (
                          <span className="text-yellow-300">
                            Please wait for response from Admin
                          </span>
                        ) : data.status === "approved" ? (
                          <span className="text-green-300">
                            Please check your email inbox for meeting details
                          </span>
                        ) : data.status === "approved" ? (
                          <span className="text-red-300">
                            Note: If you already got an email and done you
                            meeting then ignore this message or if you
                            haven&apos;t received email then request a meeting
                            again
                          </span>
                        ) : null}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-sm font-medium text-gray-500">
                Price: {data.price} PKR
              </span>

              {checkPermission() && (
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
              )}

              {user?.userType === "Student" && !data.isBuyer && (
                <PaymentButton amount={data?.price} resourceId={data.id} />
              )}

              {user?.userType === "Teacher" && !data.isAssigned && (
                <Button size="sm" className="mt-4" onClick={assignResource}>
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

// props validation
ResourceDetails.propTypes = {
  title: PropTypes.string,
};

export default ResourceDetails;
