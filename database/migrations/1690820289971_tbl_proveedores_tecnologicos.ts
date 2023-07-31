import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_proveedores_tecnologicos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('razon_social_ot').comment('operador tecnologico')
      table.string('nit_ot', 20)
      table.string('siglas_ot')
      table.integer('dv_ot', 2)
      table.string('estado_matricula_ot')
      table.string('correo_notificacion_ot')
      table.string('direccion_ot')

      table.string('nombres_rl').comment('rl = representante legal')
      table.string('apellidos_rl')
      table.string('tipo_identificacion_rl')
      table.string('identificacion_rl', 20)
      table.string('numero_contacto_rl')
      table.string('correo_electronico_rl')
      table.string('direccion_rl')

      table.string('nombres_ct').comment('ct = contacto tecnico')
      table.string('apellidos_ct')
      table.string('tipo_identificacion_ct')
      table.string('identificacion_ct', 20)
      table.string('numero_celular_ct')
      table.string('correo_electronico_ct')
      table.string('direccion_ct')

      table.string('ruta_cc').comment('cc = camara de comercio')
      table.string('nombre_original_cc')
      table.string('nombre_cc')

      table.string('ruta_cr').comment('cr = certificado rl')
      table.string('nombre_original_cr')
      table.string('nombre_cr')

    
      table.timestamp('creado', { useTz: true }).defaultTo( this.now() )
      table.timestamp('actualizado', { useTz: true }).defaultTo( this.now() )
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
