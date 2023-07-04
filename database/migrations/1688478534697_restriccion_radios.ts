import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_restriccion_radios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('trr_modalidad_id').references('id_mod').inTable('tb_modalidades')
      table.integer('trr_radio_id').references('id_radio').inTable('tb_radio_accion')

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
