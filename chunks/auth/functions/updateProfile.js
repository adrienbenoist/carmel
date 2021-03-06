const chunky = require('react-cloud-chunky')

const filename = __filename
const auth = { limit: 1, private: true }

const getUser = (userId) => {
  return new Promise((resolve, reject) => chunky.firebase.operation('retrieve', { key: `users/${userId}` })
             .then((user) => ((!user || (Array.isArray(user) && user.length === 0)) ? resolve() : resolve(user)))
             .catch((error) => resolve()))
}

const getProfile = (userId) => {
  return new Promise((resolve, reject) => {
    return chunky.firebase.operation('retrieve', { key: `users-profiles/${userId}` })
          .then((profile) => chunky.firebase.operation('retrieve', { key: `profiles/${profile._id}` }))
          .then((profile) => ((!profile || (Array.isArray(profile) && profile.length === 0)) ? resolve() : resolve(profile)))
          .catch(() => resolve())
  })
}

const removeOldUsernamesIfAny = (userId) => {
  return chunky.firebase.operation('retrieve', { key: `users-usernames/${userId}` })
               .then((usernames) => {
                 if (!usernames) {
                   return
                 }
                 return chunky.firebase.operation('remove', { key: `users-usernames/${userId}/${usernames._id}` })
               })
}

const updateUsername = (username, userId) => {
  return removeOldUsernamesIfAny(userId)
         .then(() => chunky.firebase.operation('add', {
              node: 'usernames',
              id: username,
              userId,
              join: {
                users: {
                  id: userId
                }
              }
          }))
}

const updateUser = (data, userId) => {
  return getUser(userId).then((user) => {
    return Promise.all([chunky.firebase.operation('update', Object.assign({}, { key: `users/${userId}` }, data)),
                        data.username ? updateUsername(data.username, userId) : Promise.resolve()
                       ])
  })
}

const updateProfile = (data, userId) => {
  return getProfile(userId).then((profile) => {
    return chunky.firebase.operation('update', Object.assign({}, { key: `profiles/${profile._id}` }, data))
           .then(() => chunky.firebase.operation('update', { key: `users-profiles/${userId}/${profile._id}`, timestamp: `${Date.now()}` }))
  })
}

function executor ({ event, chunk, config, account }) {
  const data = Object.assign({}, event.body)

  if (data.userData) {
    delete data.userData
    return updateUser(data, account.user.uid)
  }

  return updateProfile(event.body, account.user.uid)
}

module.exports.main = chunky.handler({ executor, filename, auth })
