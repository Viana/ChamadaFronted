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
