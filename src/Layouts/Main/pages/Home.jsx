import heroImg from "../assets/images/hero.png";
import heroImgback from "../assets/images/hero-shape-purple.png";
// import { FiSearch } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaBookReader, FaGraduationCap, FaUsers } from "react-icons/fa";
import { About } from "./About";
import { Courses } from "./Courses";
import { Instructor } from "./Instructor";
// import { Blog } from "./Blog";

export const Home = () => {
  return (
    <>
      <HomeContent />
      <About />
      <br />
      <br />
      <br />
      <Courses />
      <Instructor />
      {/* <Blog /> */}
    </>
  );
};
export const HomeContent = () => {
  return (
    <>
      <section className="bg-secondary1 py-10 h-[92vh] md1:h-full">
        <div className="container">
          <div className="flex items-center justify-center md1:flex-col">
            <div className="left w-1/2 text-black md1:w-full">
              <h1 className="text-2xl leading-tight text-black font-semibold">
                Launch Your Learning Journey with Virtual Horizon!
              </h1>
              <h3 className="text-md mt-3">
                Get unlimited access to over 60+ expert instructors.
              </h3>
              <span className="text-[14px]">
                You&apos;re guaranteed to find the perfect course for your academic
                and personal growth.
              </span>
            </div>
            <div className="right w-1/2 md1:w-full relative">
              <div className="images relative">
                <img
                  src={heroImgback}
                  alt=""
                  className=" absolute top-32 left-10 w-96 md1:left-10"
                />
                <div className="img h-[85vh] w-full">
                  <img
                    src={heroImg}
                    alt=""
                    className="h-full w-full object-contain z-20 relative"
                  />
                </div>
              </div>
              <div className="content">
                <button className="bg-white shadow-md absolute top-56 left-0 z-30 p-2 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400">
                    <BsFillLightningChargeFill size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">Congratulations</span>
                    <span className="text-[12px]">
                      Your admission completed
                    </span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute bottom-32 left-48 z-30 p-2 flex items-center rounded-md pr-8">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-blue-400">
                    <FaGraduationCap size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">450K</span>
                    <span className="text-[12px]">Assisted Student</span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute top-56 -right-32 z-30 p-2  md1:top-96 md1:-right-5 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400">
                    <FaUsers size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">
                      User Experience Class
                    </span>
                    <span className="text-[12px]">Tomorrow is our</span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute top-32 right-32 z-30 p-2 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-indigo-400">
                    <FaBookReader size={25} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
