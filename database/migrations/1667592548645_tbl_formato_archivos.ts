import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_formato_archivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('for_id').unique()
      table.string('for_formato',200).notNullable().comment('txt, csv, xml')
      table.boolean('for_estado').defaultTo(true)
      table.timestamp('for_creacion', { useTz: true })
      table.timestamp('for_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
