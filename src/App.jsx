
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';

function App() {
  return (

     <BrowserRouter>
     <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>

     </Routes>
     
     
     </BrowserRouter>
 
  );
}

export default App;
