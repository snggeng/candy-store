/* eslint semi: ["error", "never"], undef: ["error"] */
const uuidV4 = require('uuid/v4')

const storeDefault = [
  { id: '1', name: 'Chewing Gum', color: 'Red', price: 12 },
  { id: '2', name: 'Pez', color: 'Green', price: 10 },
  { id: 3, name: 'Marshmallow', color: 'Pink', price: 8 },
  { id: 4, name: 'Candy Stick', color: 'Blue', price: 6 }
]

const store = []

const init = () => {
  storeDefault.forEach((candy) => {
    candy.id = uuidV4()
    store.push(candy)
  })
}
init()

/*
 *  Return all the candy
 */
exports.list = () => store

/*
 *  Create candy ( Crud )
 */
exports.create = (candy) => {
  candy.id = uuidV4()
  store.push(candy)
  return candy
}

/*
 *  Get candy ( cRud )
 */
exports.get = (id) => {
  const candy = store.filter(candy => candy.id === id)

  // Check function for more than 1 candy with the same id
  // Write the error to the log

  return candy[0] // What bug could be here ?
}

/*
 *  Update candy ( crUd )
 */
exports.update = (newCandy) => {
  store.forEach((candy, index) => {
    if (candy.id === newCandy.id) {
      store[index] = newCandy
    }
  })

  return newCandy
}

/*
 *  Delete candy ( cruD )
 */
exports.delete = (id) => {
  let deleted = false

  store.forEach((candy, index) => {
    if (candy.id === id) {
      store.splice(index, 1)
      deleted = true
    }
  })

  return deleted
}
