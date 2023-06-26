import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_reporte_estado_verificados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('rev_id')
      table.integer('rev_reporte_id')
      table.integer('rev_estado_verificado_id')      
      table.string('rev_vigilado')      
      table.string('rev_verificador')      
      table.timestamp('rev_creacion', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
