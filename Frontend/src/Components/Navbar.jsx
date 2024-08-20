import { Link, useNavigate} from "react-router-dom"
import { FaSearch} from "react-icons/fa";
import {useContext, useState} from 'react'
import { GlobContext } from "../Global";
import Axios from "axios";

export const Navbar = () => {
    const {proficon,logout,currentuser,setResult}=useContext(GlobContext);
    const Navigate = useNavigate();
    const [query,setQuery] = useState('');
   const handlesearch =()=>{
        Axios.post('http://localhost:3000/searchresult',{query}).then((res)=>{
            if(res.data.status){
                Navigate('/searchresult');
                setResult(res.data.data);
                console.log(res.data.message);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className="navbar navbar-expand-lg">
            <div className="container"> 
                <h1 className="navbar-brand">Tech Blogs</h1>
                <div className="search">
                    <div className="form-group d-flex">
                        <input type="search" className="form-control "onChange={(e)=>{setQuery(e.target.value)}} placeholder="search"/>
                        <button type="submit" onClick={handlesearch} className="btn bg-white "> <FaSearch/> </button>
                    </div>
                </div>
                { ! proficon &&
                     <div className="dropdown dropstart dropm"> 
                            <img src={currentuser.photourl} alt="img" className=" dropdown-toggle proficon ms-3" data-bs-toggle="dropdown"/>
                            <ul className="dropdown-menu">
                                <p className="ms-3">{currentuser.user}</p>
                                <li><Link to="/dashboard" className="text-decoration-none text-black ms-3">Dashboard</Link></li>
                                <li><Link to="/dashboard?tab=profile" className="text-decoration-none text-black ms-3">Profile</Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li style={{cursor:"pointer"}}><p className="ms-3" onClick={logout}>Logout</p></li>
                            </ul>
                    </div>  }  
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                <span className="navbar-toggler-icon"> </span></button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link to="/" className="nav-link  ">Home</Link></li>
                        <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs</Link></li>
                        {proficon &&
                            <>
                                <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                            </> 
                            }  
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
