import React,{useState,useEffect} from 'react'
import AuthService from "../services/auth-service"
import {Link} from "react-router-dom"

function Header() {
    //initial state is undefined
    const [currentUser,setCurrentUser] = useState(undefined)
    useEffect(()=>{
        //adds user with in the local storage
        const user = AuthService.getCurrentUser()
        if (user){
            setCurrentUser(user)
        }
    },[])
    //removes user from localstorage
    const LogOut = ()=>{
        AuthService.logout()
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark mx-auto">
                <Link to={"/"} className="navbar-brand mx-5">
                    Imgur
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    {currentUser &&(
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                    {currentUser &&(
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.data.fullName}
                            </Link>
                        </li>)}
                    {currentUser ?(


                        <li className="nav-item" >
                            <a href="/login" className="nav-link" onClick={LogOut}>
                                Logout
                            </a>
                        </li>


                    ):(
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                            <li className= "nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </div>
            </nav>

        </div>

    )
}

export default Header