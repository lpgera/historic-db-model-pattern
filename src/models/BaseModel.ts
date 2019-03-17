import { v4 as uuid } from 'uuid'
import { Model } from 'objection'

export default class BaseModel extends Model {
  id: string
  createdAt: Date
  updatedAt: Date

  $beforeInsert() {
    const now = new Date()
    this.id = this.id || uuid()
    this.createdAt = this.createdAt || now
    this.updatedAt = this.updatedAt || now
  }

  async $beforeUpdate(opt, context) {
    this.updatedAt = new Date()
  }
}
