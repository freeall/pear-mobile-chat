import ce from 'compact-encoding'
import { requireNativeModule } from 'expo-modules-core'
import RPC from 'tiny-buffer-rpc'

requireNativeModule('HelloBare').install()

export default class UiRpcHandler {
  constructor() {
    // forward bare's logs to console
    HelloBare.onLog = console.log

    // RPC
    const rpc = new RPC(HelloBare.sendMessage)
    HelloBare.onMessage = rpc.recv.bind(rpc)

    this._createRoom = rpc.register(0, {
      request: ce.none,
      response: ce.string
    })

    rpc.register(1, {
      request: ce.string,
      response: ce.none,
      onrequest: msg => this.onClientMessage?.(msg)
    })
  }

  async createRoom() {
    return await this._createRoom.request()
  }
}
