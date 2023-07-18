import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipo_datos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tds_id')
      table.string('tds_nombre', 150)
      table.boolean('tds_estado')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
