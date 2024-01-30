import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_log_empresa_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('empresa')
      table.string('vigilado')
      table.string('accion')
      table.string('tabla') 
      table.date('fecha_inicial_anterior')
      table.date('fecha_inicial_nueva')
      table.date('fecha_final_anterior')
      table.date('fecha_final_nueva')
      table.boolean('estado_anterior')
      table.boolean('estado_nuevo')
      table.timestamp('created_at', { useTz: true }).defaultTo( this.now() )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
