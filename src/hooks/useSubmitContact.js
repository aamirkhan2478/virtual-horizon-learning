import { useMutation } from "react-query";
import axios from "../utils/axiosInstance";

const submitContactForm = async (formData) => {
  const response = await axios.post("/contact", formData);
  return response.data;
};

export const useSubmitContact = (onSuccess, onError) => {
  return useMutation(submitContactForm, {
    onSuccess,
    onError,
  });
};
