//The App component is a container with React Router (BrowserRouter).
import React from "react"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

//importing components
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import BoardUser from "./components/BoardUser"
import UserImage from "./components/UserImage"
import ImageById from "./components/ImageById"

//functional component
function App(){
 return(
   <div>
     {/* this is the header component */}
   <Header/>
      <div className="container mt-3">
        {/* routes */}
        <Routes>
          <Route exact path ="/" element={<BoardUser/>}/>
          <Route exact path ="/:id" element={<ImageById/>}/>
          <Route exact path ="/login" element={<Login/>}/>
          <Route exact path ="/register" element={<Register/>}/>
          <Route exact path ="/profile" element={<Profile/>}/>
          <Route path ="/user" element={<UserImage/>}/>
          
        </Routes>
      </div>
      </div>
    
    
 )
}
export default App;