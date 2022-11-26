import React, { useState } from 'react';
import '../../styles.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MdAdd } from 'react-icons/md';
import { AUTHOR_LIST_URL, USER_URL, AUTHOR } from '../../constants';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function AuthorAddUpdate() {

    const navigate = useNavigate();

    const [validationError, setValidationError] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');

    let createdAt = new Date();

    let data = {
        "name": name,
        "bio": bio,
        "createdAt": formatDate(createdAt),
        "createdBy": localStorage.getItem('role'),
        "books": null,
        "user_id": 0
    }
    function formatDate(date) {
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    async function onSubmit() {


        let userData = {
            "role": AUTHOR,
            "username": name + name,
            "password": "hello" + name, 
            "createdAt":formatDate(createdAt)
        }
        await axios.post(USER_URL, userData)
            .then((user_res) => {
                console.log(user_res);
                data.user_id = user_res.data.id;
                addAuthor();
            });

    }
    async function addAuthor() {
        await    axios.post(AUTHOR_LIST_URL, data)
        .then((response) => {
            console.log(response);

            navigate('/author/list')
        })
        .catch((err) => { console.log(err) });

    }
    return (
        <>
            <div className='form-div'>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            name="name"
                            size="small"
                            error={false}
                            id="outlined"
                            label="Name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Bio"
                            size="small"
                            name="bio"
                            multiline
                            maxRows={4}
                            value={bio}
                            onChange={(event) => { setBio(event.target.value) }}
                        />
                    </div>


                </Box>
                <div style={{ marginTop: 20 + 'px' }}>
                    <Button size="medium" variant="contained" disableElevation onClick={onSubmit}>
                        <MdAdd size={20} />Shto
                    </Button>
                </div>

            </div>




        </>

    );
}
