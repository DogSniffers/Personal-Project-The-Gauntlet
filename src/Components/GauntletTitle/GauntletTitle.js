import React, {useState, useEffect} from 'react'

function GauntletTitle(props){
    const [title, setTitle] = useState('The Gauntlet');
    useEffect(() => {
        document.title = `${title}`;
      });
      return(
          <>
          </>
      )
}
export default GauntletTitle;