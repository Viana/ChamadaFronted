import swal from 'sweetalert2';
import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns';
import { confirm } from 'react-confirm-box'
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



// import {confirm} from 'react-confirm'
const API = 'http://localhost:3001';

function App() {

  const [cracha, setCracha] = useState("");
  var today = format(new Date(), 'dd/MM/yyyy');

  const handleSubmit = async (e) => {
    let flag = false;
    e.preventDefault()

    try {
      let nomeObr;
      await axios.get(API + `/obreiros/cracha/${cracha}`)
        .then(re => {

          re.data.map((r) => {
            console.log(r.nome)
          })
        })

    } catch (error) {
      console.log(error.response.data.Msg)
    }

    setCracha("");

  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;

