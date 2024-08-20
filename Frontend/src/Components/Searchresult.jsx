import { useContext ,useEffect} from "react"
import { GlobContext } from "../Global"
import { Link } from "react-router-dom";
import Axios from "axios";

export const Searchresult = () => {
    const {result,setProficon} = useContext(GlobContext);
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
        { result.length !== 0 ?
        <div>
          <h3 className="text-center mb-3">Post results</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                result.map((element,index)=>(
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
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Match found........!</p>
          </div>}
        </div>
    </div>
  )
}
