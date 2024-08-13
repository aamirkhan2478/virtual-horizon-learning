import { useMutation, useQuery } from "react-query";
import axios from "../utils/axiosInstance";

const getNotifications = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("/notification/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const createNotification = async (values) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post("/notification/create", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const markNotificationAsRead = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.put(`/notification/${id}/read`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteNotification = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(`/notification/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useNotifications = () => {
  return useQuery("notifications", getNotifications);
};

export const useCreateNotification = (onSuccess, onError) => {
  return useMutation(createNotification, {
    onSuccess,
    onError,
  });
};

export const useMarkNotificationAsRead = (onSuccess, onError) => {
  return useMutation(markNotificationAsRead, {
    onSuccess,
    onError,
  });
};

export const useDeleteNotification = (onSuccess, onError) => {
  return useMutation(deleteNotification, {
    onSuccess,
    onError,
  });
};
