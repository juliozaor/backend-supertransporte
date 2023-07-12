import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_formularios_indicadores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('fmi_id')
      table.string('fri_nombre', 150)
      table.boolean('fri_estado').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
