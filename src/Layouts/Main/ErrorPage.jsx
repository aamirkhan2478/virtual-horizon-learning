import { useNavigate } from "react-router-dom";

const ErrorPage = ({ title }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        {title || "404 - Page Not Found"}
      </h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={goToHome}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
