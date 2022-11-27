import { React } from "react";
import { useNavigate } from 'react-router-dom';
import { TableList } from '../../components/Table'
import { BOOK_LIST_URL } from '../../constants';
import '../../styles.css'
const BookList = () => {
    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/book/add');
    }

    return (<>
        <div className="page">

            <div className="list-div">
                <TableList title='LISTA E LIBRAVE' navigate='/book/update/' URL={BOOK_LIST_URL} />
            </div>
            <div className="list-div">
                <button type="button" onClick={goToAdd} className="btn btn-primary">Shto artikull</button>
            </div>
        </div>

    </>

    );
};

export default BookList;
