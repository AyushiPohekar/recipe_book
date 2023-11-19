
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';
import Reciepes from './Components/Reciepes/Reciepes';
import CreateRecipes from './Components/CreateRecipes/CreateRecipes';
import EditRecipe from './Components/CreateRecipes/EditReciepe';
import ForgotPasssword from './Components/Login/ForgotPassword';


function App() {
  return (

     <BrowserRouter>
     <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/reciepe" element={<Reciepes/>}/>
     <Route path="/createreciepe" element={<CreateRecipes/>}/>
     <Route path="/edit/:recipeId" element={<EditRecipe/>}/>
     <Route path="/forgot-password" element={<ForgotPasssword/>}/>

     </Routes>
     
     
     </BrowserRouter>
 
  );
}

export default App;
