import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_clasificaciones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cla_id')
      table.string('cla_nombre', 100)
      table.string('cla_descripcion', 200)
      table.integer('cla_pasos')
      table.boolean('cla_clasificado').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
