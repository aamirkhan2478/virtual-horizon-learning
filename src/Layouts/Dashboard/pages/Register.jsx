import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import { Input } from "@/Layouts/Dashboard/components/ui/input";
import { Label } from "@/Layouts/Dashboard/components/ui/label";
import { useRegister } from "@/hooks/useAuth";
import svg from "../assets/illustration.svg";
import Select from "../components/Select";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

const Register = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const data = [
    { value: "Teacher", label: "Teacher" },
    { value: "Student", label: "Student" },
    // { value: "Parent", label: "Parent" },
  ];

  const { mutate, isLoading } = useRegister(onSuccess, onError);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectType: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setUser((prevState) => ({
      ...prevState,
      selectType: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      userType: user.selectType,
      phoneNumber: user.phoneNumber,
    };

    mutate(newUser);
  };

  function onSuccess() {
    toast({
      variant: "default",
      title: "Registered Successfully!",
      description: "Please check your email for verification.",
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
            className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12 flex-row-reverse">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-sm text-balance text-muted-foreground normal-case">
                Enter your details to create an account
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={user.name}
                    onChange={handleInputChange}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
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
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    id="phoneNumber"
                    type="tel"
                    placeholder="0123456789"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      value={user.password}
                      onChange={handleInputChange}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
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
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pr-10"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-0 top-0 mt-2 mr-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selectType">Select Type</Label>
                  <Select
                    id="selectType"
                    data={data}
                    value={user.selectType}
                    onChange={handleSelectChange}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register Now"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm normal-case">
              Already have an account?&nbsp;
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// props validation
Register.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Register;
