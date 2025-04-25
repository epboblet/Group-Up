import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state/slice/postsSlice';
import  Coral_image from '../images/Coral_image.png'
import  coral_logo from '../images/coral_logo.png'
import Bubbles from '../Components/Bubbles';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.value); // Posts from Redux store
    const [filteredPost, setFilteredPosts] = useState(posts);
    const [searchText, setSearchText] = useState('');  // Track search input separately
    const location = useLocation();
    // const bubbleRefs = useRef([]);

    const debug = () => {
        console.log("posts")
        console.log(posts)
        console.log("filteredPost")
        console.log(filteredPost)
    }

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text); // Update searchText state
    };

    // Function to filter posts based on the search text
    const filterPosts = (search) => {
        if (!search) return posts;  // If search is empty, return all posts
        return posts.filter(project => 
            project.name?.toLowerCase().includes(search.toLowerCase()) ||
            project.description?.toLowerCase().includes(search.toLowerCase()) ||
            project.primarytag?.toLowerCase().includes(search.toLowerCase()) ||
            project.secondarytag?.toLowerCase().includes(search.toLowerCase())
        );
    };

    const abortController = new AbortController();

    const fetchPosts = async () => {
        if (posts.length === 0) { // Only fetch if no posts are already available
            try {
                const res = await axios.get('http://localhost:8080/posts', {
                    signal: abortController.signal,
                    withCredentials: true,
                });
                if (res && res.data) {
                    dispatch(setPosts(res.data.reverse()));  // Dispatch posts to Redux
                }
            } catch (error) {
                if (error.name !== "CanceledError") {
                    console.log(error);
                }
            }
            console.log(posts);
        }
    };

    useEffect(() => {
        fetchPosts();  // Fetch posts only on initial load if no posts exist
        console.log(posts)
        return () => abortController.abort();  // Cleanup on unmount
    }, []);

    // Re-filter posts whenever posts or searchText changes
    useEffect(() => {
        setFilteredPosts(filterPosts(searchText));  // Update filtered posts whenever searchText or posts change
    }, [searchText, posts]);  // Re-run when either searchText or posts change

    return (
        <>
            <Bubbles height='110vh'></Bubbles>
            <span className='accent-pink'></span>
            <span className='accent-pink accent-1'></span>
            <span className='accent-pink accent-2'></span>
            <span className='accent-pink accent-3'></span>
            <div id='about-container'>
                <div id='about'>
                    <div className='about-content'>
                        <img src={coral_logo} id='about-logo'></img>
                        {/* <p id='about-body'>
                            A platform by creatives for creatives
                        </p> */}
                        <p  id='about-body'>
                            Coral is a platform made by creatives, for creatives, to help people
                            find and create portfolio projects. Upload project pitches and connect with
                            people that have a diverse set of skills to bring your ideas to fruition.
                        </p>
                        <div id='about-button'>
                            <button className='button-secondary' onClick={() => {document.getElementById('project-container')?.scrollIntoView({behavior: 'smooth'})}}>EXPLORE PROJECTS</button>
                            <button className='button-main' onClick={() => {navigate('/login')}}>SIGN IN</button>
                        </div>
                    </div>
                    <div id='about-graphic'>
                        <img src={Coral_image} className='about-graphic'></img>
                    </div>
                </div>
            </div>
            <div id='project-container'>
                <h1 className='body-header'>
                    CHECK  THESE  OUT!
                </h1>
                <div className='post-controls'>
                    <input 
                        type='text' 
                        name='post-search' 
                        className='post-search' 
                        value={searchText} 
                        onChange={handleSearchChange}
                        placeholder="Search for posts..."
                    />
                    <button onClick={() => {navigate('/create-post')}} className='create-post'>Create Post</button>
                </div>
                <div id='project-area'>
                    <div id='project-list'>
                        {filteredPost.length > 0 ? (
                            filteredPost.map((e) => {
                                return <ProjectCard key={e.id} project={e} />;
                            })
                        ) : (
                            <p className='no-posts'>No posts found matching your search criteria.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
