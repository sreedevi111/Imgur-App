//auth.service methods use axios to make HTTP requests. Its also store or get JWT from Browser Local Storage inside these methods.

import axios from "axios"
const API_URL = "http://localhost:8000/"

//register function API

const Register = (fullName,email,password)=>{
    return axios.post(API_URL + "register",{
        fullName,
        email,
        password,
    })
};

//login function API

const login = (email,password)=>{
    return axios.post (API_URL + "login",{
        email,
        password,
    })
        .then((response)=>{
            if (response.data.accessToken){
                localStorage.setItem("user",JSON.stringify(response.data))
            }
            return response.data;
        })
}
//logout function
const logout = () =>{
    localStorage.removeItem("user")
}

//getting current user from local storage
const getCurrentUser = ()=>{
    return JSON.parse(localStorage.getItem("user"))
}

export default {
    Register,
    login,
    logout,
    getCurrentUser



}