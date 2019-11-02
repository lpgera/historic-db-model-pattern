import BaseModel from './BaseModel'
import * as objection from 'objection'

export default class HistoricDbModel extends BaseModel {
  validFrom!: Date
  obsolete!: boolean
  currentId!: string | null

  $beforeInsert() {
    super.$beforeInsert()
    this.validFrom = this.validFrom || this.createdAt
    this.obsolete = this.obsolete || false
  }

  async $beforeUpdate() {
    if (!this.createdAt || !this.updatedAt || !this.validFrom) {
      throw new Error(
        'Invalid update! Try using static historicUpdate method instead!'
      )
    }
  }

  static async historicUpdate<T extends typeof HistoricDbModel>(
    this: T,
    id: string,
    props: { [K in keyof InstanceType<T>]?: InstanceType<T>[K] }
  ) {
    const now = new Date()

    await objection.transaction(this, async thisInTransaction => {
      const old = await thisInTransaction.query().findById(id)

      if (!old) {
        throw new Error(`Could not find ${this.tableName} record with id=${id}`)
      }

      const obsoleteCopy = {
        ...old,
        id: undefined,
        obsolete: true,
        validFrom: old.updatedAt,
        createdAt: now,
        updatedAt: now,
        currentId: old.id,
      }
      const newProps = {
        ...props,
        createdAt: old.createdAt,
        updatedAt: now,
        validFrom: now,
      }

      await thisInTransaction.query().insert(obsoleteCopy)
      await thisInTransaction
        .query()
        .update(newProps)
        .where('id', id)
    })
  }
}
