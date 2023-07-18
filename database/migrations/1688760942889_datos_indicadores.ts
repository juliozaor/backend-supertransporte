import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_indicadores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dai_id')
      table.string('dai_nombre', 150)
      table.integer('dai_tipo_id')
      table.boolean('dai_estado').defaultTo(true)
      table.integer('dai_sub_indicador_id').references('sub_id').inTable('tbl_sub_indicadores')
      table.integer('dai_orden')
      table.boolean('dai_visible').defaultTo(true).comment('Si es visible en 2023')
      table.string('dai_meses').comment('Arreglo de meses')
       })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
