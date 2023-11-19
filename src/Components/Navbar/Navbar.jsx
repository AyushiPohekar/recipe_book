import React from "react";
import "./Navbar.scss";
import { useAuth } from "../Context/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();
  console.log(auth.user);
  let user = auth.user;
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
   navigate("/")
    toast.success("Logout Success");
  };

  return (
    <>
      {user ? (
        <>
          <div className="NavbarContainer">
            <div onClick={()=>navigate("/createreciepe")}>Add Reciepe</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        </>
      ) : (
        <>
          <div className="NavbarContainer">
            <div onClick={()=>navigate("/login")}>Login</div>
            <div onClick={()=>navigate("/register")}>Register</div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
