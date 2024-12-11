import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/Layouts/Dashboard/components/ui/card";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Layouts/Dashboard/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Layouts/Dashboard/components/ui/dialog";
import { Label } from "@/Layouts/Dashboard/components/ui/label";
import { Input } from "@/Layouts/Dashboard/components/ui/input";
import { Eye, EyeOff, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useChangePassword, useUpdate, useUpdateImage } from "@/hooks/useAuth";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";

const Profile = ({ title }) => {
  const defaultUserImage =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
    // Retrieve the user data from localStorage
    const userDataJSON = localStorage.getItem("user");

    // Parse the JSON string to get the user object
    const userData = JSON.parse(userDataJSON);

    if (userData && userData.name && userData.email) {
      // Set the user data to state
      setUser(userData);
      setProfilePic(userData.pic || defaultUserImage);
    } else {
      console.log("User data not found in localStorage.");
    }
  }, [title]);

  // Update the user data
  const navigate = useNavigate();

  const { toast } = useToast();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const { mutate, isLoading } = useUpdate(onSuccess, onError);
  const { mutate: updateImage, isLoading: uploading } = useUpdateImage(
    onSuccess,
    onError
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();

    const updateUser = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    mutate(updateUser, {
      onSuccess: () => {
        navigate("/dashboard/user-profile");
        // Update the user data in localStorage
        const userDataJSON = localStorage.getItem("user");
        // Parse the JSON string to get the user object
        const userData = JSON.parse(userDataJSON);
        // Update the user object
        const newUser = {
          ...userData,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };
        // Update the user data in localStorage
        localStorage.setItem("user", JSON.stringify(newUser));
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("pic", file);

      updateImage(formData, {
        onSuccess: (data) => {
          console.log(data?.data);
          toast({
            variant: "default",
            title: "Profile image updated successfully.",
            className: "bg-green-500 text-white",
          });

          // Update the user data in localStorage
          const userDataJSON = localStorage.getItem("user");
          // Parse the JSON string to get the user object
          const userData = JSON.parse(userDataJSON);
          // Update the user object
          const newUser = {
            ...userData,
            pic: data.data.pic,
          };

          // Update the user data in localStorage
          localStorage.setItem("user", JSON.stringify(newUser));
        },
      });
    }
  };

  const passwordRef = useRef();
  const newPasswordRef = useRef();

  // Update the user password
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handlePasswordUpdate = (e) => {
    const { name, value } = e.target;
    setPassword((Password) => ({
      ...Password,
      [name]: value,
    }));
  };

  const { mutate: changePassword, isLoading: changePasswordLoading } =
    useChangePassword(onSuccess, onError);

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const updatePassword = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    };

    changePassword(updatePassword, {
      onSuccess: () => {
        navigate("/dashboard/user-profile");

        // Clear the password fields
        passwordRef.current.value = "";
        newPasswordRef.current.value = "";
      },
    });
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onSuccess(data) {
    setIsDialogOpen(false);
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
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
      </div>
      <div className="grid gap-3">
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label
                        htmlFor="profile-pic-input"
                        className="cursor-pointer"
                      >
                        <Avatar className="w-20 h-20 border">
                          <AvatarImage src={profilePic} alt="User profile" />
                          <AvatarFallback>
                            {uploading && (
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </label>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Click Image to Update it.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <Pencil size={18} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="normal-case">
                        Edit profile
                      </DialogTitle>
                      <DialogDescription className="normal-case">
                        Make changes to your profile. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={user?.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={user?.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="phone">Phone #</Label>
                        <Input
                          id="phone"
                          name="phoneNumber"
                          value={user?.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleUserUpdate}
                        size="sm"
                        variant="outline"
                      >
                        {isLoading ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Name</p>
                  <p className="text-sm text-muted-foreground normal-case">
                    {user?.name}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground normal-case">
                    {user?.email}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Phone #</p>
                  <p className="text-sm text-muted-foreground normal-case">
                    {user?.phoneNumber}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Type</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.userType}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <div>
                <h2 className="text-lg font-bold">Change Password</h2>
              </div>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        ref={passwordRef}
                        onChange={handlePasswordUpdate}
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleCurrentPasswordVisibility}
                        className="absolute right-0 top-0 mt-2.5 mr-3"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        ref={newPasswordRef}
                        onChange={handlePasswordUpdate}
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-0 top-0 mt-2.5 mr-3"
                      >
                        {showNewPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2 md:lg:pt-[30px]">
                    <Button
                      className="md:lg:w-[160px]"
                      disabled={changePasswordLoading}
                      onClick={handlePasswordChange}
                      variant="outline"
                    >
                      {changePasswordLoading ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Change password"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Profile;
