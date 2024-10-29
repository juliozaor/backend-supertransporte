import TblReporteEstadoVerificado from "App/Infraestructura/Datos/Entidad/ReporteEstadoVerificado";
import TblReporte from "App/Infraestructura/Datos/Entidad/Reporte";
import TblEnviadosStFormularios from "App/Infraestructura/Datos/Entidad/EnviadosStFormuarios";
import { TblEstadosReportes } from "App/Infraestructura/Datos/Entidad/EstadosReportes";

export class ServicioEstadosVerificado {
  public async Log(idreporte: number, estado: number, verificador: string) {
    const reporte = await TblReporte.findByOrFail("id_reporte", idreporte);

    //Validar si ya existe el log
    const exiteEstado = await TblReporteEstadoVerificado.query()
      .where({
        rev_reporte_id: idreporte,
        rev_estado_verificado_id: estado,
        rev_vigilado: reporte.loginVigilado,
        rev_verificador: verificador,
      })
      .first();

    if (!exiteEstado) {
      const reporteEstado = new TblReporteEstadoVerificado();
      reporteEstado.reporteId = idreporte;
      reporteEstado.estadoVerificadoId = estado;
      reporteEstado.vigilado = reporte.loginVigilado;
      reporteEstado.verificador = verificador;
      await reporteEstado.save();

      //const reporte = await TblReporte.findOrFail(idreporte)
    }
    reporte.estadoVerificacionId = estado;
    if(estado ==  6) reporte.aprobado = true
    if(estado ==  7) reporte.aprobado = false
    reporte.observacion = "";
    reporte.save();
  }

  public async Enviados(
    reporte: number,
    estado: number,
    mes: number,
    vigencia: number,
    observacion?:string,
    aprobado?:boolean
  ) {
    //Validar si ya existe el log
    const exiteEstado = await TblEnviadosStFormularios.query()
      .where({
        reporte: reporte,
        mes: mes,
        vigencia: vigencia,
      })
      .first();

    if (!exiteEstado) {
      const reporteEstado = new TblEnviadosStFormularios();
      reporteEstado.reporte = reporte;
      reporteEstado.estado = estado;
      reporteEstado.mes = mes;
      reporteEstado.vigencia = vigencia;
      if(observacion){        
        reporteEstado.observacion = observacion;
      }
      if(aprobado){
        reporteEstado.aprobado = aprobado;
      }
      await reporteEstado.save();
    } else {
      if(observacion){        
        exiteEstado.observacion = observacion;
      }
      if(aprobado){
        exiteEstado.aprobado = aprobado;
      }
      exiteEstado.estado = estado;
      await exiteEstado.save();
    }
    
    if(estado == 9){
    const reporteE = await TblReporte.findByOrFail("id_reporte", reporte);
    reporteE.estadoVerificacionId = estado;
    reporteE.observacion = "";
    reporteE.aprobado = undefined
    reporteE.save();

  }

}
}
