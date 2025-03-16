import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import React from "react";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(route, { username, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading;

  };
  const name = method === "login" ? "Login " : "Register";

  return <form onSubmit={handleSubmit} className="form-container">
  <h1>{name}</h1>
  <div>
    <label htmlFor="username">Username</label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button type="submit" disabled={loading}>
    {loading ? "Loading..." : "Submit"}
  </button>
</form>;
};

export default Form;
