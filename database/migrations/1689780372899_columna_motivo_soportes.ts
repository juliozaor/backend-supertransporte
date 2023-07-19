import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'soporte'

  public async up () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.integer('motivo').unsigned()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn('motivo')
    })
  }
}
