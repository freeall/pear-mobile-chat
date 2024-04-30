const RPC = require('tiny-buffer-rpc')
const ce = require('compact-encoding')

module.exports = class WorkerRpcHandler {
  constructor ({ createRoom }) {
    const rpc = new RPC(HelloBare.sendMessage)
    HelloBare.onMessage = rpc.recv.bind(rpc)

    rpc.register(0, {
      request: ce.none,
      response: ce.string,
      onrequest: createRoom
    })

    this._onClientMessage = rpc.register(1, {
      request: ce.string,
      response: ce.none
    })
  }

  async onClientMessage (msg) {
    return await this._onClientMessage.request(msg)
  }
}
