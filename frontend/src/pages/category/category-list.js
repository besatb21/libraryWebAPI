import { React } from "react";
import { useNavigate } from 'react-router-dom';
import { TableList } from '../../components/Table'
import { CATEGORY_LIST_URL } from '../../constants';
import '../../styles.css'
const CategoryList = () => {
    const navigate = useNavigate();

    const goToAdd = () => {
        navigate('/category/add');
    }

    return (<>
        <div className="page">

            <div className="list-div">
                <TableList title='CATEGORY LIST' URL={CATEGORY_LIST_URL} />
            </div>
            <div className="list-div">
                <button type="button" onClick={goToAdd} className="btn btn-primary">Shto artikull</button>
            </div>

        </div>

    </>

    );
};

export default CategoryList;
