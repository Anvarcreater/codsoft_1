import { useContext, useEffect, useState } from "react"
import Axios from "axios";
import { GlobContext } from "../Global";

export const Dashcont = () => {
    const {getmyblogs,myblogs,getallblogs} = useContext(GlobContext);
    const [title,setTitle]= useState("");
    const [category,setCategory] = useState("");
    const [postpicurl,setPostpicurl] = useState("");
    const [description,setDescription] = useState("");
    const [message,setMessage] = useState("");
    const [msg,setMsg] = useState(false);
    const react="https://www.bypeopletechnologies.com/blog/wp-content/uploads/2017/07/9.jpg"
    const python="https://prepbytes-misc-images.s3.ap-south-1.amazonaws.com/assets/1644309437715-Sorting%20image-24.png";
    const javascript="https://prepbytes-misc-images.s3.ap-south-1.amazonaws.com/assets/1644309392998-Sorting%20image-25.png";
    const java = "https://www.jrebel.com/sites/default/files/image/2020-05/image-blog-revel-top-java-tools.jpg";
    const django ="https://img-c.udemycdn.com/course/480x270/5630118_717e.jpg";
    const springboot="https://media.licdn.com/dms/image/D4D12AQHTPnofGIbxog/article-cover_image-shrink_600_2000/0/1678042241822?e=2147483647&v=beta&t=-_vGpUq3AKyrCpJY6zzodaYJO9STRSXUEzavA87lGfg";
    const expressjs = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEjCQNyD3_JGsmTZ1Ng0a3WefsXra98wzCw&s";
    const angularjs = "https://www.openlogic.com/sites/default/files/image/2023-01/image-blog-openlogic-what-is-angularjs-1.png";
    const php = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4OjI31UFZhkcW06igYN8Orak0x57RKAjejoXekHEEwL9A_ZqvAuJ2YZHBV8tZcP_n-s&usqp=CAU";
    useEffect(()=>{
        if(category === "python"){
            setPostpicurl(python);
        }else if(category === "react"){
            setPostpicurl(react);
        }else if(category === "javascript"){
            setPostpicurl(javascript);
        }else if(category === "java"){
            setPostpicurl(java);
        }else if(category === "django"){
            setPostpicurl(django);
        }else if(category === "springboot"){
            setPostpicurl(springboot);
        }
        else if(category === "expressjs"){
            setPostpicurl(expressjs);
        }else if(category === "angularjs"){
            setPostpicurl(angularjs);
        }else{
            setPostpicurl(php);
        }
    },[category])

    Axios.defaults.withCredentials = true;
    const createblogs = ()=>{
        Axios.post('http://localhost:3000/createblog',{
            title,category,postpicurl,description
        }).then((res)=>{
            if(res.data.status){
                console.log(res);
                setMessage(res.data.message);
                setMsg(true);
                setTimeout(()=>{
                    setMsg(false);
                },2000);
                setTitle("");
                setCategory("");
                setDescription("");
                getmyblogs();
                getallblogs();
            }
        }).catch((err)=>{
            console.log(err);
        })
  }
  return (
    <div>
        <div className="total-count mt-3">
          <div className="tot-p">
              <p>Total post</p>
              <p>{myblogs.length}</p>
          </div>
        </div>
        <div className="create-post-con mb-3 mt-3">
            <h2>Create Post</h2>
            {msg && <p className="text-center text-success">{message}</p>}
            <div className="form-group mt-3 create-post-con">
                <div className="row create-h-pad">
                    <div className="col-lg-7">
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control create-post-w" />
                    </div>
                    <div className="col-lg-5">
                        <select className="form-select create-cat" onChange={(e)=>{setCategory(e.target.value);}} id="country">
                            <option value=""  hidden>Category</option> 
                            <option value="python">Python</option>
                            <option value="javascript">javascript</option>
                            <option value="react">React</option>
                            <option value="java">java</option>
                            <option value="django">django</option>
                            <option value="springboot">springboot</option>
                            <option value="expressjs">Express js</option>
                            <option value="angularjs">Angular js</option>
                            <option value="php">php</option>
                        </select> 
                    </div> 
                </div><br></br>
                <div>
                   { category !== "" ? <img src={postpicurl} alt="img" className="post-img create-post-w " />:null}<br></br><br></br>
                    <textarea className="form-control create-post-w" value={description} onChange={(e)=>{setDescription(e.target.value)}} style={{height:"200px"}} placeholder="Enter post description"></textarea><br></br><br></br>
                    <button type="submit" className="create-post-btn create-post-w" onClick={createblogs}>Create Post</button>
                </div>
            </div>
        </div>

    </div>
  )
}
