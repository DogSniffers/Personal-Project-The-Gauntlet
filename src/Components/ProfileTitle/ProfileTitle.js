import React, {useState, useEffect} from 'react'

function ProfileTitle(props){
    const [title, setTitle] = useState('Profile');
    useEffect(() => {
        document.title = `${title}`;
      });
      return(
          <>
          </>
      )
}
export default ProfileTitle;