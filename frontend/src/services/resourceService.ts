import { api } from "../api/client";
import type { PaginatedResponse, Resource } from "../types/resource";

export const getResources = async (
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<Resource>> => {
  const response = await api.get(
    `/resources?page=${page}&page_size=${pageSize}`,
  );
  return response.data;
};

export const createResource = async (data: any) => {
  const response = await api.post("/resources", data);
  return response.data;
};

export const updateResource = async (id: number, data: any) => {
  const response = await api.put(`/resources/${id}`, data);
  return response.data;
};

export const deleteResource = async (id: number) => {
  const response = await api.delete(`/resources/${id}`);
  return response.data;
};
