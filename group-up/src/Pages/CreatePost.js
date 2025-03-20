import axios from 'axios';
import '../App.css';

const CreatePost = () =>  {
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
        .catch((err) => {
            let message = err?.response?.data?.message;
        })
    }

    return (
        <>
            <h1 className='body-content'>
                Create Post
            </h1>
            <div className='body-content'>
                <form onSubmit={submitPost}>
                    <label for="title">Title: </label>
                    <input name='title'></input>
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