import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {FaBloggerB, FaUser } from "react-icons/fa"
import { MdDashboardCustomize, MdLogout} from "react-icons/md"
import { Link } from "react-router-dom"
import { Profile } from "./Profile";
import { Myblogs } from "./Myblogs";
import { Dashcont } from "./Dashcont"
import { GlobContext } from "../Global"
import Axios from 'axios'

export const Dashboard = () => {
  const {logout,setProficon}=useContext(GlobContext);
  const Navigate = useNavigate();
  const location = useLocation();
  const [tab,setTab]=useState("cont");
  Axios.defaults.withCredentials = true;
  useEffect(()=>{
     Axios.get('http://localhost:3000/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setProficon(false);
        }else{
          console.log(res.data.message);
          setProficon(true);
          Navigate('/login');
        }
     })
  },[setProficon,Navigate]);
  useEffect(()=>{
      const urlparams=new URLSearchParams(location.search);
      const tabfromurl = urlparams.get('tab');
       if(tabfromurl){
         setTab(tabfromurl);
       }
  },[location.search]);
  return (
    <div>
        <div className="row row-w">
          <div className="col-lg-2 dashbars">
              <p><Link to="/dashboard?tab=cont" className="dashlinks"><MdDashboardCustomize/>Dashboard</Link></p>
              <p><Link to="/dashboard?tab=profile"className="dashlinks"><FaUser/>  Profile</Link></p>
              <p><Link to="/dashboard?tab=myblogs"className="dashlinks"><FaBloggerB/> My Blogs</Link></p>
              <p onClick={()=>{logout()}} className="dashlinks"><MdLogout/> Logout</p>
          </div>
          <div className="col-lg-8">
            {tab === 'cont' && <Dashcont/>}
            {tab === 'profile' && <Profile/>}
            {tab === 'myblogs' && <Myblogs/>}
          </div>
        </div>
    </div>
  )
}
