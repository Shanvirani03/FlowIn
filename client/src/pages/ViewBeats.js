import React, { useState } from 'react';
import '../Styles/ViewBeats.css';

function ViewBeats() {
  const [activeOption, setActiveOption] = useState('for-you');

  const toggleOption = (target) => {
    setActiveOption(target);
  };

  const beats = [
    {
      id: 1,
      type: 'for-you',
      title: 'Recommended beat 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      type: 'for-you',
      title: 'Recommended beat 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      type: 'public-beats',
      title: 'Public beat 1',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 4,
      type: 'public-beats',
      title: 'Public beat 2',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 5,
      type: 'private-beats',
      title: 'Private beat 1',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 6,
      type: 'private-beats',
      title: 'Private beat 2',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    }
  ];

  const beatsToShow = beats.filter((beat) => beat.type === activeOption);

  return (
    <div className="container">
      <div className="header">
        <h1>View Beats</h1>
        <div className="toggle-menu">
          <div className={`toggle-option ${activeOption === 'for-you' ? 'active' : ''}`} onClick={() => toggleOption('for-you')}>For You</div>
          <div className={`toggle-option ${activeOption === 'public-beats' ? 'active' : ''}`} onClick={() => toggleOption('public-beats')}>Public Beats</div>
          <div className={`toggle-option ${activeOption === 'private-beats' ? 'active' : ''}`} onClick={() => toggleOption('private-beats')}>Private Beats</div>
        </div>
      </div>
      <div className="beats-container">
        {beatsToShow.map((beat) => (
          <div key={beat.id} className={`beat ${beat.type === activeOption ? 'active' : ''}`}>
            <h3>{beat.title}</h3>
            <p>{beat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBeats;