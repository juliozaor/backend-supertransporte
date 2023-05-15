import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class extends BaseSchema {
  protected tableName = 'tbl_archivos_variables_transversales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('avt_id').unique()
      table.uuid('avt_archivo_id').references('arc_id').inTable('tbl_archivos')
      table.uuid('avt_empresa_id').references('vrt_id').inTable('tbl_variables_transversales')
      table.boolean('avt_estado').defaultTo(true)
      table.timestamp('avt_creacion', { useTz: true })
      table.timestamp('avt_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
