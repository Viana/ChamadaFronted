import { api, requestConfig } from "../utils/config";

//Registrando chamada
const chamadaRegister = async (data, token) => {

    const config = requestConfig("POST", data, token)

    console.log('$$$$'+JSON.stringify( data))
    try {
        const res = await fetch(api + "/chamada/register", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch (error) {
        console.log(error)
    }
}

const  chamadaService = {
    chamadaRegister,
}

export default chamadaService;