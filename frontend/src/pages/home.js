import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { MdHome } from 'react-icons/md';
import { NavBar } from "../components/Navbar";
import { blue, red } from "@mui/material/colors";
import '../styles.css'
export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.length == 0)
            navigate("/");
    }, [localStorage.length])

    return (localStorage.length > 0 ?
        <>
            <NavBar />

            <div className="cute">
                <div style={{ backgroundColor: red[200], height: 50 + "px" }}>

                </div>
                <div className="home">
                    <MdHome size={50} />
                    <h1>HOME</h1>
                </div>
                <div>
                    <em>makeshift home</em>
                </div>
                <div style={{ backgroundColor: blue[200], height: 50 + "px" }}>

                </div>
            </div></>

        : "UnAuthorized")
}