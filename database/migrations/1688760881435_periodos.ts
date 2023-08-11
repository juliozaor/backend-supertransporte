import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_periodos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('per_id')
      table.string('per_nombre', 150)
      table.string('per_tipo').comment('modeda, entero, porcentaje, real')
      table.integer('per_decimal')
      table.boolean('per_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
