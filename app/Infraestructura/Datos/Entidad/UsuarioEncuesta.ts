
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { UsuarioEncuesta } from 'App/Dominio/Datos/Entidades/UsuarioEncuesta';
export default class TblUsuarioEncuesta extends BaseModel {
  public static table = 'tbl_usuarios_encuestas';
  @column({ isPrimary: true, columnName: 'use_id' })
  public id?: number

  @column({ columnName: 'use_nitVigilado' }) public nitVigilado: string;
  @column({ columnName: 'use_idEncuesta' }) public encuestaId: number;
  @column({ columnName: 'use_estado_vigilado_id' }) public estadoVigiladoId: number;
  @column({ columnName: 'use_st_errores' }) public stErrores?: boolean;
  @column({ columnName: 'use_creacion' }) public creacion: DateTime;


  public establecerUsuarioEncuestaDb(usuarioEncuesta: UsuarioEncuesta) {
    this.id = usuarioEncuesta.id
    this.nitVigilado = usuarioEncuesta.nitVigilado
    this.encuestaId = usuarioEncuesta.encuestaId
    this.estadoVigiladoId = usuarioEncuesta.estadoVigiladoId
    this.stErrores = usuarioEncuesta.stErrores
  }

  public estableceUsuarioEncuestaConId(usuarioEncuesta: UsuarioEncuesta) {
    this.nitVigilado = usuarioEncuesta.nitVigilado
    this.encuestaId = usuarioEncuesta.encuestaId
    this.estadoVigiladoId = usuarioEncuesta.estadoVigiladoId
    this.stErrores = usuarioEncuesta.stErrores
  }

  public obtenerUsuarioEncuesta(): UsuarioEncuesta {
    const usuarioEncuesta = new UsuarioEncuesta()
    usuarioEncuesta.id = this.id
    usuarioEncuesta.nitVigilado = this.nitVigilado
    usuarioEncuesta.encuestaId = this.encuestaId
    usuarioEncuesta.estadoVigiladoId = this.estadoVigiladoId
    usuarioEncuesta.stErrores = this.stErrores
    return usuarioEncuesta
  }


}
