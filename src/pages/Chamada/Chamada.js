import './Chamada.css'

//Hooks
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//Redux
import {chamadaRegister,resetMessage} from "../../slices/chamadaSlice"

//Components
import Message from "../../components/Message"

const Chamada = () => {
  const [cracha, setCracha] = useState("")
  const { chamada, message, loading, error } = useSelector((state) => state.chamada)
  // const { loading, error } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const chamadaData =  {cracha} 

    const formData = new FormData()

        const userFormData = Object.keys(chamadaData).forEach((key) =>
            formData.append(key, chamadaData[key]))

        formData.append("chamada", userFormData)

    await dispatch(chamadaRegister(chamadaData))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  // const handleFile = (e) => {
  //     const image = e.target.file[0]
  //     setPreviewImage(image)
  //     setProfileImage(image)
  // }

  // useEffect(() => {
  //   dispatch(chamadaRegister())
  // }, [dispatch])

  // console.log(user)
  useEffect(() => {
    if (chamada) {
      setCracha("")
      
    }
  }, [chamada])



return (
  <div id="chamada">
    <h2>Portal Obreiros <br /> João Dias</h2>
    <p className="subtitle">Chamada</p>

    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Número do crachá"
        onChange={(e) => setCracha(e.target.value)}
        value={cracha}
      />
      {!loading && <input type="submit" value="Inserir" />}
      {loading && <input type="submit" value="Aguarde ..." disabled />}
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </form>
  </div>
)
}

export default Chamada