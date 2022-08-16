import swal from 'sweetalert2';
import './App.css';
import { useState, useEffect } from 'react'
import { Bstrash, BsBookmarkcheck, BsBookmarkcheckFill } from 'react-icons/bs'
import axios from 'axios'
import { format } from 'date-fns';
import { confirm } from 'react-confirm-box'


// import {confirm} from 'react-confirm'
const API = 'http://localhost:3001';

function App() {

  const [cracha, setCracha] = useState("");
  var today = format(new Date(), 'dd/MM/yyyy');
  var numeroCrachaEncontrado
  var nomeObreiro
  let numcrachaResgister = false;
  let numcrachaIsExist = false;
  const handleSubmit = async (e) => {
    let flag = false;
    e.preventDefault()

    const opt = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }

    // Aqui pesquisando tabela CHAMADA se o cracha já foi registrado
    await fetch(API + '/chamada', opt)
      .then((r) => r.json())
      .then(resposta => {
        resposta.map((num) => {
          console.log(typeof num.cracha + " ------------------ " + typeof cracha)
          console.log(num.cracha + " > " + parseInt(cracha))
          if (parseInt(cracha) === num.cracha) {
            numcrachaResgister = true
            console.log('enttrou aqui')
          }
        }
        )
        if (numcrachaResgister) {
          swal.fire("Opa!", "Número do Crachá já registrado !!", "warning")
        }
      });

    // Aqui pesquisando tabela OBREIROS se o cracha existe
    await fetch(API + '/obreiros', opt)
      .then((r) => r.json())
      .then(resposta => {
        let numcrachaIsExist = false;
        resposta.map((num) => {
          console.log(typeof num.cracha + " <<>> " + typeof cracha)
          console.log(num.cracha + " > " + parseInt(cracha))
          if (parseInt(cracha) === num.cracha) {
            numcrachaIsExist = true
            numeroCrachaEncontrado = num.cracha;
            nomeObreiro = num.nome;
          }
        }
        )
        if (!numcrachaIsExist) {
          swal.fire("Opa!", "Número do Crachá não existe !!", "warning")
        }

      });

    // const a = async () => {
    //   if (numcrachaIsExist === true) {
    //     if (window.confirm("Número " + numeroCrachaEncontrado + ": " + nomeObreiro + "?")) {
    //       await axios.post(API + "/chamada", { "cracha": parseInt(cracha) })
    //     }
    //   }
    // }


    // }

    setCracha("");

  }

  return (
    <div className="App">
      <div className="chamada-header">
        <h1>Reunião dos Obreiros</h1>
      </div>
      <div className="form-chamada">
        <h2>Chamada</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="number"
              onKeyPress={e => { if (!/[0-9]/.test(e.key)) e.preventDefault() }}
              name="cracha"
              placeholder="Numero da chamada"
              onChange={(e) => setCracha(e.target.value)}
              value={cracha}
              required
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default App;
