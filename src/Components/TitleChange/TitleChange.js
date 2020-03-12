import React, { useState, useEffect } from 'react';

function TitleChange() {
  const [title, setTitle] = useState('The Gauntlet');

  useEffect(() => {
    document.title = `${title}`;
  });

  return (
    <div>
      <p>{title}</p>
      <p>Change Page Title</p>
      <button onClick={() => setTitle('The Gauntlet')}>
        The Gauntlet
      </button>
      <button onClick={() => setTitle('What a Horrible Night to Have a Curse')}>
        What a Horrible Night...
      </button>
      <button onClick={() => setTitle('Bad Game')}>
        Bad Game
      </button>
      <button onClick={() => setTitle('No gods or kings. Only man.')}>
      No gods or kings...
      </button>
    </div>
  );
}

export default TitleChange