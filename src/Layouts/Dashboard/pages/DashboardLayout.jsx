import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookMarked, Home, School, PanelLeft, UserCog } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Layouts/Dashboard/components/ui/tooltip";
import { Button } from "@/Layouts/Dashboard/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Layouts/Dashboard/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/Layouts/Dashboard/components/ui/sheet";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import PropTypes from "prop-types";
import Notification from "../components/Notification";

const DashboardLayout = ({ title }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Navigate User to Login
    navigate("/");

    toast({
      variant: "default",
      title: "Logged Out Successfully!",
      className: "bg-green-500 text-white",
    });
  };

  const userProfile = () => {
    // Navigate User Profile Page
    navigate("/dashboard/user-profile");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const defaultUserImage =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  const location = useLocation();
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-foreground"
      : "text-muted-foreground";
  };

  const getActiveBg = (path) => {
    return location.pathname === path ? "bg-accent" : "";
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <TooltipProvider>
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
              <Link
                to={"/"}
                className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base ${getLinkClass("/dashboard")}`}
              >
                <School className="font-bold h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Virtual Horizon Learning</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"/dashboard"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:text-foreground transition-colors md:h-8 md:w-8 ${getLinkClass("/dashboard")} ${getActiveBg("/dashboard")}`}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"/dashboard/resources"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:text-foreground transition-colors md:h-8 md:w-8 ${getLinkClass("/dashboard/resources")} ${getActiveBg("/dashboard/resources")}`}
                  >
                    <BookMarked className="h-5 w-5" />
                    <span className="sr-only">Resources</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Resources</TooltipContent>
              </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={"/dashboard/user-profile"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${getLinkClass("/dashboard/user-profile")} ${getActiveBg("/dashboard/user-profile")}`}
                  >
                    <UserCog className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
            </nav>
          </aside>
        </TooltipProvider>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="sm:hidden"
                  onClick={() => setIsSheetOpen(true)}
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to={"/"}
                    onClick={handleLinkClick}
                    className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base ${getLinkClass("/dashboard")}`}
                  >
                    <School className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Virtual Horizon Learning</span>
                  </Link>
                  <Link
                    to={"/dashboard"}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-4 px-2.5 hover:text-foreground ${getLinkClass("/dashboard")}`}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to={"/dashboard/resources"}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-4 px-2.5 hover:text-foreground ${getLinkClass("/dashboard/resources")}`}
                  >
                    <BookMarked className="h-5 w-5" />
                    Resources
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <nav className="items-center flex">
              {user.userType === "Admin" && <Notification />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <img
                      src={user?.pic || defaultUserImage}
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    {user?.name}
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={userProfile}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </header>
          <main className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

DashboardLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;
