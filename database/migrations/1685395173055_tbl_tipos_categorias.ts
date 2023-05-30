import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipos_categorias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('ttc_id').primary()
      table.string('ttc_nombre', 100).notNullable()
      table.integer('ttc_orden')
      table.boolean('ttc_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
