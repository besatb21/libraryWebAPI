

import { NavLink } from "react-router-dom"
import { LogoutComponent } from "../pages/login";



export const NavBar = () => {


    return (<>

        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">LibraryApp</span>
            <NavLink to='/books/list'>Books</NavLink>

            <NavLink to='/author/list'>Authors</NavLink>

            <NavLink to='/category/list'>Categories</NavLink>
            <LogoutComponent />
        </nav></>)

} 