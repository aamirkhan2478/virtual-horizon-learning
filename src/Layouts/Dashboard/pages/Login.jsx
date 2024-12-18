import { Button } from "@/Layouts/Dashboard/components/ui/button";
import { Input } from "@/Layouts/Dashboard/components/ui/input";
import { Label } from "@/Layouts/Dashboard/components/ui/label";
import { Link } from "react-router-dom";
import svg from "../assets/illustration.svg";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ title }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading } = useLogin(onSuccess, onError);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = {
      email: user.email,
      password: user.password,
    };

    mutate(loginUser, {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));

        navigate("/dashboard");
      },
    });
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Logged in Successfully!",
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
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm text-balance text-muted-foreground normal-case">
                Enter your credentials to login to your account
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={user.email}
                    onChange={handleInputChange}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={"/forgot-password"}
                      className="ml-auto inline-block text-sm underline normal-case"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      value={user.password}
                      onChange={handleInputChange}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 top-0 mt-2 mr-3"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm normal-case">
              Don&apos;t have an account?&nbsp;
              <Link to={"/register"} className="underline">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm normal-case">
              Don&apos;t get verification email?&nbsp;
              <Link to={"/resend-email"} className="underline">
                Resend Now
              </Link>
            </div>
            <div className="text-center text-sm normal-case">
              Go to Home Page?&nbsp;
              <Link to={"/"} className="underline">
                Home Page
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={svg}
            alt="Image"
            width="879"
            height="581"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

// props validation
Login.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Login;
