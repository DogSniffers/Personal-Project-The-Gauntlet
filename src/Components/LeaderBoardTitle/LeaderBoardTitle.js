import React, {useState, useEffect} from 'react'

function LeaderBoardTitle(props){
    const [title, setTitle] = useState('Leaderboard');
    useEffect(() => {
        document.title = `${title}`;
      });
      return(
          <>
          </>
      )
}
export default LeaderBoardTitle;