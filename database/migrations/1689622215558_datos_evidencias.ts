import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_datos_evidencias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dae_id')
      table.string('dae_nombre', 150)
      table.integer('dae_orden')
      table.boolean('dae_estado').defaultTo(true)
      table.integer('dae_evidencia_id').references('evi_id').inTable('tbl_evidencias')
      table.boolean('dae_visible').defaultTo(true).comment('Si es visible en 2023')
      table.string('dae_meses').comment('Arreglo de meses')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
