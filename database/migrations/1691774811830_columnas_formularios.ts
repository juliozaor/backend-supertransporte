import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_formularios_indicadores'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('fri_mensaje')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fri_mensaje')
    })
  }
}
