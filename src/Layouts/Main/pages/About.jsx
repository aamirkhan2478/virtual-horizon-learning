import React from "react";
import aboutImg from "../assets/images/about.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import { FAQs } from "./FAQs";
import { Laptop, LogIn, TvMinimalPlay, UserPlus } from "lucide-react";

export const About = () => {
  return (
    <>
      <section className="about pb-20">
        <div className="container">
          <div className="heading text-center py-12">
            <h1 className="text-3xl font-semibold text-black">
              Why Virtual Horizon Learning Stands Out
            </h1>
            <span className="text-sm mt-2 block">
              You don't have to struggle alone. With Virtual Horizon Learning,
              you've got our assistance and guidance.
            </span>
          </div>
          <div className="grid grid-cols-4 gap-5 mt-3 md:grid-cols-2">
            <AboutCard
              color="bg-[#2D69F0]"
              icon={<UserPlus size={50} />}
              title="Register with Ease"
              desc="Sign up quickly to unlock access to a variety of online classes tailored to your needs."
            />
            <AboutCard
              color="bg-[#DD246E]"
              icon={<LogIn size={50} />}
              title="Simple Login"
              desc="Log in securely to access your personalized dashboard and course materials."
            />
            <AboutCard
              color="bg-[#8007E6]"
              icon={<TvMinimalPlay size={50} />}
              title="Join Live Classes"
              desc="Participate in engaging live classes led by expert instructors from anywhere in the world."
            />
            <AboutCard
              color="bg-[#0CAE74]"
              icon={<Laptop size={50} />}
              title="Learn Anytime"
              desc="Access recorded classes and resources to learn at your own pace."
            />
          </div>
        </div>
      </section>
      <AboutContent />

      {/* Conditionally render FAQs only on the /about page */}
      {location.pathname === "/about" && <FAQs />}
    </>
  );
};
export const AboutCard = (props) => {
  return (
    <div
      className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300 `}
    >
      <div className="icon">{props.icon}</div>
      <div className="text mt-5">
        <h4 className="text-lg font-semibold my-3">{props.title}</h4>
        <p className="text-sm">{props.desc}</p>
      </div>
    </div>
  );
};

export const AboutContent = () => {
  return (
    <section className="mb-16">
      <div className="container flex md1:flex-col">
        <div className="left w-1/3 md1:w-full mr-8 md1:mr-0 relative">
          <img src={aboutImg} alt="aboutImg" className=" rounded-xl" />
        </div>
        <div className="right w-2/3 md1:w-full md1:mt-16">
          <div className="heading w-4/5 md1:w-full">
            <h1 className="text-2xl font-semibold text-black normal-case">
              About Virtual Horizon Learning
            </h1>
            <span className="text-sm mt-2 block leading-6 normal-case">
              Empowering Learners, Transforming Futures
            </span>
            <ul className="my-5 normal-case">
              <li className="text-sm flex items-center gap-5">
                <AiOutlineCheck className="text-green-500" />
                Adaptive learning pathways through AI-generated quizzes.
              </li>
              <li className="text-sm flex items-center gap-5 my-2">
                <AiOutlineCheck className="text-green-500" />
                Live sessions & on-demand tutoring.
              </li>
              <li className="text-sm flex items-center gap-5">
                <AiOutlineCheck className="text-green-500" />
                Learn the latest skills and stay ahead of the curve
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
