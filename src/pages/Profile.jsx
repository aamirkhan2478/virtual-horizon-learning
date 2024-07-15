import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

const Profile = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const user = JSON.parse(localStorage.getItem("user"));
  const defaultUserImage =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

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
                <div>
                  <h2 className="text-lg font-bold">Personal Info.</h2>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="gosht" size="xs">
                      <Pencil size={18} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={user?.name} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="username" value={user?.email} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Phone #</Label>
                        <Input id="username" value={user?.phoneNumber} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Name</p>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-md font-medium leading-none">Phone #</p>
                  <p className="text-sm text-muted-foreground">
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="NewPassword">New Password</Label>
                    <Input id="NewPassword" type="password" required />
                  </div>
                </div>
              </form>
              <div className="flex justify-end pt-3">
                <Button>Change Password</Button>
              </div>
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
