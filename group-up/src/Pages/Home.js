import logo from '../logo.svg';
import '../App.css';

function Home() {
    return (
        <>
            <h1>
                Home Page
            </h1>
            <img src={logo} className="App-logo" alt="logo" />
        </>
    );
}

export default Home;