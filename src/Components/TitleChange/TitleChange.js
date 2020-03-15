import React, { useState, useEffect } from 'react';
import './TitleChange.css'

function TitleChange(props) {
  const [title, setTitle] = useState('The Gauntlet');
  let color = props

  useEffect(() => {
    document.title = `${title}`;
  });
  return (
    
    <div>
      <p className={`${props.color}title`}>{title}</p>
      <p className={`${props.color}title`}>Change Page Title</p>
      <button onClick={() => setTitle('The Gauntlet')} className={`${props.color}button`}>
        The Gauntlet
      </button>
      <button onClick={() => setTitle('What a Horrible Night to Have a Curse')} className={`${props.color}button`}>
        What a Horrible Night...
      </button>
      <button onClick={() => setTitle('Bad Game')} className={`${props.color}button`}>
        Bad Game
      </button> 
      <button onClick={() => setTitle('No gods or kings. Only man.')} className={`${props.color}button`}>
      No gods or kings...
      </button>
    </div>
  );
  
}


export default  TitleChange;