import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('preguntas', (table) => {
      table.integer('tipo_pregunta_id')
    })
  }


}
