import React from 'react'
import {io} from 'socket.io-client'
const App= ()=> {
    const [time, setTime] = React.useState('fetching')  
    React.useEffect(()=>{
    const socket = io('http://localhost:3001')
    socket.on('connect', ()=>console.log(socket.id))
    // socket.on('connect_error', ()=>{
    //   setTimeout(()=>socket.connect(),3001)
    // })
    socket.on('time', (data)=> {
      setTime(data);
      console.log(data)
    })
    socket.on('disconnect',()=>setTime('server disconnected'))
 
 },[]);
 return (
   <div className="App">
     {time}
   </div>
 )
}
export default App;