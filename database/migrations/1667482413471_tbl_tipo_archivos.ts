import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipo_archivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tif_id')
      table.string('tif_nombre',200)
      table.string('tif_valor',200)
      table.boolean('tif_estado').defaultTo(true)
      table.timestamp('tif_created_at', { useTz: true })
      table.timestamp('tif_updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          tif_id:1,
          tif_nombre:'Certificacion',
          tif_valor:'WebApiCertificacionFia'
        },{
          tif_id:2,
          tif_nombre:'Reclamacion',
          tif_valor:'WebApiReclamacionesFia'
        }
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
  
}
