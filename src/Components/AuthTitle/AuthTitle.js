import React, { useState, useEffect } from 'react';


function AuthTitle() {
    const [authTitle, setTitle] = useState('Login/Register');
    useEffect(() => {
      document.title = `${authTitle}`;
    });
    
    return(
        <></>
    )
}
  

    export default AuthTitle