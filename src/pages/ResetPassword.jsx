import { useEffect, useState } from "react";
import { useResetPassword } from "@/hooks/useAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import svg from "../assets/illustration.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword({ title }) {
  const { toast } = useToast();
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading } = useResetPassword(onSuccess, onError);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [userData, setUserData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPassword = {
      token: token,
      password: userData.password,
    };

    mutate(userPassword, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  function onSuccess(data) {
    console.log('data',data);
    console.log("data?.data?.data?.message", data?.data?.data?.message);
    console.log("data?.data?.message", data?.data?.message);
    
    toast({
      variant: "default",
      title: data?.data?.message,
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
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
              <h1 className="text-3xl font-bold">Reset Password</h1>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    value={userData.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-0 mt-2 mr-3"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
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
                  "Reset Now"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                If token expired get new link from &nbsp;
                <Link to={"/forgot-password"} className="underline">
                  here
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
ResetPassword.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ResetPassword;
