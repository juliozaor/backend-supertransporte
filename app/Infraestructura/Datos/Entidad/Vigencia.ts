import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { Vigencia } from "App/Dominio/Datos/Entidades/Vigencia";

export class TblVigencias extends BaseModel{
    static readonly table = 'tbl_anio_vigencias'
    
    @column({ columnName: 'anv_id' })
    public id?: number;
    @column({ columnName: 'anv_anio' })
    public anio: number; 
    @column({ columnName: 'anv_estado' })
    public estado: boolean;

    obtenerVigencia():Vigencia{
        return  new Vigencia({
            anio: this.anio,
            estado: this.estado,
            id: this.id
        })
    }
}