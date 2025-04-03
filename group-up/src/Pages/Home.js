import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state/slice/postsSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.value); // Posts from Redux store
    const [filteredPost, setFilteredPosts] = useState(posts);
    const [searchText, setSearchText] = useState('');  // Track search input separately
    const location = useLocation();

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
            project.description?.toLowerCase().includes(search.toLowerCase())
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
        }
    };

    useEffect(() => {
        fetchPosts();  // Fetch posts only on initial load if no posts exist
        return () => abortController.abort();  // Cleanup on unmount
    }, []);

    // Re-filter posts whenever posts or searchText changes
    useEffect(() => {
        setFilteredPosts(filterPosts(searchText));  // Update filtered posts whenever searchText or posts change
    }, [searchText, posts]);  // Re-run when either searchText or posts change

    return (
        <>
            <span className='accent-blue'></span>
            <div id='about-container'>
                <span className='accent-pink'></span>
                <div id='about'>
                    <div className='about-content'>
                        <h1 id='about-heading'>
                            CULTIVATING COMMUNITY
                        </h1>
                        <p id='about-body'>
                            Group Up is a platform made by creatives, for creatives. 
                            It brings unique ideas to fruition by allowing people to discover projects in their community, 
                            as well as providing them with a space to organize and collaborate with others.
                        </p>
                        <div>
                            <button className='button-secondary' onClick={() => {navigate('/explore')}}>EXPLORE PROJECTS</button>
                            <button className='button-main' onClick={() => {navigate('/login')}}>SIGN IN</button>
                        </div>
                    </div>
                    <div className='about-graphic'>
                        <div className='graphic blue'></div>
                        <div className='graphic yellow'></div>
                        <div className='graphic pink'></div>
                    </div>
                </div>
            </div>
            <div id='project-container'>
                <div id='project-list'>
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
                    {filteredPost.length > 0 ? (
                        filteredPost.map((e) => {
                            return <ProjectCard key={e.id} project={e} />;
                        })
                    ) : (
                        <p>No posts found matching your search criteria.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
