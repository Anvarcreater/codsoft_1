import { Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { Blogs } from "./Components/Blogs"
import { Login } from "./Components/Login"
import { Signup } from "./Components/Signup"
import { Dashboard } from "./Components/Dashboard"
import { Navbar } from "./Components/Navbar"
import './App.css';
import { Footer } from "./Components/Footer"
import { Profile } from "./Components/Profile"
import { Myblogs } from "./Components/Myblogs"
import { Dashcont } from "./Components/Dashcont"
import { Viewpost } from "./Components/Viewpost"
import { Searchresult } from "./Components/Searchresult"
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard?tab=profile" element={<Profile/>}/>
          <Route path="/dashboard?tab=myblogs" element={<Myblogs/>}/>
          <Route path="/dashboard?tab=cont" element={<Dashcont/>}/>
          <Route path="/viewpost/:id" element={<Viewpost/>} />
          <Route path="/searchresult" element={<Searchresult/> }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
