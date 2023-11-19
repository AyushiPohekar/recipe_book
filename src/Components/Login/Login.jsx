import React, { useState } from 'react';
import "./Login.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import { API } from '../../Constants/Api';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
    
        try {
          const res = await axios.post(`${API}/auth/login`, {
            email,
            password,
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || "/");
           
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    




  return (
    <div className="registerContainer">
    <form style={{ width: "30%" }} onSubmit={handleSubmit}>
      <div className="mainDiv">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address:
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div className="mainDiv">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

    
        <button
          type="button"
          className="btn forgot-btn"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot Password
        </button>
     
      <button type="submit" className="btn Registerbtn">
        Login
      </button>
    </form>
  </div>
  )
}

export default Login