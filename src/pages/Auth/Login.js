import "./Auth.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { login, reset } from "../../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"


const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const { loading, error } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        
        e.preventDefault()
        const user = {
            email, senha
        }
        dispatch(login(user))
    }

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])



    return <div id="login">
        <h2>Portal Obreiros <br /> João Dias</h2>
        <p className="subtitle">Login</p>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha} />
            {!loading && <input type="submit" value="Entrar" />}
            {loading && <input type="submit" value="Aguarde ..." disabled />}
            {error && <Message msg={error} type="error" />}
        </form>
        <p>
            Não é cadastrado? <Link to="/register"> Clique aqui</Link>
        </p>
    </div>
}
export default Login