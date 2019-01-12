const commands = require('./commands')
const _name = 'carmelstudio'
const Session = require('./session')
const chokidar = require('chokidar')
const { downloadArchive } = require('./utils')
const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')

const session = new Session()

const saveCache = (key, data, options) => {
  if (!options) {
    console.log(`[${_name}] cache ${key}=${data}`)
    session.sessionVault.write(key, data)
    return
  }

  if (options && options.push) {
    const old = session.sessionVault.read(key) || []
    console.log(old)
    console.log(data)
    if (old && Array.isArray(old) && !old.includes(data)) {
      console.log(`[${_name}] cache ${key}=${data} push`)
      session.sessionVault.write(key, old.concat(data))
      return
    }
  }
}

const registerCommands = (ipcMain, data, mainWindow) => {
  if (!ipcMain) {
    return
  }

  Object.keys(commands).forEach(command => {
    console.log(`[${_name}] registered ${command} command`)
    ipcMain.on(command, (event, args) => {
      const exec = commands[command](event, mainWindow, session, args)
      if (exec) {
        session.registerCommand({ command, exec, args })
        saveCache('runningCommands', [command], { push: true })
      }
    })
  })

  ipcMain.on('sessionCache', (e, { key, data, options }) => {
    saveCache(key, data, options)
  })
}

const start = ({ ipcMain, mainWindow }) => {
  return new Promise((resolve, reject) => {
    console.log(`[${_name}] starting ... `)

    return session.start({ ipcMain, mainWindow })
            .then((data) => {
              registerCommands(ipcMain, data, mainWindow)
              console.log(`[${_name}] started successfully`)
              resolve(data)
            })
            .catch((error) => {
              console.log(error)
              console.log(`[${_name}] could not start`)
              reject(error)
            })
  })
}

const stop = () => {
  return new Promise((resolve, reject) => {
    console.log(`[${_name}] stopping ... `)

    session.commandHistory.forEach(cmd => {
      if (cmd.exec) {
        console.log(`[${_name}] stopping ${cmd.command} command ...`)
        cmd.exec.kill('SIGINT')
      }
    })

    return session.stop()
            .then((data) => {
              console.log(`[${_name}] stopped successfully`)
              saveCache('runningCommands', '')
              resolve(data)
            })
            .catch((error) => {
              console.log(`[${_name}] could not stop`)
              reject(error)
            })
  })
}

module.exports = { start, stop }
