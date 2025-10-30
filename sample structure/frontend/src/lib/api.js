import { api } from './axios.js';

const extract = async (request) => {
  const response = await request;
  return response?.data ?? response;
};

export const registerRequest = (payload) =>
  extract(api.post('/auth/register', payload));

export const loginRequest = (payload) =>
  extract(api.post('/auth/login', payload));

export const getProfileRequest = () =>
  extract(api.get('/auth/me')); // JWT token automatically added by interceptor

export const fetchStaffList = () => extract(api.get('/users'));

export const fetchPendingUsers = () => extract(api.get('/users/pending'));

export const approveUserRequest = (id, payload) =>
  extract(api.patch(`/users/${id}/approve`, payload));

export const updateUserPermissionsRequest = (id, payload) =>
  extract(api.patch(`/users/${id}/permissions`, payload));

export const listFilesRequest = () => extract(api.get('/files'));

export const getFileByIdRequest = (id) => extract(api.get(`/files/${id}`));

export const createFileRequest = (payload) => extract(api.post('/files', payload));

export const updateFileRequest = (id, payload) =>
  extract(api.patch(`/files/${id}`, payload));

export const updateFileSharesRequest = (id, payload) =>
  extract(api.patch(`/files/${id}/shares`, payload));

export const deleteFileRequest = (id) =>
  extract(api.delete(`/files/${id}`));

export const fetchNotificationsRequest = (params) =>
  extract(api.get('/notifications', { params }));

export const markNotificationReadRequest = (id) =>
  extract(api.patch(`/notifications/${id}/read`));

export const markAllNotificationsRequest = () =>
  extract(api.patch('/notifications/read-all'));
