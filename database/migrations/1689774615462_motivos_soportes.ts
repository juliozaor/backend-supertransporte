import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_motivos_soportes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mos_id').primary()
      table.string('mos_descripcion', 120)
      table.timestamp('mos_creado', { useTz: true }).defaultTo( this.now() )
      table.timestamp('mos_actualizado', { useTz: true }).defaultTo( this.now() )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
