import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_log_empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tle_id')
      table.string('tle_empresa')
      table.string('tle_vigilado')
      table.integer('tle_estado')
      table.integer('tle_estado')
      table.timestamp('tle_enviost')
      table.timestamp('tle_created_at', { useTz: true }).defaultTo( this.now() )
      table.timestamp('tle_updated_at', { useTz: true }).defaultTo( this.now() )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
