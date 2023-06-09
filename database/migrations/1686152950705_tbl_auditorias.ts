import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_auditorias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('aud_id')
      table.string('aud_accion', 100).comment('actualizar, eliminar')
      table.string('aud_modulo').comment(' respuestas, caracterizacion')
      table.json('aud_json_anterior')
      table.json('aud_json_nuevo')
      table.string('aud_usuario')
      table.string('aud_vigilado')
      table.string('aud_descripcion')
      table.string('aud_encuesta_id')
      table.string('aud_tipo_log')
      table.timestamp('aud_fecha_creacion', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
