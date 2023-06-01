import React, { useState, useEffect } from 'react';
import '../Styles/ViewBeats.css';
import M from 'materialize-css';
import axios from 'axios';


const BeatStore = () => {

  const [beats, setBeats] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("")

  useEffect(() => {
    // Fetch beats from the server and update the beats state
    // For demonstration purposes, let's assume the beats are fetched and set to the "beats" state
    const fetchedBeats = [
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' },
      { id: 1, name: 'Beat 1', description: 'Description 1', duration: 180, genre: 'Hip Hop' },
      { id: 2, name: 'Beat 2', description: 'Description 2', duration: 240, genre: 'Trap' },
      { id: 3, name: 'Beat 3', description: 'Description 3', duration: 150, genre: 'R&B' }
      // Add more beats
    ];
    setBeats(fetchedBeats);
  }, []);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(beats, 6); // Split beats into rows of 6

  useEffect(() => {
    M.AutoInit();
  }, []);

  
  const uploadBeat = async () => {

    try {
      const response = await axios.post(
        'http://localhost:3001/beats/uploadBeat',
        {
          name: name,
          description: description,
          file: file
        },
        {
          headers: {
            "Authorization": localStorage.getItem("jwt")
          }
        }
      );
  
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
  };
  

  

  return (
    <div>
      <div className="row" style={{ borderBottom: '1px solid grey', padding: '10px' }}>
        <div className="col s12">
          <h1 className="center-align" style={{ color: 'gold', fontSize: "8em" }}>View Beats</h1>
        </div>
        <div className="row" style={{ padding: '10px' }}>
        <div className="col s6">
          <button className="btn" style={{backgroundColor: "gold", color: 'black'}}>
          <i className="material-icons left">search</i>
            Search
        </button>
        </div>
        <div className="col s6 right-align">
          <button className="btn" style={{backgroundColor: "gold", color: 'black'}}>
          <i className="material-icons left">cloud_upload</i>
          Upload
          </button>
        </div>
      </div>
      </div>
      <div className="row">
        {rows.map((row, index) => (
          <div className="row" key={index}>
            {row.map((beat) => (
              <div className="col s12 m4 l2" key={beat.id}>
                <div className="card" style={{border: "1px solid grey"}}>
                  <div className="card-image">
                    <img src={require('../assets/rappers.jpeg')} alt={beat.name} />
                  </div>
                  <div className="card-content" style={{backgroundColor: 'rgb(44,44,44)', color: 'gold'}}>
                    <span className="card-title">{beat.name}</span>
                    <p>Shan Virani</p>
                    <p>{beat.description}</p>
                  </div>
                  <div className="card-action" style={{backgroundColor: 'rgb(44,44,44)', display: "flex", justifyContent:"space-around" }}>
                  <i className="material-icons left" style={{color:'white', marginRight:75}}>play_circle_outline</i>
                  <i className="material-icons left" style={{color:'white'}}>add_box</i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );  
};

export default BeatStore;
