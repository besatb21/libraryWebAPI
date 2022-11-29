

import { NavLink } from "react-router-dom"


export const NavBar = () => {
    //     const [auth, setAuth] = useState(false);

    //     useEffect(() => {
    // // 
    //     }, [auth])
    return (<>

        <nav className="navbar navbar-light bg-light">
            <NavLink to='/home'><span className="navbar-brand mb-0 h1">LibraryApp</span></NavLink>
            {localStorage.length > 0 &&
                <NavLink to='/books/list'><span className="navbar-brand mb-0 h1">Books</span></NavLink>
            }

            {localStorage.getItem("role") == "Administrator" && <>


                <NavLink to='/author/list'><span className="navbar-brand mb-0 h1">Authors</span></NavLink>

                <NavLink to='/category/list'><span className="navbar-brand mb-0 h1">Categories</span></NavLink>

                <NavLink to='/author/sorted'><span className="navbar-brand mb-0 h1">Report Page</span></NavLink>

            </>

            }

            <div>
                {
                    localStorage.length == 0 ?
                        <NavLink to='/login'><span className="navbar-brand mb-0 h1">Login</span></NavLink> :
                        <NavLink to='/logout'><span className="navbar-brand mb-0 h1">Logout {localStorage.getItem('username')}</span></NavLink>

                }

            </div>

        </nav></>)

} 