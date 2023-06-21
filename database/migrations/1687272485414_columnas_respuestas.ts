import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'respuestas'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('observacion')
      table.integer('cumple')
      table.string('observacion_cumple')
      table.integer('corresponde')
      table.string('observacion_corresponde')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('observacion')
      table.dropColumn('cumple')
      table.dropColumn('observacion_cumple')
      table.dropColumn('corresponde')
      table.dropColumn('observacion_corresponde')
    })
  }
}
