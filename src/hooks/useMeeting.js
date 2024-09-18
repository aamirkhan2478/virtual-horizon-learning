import { useMutation } from "react-query";
import axios from "../utils/axiosInstance";

const sendEmail = async (values) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post("/meeting/send-email", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useSendEmail = (onSuccess, onError) => {
  return useMutation(sendEmail, {
    onSuccess,
    onError,
  });
};
