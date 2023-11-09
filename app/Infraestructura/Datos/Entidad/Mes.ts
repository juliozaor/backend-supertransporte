import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { Mes } from 'App/Dominio/Datos/Entidades/Mes';
export class TblMeses extends BaseModel {
  @column({ columnName: 'mes_id' })
  public id?: number;
  @column({ columnName: 'mes_nombre' })
  public nombre: string; 
  @column({ columnName: 'mes_estado' })
  public estado: boolean; 

  obtenerMes(): Mes{
    return new Mes({
      estado: this.estado,
      id: this.id,
      nombre: this.nombre
    })
  }

  establecerMesDb(mes: Mes, existente = false){
    this.id = mes.id
    this.nombre = mes.nombre
    this.estado = mes.estado
    this.$isPersisted = existente
  }
}


