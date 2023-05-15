import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblMaestras extends BaseSchema {
  protected tableName = 'tbl_maestras'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('mae_id').unique()
      table.string('mae_descripcion',200).notNullable()
      table.boolean('mae_tipo_maestra').defaultTo(true).comment('1.sencilla, 2.completa(con codigo)')
      table.boolean('mae_estado').defaultTo(true)
      table.timestamp('mae_creacion', { useTz: true })
      table.timestamp('mae_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
