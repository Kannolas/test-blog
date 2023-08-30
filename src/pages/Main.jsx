    import React from "react";
    import { useState, useEffect } from "react";
    import axios from "axios";
    import Header from "../components/Header";
    import Post from "../components/Post";
    import { useSelector } from "react-redux/es/hooks/useSelector";
    import { useDispatch } from "react-redux";
    import { addPosts } from "../postsReducer";
    import { addUsers } from "../usersReducer";
    import { addPost } from "../postsReducer";
    import { fetchData } from "../fetchData";
    import AddCircleIcon from '@mui/icons-material/AddCircle';
    import { Modal } from "@mui/material";
    import AlertCustom from "../components/Alert";
    import {TextField} from "@mui/material";
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    function Main(){
        const auth = useSelector(state=>state.auth)
        const [openAlert, setOpenAlert] = useState(false)
        const [openModal, setOpenModal]=useState(false)
        const [isHovered, setIsHovered] = useState(false)
        const dispatch = useDispatch()
        const postsStore = useSelector(state => state.posts.postList)
        const usersStore = useSelector(state=> state.users.users)
        const [isLoading, setIsLoading] = useState(true)
        const [postHeader, setPostHeader] = useState("")
        const [postText, setPostText] = useState("")

        const handleHover = ()=>{
          setIsHovered(!isHovered)
        }
        const handleModalClose = ()=>{
          setOpenModal(false)
        }

        const handlePostHeaderChange = (e) =>{
          setPostHeader(e.target.value)
        }

        const handlePostTextChange = (e)=>{
          setPostText(e.target.value)
        }

        const handleOpenModal = ()=>{
          if(auth.isAuth){
          setOpenModal(true)}
          else{
            setOpenAlert(true)
            setTimeout(()=>{setOpenAlert(false)}, 5000)
          }
        }

        const handleSubmitPost = ()=>{
          const payload = {id:1, userid: auth.id, header:postHeader, main: postText}
          dispatch(addPost(payload))
          axios.post("https://647ded02af984710854a9d6d.mockapi.io/blogs", payload).then(()=>{
            console.log("success");
            setPostHeader("")
            setPostText("")
            setOpenModal(false)
          })
        }

        useEffect(() => {
          const getData = async () => {
            try {
              const { posts, users } = await fetchData();
              dispatch(addPosts(posts));
              dispatch(addUsers(users));
            } catch (error) {
              console.error("error fetching data:", error);
            }
            setIsLoading(false);
          };
      
          if (postsStore.length === 0) {
            getData();
          } else {
            setIsLoading(false);
          }
        }, []);

        return(
            <div className="Main">
                <Header/>
                <div className="new-post-cont"><div className="new-post">Новый пост</div></div>
                <div className="new-post-cont1"><div className={`new-post-rect ${isHovered?"hovered":""}`} onClick={handleOpenModal} onMouseEnter={handleHover} onMouseLeave={handleHover}><AddCircleIcon className="MuiIcon-root" style={{fontSize:"3rem"}}/></div></div>
                <div className="blogs">
                    <div className="blogs-container">
                        {isLoading?(<h1>Loading...</h1>):(postsStore.map((post)=>{
                            const username = usersStore.find(user => user.id.toString() === post.userid.toString()).username
                            return(<Post id={post.id} header={post.header} main={post.main} username ={username}/>)
                        }))}
                    </div>
                </div>
                <Modal 
                open={openModal}
                onClose={handleModalClose}
                style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}
                >
                  <div className="modal-container">
                    <div className="new-post-text">Создание</div>
                  <div className="user-cont">
                    <AccountCircleIcon style={{fontSize: "3rem"}}/>
                    <div className="post-username">{auth.nickname}</div>
                  </div>
                    <TextField id="outlined-basic" label="Заголовок поста" variant="outlined" defaultValue={postHeader} onChange={handlePostHeaderChange}/>
                    <TextField id="outlined-basic" label="Текст поста" variant="outlined" defaultValue={postText} onChange={handlePostTextChange} style={{width:"700px"}}/>
                    
                      <div className="submit-login" onClick={handleSubmitPost}>Submit</div>
                  </div>
                </Modal>
                <AlertCustom text="Вы не авторизированы" showAlert={openAlert}/>
            </div>
        )
    }

    export default Main;