/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm';
import { Mascara } from 'App/Dominio/Datos/Entidades/Mascara';
import TblVariablesEspecificas from './VariableEspecifica';
import TblVariablesTransversales from './VariableTransversal';

export default class TblMascaras extends BaseModel {
  @column({ isPrimary: true, columnName: 'mas_id' })
  public id: string

  @column({ columnName: 'mas_valor' }) public valor: string

  @column({columnName: 'mas_estado'}) public estado: boolean

  @column.dateTime({ autoCreate: true , columnName: 'mas_creacion'}) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'mas_actualizacion' }) public updatedAt: DateTime

  public establecerMascaraDb (mascara: Mascara) {
    this.id = mascara.id
    this.valor = mascara.valor
    this.estado = mascara.estado
  }

  public establecerMascaraConId (mascara: Mascara) {
    this.valor = mascara.valor
    this.estado = mascara.estado
  }

  public obtenerMascara (): Mascara {
    const mascara = new Mascara()
    mascara.id = this.id
    mascara.valor = this.valor
    mascara.estado = this.estado

    return mascara
  }

  @hasMany(() => TblVariablesEspecificas)
  public variableEspecifica: HasMany<typeof TblVariablesEspecificas>

  @hasMany(() => TblVariablesTransversales)
  public variableTransversal: HasMany<typeof TblVariablesTransversales>
}
