import { api } from "../api/client";

export const generateDescription = async (title: string, type: string) => {
  const response = await api.post("/ai/generate-description", {
    title,
    type,
  });

  return response.data;
};
