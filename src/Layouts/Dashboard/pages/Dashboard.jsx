import PropTypes from "prop-types";
import { useEffect } from "react";
import { LibraryBig, Users, UsersRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Layouts/Dashboard/components/ui/card";
import { useCounts } from "@/hooks/useResources";
import Loader from "@/components/Loader";

const Dashboard = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const user = JSON.parse(localStorage.getItem("user"));
  const { data: counts, isLoading } = useCounts(user.id);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {user.userType} Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user.userType === "Admin" ? (
          <>
            {isLoading ? (
              <Loader showProgressBar={false} />
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Students
                    </CardTitle>
                    <UsersRound className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.totalStudents}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Teachers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.totalStudents}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Resources
                    </CardTitle>
                    <LibraryBig className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.totalStudents}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        ) : user.userType === "Student" ? (
          <>
            {isLoading ? (
              <Loader showProgressBar={false} />
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Resources
                    </CardTitle>
                    <LibraryBig className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.totalResources}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Purchased Resources
                    </CardTitle>
                    <LibraryBig className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.purchasedResources}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader showProgressBar={false} />
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Resources
                    </CardTitle>
                    <LibraryBig className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.totalResources}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Assigned Resources
                    </CardTitle>
                    <LibraryBig className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {counts?.assignedResources}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Dashboard;
