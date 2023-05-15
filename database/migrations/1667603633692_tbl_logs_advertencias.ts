import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_logs_advertencias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('adv_id').unique()
      table.json('adv_json_advertencia')
      table.boolean('adv_almacenado')
      table.uuid('adv_carga_datos_id').references('car_id').inTable('tbl_carga_datos')
      table.boolean('adv_estado').defaultTo(true)
      table.timestamp('adv_creacion', { useTz: true })
      table.timestamp('adv_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
