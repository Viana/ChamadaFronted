import './EditProfile.css'

import { uploads } from "../../utils/config"

//Hooks
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice"

//Components
import Message from "../../components/Message"



const EditProfile = () => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")

    const dispatch = useDispatch()

    const { user, message, loading, error } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            nome
        }

    
        if (senha) {
            userData.senha = senha
        }
        const formData = new FormData()
        const userFormData = Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key]))

        formData.append("user", userFormData)

        await dispatch(updateProfile(userData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    // const handleFile = (e) => {
    //     const image = e.target.file[0]
    //     setPreviewImage(image)
    //     setProfileImage(image)
    // }

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setNome(user.nome)
            setEmail(user.email)

        }
    }, [user])

    return (
        <div id="edit-profile">
            <h2>Portal Obreiros <br /> João Dias</h2>
            <p className="subtitle">Editar Perfil</p>
            {/* {(user.profileImage || previewImage) && (
                <img className='profile-image'
                    src={
                        previewImage
                            ? URL.createObjectURL(previewImage)
                            : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.nome} />
            )} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                />
                <input
                    type="email"
                    placeholder="E-mail" disabled
                    value={email}
                />
                {/* <label>
                    <span>Foto do perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label> */}
                <label>
                    <span>Quer alterar a senha?</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                    />
                    {/* <input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        onChange={(e) => setConfirmSenha(e.target.value)}
                        value={confirmSenha}
                    /> */}
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde ..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile