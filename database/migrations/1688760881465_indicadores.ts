import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_indicadores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ind_id')
      table.string('ind_nombre', 150)
      table.text('ind_descripcion')
      table.string('ind_codigo', 5)
      table.boolean('ind_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
