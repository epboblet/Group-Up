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

        const secondaryTag = formData.get("secondarytag").split(/[\s,]+/);
        if(secondaryTag.length > 5) {
            setMessage({text: "There is a max of 5 Secondary Tags", type: "error"});
            return;
        }

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
                    <label for="title">Title: </label>
                    <input name='title' required></input>
                    <br/>
                    <label for="content">Description:</label>
                    <br/>
                    <textarea name='content' cols={50} rows={10} required></textarea>
                    <br/>
                    <label for="photo">Image: </label>
                    <input type="file" name="photo" accept="image/*"></input>
                    <br/>
                    <label for="primarytag">Main Tag: </label>
                    <input name='primarytag' required placeholder='Music'></input>
                    <br/>
                    <label for="secondarytag">Secondary Tags: </label>
                    <input name='secondarytag' placeholder='Jazz, Electronic, Programming'></input>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
}

export default CreatePost