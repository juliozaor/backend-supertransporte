import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipo_variables'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('tiv_id').unique()
      table.string('tiv_nombre',200)
      table.boolean('tiv_estado').defaultTo(true)
      table.timestamp('tiv_creacion', { useTz: true })
      table.timestamp('tiv_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
