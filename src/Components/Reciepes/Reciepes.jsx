import React, { useEffect, useState } from "react";
import "./Reciepes.scss";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { API } from "../../Constants/Api";

const Reciepes = () => {
  const [recipes, setRecipes] = useState([]);
  const [auth, setAuth] = useAuth();
  const userId = auth?.user?._id;
const navigate=useNavigate();
  useEffect(() => {
    // Fetch all recipes from the backend
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${API}/recipe/getAllreciepes`
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  console.log("recipes", recipes);

  const handleDelete = async (recipeId) => {
    try {
      
      await axios.delete(`${API}/recipe/deleterecipe/${recipeId}`);
    
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit=async(recipeId)=>{
    navigate(`/edit/${recipeId}`)
  }

  return (
    <>
      <Navbar />
      <div className="RecipeController">
        <h2>All Recipes</h2>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="RecipeCard">
            <h3>{recipe.title}</h3>
          <div className="categorycontainer">
          {
            recipe?.categories?.map((e)=><div className="categoryele">{e}</div>)
           }
          </div>
          <img src={recipe?.image}/>
          <div>
          <h3>Ingredients:</h3>
            {
              
              recipe?.ingredients?.map((e)=><div>{e}</div>)
            }
          </div>
          <div>
          <h3>Instructions:</h3>
            {
              recipe?.instructions?.map((e)=><div>{e}</div>)

            }
          </div>
          <div className="likecontainer">
          <LikeButton recipeId={recipe._id}  userId={userId}/>
          </div>
          
          
            {recipe.createdBy === userId && (
              <div className="userbtns">
                <button onClick={() => handleDelete(recipe._id)} className="deletbtn">Delete</button>
                <button onClick={() => handleEdit(recipe._id)} className="editbtn">Edit</button>
               
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Reciepes;
