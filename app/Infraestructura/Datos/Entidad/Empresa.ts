/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm';
import { Empresa } from '../../../Dominio/Datos/Entidades/Empresa';
import TblUsuariosEmpresas from './UsuarioEmpresa';
export default class TblEmpresas extends BaseModel {
  @column({ isPrimary: true, columnName: 'emp_id' })
  public id: string

  @column({ columnName: 'emp_nombre' }) public nombre: string

  @column({ columnName: 'emp_nit' }) public nit: string

  @column({ columnName: 'emp_logo' }) public logo: string

  @column({columnName: 'emp_estado'}) public estado: boolean

  @column({columnName: 'emp_convenio'}) public convenio: number

  @column.dateTime({ autoCreate: true , columnName: 'emp_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'emp_actualizacion' }) public updatedAt: DateTime

  public establecerEmpresaDb (empresa: Empresa) {
    this.id = empresa.id
    this.nombre = empresa.nombre
    this.nit = empresa.nit
    this.logo = empresa.logo
    this.convenio = empresa.convenio??1
    this.estado = empresa.estado
  }

  public establecerEmpresaConId (empresa: Empresa) {
    this.nombre = empresa.nombre
    this.nit = empresa.nit
    this.convenio = empresa.convenio??1
    this.logo = empresa.logo
    this.estado = empresa.estado
  }

  public obtenerEmpresa (): Empresa {
    const empresa = new Empresa()
    empresa.id = this.id
    empresa.nombre = this.nombre
    empresa.nit = this.nit
    empresa.logo = this.logo
    empresa.estado = this.estado
    this.convenio = empresa.convenio
    return empresa
  }

  //hasMany

  @hasMany(() => TblUsuariosEmpresas)
  public UsuarioEmpresa: HasMany<typeof TblUsuariosEmpresas>
}
