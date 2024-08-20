import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"


export const Footer = () => {
  return (
    <div>
        <div className="container-fluid bg-dark">
            <div className="container p-2">
                <div>
                    <h3 className="text-center mt-5 text-info">About Tech Blog</h3>
                    <p className="text-center foottext">Tech Blog is a platform where tech enthusiasts share their knowledge and insights on various technology-related
                        topics
                    </p>
                </div>
                <div className="footqf">
                    <div className="quick">
                        <Link to="/" className="footlinks">Home</Link>
                        <Link to="/blogs" className="footlinks">Blogs</Link>
                    </div>
                    <div>
                        <h5 className="text-info text-center">Follow us:</h5>
                        <div className="follow">
                            <Link to="#"> <FaLinkedin className="s-media"/> </Link>
                            <Link to="#"><FaInstagram className="s-media"/></Link>
                            <Link to="#"><FaFacebook className="s-media"/></Link>
                        </div>
                    </div>
                </div>
                <p className="text-white text-center mt-3"> Created by @Anvar Thaseem</p>
            </div>
        </div>
    </div>
  )
}
