import swal from 'sweetalert2';
import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns';
import { confirm } from 'react-confirm-box'
import Home from './pages/Home/Home';
import Chamada from './pages/Chamada/Chamada';
import Justificativa from './pages/Justificativa/Justificativa';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import EditProfile from './pages/EditProfile/EditProfile';


function App() {

  const { auth, loading } = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!auth ? <Register /> : <Navigate to="/register" />} />
            <Route path='/chamada' element={auth ? <Chamada /> : <Navigate to="/login" />} />
            <Route path='/justificativa' element={auth ? <Justificativa /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;

