import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Context/auth";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./CreateRecipes.scss";
import { API } from "../../Constants/Api";

const EditRecipe = () => {
    
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const userId = auth.user._id;
  const { recipeId } = useParams(); 

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [""],
    image: "",
    preparationTime: 0,
    categories: [],
    createdBy: userId,
  });

  useEffect(() => {
  
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/recipe/getreciepeByid/${recipeId}`
        );

        const existingRecipe = response.data

        setFormData({
          title: existingRecipe.title,
          ingredients: existingRecipe.ingredients,
          instructions: existingRecipe.instructions,
          image: existingRecipe.image,
          preparationTime: existingRecipe.preparationTime,
          categories: existingRecipe.categories,
          createdBy: existingRecipe.createdBy,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleAddField = (arrayName) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], ""] });
  };

  const handleRemoveField = (index, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API}/recipe/editrecipe/${recipeId}`, 
        formData
      );

      navigate("/reciepe"); 
    } catch (error) {
      console.error("Error editing recipe:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="AddreciepeContainer">
        <h1 className="AddReciepeTitle">Edit Recipe</h1>
        <form onSubmit={handleSubmit}>
         <div className="mainDiv">
            <h3>Title:</h3>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mainDiv">
            <h3>image:</h3>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {/* Ingredients */}
          <div className="mainDiv">
            <h3>Ingredients:</h3>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="sepratediv">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(e, index, "ingredients")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "ingredients")}
                  className="removebtn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("ingredients")}
              className="Addbtn"
            >
              Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mainDiv">
            <h3>Instructions:</h3>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="sepratediv">
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange(e, index, "instructions")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "instructions")}
                  className="removebtn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("instructions")}
              className="Addbtn"
            >
              Add Instruction
            </button>
          </div>

          {/* Categories */}
          <div className="mainDiv">
            <h3>Categories:</h3>
            {formData.categories.map((category, index) => (
              <div key={index} className="sepratediv">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => handleArrayChange(e, index, "categories")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "categories")}
                  className="removebtn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("categories")}
              className="Addbtn"
            >
              Add Category
            </button>
          </div>
          <div>
            <h3>Preparation Time (in minutes):</h3>
            <input
              type="number"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
            />
          </div>
       

          <button type="submit" className="AddReciepe">
            Update Recipe
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRecipe;
