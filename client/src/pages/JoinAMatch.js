import { Link } from 'react-router-dom';
import '../Styles/JoinAMatch.css'

function JoinMatch() {
    return ( 
        <div className='join-match-container'>
            <h1>Join Or Host A Lobby</h1>
            <div className='mode-options'>
                <Link to='PlayerModeOptions' className='player-mode'>
                    <h2>Join Lobby</h2>
                    <p>"Join as a Player" mode allows you to showcase your rap skills and compete with other players in an exciting rap battle. You can select beats from your inventory to use in the battle, and the winner is determined by audience vote.</p>
                </Link>
                <Link to='SpectatorModeOptions' className='spectator-mode'>
                    <h2>Create Lobby</h2>
                    <p>"Join as a Spectator" mode allows you to be a part of the audience and watch players compete in rap battles. After the battle, you can vote for your favorite player and contribute to the final outcome.</p>
                </Link>
            </div>
        </div>
     );
}
 
export default JoinMatch;