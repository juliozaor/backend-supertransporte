import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('esv_id')
      table.string('esv_nombre', 100)
      table.string('esv_descripcion')
      table.boolean('esv_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
