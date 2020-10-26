import React, { useContext }from 'react';
import styled from 'styled-components';
import { SocketContext } from '../providers/SocketProvider';

const YellAtDog = () => {
  const { socket } = useContext(SocketContext);



  const recordAudio = () =>
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            // const audioBuffer = new ArrayBuffer(audioChunks)
            // console.log("array buffer: ", audioBuffer)
            console.log("blob: ", audioBlob)
            socket.emit('sound', audioBlob)
            const audioUrl = URL.createObjectURL(audioBlob);
            // socket.emit('sound', audioUrl)
            // const audio = new Audio(audioUrl);
            // const play = () => audio.play();
            // resolve({ audioBlob, audioUrl, play });
            resolve({ audioBlob, audioUrl });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
  });

  
  const handleClick = () => {
    (async () => {
      const recorder = await recordAudio();
      recorder.start();
      await sleep(3000);
      const audio = await recorder.stop();
      // audio.play();
    })();
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  return (
    <StyledButton onClick={handleClick}>
      Off The Couch 📢
    </StyledButton>    
  )
  
}

const StyledButton = styled.button`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;

`

export default YellAtDog;