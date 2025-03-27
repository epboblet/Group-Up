import axios from 'axios';
import '../App.css';
import { useState } from 'react';

const CreatePost = () =>  {
    const [message, setMessage] = useState({text: "", type: ""});
    const submitPost = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title");
        const content = formData.get("content");

        axios.post('http://localhost:8080/createposts', {
            title: title,
            content: content,
            photo: null,
        }, {withCredentials: true})
        .then((res) => {
            if(res.status == 200) {
                setMessage({text: res?.data?.message, type: "success"});
                e.target.reset();
            }
            else {
                setMessage({text: res?.data?.message, type: "error"});
            }
            
        })
        .catch((err) => {
            setMessage({text: err?.message, type: "error"});
        })
    }

    return (
        <>
            <h1 className='body-content'>
                Create Post
            </h1>
            <div className='body-content'>
            {
                message.text != "" && <p className={message.type}>{message.text}</p>
            }
                <form onSubmit={submitPost}>
                    <label for="title">Title: </label>
                    <input name='title' required></input>
                    <br/>
                    <label for="content">Description:</label>
                    <br/>
                    <textarea name='content' cols={50} rows={10} required></textarea>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default CreatePost