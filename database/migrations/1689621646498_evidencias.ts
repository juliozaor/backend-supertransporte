import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_evidencias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('evi_id')
      table.string('evi_nombre')
      table.integer('evi_formulario_id').references('fmi_id').inTable('tbl_formularios_indicadores')
      table.integer('evi_periodo_id').references('per_id').inTable('tbl_periodos').comment('Unidad de medida')
      table.integer('evi_orden')
      table.boolean('evi_estado')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
