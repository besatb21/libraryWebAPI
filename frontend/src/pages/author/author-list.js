// import axios from "axios";
import { React } from "react";

import { useNavigate } from 'react-router-dom';
import { NavBar } from "../../components/Navbar";
import { TableList } from '../../components/Table'

import { AUTHOR_LIST_URL } from '../../constants';

const AuthorList = () => {

    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/author/add');
    }
    return (
        localStorage.length > 0 &&
        <><NavBar />
            <div className="page">

                <div className="list-div">
                    <TableList title='AUTHOR LIST' book={false} navigate='/author/update/' URL={AUTHOR_LIST_URL} />

                </div>
                <div className="list-div">
                    <button type="button" onClick={goToAdd} className="btn btn-primary">Add author</button>
                </div>
            </div>

        </>
    );
};

export default AuthorList;
