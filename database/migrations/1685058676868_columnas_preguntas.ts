import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('preguntas', (table) => {
      table.integer('tipo_pregunta_id').defaultTo(1)
      table.boolean('adjuntable').defaultTo(true)
      table.boolean('adjuntable_obligatorio').defaultTo(true)
      table.boolean('obligatoria').defaultTo(true)
      table.integer('orden').defaultTo(1)
      table.float('tamanio').defaultTo(5)
    })
  }

  public async down () {
    this.schema.alterTable('preguntas', (table) => {
      table.dropColumn('tipo_pregunta_id')
      table.dropColumn('adjuntable')
      table.dropColumn('adjuntable_obligatorio')
      table.dropColumn('obligatoria')
      table.dropColumn('orden')
      table.dropColumn('tamanio')
  
  })
  }


}
