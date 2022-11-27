// import axios from "axios";
import { React } from "react";

import { useNavigate } from 'react-router-dom';
import { TableList } from '../../components/Table'

import { AUTHOR_LIST_URL } from '../../constants';

const AuthorList = () => {

    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/author/add');
    }
    return (<>
        <div className="page">

            <div className="list-div">
                <TableList title='LISTA E AUTOREVE' navigate='/author/update/' URL={AUTHOR_LIST_URL} />

            </div>
            <div className="list-div">
                <button type="button" onClick={goToAdd} className="btn btn-primary">Shto autor</button>
            </div>
        </div>

    </>
    );
};

export default AuthorList;
