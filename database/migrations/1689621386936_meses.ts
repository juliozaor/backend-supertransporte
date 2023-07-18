import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_meses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mes_id')
      table.string('mes_nombre')
      table.boolean('mes_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
