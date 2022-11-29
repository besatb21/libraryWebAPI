import { React } from "react";
import { useNavigate } from 'react-router-dom';
import { TableList } from '../../components/Table'
import { CATEGORY_LIST_URL } from '../../constants';
import { NavBar } from "../../components/Navbar";
import '../../styles.css'
const CategoryList = () => {
    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/category/add');
    }

    return (
        localStorage.length > 0 &&
        <><NavBar/>
            <div className="page">

                <div className="list-div">
                    <TableList title='CATEGORY LIST' book={false} navigate='/category/update/' URL={CATEGORY_LIST_URL} />
                </div>
                <div className="list-div">
                    <button type="button" onClick={goToAdd} className="btn btn-primary">Add category</button>
                </div>

            </div>

        </>

    );
};

export default CategoryList;
