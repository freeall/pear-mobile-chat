import registerRootComponent from 'expo/build/launch/registerRootComponent'
import App from './containers/App'
import { RpcProvider } from './context/rpc'

function Wrapper () {
  return (
    <RpcProvider>
      <App />
    </RpcProvider>
  )
}

registerRootComponent(Wrapper)
