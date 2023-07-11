import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_anio_vigencias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('anv_id')
      table.integer('anv_anio')
      table.boolean('anv_estado').defaultTo(true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
