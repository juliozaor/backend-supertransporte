import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'soporte'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('identificador_documento').comment('Nombre que tendra en el sistema de ficheros');
      table.string('identificador_doc_respuesta').comment('Nombre que tendra el documento de respuesta en el sistema de ficheros');
      table.boolean('problema_acceso').defaultTo(false).comment('Define si el soporte es por problemas de acceso');
      table.integer('motivo').unsigned();

      
  })
}

public async down () {
  this.schema.alterTable(this.tableName, (table) => {
    table.dropColumn('identificador_documento');
    table.dropColumn('identificador_doc_respuesta');
    table.dropColumn('problema_acceso');
    table.dropColumn('motivo');
})
}


}
