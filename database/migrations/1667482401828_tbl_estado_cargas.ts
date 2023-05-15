import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estado_cargas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('esc_id').unique()
      table.string('esc_nombre')
      table.boolean('esc_estado').defaultTo(true)
      table.timestamp('esc_creacion', { useTz: true })
      table.timestamp('esc_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
