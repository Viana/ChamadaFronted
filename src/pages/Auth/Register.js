import "./Auth.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"

const Register = () => {

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    return <div id="register">
        <h2>Portal Obreiros <br/> João Dias</h2>
        <p className="subtitle">Cadastro</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme a senha" />
            <input type="submit" value="Cadastrar" />
        </form>
        <p>
            Já é cadastrado? <Link to="/login"> Clique aqui</Link>
        </p>
    </div>
}

export default Register