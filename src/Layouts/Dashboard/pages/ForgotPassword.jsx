import { useEffect, useState } from "react";
import { useForgotPassword } from "@/hooks/useAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import svg from "../assets/illustration.svg";
import { Label } from "@/Layouts/Dashboard/components/ui/label";
import { Input } from "@/Layouts/Dashboard/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import PropTypes from "prop-types";

function ForgotPassword({ title }) {
  const { toast } = useToast();
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const [userEmail, setUserEmail] = useState({ email: "" });
  const { mutate, isLoading } = useForgotPassword(onSuccess, onError);

  const handleChange = (e) => {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const Email = {
      email: userEmail.email,
    };

    mutate(Email);
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Link Sent Successfully!",
      description: "Please check your inbox.",
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
    console.log(error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.response?.data?.message,
    });
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="hidden bg-muted lg:block">
          <img
            src={svg}
            alt="Image"
            width="879"
            height="581"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12 flex-row-reverse">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Please enter your email so we can send you a reset password
                email.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Email</Label>
                <Input
                  value={userEmail.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Send Now"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                Go Back to &nbsp;
                <Link to={"/login"} className="underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// props validation
ForgotPassword.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ForgotPassword;
