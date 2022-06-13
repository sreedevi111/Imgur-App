import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import axios from "axios"

//to get user from local storage
const user =JSON.parse(localStorage.getItem("user")) //parses a string in to object
const API_URL ="http://localhost:8000/"

const BoardUser = () => {
    const {id} = useParams()
    const form = useRef()
    const [category,setCategory] = useState("")
    const [content, setContent] = useState([]);

//category is set
    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    //when like button is clicked
    const toggleLike =(id)=>{
        console.log(id)
        axios.get(API_URL+"image/"+id+"/like" , {headers:{"x-access-token":user.accessToken}}).then(()=>{
            window.location.reload()
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.get(API_URL+"images?category="+category, {headers:{"x-access-token":user.accessToken}}).then((response)=>{
            setContent(response.data.data)})

    }
    useEffect(() => {
        axios.get(API_URL+"image/").then(
            (response) => {
                setContent(response.data.data);
                console.log(response.data.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );
    }, [id]);
    return (
        <div className="row" >
            <Form onSubmit={handleSubmit} ref={form}>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>

                    <Form.Control type="search"
                                  name="category"
                                  value={category}
                                  onChange={onChangeCategory}
                                  placeholder="Enter category name" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {content &&
                content?.map((cont, index) => (
                    <div className="col-sm-6 col-md-3 mb-3">
                        {user ?
                            <><Link to={"/" + cont._id}>
                                <img
                                    src={`${cont.category}/${cont.path}`}
                                    alt={cont.path}
                                    className="img-fluid w-100 h-75"
                                />
                            </Link>
                                <button  className = "btn" onClick={()=>toggleLike(cont._id)}>Like {cont.likeCount}</button>
                            </>:<img
                                src={`${cont.category}/${cont.path}`}
                                alt={cont.path}
                                className="img-fluid w-100 h-75 "
                            />}

                    </div>
                ))}
        </div>
    );
};

export default BoardUser;