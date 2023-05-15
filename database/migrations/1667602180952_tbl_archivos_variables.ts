import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_archivos_variables'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('arv_id').unique()
      table.uuid('arv_variable_id')
      table.uuid('arv_archivo_empresa_formato_id').references('arf_id').inTable('tbl_archivo_empresa_formatos')
      table.integer('arv_posicion')
      table.string('arv_tipo',100).comment('especifica - transversal')
      table.boolean('arv_estado').defaultTo(true)
      table.timestamp('arv_creacion', { useTz: true })
      table.timestamp('arv_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
