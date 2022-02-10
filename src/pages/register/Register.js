import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { validation } from "./validation";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState({});
  const [apiError, setApiError] = useState({apiFail:'',apiSuccess:''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validation(formData));
      try {
        const res = await axios.post("https://myblog-1997.herokuapp.com/api/auth/register", formData);
        if (res.data) {
          setApiError({apiSuccess:res.data.msg});
          window.location.replace('/login')
        }
      } catch (error) {
        setApiError({apiFail:error.response.data});
      }
  };

  return (
    <section className="registerContainer">
      <div className="registerArticle">
        <h2 className="registerHead">Register</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="registerEmail">
            <label htmlFor="email">Username</label>
            <input
              className={error.username && "errorInput"}
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              id="username"
            />
            <p className="errorMsg">{error.username}</p>
          </div>
          <div className="registerEmail">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              className={error.email && "errorInput"}
              value={formData.email}
              onChange={handleChange}
              type="text"
              id="email"
            />
            <p className="errorMsg">{error.email}</p>
          </div>
          <div className="registerPassword">
            <label htmlFor="password">password</label>
            <input
              name="password"
              className={error.password && "errorInput"}
              value={formData.password}
              onChange={handleChange}
              type="password"
              id="password"
            />
            <p className="errorMsg">{error.password}</p>
          </div>
          <button type="submit" className="registerBtn">
            register
          </button>
          <p style={{color:'teal',textAlign:"center"}}>{apiError.apiSuccess}</p>
          <p style={{color:'red',textAlign:"center"}}>{apiError.apiFail}</p>
        </form>
      </div>
      <Link to={"/login"}>
        <button className="registerregister">Login</button>
      </Link>
    </section>
  );
}

export default Login;
