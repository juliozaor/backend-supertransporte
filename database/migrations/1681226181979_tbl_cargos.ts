import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_cargos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('car_id')
      table.string('car_nombre', 100)
      table.boolean('car_estado').defaultTo(true)
      table.timestamp('car_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('car_actializado', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
