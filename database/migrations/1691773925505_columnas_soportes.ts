import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'soporte'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('error_acceso', 20)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('error_acceso')
    })
  }
}
