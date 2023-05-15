/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm';
import { Maestra } from 'App/Dominio/Datos/Entidades/Maestra';
import TblVariablesEspecificas from './VariableEspecifica';
import TblVariablesTransversales from './VariableTransversal';

export default class TblMaestras extends BaseModel {
  @column({ isPrimary: true, columnName: 'mae_id' })
  public id: string

  @column({ columnName: 'mae_descripcion' }) public descripcion: string

  @column({columnName: 'mae_tipo_maestra'}) public tipo: boolean

  @column({columnName: 'mae_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'mae_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'mae_actualizacion' }) public updatedAt: DateTime

  public establecerMaestraDb (maestra: Maestra) {
    this.id = maestra.id
    this.descripcion = maestra.descripcion
    this.tipo = maestra.tipo
    this.estado = maestra.estado
  }

  public establecerMaestraConId (maestra: Maestra) {
    this.descripcion = maestra.descripcion
    this.tipo = maestra.tipo
    this.estado = maestra.estado
  }

  public obtenerMaestra (): Maestra {
    const maestra = new Maestra()
    maestra.id = this.id
    maestra.descripcion = this.descripcion
    maestra.tipo = this.tipo
    maestra.estado = this.estado

    return maestra
  }

  @hasOne(() => TblVariablesEspecificas)
  public variableEspecifica: HasOne<typeof TblVariablesEspecificas>

  @hasOne(() => TblVariablesTransversales)
  public variableTransversal: HasOne<typeof TblVariablesTransversales>
}
