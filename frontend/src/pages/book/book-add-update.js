// import { ImageThumb } from '../../components/ImageUpload';
import axios from "axios";
import React, { useMemo, useState } from "react";
import { AUTHOR_LIST_URL, BOOK_LIST_URL, CATEGORY_LIST_URL } from '../../constants/constants'
import '../../styles.css'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillCodeSandboxCircle } from "react-icons/ai";


export default function BookAddUpdateForm() {
    const params = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author_id, setAuthorId] = useState(0);
    const [authorName, setAuthorName] = useState('');
    const [file, setFile] = useState('');
    const [authorList, setAuthorList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [date, setDate] = useState(formatDate(new Date()));
    const [createdBy, setCreatedBy] = useState(localStorage.getItem('role'));
    const [categories, setCategories] = useState([]);
    const [edit, setEdit] = useState(false);
    const tempArr = [];


    // author_id will be taken from the dropdown of authors==> admin
    //author_id will be taken localstorage ==> when role is author

    async function handleSubmit(event) {
        let data = {
            "name": name, "description": description,
            "authorId": author_id, "image": null,
            "createdBy": createdBy, "date": date,
            "categories": setCategories(tempArr)
        };

        await axios.post(BOOK_LIST_URL, data)
            .then((response) => {
                console.log(response);
                this.postImage(file, BOOK_LIST_URL + response.data.id)

            })
            .catch((err) => { console.log(err) });

    }
    async function postImage(imageFile, url) {
        var formData = new FormData()
        formData.append('image', imageFile);
        await axios
            .put(url, formData, { "Content-Type": "multipart/form-data" })
            .then(() => { console.log("succesful POST request"); })
            .catch((err) => console.log(err));

        // if (response) {
        //     setItems(response.data);
        // }
    };


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

    async function loadForm() {
        if (params.id) {

            await axios.get(BOOK_LIST_URL + params.id)
                .then((res) => {
                    setEdit(true);
                    setName(res.data.name);
                    setAuthorId(res.data.authorId);
                    setDate(res.data.date);
                    setDescription(res.data.description);
                    setAuthorName(authorList.filter(x => x.id === res.data.authorId)[0].name);

                })
                .catch(err => console.log(err));

        }
    }




    function formatDate(date) {
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    useEffect(() => {
        getAllCategories();
        getAllAuthors();
        loadForm();

    }, [edit]);

    return (
        <>
            <div className='form-div'>
                <form className='form-body' >
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Title:</label>
                        <input required name='name' type="text" value={name} onChange={(event) => setName(event.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea required name='description' value={description} onChange={(event) => setDescription(event.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Add book cover (image):</label>
                        <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author_id">Author: </label>
                        <select id="author_id" className="form-control" name="author_id" onChange={(event) => setAuthorId(event.target.value)}>

                            {edit ? <option selected={edit} value={author_id}>{authorName}</option> : <option>---</option>}
                            {authorList.map((row) => (
                                <>
                                    <option value={parseInt(row.id)}>{row.name}</option>
                                </>
                            ))}
                        </select>
                    </div>
                    <label >Categories: </label>
                    {categoriesList.map((row) => (
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" onChange={(e) => {
                                if (e.target.checked === true) { tempArr.push(row) }
                            }} value={row.id} />
                            <span>{row.name}</span>
                        </div>
                    ))}

                    <button type="button" onClick={handleSubmit} className="btn btn-primary" >Submit</button>
                </form>
            </div></>
    );

}

