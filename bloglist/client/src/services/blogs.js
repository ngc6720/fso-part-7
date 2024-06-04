import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

import { redirectOnInvalidSession } from "./middleware";

redirectOnInvalidSession(axios);

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (o) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, o, config).then((res) => res.data);
};

const createComment = (o) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .post(`${baseUrl}/${o.id}/comments`, { content: o.content }, config)
    .then((res) => res.data);
};

const update = (o) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .put(`${baseUrl}/${o.id}`, { likes: o.likes }, config)
    .then((res) => res.data);
};

const remove = (o) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${o.id}`, config).then(() => o);
};

export default { getAll, create, createComment, update, remove, setToken };
