import { React } from "react";
import { useNavigate } from 'react-router-dom';
import { TableList } from '../../components/Table'
import { BOOK_LIST_URL } from '../../constants';
import { NavBar } from "../../components/Navbar";   
import '../../styles.css'
const BookList = () => {
    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/book/add');
    }

    return (
        localStorage.length > 0 &&
        <>
        <NavBar/>
        <div className="page">

            <div className="list-div">
                <TableList title='LIST OF BOOKS' book={true} images={true} navigate='/book/update/' URL={BOOK_LIST_URL} />
            </div>
            <div className="list-div">
                <button type="button" onClick={goToAdd} className="btn btn-primary">Add book</button>
            </div>
        </div>

    </>

    );
};

export default BookList;
