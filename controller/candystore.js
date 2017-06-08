/* eslint semi: ["error", "never"] */
const uuidV4 = require('uuid/v4')
const store = []
const storeInfo = [
  { id: 1, name: 'Chewing Gum', color: 'Red' },
  { id: 2, name: 'Pez', color: 'Green' },
  { id: 3, name: 'Marshmallow', color: 'Pink' },
  { id: 4, name: 'Cola', color: 'Brown' }
]

// Helper functions
const getID = (id) => {
  const candy = store.filter((candy) => {
    let getCandy
    if (candy.id === parseInt(id, 10)) {
      getCandy = candy
    }
    return getCandy
  })
  return candy
}

// Generate seed candies
const init = (storeInfo) => {
  storeInfo.forEach((candy) => {
    candy.id = uuidV4()
    store.push(candy)
  })
}

// Init store
init(storeInfo)

// routes
exports.list = () => store

// create candy
exports.create = (candy) => {
  candy.id = uuidV4()
  store.push(candy)
  return candy
}

// get candy
exports.get = (id) => {
  const candy = getID(id)
  return candy
}

// update candy
exports.update = (newCandy) => {
  store.forEach((candy, index) => {
    if (candy.id === newCandy.id) {
      store[index] = newCandy
    }
  })
  return newCandy
}

// delete candy
exports.delete = (id) => {
  let deleted = false
  store.forEach((candy, index) => {
    if (candy.id === parseInt(id, 10)) {
      store.splice(index, 1)
      deleted = true
    }
  })
  return deleted
}
