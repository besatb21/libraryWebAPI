// import { ImageThumb } from '../../components/ImageUpload';
import axios from "axios";
import React, { useMemo, useState } from "react";
import { AUTHOR_LIST_URL, BOOK_COVER, BOOK_LIST_URL, CATEGORY_BOOK_LIST_URL, AUTHOR, ADMIN, CATEGORY_LIST_OF_BOOK, CATEGORY_LIST_URL } from '../../constants/constants'
import '../../styles.css'
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/Navbar";
import { MdAdd, MdEdit } from 'react-icons/md';

export default function BookAddUpdateForm() {
    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author_id, setAuthorId] = useState(localStorage.getItem("role") == ADMIN ? 0 : parseInt(localStorage.author_id));
    const [authorName, setAuthorName] = useState('');
    const [file, setFile] = useState('');
    const [authorList, setAuthorList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [date, setDate] = useState(formatDate(new Date()));
    const [createdBy, setCreatedBy] = useState(localStorage.getItem('role'));
    const [categories, setCategories] = useState([]);
    const [edit, setEdit] = useState(false);
    const [validateError, setError] = useState('');
    const [fileName, setFileName] = useState('');

    // author_id will be taken from the dropdown of authors==> admin
    //author_id will be taken localstorage ==> when role is author

    async function handleCheckbox(e) {
        const { value, checked } = e.target;
        const existing = categories.filter(x => x.categoryId == parseInt(value)).length == 1 ? true : false;
        if (checked && existing == false) {
            setCategories([...categories, { "categoryId": parseInt(value), "bookId": params.id }]);
        }
        else {
            setCategories(categories.filter((x) => x.categoryId !== parseInt(value)));
        }
    }


    async function handleSubmit() {
        setCreatedBy(localStorage.role === "Administator" ? ADMIN : AUTHOR);
        var formData = new FormData()
        formData.append('image', file);
        formData.append('imageUrl', "");
        formData.append('name', name);
        formData.append('description', description);
        formData.append('authorId', author_id);
        formData.append('createdBy', createdBy);
        formData.append('date', date);
        formData.append('bookCategories', categories);
        if (edit == false) {
            if (file && name && description && author_id && createdBy && date && categories) {
                await axios.post(BOOK_LIST_URL, formData, { "Content-Type": "multipart/form-data" })
                    .then((response) => {
                        console.log(response);
                        navigate('/books/list')
                    })
                    .catch((err) => { console.log(err) });
            }
        } else {
            let data = {
                "id": params.id,
                'image': null, 'imageUrl': null, "name": name,
                "description": description, "authorId": author_id,
                "createdBy": createdBy, "date": date, "bookCategories": categories
            }
            if (name && description && author_id && createdBy && date && categories) {
                await axios.put(BOOK_LIST_URL + params.id, data)
                    .then((response) => {
                        console.log(response);
                        navigate('/books/list')
                    })
                    .catch((err) => { console.log(err) });

            }
        }

        setError("All fields must be filled!");

    }


    async function getAllAuthors() {
        axios.get(AUTHOR_LIST_URL)
            .then((res) => {
                setAuthorList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async function getAllCategories() {
        axios.get(CATEGORY_LIST_URL)
            .then((res) => {
                setCategoriesList(res.data)
            })
            .catch(err => console.log(err));
    }


    function formatDate(date) {
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    useEffect(() => {
        getAllCategories();
        getAllAuthors();

        async function loadForm() {
            if (params.id) {

                await axios.get(BOOK_LIST_URL + params.id, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
                    .then(async (res) => {
                        setEdit(true);
                        setName(res.data.name);
                        setAuthorId(res.data.authorId);
                        setDate(res.data.date);
                        setDescription(res.data.description);
                        if (localStorage.getItem('role') == "Administrator")
                            setAuthorName(authorList.filter(x => x.id === res.data.authorId)[0]['name']);
                        setFileName(res.data.imageUrl);
                        // setCategories
                        await axios.get(CATEGORY_LIST_OF_BOOK + params.id)
                            .then((res) => {
                                setCategories(res.data);
                                console.log("hellooo: cate ,", res.data);
                            })
                            .catch((err) => { console.log(err) });
                    })
                    .catch(err => console.log(err));
            }
        }

        loadForm();

    }, [edit]);

    return (
        <><NavBar />
            <div className='form-div'>
                <form className='form-body' >
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Title* :</label>
                        <input required name='name' type="text" value={name} onChange={(event) => setName(event.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description* :</label>
                        <textarea required name='description' value={description} onChange={(event) => setDescription(event.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    {params.id && <div>
                        <label>Current book cover:</label>
                        <br />
                        <img src={BOOK_COVER + params.id} alt={fileName} style={{ width: 200 + "px" }}></img>
                    </div>}
                    <div className="form-group">
                        <label htmlFor="image">{params.id ? "Change" : "Add"} book cover (image)* :</label>
                        <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    {localStorage.getItem("role") === "Administrator" &&
                        <div className="form-group">
                            <label htmlFor="author_id">Author *: </label>
                            <select id="author_id" className="form-control" name="author_id" onChange={(event) => setAuthorId(event.target.value)}>

                                {edit ? <option selected={edit} value={author_id}>{authorName}</option> : <option>---</option>}
                                {authorList.map((row) => (
                                    <>
                                        <option value={parseInt(row.id)}>{row.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                    }

                    <label >Categories* : </label>
                    {categoriesList.map((row) => (
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" onChange={(e) => handleCheckbox(e)} value={row.id} />
                            <span>{categories.filter(x => x['categoryId'] == row.id).length == 1 ? <em><b>{row.name}</b></em> : row.name}</span>
                        </div>
                    ))}
                    {edit &&
                        <><br />
                            <span><em><b>text in bold and emphasized is put for the current category</b></em></span></>}
                    <span className="error">{validateError}</span>
                    <br />
                    {edit ?
                        <button type="button" onClick={handleSubmit} className="btn btn-primary" ><MdEdit />Save changes</button>
                        : <button type="button" onClick={handleSubmit} className="btn btn-primary" ><MdAdd />Submit</button>
                    }
                </form>
            </div></>
    );

}

