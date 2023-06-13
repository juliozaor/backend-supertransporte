import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_clasificacion_clasificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tcc_id')
      table.integer('tcc_clasificaciones_id').references('cla_id').inTable('tbl_clasificaciones')
      table.float('tcc_clasificacion_id').references('id_clasificacion').inTable('tb_clasificacion')
      table.boolean('tcc_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
