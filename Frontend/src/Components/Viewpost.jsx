import { useContext, useEffect, useState } from "react"
import { GlobContext } from "../Global"
import { useParams } from "react-router-dom";
import Axios from "axios";
import { FaTelegramPlane} from "react-icons/fa"

export const Viewpost = () => {
  const {proficon,setProficon,comments,setComments} = useContext(GlobContext);
  const [details,setDetails] = useState({});
  const {id} = useParams();
  const [content,setContent] = useState("");
  const [msg,setMsg] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(()=>{
     Axios.get('http://localhost:3000/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setProficon(false);
        }else{
          setProficon(true);
        }
     })
  },[setProficon]);

  const getdetails = ()=>{
    Axios.get('http://localhost:3000/viewpostdetails/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setDetails(res.data.data);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }

 
  const getcomments = ()=>{
    Axios.get('http://localhost:3000/viewcomments/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setComments(res.data.comments);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }
  
  const handlecomments = ()=>{
      if(content !== ""){
        Axios.post('http://localhost:3000/commentpost',{
          postid:id,
          content
      }).then((res)=>{
         if(res.data.status){
            console.log(res.data.message);
            getcomments();
         }else{
           console.log(res);
         }
      }).catch((err)=>{
         console.log(err);
      })
      }else{
          setMsg("Field should not be empty...!");
          setTimeout(()=>{
            setMsg("");
          },2000);
      }
  }

  useEffect(()=>{
    getdetails();
    getcomments();
    },[]);
    
  return (
    <div>
        <div className="container">
            <h3 className="text-center mt-3" style={{fontFamily:"sans-serif"}}>Blog Title :{details.title} </h3>
            <div className="view-content">
                <img src={details.postpicurl} alt="img" className="view-img mt-3"/>
                <p className="view-des mt-3"><span style={{fontWeight:"bold",fontSize:"25px"}}>Description:</span>{details.description}</p>
                   { ! proficon && 
                   <div>
                      <div className="">
                         <h5>Comment Section:</h5>
                          <div className="comment-box">
                              { comments.length !== 0 ?
                                comments.map((element,index)=>(
                                  <div className="comments" key={index}>
                                    <div className="com-user">
                                      <img src={element.userid.profilepic} alt="img" className="comment-user-img"/>
                                      <h6>{element.userid.email}</h6>
                                    </div>
                                    <p style={{marginLeft:"40px"}}>{element.content}</p>
                                  </div>
                                ))
                                :<div><p className="text-secondary">No comments yet...........!</p></div>}
                          </div>
                          { msg.length >0 ? <p className="text-danger mt-2 mb-2">{msg}</p>:null}
                          <div className="comment-input mt-3 mb-3">
                                <input type="text" name="content" className="form-control" autoComplete="off"
                                onChange={(e)=>{setContent(e.target.value)}} placeholder="Enter your comments"/>
                                <span type="submit" onClick={handlecomments}><FaTelegramPlane className="com-btn"/> </span>
                          </div>
                      </div>
                   </div>}
            </div>
        </div>
    </div>
  )
}
