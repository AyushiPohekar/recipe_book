import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/auth";
import { API } from "../../Constants/Api";

const LikeButton = ({ recipeId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [auth, setAuth] = useAuth();


  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`${API}/recipe/getreciepeByid/${recipeId}`);
        const recipe = response.data;

        const isLikedByUser = recipe.likes.includes(userId);
        setLiked(isLikedByUser);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    checkIfLiked();
  }, [recipeId, userId]);

  const handleLike = async () => {
    try {
      await axios.post(`${API}/comment/toggle-like`, { recipeId, userId });

      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
   
      <FontAwesomeIcon
        icon={liked ? faHeartSolid : faHeart}
        color={liked ? "red" : "black"}
      
        onClick={handleLike}
      />

  );
};

export default LikeButton;
