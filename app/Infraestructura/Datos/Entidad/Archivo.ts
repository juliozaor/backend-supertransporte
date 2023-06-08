import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblArchivosTemporales extends BaseModel {
  @column({ columnName: 'art_id' })
  public id?: string;
  @column({ columnName: 'art_pregunta_id' })
  public preguntaId: string;
  @column({ columnName: 'art_usuario_id' })
  public usuarioId: string;
  @column({ columnName: 'art_nombre_archivo' })
  public nombreArchivo: string;
  @column({ columnName: 'art_ruta_archivo' })
  public rutaArchivo: string;
  @column({ columnName: 'art_nombre_original' })
  public nombreOriginal: string;

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public actualizacion: DateTime

 
}


