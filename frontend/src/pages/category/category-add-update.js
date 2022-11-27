import React, { useState } from 'react';
import '../../styles.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';
import { MdAdd, MdEdit } from 'react-icons/md';
import { CATEGORY_LIST_URL } from '../../constants';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function CategoryAddUpdate() {
    const params = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [priority, setPriority] = useState('');
    const [name, setName] = useState('');
    const [createdAtInitial, setCreatedAtInitial] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    // name, prioriy, createdAt, createdBy 
    let createdAt = new Date();

    let categoryData = {
        "id":params.id,
        "name": name,
        "priority": priority,
        "createdAt": formatDate(createdAt),
        "createdBy": localStorage.getItem('username'),
    }
    function formatDate(date) {
        let month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    async function onSubmit() {
        console.log(categoryData);
        if (edit) {
            await axios.put(CATEGORY_LIST_URL+params.id, categoryData)
                .then((res) => {
                    console.log(res);
                    navigate('/author/list')

                })
                .catch((err) => { console.log(err); });
        }
        else {
            await axios.post(CATEGORY_LIST_URL, categoryData)
                .then((res) => {
                    console.log(res);   
                    navigate('/author/list')

                })
                .catch((err) => { console.log(err); });

        }

    }

    async function loadForm() {
        if (params.id) {

            await axios.get(CATEGORY_LIST_URL + params.id)
                .then((res) => {
                    // console.log(res);
                    setEdit(true);
                    setName(res.data.name);
                    setCreatedAtInitial(res.data.createdAt);
                    setCreatedBy(res.data.createdBy);
                    setPriority(res.data.priority);
                    // I am not sure whether to keep the createdAt same as it was, or edit it, so I am going to keep the original value
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    useEffect(() => {
        loadForm();

    }, [edit])


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
                    <div style={{ marginBottom: "10px" }}>
                        <TextField
                            style={{ margin: 0 + 'px' }}
                            name="name"
                            size="small"
                            error={false}
                            id="oulined"
                            label="Name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <label style={{ margin: 0 + 'px' }} htmlFor='priority'>
                            Priority:
                        </label>

                        <Slider
                            id="priority"
                            defaultValue={5}
                            value={priority}
                            onChange={(event) => { setPriority(event.target.value) }}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                        />
                    </div>


                </Box>
                <div style={{ marginTop: 20 + 'px' }}>
                    {edit ? <Button size="medium" variant="contained" disableElevation onClick={onSubmit}>
                        <MdEdit size={20} />Ruaj
                    </Button> :
                        <Button size="medium" variant="contained" disableElevation onClick={onSubmit}>
                            <MdAdd size={20} />Shto
                        </Button>}

                </div>

            </div>




        </>

    );
}
