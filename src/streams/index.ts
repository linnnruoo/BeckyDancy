/*
 * IO events entry file
 * TODO: Separete the logic into each individual files?
 * https://medium.com/@ericfossas/mongo-change-streams-and-socketio-web-sockets-b276e27c10f
 * https://gist.github.com/riodw/74a839ab6964bceda8ff799d3ad33442
 */
import { ChangeEvent } from 'mongodb'
import Movement, { IMovementSchema } from 'models/movement.model'

const listenOnMovementChange = (io: SocketIO.Server) => {
  console.log('DEBUG1')
  const changeStream = Movement.watch()

  changeStream.on('change', (change: ChangeEvent<IMovementSchema>) => {
    console.log('==== movement collection has changed ====')
    if (change.operationType == 'insert') {
      const data = change.fullDocument
      io.emit('new movement received', data)
    }
  })
}

export { listenOnMovementChange }
