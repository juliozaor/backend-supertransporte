import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_detalle_datos_evidencias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dde_id')
      table.integer('dde_dato_evidencia_id').references('dae_id').inTable('tbl_datos_evidencias')
      table.integer('dde_anio_activo_id')
      table.float('dde_reporte_id')
      table.boolean('dde_estado').defaultTo(true)
      table.string('dde_documento')
      table.string('dde_ruta')
      table.string('dde_nombredoc_original')
      table.string('dde_valor')
      table.dateTime('dde_fecha_actualizacion')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
