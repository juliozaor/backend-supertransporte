import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_archivo_empresa_formatos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('arf_id').unique()
      table.uuid('arf_archivo_empresa_id').references('are_id').inTable('tbl_archivos_empresas')
      table.uuid('arf_formato_id').references('for_id').inTable('tbl_formato_archivos')
      table.boolean('arf_estado').defaultTo(true)
      table.timestamp('arf_creacion', { useTz: true })
      table.timestamp('arf_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
