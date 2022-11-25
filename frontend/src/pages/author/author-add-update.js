import React, { useState } from 'react';
import '../../styles.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MdAdd } from 'react-icons/md';
import { AUTHOR_LIST_URL } from '../../constants';
import axios from "axios";


export default function AuthorAddUpdate() {
    const [validationError, setValidationError] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');

    function formatDate(date) {
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }
    async function onSubmit() {
       
        let createdAt = new Date();

        createdAt = formatDate(createdAt);
        let data = {
            "name": name,
            "bio": bio,
            "createdAt":createdAt, 
            "createdBy":localStorage.getItem('role'), 
            "books":null
        }
        
        await axios.post(AUTHOR_LIST_URL, data)
            .then((response) => {
                console.log(response);
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
