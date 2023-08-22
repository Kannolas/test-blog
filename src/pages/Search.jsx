import React, {useState, useEffect} from "react";

function Search(props){
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
        <div className="Search">
            <div className="inp">
                <input type="text" name="search" id="search" />
                
            </div>
        </div>
    )
}
export default Search