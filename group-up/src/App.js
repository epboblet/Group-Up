import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const apiCall = () => {
  axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=xml').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <button onClick={apiCall}>Call API</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
