import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_detalle_datos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ddt_id')
      table.integer('ddt_dato_indicador_id').references('dai_id').inTable('tbl_datos_indicadores')
      table.float('ddt_valor')
      table.integer('ddt_anio_activo_id')
      table.float('ddt_reporte_id')
      table.boolean('ddt_estado').defaultTo(true)
      table.string('ddt_documento')
      table.string('ddt_ruta')
      table.string('ddt_nombredoc_original')
      table.string('ddt_observacion')
      table.dateTime('ddt_fecha_actualizacion')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
