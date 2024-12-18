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

export const useGetCourses = () => {
  return useQuery("courses", getCourses);
};

const getCourses = async () => {
  const { data } = await axios.get(`/resource/latest`);
  return data;
};

const generateQuiz = (values) => {
  const token = localStorage.getItem("token");
  return axios.post("/resource/generate-quiz", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGenerateQuiz = (onSuccess, onError) => {
  return useMutation(generateQuiz, {
    onSuccess,
    onError,
  });
};

const saveQuiz = (values) => {
  const token = localStorage.getItem("token");
  return axios.post("/resource/save-quiz", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSaveQuiz = () => {
  return useMutation(saveQuiz);
};

const addAssignment = (values) => {
  const token = localStorage.getItem("token");
  return axios.post("/resource/save-assignment", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useAddAssignment = (onSuccess, onError) => {
  return useMutation(addAssignment, {
    onSuccess,
    onError,
  });
};

const submitAssignment = (values) => {
  const token = localStorage.getItem("token");
  return axios.post("/resource/submit-assignment", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSubmitAssignment = (onSuccess, onError) => {
  return useMutation(submitAssignment, {
    onSuccess,
    onError,
  });
};

const getCounts = async (userId) => {
  if (userId) {
    const { data } = await axios.get(`/counts?userId=${userId}`);
    return data;
  } else {
    const { data } = await axios.get(`/counts`);
    return data;
  }
};

export const useCounts = (userId) => {
  return useQuery({
    queryKey: ["counts", userId],
    queryFn: () => getCounts(userId),
  });
};

const getQuizzesList = async (resourceId) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `/resource/quizzes?resourceId=${resourceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useQuizzesList = (resourceId) => {
  return useQuery({
    queryKey: ["quizzes", resourceId],
    queryFn: () => getQuizzesList(resourceId),
  });
};

const updateQuiz = async (values) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(`/resource/update-quiz`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateQuiz = () => {
  return useMutation(updateQuiz);
};

const getAssignmentList = async (resourceId) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `/resource/assignments?resourceId=${resourceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useAssignmentList = (resourceId) => {
  return useQuery({
    queryKey: ["assignments", resourceId],
    queryFn: () => getAssignmentList(resourceId),
  });
};

const getSubmittedAssignments = async (resourceId) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `/resource/submitted-assignments?resourceId=${resourceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useSubmittedAssignments = (resourceId) => {
  return useQuery({
    queryKey: ["submittedAssignments", resourceId],
    queryFn: () => getSubmittedAssignments(resourceId),
  });
};

const updateAssigmentScore = async (values) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(`/resource/update-assignment`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateAssigmentScore = (onSuccess, onError) => {
  return useMutation(updateAssigmentScore, {
    onSuccess,
    onError,
  });
};

const getScores = async (resourceId) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `/resource/scores?resourceId=${resourceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useScores = (resourceId) => {
  return useQuery({
    queryKey: ["scores", resourceId],
    queryFn: () => getScores(resourceId),
  });
};