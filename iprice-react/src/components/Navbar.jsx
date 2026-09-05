import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {FiMenu, FiX} from 'react-icons/fi'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav>
            <NavLink to="/"><img src="/images/logo.png" alt="IPrice logo"/></NavLink>
            <div className={isOpen ? 'nav-links open' : 'nav-links'} id="navLinks">
                <FiX className="fa-solid" onClick={() => setIsOpen(false)} />
                <ul>
                    <li><NavLink to="/" onClick={() => setIsOpen(false)}>HOME</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setIsOpen(false)}>ABOUT</NavLink></li>
                    <li><NavLink to="/contact" onClick={() => setIsOpen(false)}>CONTACT</NavLink></li>
                </ul>
            </div>

            <FiMenu className="fa-solid" onClick={() => setIsOpen(true)} />
        </nav>
    )
}

export default Navbar
