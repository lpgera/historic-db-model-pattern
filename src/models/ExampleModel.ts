import BaseModel from './BaseModel'

export default class ExampleModel extends BaseModel {
  static tableName = 'example'

  firstProperty: string
  secondProperty: number
}
