    import React from "react";
    import { useState, useEffect } from "react";
    import axios from "axios";
    import Header from "../components/Header";
    import Post from "../components/Post";
    function Main(){
        const [isLoading, setIsLoading] = useState(true)
        const [posts, setPosts]= useState([])
        const [users, setUsers] = useState([])
        useEffect(()=>{
        axios.get("https://647ded02af984710854a9d6d.mockapi.io/blogs").then( response =>{
            setPosts(response.data)
            })
        axios.get(`https://647ded02af984710854a9d6d.mockapi.io/users/`).then(response=>{
                console.log(response)
                setUsers(response.data)
                setIsLoading(false)
        })
        }, []) 
        return(
            <div className="Main">
                <Header/>
                <div className="blogs">
                    <div className="blogs-container">
                        {isLoading?(<h1>Loading...</h1>):(posts.map((post)=>{
                            const username = users.find(user => user.id === post.userid).username
                            return(<Post id={post.id} header={post.header} main={post.main} username ={username}/>)
                        }))}
                    </div>
                </div>
            </div>
        )
    }

    export default Main;