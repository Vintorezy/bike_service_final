import { authClient } from './client';

const getOfficers = async () => {
  const { data } = await authClient().get(`/officers`, null);
  return data;
};

const getOfficer = async (id) => {
  const { data } = await authClient().get(`/officers/${id}`, null);
  return data;
};

const removeOfficer = async (id) => {
  const { data } = await authClient().delete(`/officers/${id}`, null);
  return data;
};

const createOfficer = async (payload) => {
  const { data } = await authClient().post(`/officers`, payload);
  return data;
};

const editOfficer = async (payload) => {
  const { data } = await authClient().put(`/officers/${payload.id}`, payload);
  return data;
};

export { getOfficers, getOfficer, removeOfficer, createOfficer, editOfficer };
