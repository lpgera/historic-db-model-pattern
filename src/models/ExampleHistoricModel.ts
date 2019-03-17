import HistoricDbModel from './HistoricDbModel'

export default class ExampleHistoricModel extends HistoricDbModel {
  static tableName = 'example_historic'

  firstProperty: string
  secondProperty: number
}
