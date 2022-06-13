import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
const user =JSON.parse(localStorage.getItem("user"))
const API_URL ="http://localhost:8000/"
function ImageById() {
    const { id } = useParams();
    const [image, setImage] = useState({});
    useEffect(()=>{


        axios.get(API_URL+"image/"+id , {headers:{"x-access-token":user.accessToken}}).then(
            (response) => {
                setImage(response.data.data);
                console.log(response.data.data);

            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setImage(_content);
            }
        );
    },[])

    return (
        <div> {image &&
            <img src={image.category+"/"+image.path} alt={image.path}
                 className="img-fluid w-100 h-100"/>

        }</div>
    )
}

export default ImageById