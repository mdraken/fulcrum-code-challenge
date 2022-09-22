import React from 'react';
import './App.css';
import Home from './pages/Home';
import logo from './assets/logo.png';
import { FaClipboardList } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IconContext.Provider value={{ size: '3rem', className: 'icon' }}>
          <FaClipboardList />
        </IconContext.Provider>
        <h1>Welcome to the estimate creator!</h1>
        <img src={logo} style={{ height: '200px' }} />
      </header>
      <div className='main_container'>
        <Home />
      </div>
    </div>
  );
}

export default App;
