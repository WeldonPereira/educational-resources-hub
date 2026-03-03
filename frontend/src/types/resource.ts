export interface Tag {
  id: number;
  name: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  url: string;
  created_at: string;
  tags: Tag[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}