// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, SetAlert] = useState(null);   //To show alerts

  const showAlert = (message, type) => {
    SetAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      SetAlert(null);
    }, 1600);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert Alert={alert} />
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
