
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { ReporteEstadoVerificado } from 'App/Dominio/Datos/Entidades/ReporteEstadoVerificado';
export default class TblReporteEstadoVerificado extends BaseModel {
  public static table = 'tbl_reporte_estado_verificados';
  @column({ isPrimary: true, columnName: 'rev_id' })
  public id?: number

  @column({ columnName: 'rev_reporte_id' }) public reporteId: number;
  @column({ columnName: 'rev_estado_verificado_id' }) public estadoVerificadoId: number;
  @column({ columnName: 'rev_vigilado' }) public vigilado: string;
  @column({ columnName: 'rev_verificador' }) public verificador: string;
  @column({ columnName: 'rev_creacion' }) public creacion: DateTime;


  public establecerReporteEstadoVerificadoDb(reporteEstado: ReporteEstadoVerificado) {
    this.id = reporteEstado.id
    this.reporteId = reporteEstado.reporteId
    this.estadoVerificadoId = reporteEstado.estadoVerificadoId
    this.vigilado = reporteEstado.vigilado
    this.verificador = reporteEstado.verificador
  }

  public estableceReporteEstadoVerificadoConId(reporteEstado: ReporteEstadoVerificado) {
    this.reporteId = reporteEstado.reporteId
    this.estadoVerificadoId = reporteEstado.estadoVerificadoId
    this.vigilado = reporteEstado.vigilado
    this.verificador = reporteEstado.verificador
  }

  public obtenerReporteEstadoVerificado(): ReporteEstadoVerificado {
    const reporteEstado = new ReporteEstadoVerificado()
    reporteEstado.id = this.id
    reporteEstado.reporteId = this.reporteId
    reporteEstado.estadoVerificadoId = this.estadoVerificadoId
    reporteEstado.vigilado = this. vigilado
    reporteEstado.verificador = this.verificador
    return reporteEstado
  }


}
