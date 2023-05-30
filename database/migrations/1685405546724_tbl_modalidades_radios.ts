import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_modalidades_radios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tmr_id')
      table.float('tmr_modalidad_id')
      table.float('tmr_radio_id')
      table.uuid('tmr_usuario_id')
      table.timestamp('tmr_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('tmr_actualizado', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
