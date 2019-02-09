// const { Wit, log } = require('node-wit')

const emotions = require('./chunky.emotions')

const emotion = (type) => {
  if (!emotions || !emotions[type]) {
    return ``
  }

  return emotions[type][Math.floor(Math.random() * Math.floor(emotions[type].length - 1))]
}

const message = (registered, args) => {
  return [`Hello right back at ya :) Ready to take on the world? :)`, emotion('happy')]
}

module.exports = ({ args, journey, timestamp, config }) => {
  // const wit = new Wit({
  //   accessToken: config.settings.wit.accessToken,
  //   logger: new log.Logger(log.DEBUG)
  // })

  var update = Object.assign({}, journey)
  var response = { message: "ok" }

  update.setup = false
  update.machines = update.machines || {}
  response.message = message(update.machines[args.machineId], args, )
  update.machines[args.machineId] = Object.assign({}, args, { timestamp })

  return { update, response }
}
