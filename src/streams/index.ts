/*
 * IO events entry file
 * TODO: Separete the logic into each individual files?
 * https://medium.com/@ericfossas/mongo-change-streams-and-socketio-web-sockets-b276e27c10f
 * https://gist.github.com/riodw/74a839ab6964bceda8ff799d3ad33442
 */
import Movement from 'models/movement.model'

const listenOnMovementChange = (io: any) => {
  console.log('DEBUG1')
  const changeStream = Movement.watch()

  changeStream.on('change', (change) => {
    console.log('==== movement collection has changed ====')
    console.log(change)
    // io.emit('movement')
  })
}

export { listenOnMovementChange }
