import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
const ENDPONT = 'https://socket-test-backend.herokuapp.com/'

function App() {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');
  const socket = socketIOClient(ENDPONT);

  useEffect(() => {
    
    socket.on('FromApi', data => {
      setResponse(data)
    })
    console.log(response)
  }, [socket])



  const pushToEcho = () => {
    console.log(message)
    
    socket.emit('FromApp', message);
    socket.on('FromApi', data => {
      setResponse(data)
    })
    setMessage('');
  }

  return (
    <div className="App">
      <div className="body">
        
        {<h1>{response}</h1>}  

      </div>
      <div className="message-box">
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
        <button onClick={pushToEcho}>Send</button>
      </div>
    </div>
  );
}

export default App;
