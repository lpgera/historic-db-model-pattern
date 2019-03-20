import Knex from 'knex'
import knexfile from '../knexfile'
import { Model } from 'objection'
import ExampleModel from './models/ExampleModel'
import ExampleHistoricModel from './models/ExampleHistoricModel'
import { v4 as uuid } from 'uuid'

;(async () => {
  const knex = Knex(knexfile)
  await knex.migrate.latest()
  Model.knex(knex)

  await ExampleModel.query().delete()
  await ExampleHistoricModel.query().delete()

  console.log(await ExampleModel.query())

  const eid = uuid()

  const e = await ExampleModel.query().insert({
    id: eid,
    firstProperty: 'asdf',
    secondProperty: 1,
  })

  console.log(await ExampleModel.query())

  await e.$query().update({
    secondProperty: 2,
  })

  console.log(await ExampleModel.query())

  await ExampleModel.query()
    .update({
      secondProperty: 3,
    })
    .where({
      id: eid,
    })

  console.log(await ExampleModel.query())

  console.log(await ExampleHistoricModel.query())

  const ehid = uuid()

  await ExampleHistoricModel.query().insert({
    id: ehid,
    firstProperty: 'asdf',
    secondProperty: 1,
  })

  console.log(await ExampleHistoricModel.query())

  await ExampleHistoricModel.historicUpdate<ExampleHistoricModel>(ehid, {
    secondProperty: 2,
  })

  console.log(await ExampleHistoricModel.query())

  await ExampleHistoricModel.historicUpdate<ExampleHistoricModel>(ehid, {
    secondProperty: 3,
  })

  console.log(await ExampleHistoricModel.query())

  await ExampleHistoricModel.query()
    .update({
      secondProperty: 4,
    })
    .where({
      id: ehid,
    })

  await knex.destroy()
})()
