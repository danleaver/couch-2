import React from 'react'; 
import { useEffect, useContext } from 'react';
import { SocketContext } from '../providers/SocketProvider';

const PlaySound = () => {
  const { socket } = useContext(SocketContext);
  
  useEffect( () => {
    socket.on("sound", audioData => {
      console.log("The sound!!", audioData)
      const newBlob = new Blob([audioData])
      console.log("newBlob", newBlob)
      const audioUrl = URL.createObjectURL(newBlob);      
      const audio = new Audio(audioUrl);
      audio.play()
    })

  }, [])

  return(
    "hello Sounds"
  )
}

export default PlaySound