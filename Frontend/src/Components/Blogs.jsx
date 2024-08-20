import {useEffect, useContext } from "react"
import { GlobContext } from "../Global";
import { Link} from "react-router-dom"
import Axios from "axios";


export const Blogs = () => {
  const {allblogs,setProficon} = useContext(GlobContext);

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
  return (
    <div>
        <div className="container">
        { allblogs.length !== 0 ?
        <div>
          <h3 className="text-center mb-3">Tech Blogs</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                allblogs.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <img src={element.postpicurl} alt="img" className="card-img-top cards-img"/>
                          <div className="card-body">
                              <h4 className="card-title">{element.title}</h4>
                              <Link to={`/viewpost/${element._id}`} className="btn btn-warning">View Blog</Link>
                          </div>
                      </div>
                  </div>
                ))
              } 
          </div> </div>:
          <div>
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Blogs yet Created........!</p>
          </div>}
        </div>
    </div>
  )
}
