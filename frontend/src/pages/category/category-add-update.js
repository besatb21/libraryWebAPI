// import { ImageThumb } from '../../components/ImageUpload';
import axios from "axios";
import React from "react";
import { BOOK_LIST_URL } from '../../constants/constants'

import '../../styles.css'
export default class CategoryAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', description: '', author: Object, file: '' };
        // Handles file upload event and updates state
        this.handleUpload = this.handleUpload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUpload(event) {
        this.setState({ "file": event.target.files[0] });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    async handleSubmit(event) {
       let author={name:"string",bio:"string",createdAt:"2022-11-16T00:00:00",createdBy:"string",books:null}
       let data = {name:this.state.name, description:this.state.description, author:author };
       await axios.post(BOOK_LIST_URL,data)
            .then((response) => {
                console.log(response);
                // this.postImage(this.state.file, BASE_LIST_URL+response.data.id)

        })
            .catch((err) => { console.log(err) });
       
            event.preventDefault();
    }
    postImage = async (imageFile, url) => {
        var formData = new FormData()
        formData.append('image', imageFile)
        const response = await axios
            .post(url, formData, { "Content-Type": "multipart/form-data" })
            .then(() => { console.log("succesful POST request"); })
            .catch((err) => console.log(err));

        // if (response) {
        //     setItems(response.data);
        // }
    };

    render() {

        return (
            <div className='form-div'>
                <form  className='form-body' >
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Title:</label>
                        <input required name='name' type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control" id="exampleInputEmail1" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea required name='description' value={this.state.description} onChange={this.handleInputChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Add book cover (image):</label>
                        <input type="file" onChange={this.handleUpload} />
                    </div>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-primary" >Submit</button>
                </form>
            </div>
        );

    }
}
