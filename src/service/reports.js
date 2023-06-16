import { authClient, client } from './client';

const getReports = async () => {
  const { data } = await authClient().get(`/cases`, null);
  return data;
};

const createUnauthReport = async (payload) => {
  const { data } = await client.post('/public/report', payload);
  return data;
};

const createReport = async (payload) => {
  const { data } = await authClient().post(`/cases`, payload);
  return data;
};

const getReport = async (id) => {
  const { data } = await authClient().get(`/cases/${id}`, null);
  return data;
};

const removeReport = async (id) => {
  const { data } = await authClient().delete(`/cases/${id}`, null);
  return data;
};

const editReport = async (payload) => {
  const { data } = await authClient().put(`/cases/${payload.id}`, payload);
  return data;
};

export { getReports, createUnauthReport, createReport, getReport, removeReport, editReport };
