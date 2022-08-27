import "./Home.css";
import { Link } from 'react-router-dom'

const Home = () => {
    return <div id='home'>
            <Link to='chamada'>
                <button className="home-class" type="button">Chamada</button>
            </Link>
            <p></p>
            <Link to='justificativa'>
                <button className="home-class">Justificativa</button>
            </Link>
        
    </div>
}

export default Home