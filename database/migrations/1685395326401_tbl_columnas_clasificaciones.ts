import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_columnas_clasificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('col_id').primary()
      table.string('col_nombre', 100).notNullable()
      table.integer('col_orden')
      table.boolean('col_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
