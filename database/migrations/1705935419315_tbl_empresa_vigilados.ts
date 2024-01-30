import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_empresa_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tev_id')
      table.string('tev_empresa')
      table.string('tev_vigilado')
      table.uuid('tev_token')
      table.boolean('tev_estado').defaultTo(true)
      table.date('tev_fecha_inicial').comment('fecha inicial del contrato')
      table.date('tev_fecha_final').comment('fecha final del contrato')
      table.timestamp('tev_created_at', { useTz: true }).defaultTo( this.now() )
      table.timestamp('tev_updated_at', { useTz: true }).defaultTo( this.now() )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
