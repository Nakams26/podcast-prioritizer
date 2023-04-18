//Import router for rerouting
import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header>
            <div className="wrapper flexHeader">
            <Link to="/">
                <h1>Podcast Prioritizer</h1>
                </Link>
            </div>
        </header>
    )
}

export default Header