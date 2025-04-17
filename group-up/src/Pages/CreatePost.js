import axios from 'axios';
import '../App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state/slice/postsSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () =>  {
    const [message, setMessage] = useState({text: "", type: ""});
    const posts = useSelector(state => state.posts.value);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitPost = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const secondaryTags = formData.getAll('secondarytag');
        const tags = formData.getAll('secondarytag')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

        formData.set('secondarytag', tags.length > 0 ? tags.toString() : null);
        console.log(formData.get("secondarytag"));

        axios.post('http://localhost:8080/createposts', formData, {withCredentials: true})
        .then((res) => {
            if(res.status == 200) {
                setMessage({text: res?.data?.message, type: "success"});
                dispatch(setPosts([res.data.post, ...posts]));
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
                <form onSubmit={submitPost} enctype="multipart/form-data">
                    <label for="title"><strong className='required'>*</strong>Title: </label>
                    <input name='title' required></input>
                    <br/>
                    <label for="content"><strong className='required'>*</strong>Description:</label>
                    <br/>
                    <textarea name='content' cols={50} rows={10} required></textarea>
                    <br/>
                    <label for="photo">Image: </label>
                    <input type="file" name="photo" accept="image/*"></input>
                    <br/>
                    <label for="primarytag"><strong className='required'>*</strong>Main Tag: </label>
                    <input name='primarytag' required placeholder='Music'></input>
                    <br/>
                    <label for="secondarytag">Secondary Tags: </label><br/>
                    <input name='secondarytag' placeholder='Jazz'></input><br/>
                    <input name='secondarytag' placeholder='Electronic'></input><br/>
                    <input name='secondarytag' placeholder='Rap'></input><br/>
                    <input name='secondarytag' placeholder='Funk'></input><br/>
                    <input name='secondarytag' placeholder='Pop'></input><br/>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default CreatePost