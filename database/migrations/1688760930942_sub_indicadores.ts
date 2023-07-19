import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_sub_indicadores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sub_id')
      table.string('sub_nombre', 150)
      table.string('sub_codigo', 5)
      table.integer('sub_orden')
      table.integer('sub_indicador_id').references('ind_id').inTable('tbl_indicadores')
      table.integer('sub_formulario_id').references('fmi_id').inTable('tbl_formularios_indicadores')
      table.integer('sub_periodo_id').references('per_id').inTable('tbl_periodos').comment('Unidad de medida')
      table.boolean('sub_estado').defaultTo(true)
      table.boolean('sub_obligatorio').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
