import React from "react";
import "./HomePage.scss";
import coverpic from "../../Images/pictwo.avif";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  return (
    <div className="HomePageContainer">
      <Navbar />
      <div className="TitleContainer">
        <h1>SimplyFood</h1>
        <div>Recipes for busy people</div>
      </div>
      <div className="imgContainer">
        <img src={coverpic} alt="reciepeCoverpic" className="reciepeCoverpic" />
      </div>
      <div className="FooterContainer">
        {auth.user ? (
          <>
            <button onClick={() => navigate("/reciepe")}>View Recipes</button>
            <button onClick={() => navigate("/createreciepe")}>
              Share Reciepes
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>View Recipes</button>
            <button onClick={() => navigate("/login")}>Share Recipes</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
