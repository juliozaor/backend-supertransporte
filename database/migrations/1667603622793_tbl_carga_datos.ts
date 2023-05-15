import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_carga_datos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('car_id').unique()
      table.string('car_nombre', 200)
      table.timestamp('car_fecha_inicial')
      table.timestamp('car_fecha_final')
      table.string('car_usuario_id')
      table.integer('car_registros_encontrados')
      table.integer('car_estado_proceso_id').references('esc_id').inTable('tbl_estado_cargas')
      table.uuid('car_archivo_id').references('arc_id').inTable('tbl_archivos')
      table.integer('car_registros_fallidos')
      table.integer('car_registros_insertados')
      table.boolean('car_estado').defaultTo(true)
      table.timestamp('car_creacion', { useTz: true })
      table.timestamp('car_actualizacion', { useTz: true })
      table.string('car_empresa_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
