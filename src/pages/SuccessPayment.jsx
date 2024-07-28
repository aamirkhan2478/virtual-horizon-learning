import axios from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SuccessPayment = () => {
  const location = useLocation();
  const [session, setSession] = useState(null);

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
      }
    };
    fetchSession();
  }, [location.search]);
  return (
    <div>
      <h1>Payment Successful</h1>
      {session && (
        <div>
          <p>Thank you for your purchase, {session.customer_details.name}!</p>
          <p>
            We have received your payment of {session.currency.toUpperCase()}{" "}
            {session.amount_total / 100}.
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessPayment;
