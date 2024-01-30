import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ese_id')
      table.string('ese_nombre', 100)
      table.string('ese_descripcion')
      table.boolean('ese_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
