import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_motivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
table.string('mov_descripcion')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
