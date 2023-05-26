import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipos_preguntas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('tpp_id').primary()
      table.string('tpp_nombre', 30)
      table.json('tpp_opciones')
      table.json('tpp_validaciones')
      table.boolean('tpp_estado')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
