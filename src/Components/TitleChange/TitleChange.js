import React, { useState, useEffect } from 'react';

function TitleChange() {
  const [title, setTitle] = useState('The Gauntlet');

  useEffect(() => {
    document.title = `${title}`;
  });

  return (
    <div>
      <p>{title}</p>
      <button onClick={() => setTitle('What a Horrible Night to Have a Curse')}>
        Change Page Title
      </button>
    </div>
  );
}

export default TitleChange