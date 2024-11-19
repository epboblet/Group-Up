import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { Spacer } from '../Components/Spacer';

const Home = () => {
    return (
        <>
            <div id='about'>    
                <h1 className='body-header'>
                    About Group-Up
                </h1>
                <p className='body-content'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, pariatur ad quasi sit sed corporis et a laboriosam eligendi velit cum soluta sequi adipisci perferendis laborum necessitatibus doloremque facilis magni.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, pariatur ad quasi sit sed corporis et a laboriosam eligendi velit cum soluta sequi adipisci perferendis laborum necessitatibus doloremque facilis magni.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, pariatur ad quasi sit sed corporis et a laboriosam eligendi velit cum soluta sequi adipisci perferendis laborum necessitatibus doloremque facilis magni.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, pariatur ad quasi sit sed corporis et a laboriosam eligendi velit cum soluta sequi adipisci perferendis laborum necessitatibus doloremque facilis magni.
                </p>
            </div>
            <Spacer height={150} unit={"px"}/>
            <div id='project-list'>
                <h1 className='body-header'>
                    Featured Projects
                </h1>
                {
                    projects.map((e) => {
                        return(
                            <ProjectCard project={e}/>
                        )
                    })
                }
            </div>
        </>
    );
}

const projects = [{
    id: 1,
    user: {
        id: 1,
        username: "Nimrod",
        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
    },
    name: "Tower of Babel",
    type: "Building",
    description: `So were going to build this city right? 
    στο κέντρο της πόλης θα είναι αυτός ο γιγάντιος πύργος. 
    уый тыххæй хъæудзæн бирæ кусæг. 
    つまり、本物のチームプレーヤーが何人か必要になるということです。
    אם אינך יכול לעבוד כחלק מצוות אל תטרח אפילו להגיש מועמדות. 
    Ta wieża prawdopodobnie sięgnie nieba. 
    Tenho a certeza de que Deus apreciará todo o nosso trabalho árduo.`,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/500px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg',
},
{
    id: 2,
    user: {
        id: 2,
        username: "Arbor",
        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
    },
    name: "Planting a Bunch of Trees",
    type: "Tree",
    description: `TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, `,
    image: 'https://www.snexplores.org/wp-content/uploads/2020/04/1030_LL_trees.png',
}
]

export default Home;