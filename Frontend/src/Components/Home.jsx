import Axios from "axios";
import { useEffect } from "react";
import { useContext } from "react"
import { GlobContext } from "../Global"
import { Link} from "react-router-dom"

export const Home = () => {
  const {setProficon,allblogs}=useContext(GlobContext);
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
  
  const latest = [];
  if(allblogs.length < 4){
    for(let i=allblogs.length-1;i>-1;i--){
      var item=allblogs[i];
      latest.push(
        <div className="col" key={i}>
              <div className="card">
                  <img src={item.postpicurl} alt="img" className="card-img-top cards-img"/>
                  <div className="card-body">
                      <h4 className="card-title">{item.title}</h4>
                      <Link to={`/viewpost/${item._id}`} className="btn btn-warning">View Blog</Link>
                  </div>
              </div>
        </div>
      );
    }
  }else{
    for(let i=allblogs.length-1;i>allblogs.length-5;i--){
      var items =allblogs[i];
      latest.push(
        <div className="col" key={i}>
              <div className="card">
                  <img src={items.postpicurl} alt="img" className="card-img-top cards-img"/>
                  <div className="card-body">
                      <h4 className="card-title">{items.title}</h4>
                      <Link to={`/viewpost/${items._id}`} className="btn btn-warning">View Blog</Link>
                  </div>
              </div>
        </div>
      );
    }
  }

  
  return (
    <div>
       <div className="container-fluid bg-dark p-5 mt-3">
          <div className="container ">
            <h1 className="ms-lg-5 mt-lg-5 text-white" style={{fontfamily:"sans-serif"}}>Welcome to <span className="text-info">Tech Blogs</span></h1>
            <p className="ms-lg-5 mt-lg-5 mt-sm-3 text-white"style={{fontfamily:"sans-serif"}}>Your go-to source for the latest in technology, programming, and development tips.</p>
            <button className="btn btn-outline-info ms-lg-5 mt-3"><a href="#lat-blog" className="text-decoration-none text-white ">Explore Latest Post</a></button>
          </div>
       </div>
       <div className="container mt-5 mb-5">
            <h3 className="text-center mb-3" id="lat-blog">Latest Blogs</h3>
            <div className="">
                {
                  allblogs.length !== 0 ?
                  <div>
                      <div className="row row-cols-lg-4 myblogs latest">
                            {latest}
                      </div>
                  </div>: 
                  <div className=""><p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Latest Blogs........!</p></div>
                }
            </div>
       </div>
    </div> 
  )
}
