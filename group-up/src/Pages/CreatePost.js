import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state/slice/postsSlice';
import { useNavigate } from 'react-router-dom';
import Bubbles from '../Components/Bubbles';
import test from '../images/test.png'

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

    //stop scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          // Re-enable scrolling when component unmounts
          document.body.style.overflow = 'auto';
        };
      }, []);

    return (
        <>
        <Bubbles height='100vh'/>
            <h1 className='body-content'>
                Create Post
            </h1>
            <div className='body-content'>
            {
                message.text != "" && <p className={message.type}>{message.text}</p>
            }
                <form onSubmit={submitPost} enctype="multipart/form-data">
                    {/* <label for="title"><strong className='required'>*</strong>Title: </label> */}
                    <input id='create-title' name='title' placeholder='PROJECT TITLE...' required></input>
                    <div id='project-pitch'>
                        <label id='project-pitch-title' for="content">PROJECT PITCH</label>
                        <br/>
                        <textarea id='project-pitch-content' 
                        placeholder='Describe your project and leave your contact information :)'
                        name='content' cols={50} rows={15} required></textarea>
                    </div>
                    <br/>
                    <label for="photo">Image: </label>
                    <input type="file" name="photo" accept="image/*" id='file-upload-button'></input>
                    <label for="primarytag"><strong className='required'>*</strong>Main Tag: </label>
                    <input className='tag' name='primarytag' required placeholder='Music'></input>
                    <br/>
                    <br/>
                    <br/>
                    <label for="secondarytag">Secondary Tags: </label>
                    <input className='tag' name='secondarytag' placeholder='Jazz'></input>
                    <input className='tag' name='secondarytag' placeholder='Electronic'></input>
                    <input className='tag' name='secondarytag' placeholder='Rap'></input>
                    <input className='tag' name='secondarytag' placeholder='Funk'></input>
                    {/* <input className='tag' name='secondarytag' placeholder='Pop'></input><br/> */}
                    <br/>
                    <br/>
                    <button type='submit' id='submit-post'>Submit</button>
                </form>
                <img src={test} id='footer' />
            </div>
        </>
    );
}

export default CreatePost