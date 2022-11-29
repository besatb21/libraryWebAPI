import axios from 'axios'
import { AUTHOR_LIST_SORTED } from '../constants'
import '../styles.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { NavBar } from '../components/Navbar';

export default function ReportPage() {

    const [items, setItems] = useState([]);
    const itemsData = useMemo(() => [...items], [items]);

    const columns = useMemo(
        () =>

            items[0]
                ? Object.keys(items[0]["author"])
                    .filter((key) => (key !== "id" && key !== "createdAt" && key !== "createdBy" && key !== "books" && key !== "bookCategories" && key !== "authorId"))
                    .map((key) => {
                        return key;
                    })
                : [],
        [items]
    );
    async function getAuthorsSortedNrBooks() {
        await axios.get(AUTHOR_LIST_SORTED)
            .then((res) => setItems(res.data))
            .catch((err) => console.log(err));

    }

    useEffect(() => {
        getAuthorsSortedNrBooks();
    }, [itemsData.length])
    return (
        localStorage.length > 0 &&
        <>
            <NavBar />
            <span style={{ textAlign: 'center', width: "100%" }} className="navbar-brand mb-0 h1">{"Author list sorted based on number of books".toLocaleUpperCase()}</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <TableContainer component={Paper} sx={{ width: "75%" }}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" className='header' colSpan={columns.length}>AUTHOR</TableCell>
                                <TableCell align="center" className='header' >NR. BOOKS</TableCell>
                            </TableRow>
                            <TableRow>
                                {
                                    columns.map((colHeader) => (
                                        <TableCell className="author_cell">{colHeader.toLocaleUpperCase()}</TableCell>
                                    ))
                                }
                                <TableCell className='action_cell'>BOOKS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemsData.map((row) => (

                                <TableRow>
                                    {columns.map((col) => (
                                        <TableCell >{row['author'][col]}</TableCell>
                                    ))}
                                    <TableCell>{row['nr']}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </div>
        </>
    )

}