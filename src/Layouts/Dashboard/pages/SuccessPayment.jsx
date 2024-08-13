import axios from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/Layouts/Dashboard/components/ui/card";
import PropTypes from "prop-types";
import SizedConfetti from "react-confetti";

const SuccessPayment = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  const location = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionId = new URLSearchParams(location.search).get("session_id");
      if (sessionId) {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/resource/session/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSession(data);
        setLoading(false);
      }
    };
    fetchSession();
  }, [location.search]);

  const party = true;
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {loading ? (
        <Loader className="animate-spin text-gray-600" size={48} />
      ) : (
        session && (
          <>
            <SizedConfetti
              style={{ pointerEvents: "none" }}
              numberOfPieces={party ? 500 : 0}
              recycle={false}
              onConfettiComplete={(confetti) => {
                confetti.reset();
              }}
            />
            <Card className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <CardContent className="flex flex-col items-center text-center">
                <CheckCircle className="text-green-500 w-16 h-16 mb-5" />
                <h1 className="sm:text-sm md:lg:text-2xl font-bold mb-5">
                  Payment Successful
                </h1>
                <p className="text-sm md:lg:text-xl font-semibold mb-5">
                  Thank you for your purchase, {session.customer_details.name}!
                </p>

                <p className="text-sm text-gray-600">
                  We have received your payment of{" "}
                  {session.currency.toUpperCase()} {session.amount_total / 100}.
                </p>
              </CardContent>
            </Card>
          </>
        )
      )}
    </div>
  );
};

// props validation
SuccessPayment.propTypes = {
  title: PropTypes.string,
};

export default SuccessPayment;
