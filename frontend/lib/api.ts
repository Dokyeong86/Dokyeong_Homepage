// Dokyeong_Homepage/frontend/lib/api.ts

import axios from 'axios';

// 환경 변수에서 백엔드 URL을 가져옵니다.
// process.env.NEXT_PUBLIC_BACKEND_URL은 Next.js가 빌드 시점에 주입하는 환경 변수입니다.
// 만약 환경 변수가 설정되지 않았다면 기본값 'http://localhost:8000'을 사용합니다.
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Axios 인스턴스 생성: 모든 API 요청의 기본 설정을 여기에 정의합니다.
const api = axios.create({
  baseURL: API_BASE_URL, // 모든 요청은 이 URL을 기준으로 합니다.
  headers: {
    'Content-Type': 'application/json', // 요청 본문이 JSON임을 명시
  },
  // timeout: 5000, // 요청 타임아웃 설정 (선택 사항)
});

// --- API 요청 함수들 정의 ---

// Works 관련 API 함수들
// 1. 모든 Work 가져오기 (GET /works/)
export const getWorks = async () => {
  try {
    const response = await api.get('/works/'); // GET 요청
    return response.data; // 서버에서 반환된 데이터 (JSON)
  } catch (error) {
    // 에러 발생 시 콘솔에 로깅하고 다시 throw하여 호출하는 곳에서 처리하도록 합니다.
    console.error("Error fetching works:", error);
    throw error;
  }
};

// 2. 특정 Work 가져오기 (GET /works/{id})
export const getWorkById = async (id: number) => {
  try {
    const response = await api.get(`/works/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching work with ID ${id}:`, error);
    throw error;
  }
};

// 3. 새로운 Work 생성 (POST /works/)
export const createWork = async (workData: { title: string; description: string; image_url?: string; project_url?: string; tags?: string; }) => {
  try {
    const response = await api.post('/works/', workData); // POST 요청, workData가 요청 본문이 됩니다.
    return response.data;
  } catch (error) {
    console.error("Error creating work:", error);
    throw error;
  }
};

// 4. 기존 Work 업데이트 (PUT /works/{id})
export const updateWork = async (id: number, workData: { title?: string; description?: string; image_url?: string; project_url?: string; tags?: string; }) => {
  try {
    const response = await api.put(`/works/${id}`, workData);
    return response.data;
  } catch (error) {
    console.error(`Error updating work with ID ${id}:`, error);
    throw error;
  }
};

// 5. Work 삭제 (DELETE /works/{id})
export const deleteWork = async (id: number) => {
  try {
    await api.delete(`/works/${id}`); // DELETE 요청
    console.log(`Work with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting work with ID ${id}:`, error);
    throw error;
  }
};

// --- Blogs 관련 API 함수들 (Works와 동일한 패턴으로 구현) ---
// 예시: 모든 Blog 가져오기
export const getBlogs = async () => {
  try {
    const response = await api.get('/blogs/');
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// TODO: getBlogById, createBlog, updateBlog, deleteBlog 등 나머지 Blog CRUD 함수도 추가하세요.

// --- User 관련 API 함수들 (필요에 따라 추가) ---
// 예시: 새로운 사용자 생성
export const createUser = async (userData: { username: string; password: string; email?: string; }) => {
    try {
        const response = await api.post('/users/', userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// TODO: getUserById, getUsers (모든 사용자 조회), updateUser, deleteUser 등 추가