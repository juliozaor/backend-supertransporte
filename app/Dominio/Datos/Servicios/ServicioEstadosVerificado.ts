import TblReporteEstadoVerificado from "App/Infraestructura/Datos/Entidad/ReporteEstadoVerificado";
import TblReporte from "App/Infraestructura/Datos/Entidad/Reporte";
import TblEnviadosStFormularios from "App/Infraestructura/Datos/Entidad/EnviadosStFormuarios";

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
    reporte.observacion = "";
    reporte.aprobado = undefined;
    reporte.save();
  }

  public async Enviados(
    reporte: number,
    estado: number,
    mes: number,
    vigencia: number
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
      await reporteEstado.save();
    } else {
      exiteEstado.estado = estado;
      await exiteEstado.save();
    }
  }
}
