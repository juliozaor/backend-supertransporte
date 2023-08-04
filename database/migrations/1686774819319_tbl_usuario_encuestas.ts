import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_usuarios_encuestas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('use_id')
      table.string('use_nitVigilado',200)
      table.float('use_idEncuesta')
      table.integer('use_estado_vigilado_id')  
      table.boolean('use_st_errores').comment('Solo para el estado envio st')  
      table.timestamp('use_creacion', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
