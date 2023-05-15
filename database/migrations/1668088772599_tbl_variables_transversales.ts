/* eslint-disable max-len */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_variables_transversales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('vrt_id').unique()
      table.string('vrt_mombre',200)
      table.string('vrt_descripcion',255)
      table.uuid('vre_tipo_id').references('tiv_id').inTable('tbl_tipo_variables').comment('int, varchar, float, boolean')
      table.uuid('vrt_mascara_id').comment('Formato')
      table.integer('vrt_longitud')
      table.string('vrt_valor_inicial',100)
      table.string('vrt_valor_final',100)
      table.integer('vrt_decimales')
      table.boolean('vrt_maestra').defaultTo(false)
      table.uuid('vrt_maestra_id')
      table.boolean('vrt_estado').defaultTo(true)
      table.boolean('vrt_obligatoria').defaultTo(false)
      table.timestamp('vrt_creacion', { useTz: true })
      table.timestamp('vrt_actualizacion', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
