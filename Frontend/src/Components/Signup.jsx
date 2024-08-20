import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobContext } from "../Global"
import Axios from 'axios';

export const Signup = () => {
    const Navigate = useNavigate();
    const [msg,setmsg]=useState(false);
    const [message,setMessage]=useState();
    const {username,setUsername,email,setEmail,password,setPassword,setProficon}=useContext(GlobContext);
    Axios.defaults.withCredentials=true;
    const handle= ()=>{
            Axios.post('http://localhost:3000/signup',{
                username,email,password
            }).then((res)=>{
                if(res.data.status){
                    console.log(res);
                    setProficon(false);
                    Navigate('/');
                }else{
                    console.log(res);
                    setmsg(true);
                    setMessage(res.data.message);
                    setTimeout(() => {
                        setmsg(false);
                    },2000);
                }
            }).catch((err)=>{
                console.log(err);
            })
        
    
    }
  return (
    <div>
        <div className="container-fluid sign-con">
            <h3 className="text-center">Signup</h3>
            { msg && <p className="text-center text-danger">{message}</p>}
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Your Username</label>
                    <input type="text" className="form-control sigfield" autoComplete="off" id="username" name="username"
                     placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} required/><br></br>
                    <label className="form-label" htmlFor="email">Your Email</label>
                    <input type="email" className="form-control sigfield" autoComplete="off" id="email" name="email"
                     placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/><br></br>
                    <label className="form-label" htmlFor="password">Your Password</label>
                    <input type="password" className="form-control sigfield"id="password" name="password"
                     placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/><br></br>
                    <input type="submit" value="Signup" className="signbtn" onClick={handle}/><br></br><br></br>
                    <div className="d-flex justify-content-between">
                        <p>Already have an Account ?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
