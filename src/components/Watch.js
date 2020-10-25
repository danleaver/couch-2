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
    <div>
      <StyledImage style={{border:"1px solid red"}} src={image} />
    </div>
  )
}

const StyledImage = styled.img`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
`
export default Watch