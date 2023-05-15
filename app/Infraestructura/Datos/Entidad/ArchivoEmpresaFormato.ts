/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm';
import { ArchivoEmpresaFormato } from 'App/Dominio/Datos/Entidades/ArchivoEmpresaFormato';
import TblArchivosEmpresas from './ArchivoEmpresa';
import TblFormatoArchivo from './FormatoArchivo';

export default class TblArchivoEmpresaFormatos extends BaseModel {
  @column({ isPrimary: true, columnName: 'arf_id' })
  public id: string

  @column({ columnName: 'arf_archivo_empresa_id' }) public idArchivoEmpresa: string
  @column({ columnName: 'arf_formato_id' }) public idFormato: string

  @column({ columnName: 'arf_estado' }) public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'arf_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'arf_actualizacion' }) public updatedAt: DateTime

  public establecerArchivoEmpresaFormatoDb (archivoEmpresaFormato: ArchivoEmpresaFormato) {
    this.id = archivoEmpresaFormato.id
    this.idArchivoEmpresa = archivoEmpresaFormato.idArchivoEmpresa
    this.idFormato = archivoEmpresaFormato.idFormato
    this.estado = archivoEmpresaFormato.estado
  }

  public establecerArchivoEmpresaFormatoConId (archivoEmpresaFormato: ArchivoEmpresaFormato) {
    this.idArchivoEmpresa = archivoEmpresaFormato.idArchivoEmpresa
    this.idFormato = archivoEmpresaFormato.idFormato
    this.estado = archivoEmpresaFormato.estado
  }

  public obtenerArchivoEmpresaFormato (): ArchivoEmpresaFormato {
    const archivoEmpresaFormato = new ArchivoEmpresaFormato()
    archivoEmpresaFormato.id = this.id
    archivoEmpresaFormato.idFormato = this.idFormato
    archivoEmpresaFormato.idArchivoEmpresa = this.idArchivoEmpresa
    archivoEmpresaFormato.estado = this.estado

    return archivoEmpresaFormato
  }

  @hasMany(() => TblArchivosEmpresas, {
    localKey: 'id',
    foreignKey: 'idArchivoEmpresa',
  })
  public archivosEmpresa: HasMany<typeof TblArchivosEmpresas>

  @hasMany(() => TblFormatoArchivo, {
    localKey: 'id',
    foreignKey: 'idFormato',
  })
  public formato: HasMany<typeof TblFormatoArchivo>
}
