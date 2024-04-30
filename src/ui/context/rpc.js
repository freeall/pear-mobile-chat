import React, { useEffect, createContext, useState } from 'react'
import UiRpcHandler from '../../rpc/ui-handler'

const RpcContext = createContext()
const rpcHandler = new UiRpcHandler()

function RpcProvider (props) {
  const [room, setRoom] = useState('')
  const [messages, setMessages] = useState([])

  rpcHandler.onClientMessage = message => {
    console.log('context/rpc.js, onClientMessage')
    setMessages([...messages, message])
  }

  return (
    <RpcContext.Provider
      value={{
        room,
        messages,
        createRoom: rpcHandler.createRoom.bind(rpcHandler)
      }}
      {...props}
    />
  )
}

export { RpcProvider, RpcContext }
