require('../../bare/runtime')

// forward bare's logs to console as early as possible
BareBindings.onLog = console.log

const WorkerRpcHandler = require('../rpc/worker-handler.js')
const rpcHandler = new WorkerRpcHandler({ createRoom })

async function createRoom () {
  console.log('[worker.js] reverse()')
  return 'hello'
}

// repeatedly send "client" messages
let count = 0
setInterval(async () => {
  await rpcHandler.onClientMessage(`hello from worker.js id=${count++}`)
}, 10000)

// keep the event loop alive
setInterval(() => { }, 2000)

// tell app we're ready
BareBindings.onReady()
