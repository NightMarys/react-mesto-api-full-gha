const BASE_URL = "http://localhost:3000";

function checkError(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка:${res.status}`);
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkError);
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkError);
};

export const getToken = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkError);
};
