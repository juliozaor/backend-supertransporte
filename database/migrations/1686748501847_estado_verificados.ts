import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_verificado'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('esd_id')
      table.string('esd_nombre', 200)
       table.boolean('esd_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
