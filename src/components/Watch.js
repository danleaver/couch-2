import React, {useEffect, useContext, useState} from 'react';
import { SocketContext } from "../providers/SocketProvider";
import styled from 'styled-components';

const Watch = () => {
  const { socket } = useContext(SocketContext);
  const [ image, setImage ] = useState("https://res.cloudinary.com/danleaver/image/upload/v1602112179/dpl_review/ebuen-clemente-jr-H5Iw3Xz0vxM-unsplash_ylu9xx.jpg")

  useEffect(()=>{
    socket.on("stream", imagestream => {
      setImage(imagestream);
    });
    socket.send("Watching")

    return () => {
      socket.send("Not Watching")
      socket.disconnect();}
  }, [])

  return (
      <>
        Hello There
        <Flex image={image} />
      </>
  )
}


const Flex = styled.div`
  background: url(${p => p.image}) no-repeat top;
  background-size: contain;
  height: 100vh;
  width: 100vw;
`

export default Watch