import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../Constants/Api";
import "./CreateRecipes.scss";

const CreateRecipes = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const userId = auth.user._id;
  console.log(userId);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [""],
    image: "",
    preparationTime: 0,
    categories: [],
    createdBy: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API}/recipe/createRecipe`,
        formData
      );

      navigate("/reciepe");

      setFormData({
        title: "",
        ingredients: [],
        instructions: [""],
        image: "",
        preparationTime: 0,
        categories: [],
        createdBy: "6559902fa5644d5ca191e0c9",
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
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
  return (
    <>
      <Navbar />
      <div className="AddreciepeContainer">
        <h1 className="AddReciepeTitle">Add your Recipes</h1>
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
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipes;
