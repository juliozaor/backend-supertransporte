import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblEmpresas extends BaseSchema {
  protected tableName = 'tbl_empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('emp_id').unique()
      table.string('emp_nombre',200).notNullable()
      table.string('emp_nit')
      table.string('emp_logo')
      table.boolean('emp_estado').defaultTo(true)
      table.integer('emp_convenio')
      table.timestamp('emp_creacion', { useTz: true }).defaultTo(this.now())
      table.timestamp('emp_actualizacion', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
