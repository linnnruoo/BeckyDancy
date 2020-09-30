/*
 * IO events entry file
 * TODO: Separete the logic into each individual files?
 * https://medium.com/@ericfossas/mongo-change-streams-and-socketio-web-sockets-b276e27c10f
 * https://gist.github.com/riodw/74a839ab6964bceda8ff799d3ad33442
 * https://medium.com/@mandalrajdeep/using-change-streams-in-mongodb-50ca3f44421a
 */
import { ChangeEvent } from 'mongodb'

import * as events from 'common/events'
import Movement, { IMovementSchema } from 'models/movement.model'
import PredictedMovement, {
  IPredictedMovementSchema,
} from 'models/predictedMovement.model'
import Sensor, { ISensorSchema } from 'models/sensor.model'

const filterInsertEvent = [{ $match: { operationType: 'insert' } }]

const onMovementChange = (io: SocketIO.Server) => {
  const changeStream = Movement.watch(filterInsertEvent)

  changeStream.on('change', (change: ChangeEvent<IMovementSchema>) => {
    if (change.operationType === 'insert') {
      const data = change.fullDocument
      io.emit(events.MOVEMENT_INSERTION_EVENT, data)
    }
  })
}

const onPredictedMovementChange = (io: SocketIO.Server) => {
  const changeStream = PredictedMovement.watch(filterInsertEvent)

  changeStream.on('change', (change: ChangeEvent<IPredictedMovementSchema>) => {
    if (change.operationType === 'insert') {
      const data = change.fullDocument
      io.emit(events.PREDICTED_MOVEMENT_INSERTION_EVENT, data)
    }
  })
}

const onSensorDataChange = (io: SocketIO.Server) => {
  const changeStream = Sensor.watch(filterInsertEvent)

  changeStream.on('change', (change: ChangeEvent<ISensorSchema>) => {
    if (change.operationType === 'insert') {
      const data = change.fullDocument
      io.emit(events.SENSOR_INSERTION_EVENT, data)
    }
  })
}

const onAllEventsChange = (io: SocketIO.Server) => {
  onMovementChange(io)
  onPredictedMovementChange(io)
  onSensorDataChange(io)
}

export { onAllEventsChange }
