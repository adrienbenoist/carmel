const path = require('path')
const { fork } = require('child_process')
const { system } = require('../utils')

const eventHandler = (type, options) => (event, mainWindow, session, props) => {
  const runningCommand = session.runningCommand(type)

  if (runningCommand) {
    console.log(props.command.id, runningCommand.args.command.id)
    if ((options && options.once) || (props.command.id !== runningCommand.args.command.id)) {
      console.log(`Command [${type}] is already running. Stopping first ...`)
      runningCommand.exec.kill('SIGINT')
    } else {
      console.log(`Command [${type}] is already running. Refreshing ...`, props.command.id)

      runningCommand.exec.on('message', (data) => {
        event.sender.send(props.callId, data)
      })

      runningCommand.exec.send(Object.assign({}, { refresh: true }, system, props, { session: session.data }))

      return
    }
  }

  console.log(`Command [${type}]: Starting product ...`)

  const cwd = path.resolve(system.CARMEL_ROOT)
  process.chdir(cwd)

  const processFile = path.resolve(system.CARMEL_ROOT, 'desktop', 'commands', `${type}.js`)
  const p = fork(processFile, { cwd })

  p.on('message', (data) => {
    event.sender.send(props.callId, data)
  })

  p.send(Object.assign({}, { start: true }, system, props, { session: session.data }))
  return p
}

const publishProduct = eventHandler('publishProduct', { once: true })
const startProduct = eventHandler('startProduct')
const createProduct = require('./createProduct')(system)
const verifyTask = eventHandler('verifyTask', { once: true })

module.exports = {
  startProduct, publishProduct, createProduct, verifyTask
}
