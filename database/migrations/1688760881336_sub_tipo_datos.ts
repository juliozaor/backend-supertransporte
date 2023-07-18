import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_sub_tipo_datos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sds_id')
      table.string('sds_nombre', 150)
      table.boolean('sds_estado')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
