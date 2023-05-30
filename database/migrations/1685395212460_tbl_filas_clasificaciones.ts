import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_filas_clasificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('tfc_id').primary()
      table.string('tfc_nombre', 100).notNullable()
      table.integer('tfc_orden')
      table.boolean('tfc_estado').defaultTo(true)
      table.integer('tfc_categoria_clasificacion_id').references('tcc_id').inTable('tbl_categorias_clasificaciones')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
