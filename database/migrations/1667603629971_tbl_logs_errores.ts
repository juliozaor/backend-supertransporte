import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_logs_errores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('err_id').unique()
      table.json('err_json_error')
      table.uuid('err_carga_datos_id').references('car_id').inTable('tbl_carga_datos')
      table.boolean('err_estado').defaultTo(true)
      table.string('err_tipo', 200).comment('por extension, por nombre')
      table.timestamp('err_creacion', { useTz: true })
      table.timestamp('err_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
