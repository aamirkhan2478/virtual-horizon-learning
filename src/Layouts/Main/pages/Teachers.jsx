import React, { useEffect } from "react";
import { useCounts } from "@/hooks/useResources";
import { BookOpenCheck, GraduationCap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Teachers = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const { data: counts } = useCounts();
  const navigate = useNavigate();

  return (
    <>
      <section className="instructor mb-16">
        <div className="container">
          <div className="heading py-12 text-center w-2/3 m-auto md1:w-full">
            <h1 className="text-3xl font-semibold text-black normal-case">
              What is Virtual Horizon Learning?
            </h1>
            <span className="text-[14px] mt-2 block normal-case">
              At Virtual Horizon Learning, we believe in breaking down
              traditional barriers to education by leveraging cutting-edge
              technology to deliver a dynamic, personalized learning experience.
              Our innovative platform integrates live session, on-demand
              tutoring & AI-generated quizzes etc. all designed to engage
              students and enhance learning outcomes. Whether you're a student
              looking to improve your skills or a professional seeking career
              advancement, Virtual Horizon provides the tools and resources to
              help you succeed in today’s rapidly changing world.
            </span>
          </div>
          <div className="content justify-items-center grid grid-cols-2 gap-5 md1:grid-cols-1">
            <div className="images justify-items-center rounded-lg relative overflow-hidden h-72 w-ful before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content before:z-10">
              <img
                src="https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-1.jpg"
                alt=""
                className="rounded-t-lg object-cover w-full h-72"
              />
              <div className="categ flex flex-col gap-4 absolute top-12 left-6 z-30 m-3 p-8 items-center justify-center text-center">
                <h2 className="text-3xl text-white font-semibold normal-case">
                  Enroll as a Student
                </h2>
                <button
                  onClick={() => navigate("/register")}
                  className="text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white"
                >
                  Join Now
                </button>
              </div>
            </div>
            <div className="images justify-items-center rounded-lg relative overflow-hidden h-72 w-ful before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content before:z-10">
              <img
                src="https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-2.jpg"
                alt=""
                className="rounded-t-lg object-cover w-full h-72 relative"
              />
              <div className="categ flex flex-col gap-4 absolute top-12 left-6 z-30 m-3 p-8 items-center justify-center text-center">
                <h2 className="text-3xl text-white font-semibold normal-case">
                  Become a Teacher
                </h2>
                <button
                  onClick={() => navigate("/register")}
                  className="text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="heading py-12 text-center w-2/3 m-auto md1:w-full">
              <h1 className="text-3xl font-semibold text-black normal-case">
                We are proud
              </h1>
              <span className="text-[14px] mt-2 block normal-case">
                You don't have to struggle alone, you've got our assistance and
                help.
              </span>
            </div>
            <div className="content justify-items-center grid grid-cols-3 gap-2 md1:grid-cols-2">
              <TeachersCard
                color="text-red-500"
                icon={<Users size={40} />}
                title={counts?.totalStudents}
                desc="Total Students"
              />
              <TeachersCard
                color="text-orange-500"
                icon={<BookOpenCheck size={40} />}
                title={counts?.totalResources}
                desc="Total Resources"
              />
              <TeachersCard
                color="text-purple-500"
                icon={<GraduationCap size={40} />}
                title={counts?.totalTeachers}
                desc="Total Teachers"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export const TeachersCard = (props) => {
  return (
    <div className={`box p-5 py-5 rounded-md`}>
      <div className={`${props.color}`}>{props.icon}</div>
      <div className="text mt-2">
        <h4 className="text-lg font-semibold text-black">{props.title}</h4>
        <p className="text-[15px]">{props.desc}</p>
      </div>
    </div>
  );
};
