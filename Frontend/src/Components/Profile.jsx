import { useContext, useState } from "react"
import { GlobContext } from "../Global"
import  Axios  from "axios";


export const Profile = () => {
  const {currentuser,setCurrentuser,getuser} = useContext(GlobContext);
  const [update,setUpdate] = useState(true);
  const [updateuser,setUpdateuser] = useState(currentuser.user);
  const [updateemail,setUpdateemail]= useState(currentuser.email);
  const [updatepass,setUpdatepass] = useState("");
  const [updateprofpic,setUpdateprofpic] = useState(currentuser.photourl);
  const [selectpic,setSelectpic] = useState(false);
  const [msg,setMsg]= useState(false);
  const [message,setMessage]=useState();
  var pics=[
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48wYom4-pMfvBoZJ1zJwC1j_ZmdXCNXRi6xgRXhXODycSrsk1gUZNIXOpJtR1U_2ng0o&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz0UUafJaZ1XJ3qb75UBiDewMhkv2tvuVYlICl_dBdlFHVXMK0afYkwDV4syh99Fmc06M&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ekKM1-X9jbatFhZfdUBgmOR8GaXEOQ7JlTQiJSvCN2DCL3Tl_4bxlYcV-q2h3Fiywsw&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5gua7odTECzGyOMnnw87E1YDLaDfaVo8oHU-mOXPUFVUyGm84Iu8skm8rTz5luW0Lg8&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAxYicxbHYOtoJI0ZnOnUtcnSgILk9ZLRIF0JcrKgvkpkV9ZgOa-1ee-a-CCdWC1JTEI&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jAiT0x4LC5tAE3cnaBoV4HX0kukp7KeqtA&s"},
    {imgs:"https://static.vecteezy.com/system/resources/previews/006/487/917/non_2x/man-avatar-icon-free-vector.jpg"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwLkwYOYvCNBnft5B86IBz8AN_7SmAeF_B3fHQy6x0IIzVbkBxAVeZJNSGCV-xhfPMzBI&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgj5MnSgKrPfY5GeuG6UO47iLLd7qUyS2tsEW0IL8F_B_ciye88msrpmjKZZh9U0XlFWU&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOVlw8fe-Hiix_6ktR8FLGtfHnQN7zd5PssI3Qw3Su_J67MHF4Qi3uBkwGBKCs20DDjQ0&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCK5L8HBQhyi7bRgYqSZ4Sb3DkNvAp6eKworwkd3Yx26r_SsE7PHMObQ8gFjNYKKYV3hY&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4LYVTx7XNNTAII4DPIECKEJbY1DuqTx0DgTeBgmyMIQklWGRUFV1_uRkuD19LJUNfKM&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7rIjeb9O_kbGoWVBMADv5S0wazJGAtvmBe16Fu72oAUQIvbppzgAOxHZd0ShtosqtlE&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSo5g4tSjXvXr9d2nGoXem5scmyYOP2IvoVNJ9KHg1GNd7zdYsmf2i7d7ycFjD3-2MTPA&usqp=CAU"},
    {imgs:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHUdUVsT9WP6VAFf6_tF9mZQTACPmF3n2Qdx-TkcTxJQeJnle8hKkloCt-Etiv4ugUps&usqp=CAU"}

  ]

  const handleupdate = ()=>{
      if(updatepass === ""){
          setMsg(true);
          setMessage("Update new password or Enter old password");
          setTimeout(()=>{
            setMsg(false);
          },2000);
      }else if(updatepass.length < 7){
        setMsg(true);
        setMessage("Password should have atleast 8 character");
        setTimeout(()=>{
          setMsg(false);
        },2000);
      }else{
        Axios.defaults.withCredentials=true;
        Axios.put('http://localhost:3000/updateuser',{
          updateuser,updateemail,updatepass,updateprofpic
        }).then((res)=>{
           if(res.data.status){
             console.log(res);
             setMessage(res.data.message);
             getuser();
             setMsg(true);
             setTimeout(()=>{
                setMsg(false);
                setUpdate(!update);
             },2000);
           }
        }).catch((err)=>{
           console.log(err);
        })
      }
  }
 
  return (
    <div>
        <div className="mt-3">
            <div className="profile-h">
              <h3>Profile</h3>
              <button type="button" onClick={()=>{setUpdate(!update);getuser()}} className={update === true ? "up-btn":"can-btn"} >{update === true ? "Update Profile":"Cancel" }</button>
            </div>
            <div className="profile-b">
                <div>
                  <img src={currentuser.photourl} alt="img" onClick={()=>{setSelectpic(! selectpic)}} className="dashprofpic"/>
                </div>
               { update === true ?
                  <div className="">
                    <h4>{currentuser.user}</h4>
                    <h6>{currentuser.email}</h6>
                  </div>:
                  <div>
                      {
                        selectpic && <div className="mt-3 mb-3">
                        <h5 className="text-center">Select profile picture</h5>
                        <div className="dashprofpic-sel">
                           {
                              pics.map((element,index)=>(
                                <img key={index} src={element.imgs} className="dashprofpic-s"onClick={()=>{setUpdateprofpic(element.imgs);setCurrentuser({photourl:element.imgs}); setSelectpic(!selectpic)}}/>
                                
                              ))
                           }
                        </div>
                    </div>
                      }
                      <div className="form-group">
                            {msg && <p className="text-danger">{message}</p>}
                            <label className="form-label" htmlFor="updateuser">Your Username</label>
                            <input type="text" className="form-control sigfield" id="updateuser" defaultValue={updateuser} name="updateuser"
                              onChange={(e)=>{setUpdateuser(e.target.value)}} placeholder="username" autoComplete="off"  required/><br></br>
                            <label className="form-label" htmlFor="updateemail">Your Email</label>
                            <input type="email" className="form-control sigfield" id="updateemail" defaultValue={updateemail} name="updateemail"
                             onChange={(e)=>{setUpdateemail(e.target.value)}} placeholder="Email" autoComplete="off" required/><br></br>
                            <label className="form-label" htmlFor="updatepass">Your Password</label>
                            <input type="password" className="form-control sigfield" id="updatepass" name="updatepass"
                              onChange={(e)=>{setUpdatepass(e.target.value)}}  placeholder="password"  required/><br></br>
                            <input type="submit" value="Update" onClick={handleupdate} className="update-btn"/><br></br><br></br>
                      </div>
                  </div>
              }
            </div>
        </div>
    </div>
  )
}
