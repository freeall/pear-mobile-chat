import { useContext } from 'react'
import { RpcContext } from '../context/rpc'

function useRpc () {
  const context = useContext(RpcContext)
  if (context === undefined) {
    throw new Error('useRpc must be used within a RpcProvider')
  }

  return context
}

export default useRpc
