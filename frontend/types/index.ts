export interface Work {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  image_url?: string;
  author?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // hashed_password?: string; // 필요시 추가
}