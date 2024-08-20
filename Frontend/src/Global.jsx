import {createContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"
export const GlobContext =createContext(null);

export const Global = ({children}) => {
    const [proficon,setProficon] = useState(true);
    const [profpic,setProfpic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const Navigate= useNavigate();
    const [currentuser,setCurrentuser]=useState({user:"sample",email:"samplemail id",photourl:profpic});
    const [myblogs,setMyblogs] = useState([]);
    const [allblogs,setAllblogs]= useState([]);
    const [comments,setComments] = useState([]);
    const [result,setResult] = useState([]);

    useEffect(()=>{
       getuser();
       getmyblogs();
    },[proficon]);

    Axios.defaults.withCredentials=true;
    const getuser = ()=>{
      Axios.get("http://localhost:3000/currentuser").then((res)=>{
        if(res.data.status){
          console.log(res);
          setCurrentuser(res.data.data);
        }
      }).catch((err)=>{
         console.log(err);
      })
    }

  Axios.defaults.withCredentials=true;
  const getmyblogs= ()=>{
     Axios.get('http://localhost:3000/getmyblogs').then((res)=>{
        if(res.data.status){
           console.log(res.data.message);
           setMyblogs(res.data.data);
        }
     }).catch((err)=>{
        console.log(err);
     })
  }

  const getallblogs = ()=>{
     Axios.get('http://localhost:3000/getallblogs').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAllblogs(res.data.data);
        }
     }).catch((err)=>{
        console.log(err);
     })
  }
useEffect(()=>{
  getallblogs();
},[]);

    const logout=()=>{
      Axios.get('http://localhost:3000/logout').then((res)=>{
          if(res.data.status){
              console.log(res);
              setProficon(true);
              Navigate('/login');
          }
      }).catch((err)=>{
          console.log(err);
      })
  }
  return (
    <GlobContext.Provider value={{proficon,setProficon,profpic,setProfpic,username,setUsername,email,setEmail,password,setPassword,logout,currentuser,setCurrentuser,
      getuser,myblogs,getmyblogs,allblogs,getallblogs,comments,setComments,result,setResult}}>
      {children}</GlobContext.Provider>
  )
}

Global.propTypes={
    children:PropTypes.node.isRequired,
  };