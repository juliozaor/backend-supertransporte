import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_categorias_clasificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('tcc_id').primary()
      table.string('tcc_nombre', 100).notNullable()
      table.integer('tcc_orden')
      table.boolean('tcc_estado').defaultTo(true)
      table.integer('tcc_tipo_categoria_id').references('ttc_id').inTable('tbl_tipos_categorias')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
