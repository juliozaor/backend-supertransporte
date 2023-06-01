import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_detalle_clasificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tdc_id')
      table.string('tdc_valor',200)
      table.integer('tdc_fila_columna_id').references('cls_id').inTable('tbl_filas_columnas')
      table.uuid('tdc_usuario_id').references('usn_id').inTable('tbl_usuarios')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
