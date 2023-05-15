import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_archivos_empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('are_id').unique()
      table.uuid('are_archivo_id').references('arc_id').inTable('tbl_archivos')
      table.uuid('are_empresa_id').references('emp_id').inTable('tbl_empresas')
      table.string('are_tipo',100)
      table.boolean('are_estado').defaultTo(true)
      table.timestamp('are_creacion', { useTz: true })
      table.timestamp('are_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
