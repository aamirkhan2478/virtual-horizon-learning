import { useMutation, useQuery } from "react-query";
import axios from "../utils/axiosInstance";

const createResource = (values) => {
  const token = localStorage.getItem("token");
  return axios.post("/resource/create", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getResources = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("/resource/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const getResource = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`/resource/${id}/show`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteResource = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(`/resource/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateResource = async (id, values) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.put(`/resource/${id}/update`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const makePayment = async (values) => {
  const token = localStorage.getItem("token");
  const {
    data: { id },
  } = await axios.post(`/resource/payment`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};

const assignResource = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(`/resource/assign`, id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetResource = (id) => {
  return useQuery(["resource", id], () => getResource(id));
};

export const useDeleteResource = () => {
  return useMutation(deleteResource);
};

export const useUpdateResource = () => {
  return useMutation(updateResource);
};

export const useGetResources = () => {
  return useQuery("resources", getResources);
};

export const useCreateResource = (onSuccess, onError) => {
  return useMutation(createResource, {
    onSuccess,
    onError,
  });
};

export const useMakePayment = (onSuccess, onError) => {
  return useMutation(makePayment, {
    onSuccess,
    onError,
  });
};

export const useAssignResource = () => {
  return useMutation(assignResource);
};
