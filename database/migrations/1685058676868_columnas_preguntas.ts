import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('preguntas', (table) => {
      table.integer('tipo_pregunta_id').defaultTo(1)
      table.boolean('adjuntable').defaultTo(true)
      table.boolean('adjuntable_obligatorio').defaultTo(true)
      table.boolean('obligatoria').defaultTo(true)
      table.integer('orden').defaultTo(1)
    })
  }


}
