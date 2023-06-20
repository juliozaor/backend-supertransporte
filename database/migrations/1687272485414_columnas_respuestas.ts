import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'respuestas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('observacion')
  })
}

public async down () {
  this.schema.alterTable(this.tableName, (table) => {
    table.dropColumn('observacion')
})
}
}
