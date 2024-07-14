import { useMutation } from "react-query";
import axios from "../utils/axiosInstance";

const registerUser = (values) => axios.post("/user/register", values);
const verifyUser = (values) => axios.post("/user/verify-email", values);
const loginUser = (values) => axios.post("/user/login", values);
const forgotPassword = (values) => axios.post("/user/forgot-password", values);
const resendEmail = (values) => axios.post("/user/resend-email", values);
const resetPassword = (values) => axios.post("/user/reset-password", values);

export const useRegister = (onSuccess, onError) => {
    return useMutation(registerUser, {
        onSuccess,
        onError,
    });
};

export const useVerify = (onSuccess, onError) => {
    return useMutation(verifyUser, {
        onSuccess,
        onError,
    });
};

export const useLogin = (onSuccess, onError) => {
    return useMutation(loginUser, {
        onSuccess,
        onError,
    });
};

export const useForgotPassword = (onSuccess, onError) => {
    return useMutation(forgotPassword, {
        onSuccess,
        onError,
    });
};

export const useResendEmail = (onSuccess, onError) => {
    return useMutation(resendEmail, {
        onSuccess,
        onError,
    });
};

export const useResetPassword = (onSuccess, onError) => {
    return useMutation(resetPassword, {
        onSuccess,
        onError,
    });
};