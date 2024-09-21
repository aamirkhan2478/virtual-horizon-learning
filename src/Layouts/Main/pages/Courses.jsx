import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useGetCourses } from "@/hooks/useResources";

export const Courses = () => {
  const { data: courses, isLoading, error } = useGetCourses();
  const navigate = useNavigate();

  const handleDetailsClick = (courseId) => {
    const user = localStorage.getItem("user");

    if (user) {
      // Navigate to course details if user is found
      navigate(`/dashboard/resource-details/${courseId}`);
    } else {
      // Redirect to login if no user is found
      navigate("/login");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching courses</div>;

  return (
    <>
      <section className="courses bg-[#F3F4F8] py-16 ">
        <div className="w-4/5 m-auto">
          <div className="heading mb-16">
            <h1 className="text-3xl font-semibold text-black">
              Find The Right Online Course For You
            </h1>
            <span className="text-sm mt-2 block">
              you don't have to struggle alone, you've got our assistance and
              help.
            </span>
          </div>
          <div className="grid grid-cols-3 gap-8 md1:grid-cols-1">
            {courses.map((course, index) => (
              <div
                key={index}
                className="box rounded-lg shadow-shadow1 bg-white"
              >
                <div className="images rounded-t-lg relative overflow-hidden h-40 w-ful">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
                  />
                </div>
                <div className="text p-3">
                  <h3 className="text-black my-4 font-medium h-10">
                    {course.title}
                  </h3>
                  <div className="user flex items-center">
                    <img
                      className="rounded-full"
                      src="https://secure.gravatar.com/avatar/75ec18a5bf959aab895830be3a78cb34?s=50&d=mm&r=g"
                      alt=""
                    />
                    <span className="text-[14px] ml-2"> Sunil</span>
                  </div>
                </div>
                <div
                  to="/"
                  className="flex items-center justify-between border-t border-gray-200 p-3"
                >
                  <span className="text-sm text-primary1">
                    PKR {course.price}
                  </span>
                  <button
                    onClick={() => handleDetailsClick(course.id)}
                    className="text-[14px] ml-2 flex items-center"
                  >
                    Know Details <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
