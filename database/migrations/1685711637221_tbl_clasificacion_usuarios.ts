import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_clasificacion_usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('clu_id')
      table.uuid('clu_usuario_id').references('usn_id').inTable('tbl_usuarios')
      table.integer('clu_clasificacion_id').references('cla_id').inTable('tbl_clasificaciones')
      table.integer('clu_vehiculos')
      table.integer('clu_conductores')
      table.boolean('estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
