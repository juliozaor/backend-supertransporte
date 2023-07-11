import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_indicadores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dai_id')
      table.string('dai_nombre', 150)
      table.integer('sub_tipo_id')
      table.integer('dai_formulario_id').references('fmi_id').inTable('tbl_formularios_indicadores')
      table.boolean('dai_estado').defaultTo(true)
      table.integer('dai_sub_indicador_id').references('sub_id').inTable('tbl_sub_indicadores')
      table.integer('dai_orden')
      table.integer('dai_visible')
      table.string('dai_unidad_medida', 150)
       })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
