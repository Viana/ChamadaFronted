import "./Auth.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { register, reset } from "../../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"

const Register = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")

    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.auth)
    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            nome, email, senha, confirmSenha
        }

        dispatch(register(user))
    }

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return <div id="register">
        <h2>Portal Obreiros <br /> João Dias</h2>
        <p className="subtitle">Cadastro</p>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setNome(e.target.value)}
                value={nome} />
            <input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha} />
            <input
                type="password"
                placeholder="Confirme a senha"
                onChange={(e) => setConfirmSenha(e.target.value)}
                value={confirmSenha} />
            {!loading && <input type="submit" value="Cadastrar" />}
            {loading && <input type="submit" value="Aguarde ..." disabled />}
            {error && <Message msg={error} type="error" />}
        </form>
        <p>
            Já é cadastrado? <Link to="/login"> Clique aqui</Link>
        </p>
    </div>
}

export default Register