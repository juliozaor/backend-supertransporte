import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_filas_columnas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cls_id')
      table.integer('cls_fila_clasificacion_id').references('tfc_id').inTable('tbl_filas_clasificaciones')
      table.integer('cls_columna_clasificacion_id').references('col_id').inTable('tbl_columnas_clasificaciones')
      table.boolean('cls_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
