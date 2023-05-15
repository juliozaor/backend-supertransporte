import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_logs_exitos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('exi_id').unique()
      table.json('exi_json_exito')
      table.uuid('exi_carga_datos_id').references('car_id').inTable('tbl_carga_datos')
      table.boolean('exi_estado').defaultTo(true)
      table.timestamp('exi_creacion', { useTz: true })
      table.timestamp('exi_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
