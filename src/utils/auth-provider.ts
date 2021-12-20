import { User } from "screens/project-list/search-panel";
const localStrogeKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStrogeKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStrogeKey, user.token || "");
  return user;
};
export const login = (data: { username: String; password: String }) => {
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
export const register = (data: { username: String; password: String }) => {
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
export const logout = async () =>
  window.localStorage.removeItem(localStrogeKey);
