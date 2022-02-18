import { Link } from "react-router-dom"
import ThemeSwitch from "./ThemeSwitch"

function NavBar(){
    return (
        <nav className="container">
            <ul>
                <li style={{paddingRight: "20px"}}>
                    <strong>MyBin</strong>
                </li>
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="link" to="/newpaste">New paste</Link>
                </li>
            </ul>
            <ul>
                <li>    
                    <ThemeSwitch/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar