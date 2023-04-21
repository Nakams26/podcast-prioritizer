//Import router for rerouting
import { Link } from "react-router-dom"
import podcastLogo from "../assets/vintage-podcast-microphone.png"

const Header = () => {
    return (
        <header>
            <div className="wrapper flexHeader">
            <Link to="/">
                <h1>P<span>P</span> </h1>
                </Link>
                <div className="imgContainer">
                    <img src={podcastLogo} alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header