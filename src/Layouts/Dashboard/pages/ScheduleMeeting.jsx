import { useGetNotification } from "@/hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { v4 as uuid } from "uuid";
import { useSendEmail } from "@/hooks/useMeeting";
import { toast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import Loader from "@/components/Loader";

const ScheduleMeeting = () => {
  const { notification_id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGetNotification(notification_id);

  const { mutate, isLoading: sending } = useSendEmail(onSuccess, onError);

  const [meetingDate, setMeetingDate] = useState("");

  const generateMeetingLink = `${window.location.protocol}//${window.location.host}/room/${uuid()}`;

  if (isLoading) {
    return (
      // <div className="flex justify-center items-center">
      //   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      // </div>
      <Loader showMessages={false} />
    );
  }

  const handleScheduleMeeting = () => {
    const values = {
      emails: [data?.teacher_email, data?.student_email],
      subject: "Meeting Schedule",
      emailType: "meeting",
      meetingDate: meetingDate.meetingDate,
      meetingLink: generateMeetingLink,
      courseTitle: data?.course_title || "",
    };

    mutate(values);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMeetingDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function onSuccess(data) {
    toast({
      variant: "default",
      title: "Meeting Scheduled!",
      description: data.message,
      className: "bg-green-500 text-white",
    });
    navigate("/dashboard");
  }

  function onError(error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.response?.data?.message,
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user.userType === "Admin" ? (
        <div className="flex justify-center items-center">
          <Card className="md:w-[50%]">
            <CardHeader className="border-b-2">
              <CardTitle>Schedule Meeting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-5 mt-4 md:w-[70%]">
                <div className="md:w-96">
                  <Label htmlFor="date">Meeting Date</Label>
                  <Input
                    type="datetime-local"
                    id="date"
                    className="md:place-content-center"
                    name="meetingDate"
                    onChange={changeHandler}
                  />
                </div>
                <div className="md:w-96">
                  <Label>Teacher Email</Label>
                  <Input
                    type="text"
                    disabled
                    value={data?.teacher_email}
                    className="md:text-center"
                  />
                </div>
                <div className="md:w-96">
                  <Label>Student Email</Label>
                  <Input
                    type="text"
                    disabled
                    value={data?.student_email}
                    className="md:text-center"
                  />
                </div>
                <div className="md:w-96">
                  <Label>Course Title</Label>
                  <Input
                    type="text"
                    disabled
                    value={data?.course_title}
                    className="md:text-center"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleScheduleMeeting} disabled={sending}>
                {sending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Schedule Meeting"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        // This page is only accessible to Admins
        <div className="flex justify-center items-center">
          <Card className="md:w-[50%]">
            <CardHeader className="border-b-2">
              <CardTitle className="flex justify-center items-center gap-2 text-red-500">
                <TriangleAlert size={40} /> <span>Unauthorized Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="text-center text-red-500 font-bold text-2xl mt-4">
                You are not authorized to access this page
              </h1>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ScheduleMeeting;
