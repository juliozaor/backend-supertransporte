import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_evidencias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('evi_id')
      table.text('evi_nombre')
      table.integer('evi_formulario_id').references('fmi_id').inTable('tbl_formularios_indicadores')
      table.integer('evi_periodo_id').references('per_id').inTable('tbl_periodos').comment('Unidad de medida')
      table.integer('evi_sub_tipo_id').references('sds_id').inTable('tbl_sub_tipo_datos')
      table.float('evi_tamanio')
      table.integer('evi_orden')
      table.boolean('evi_estado').defaultTo(true)
      table.boolean('evi_obligatorio').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
