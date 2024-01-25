import { TblLogEmpresas } from 'App/Infraestructura/Datos/Entidad/LogEmpresas';

export class ServicioEstadosEmpresas {

  public async Log(vigilado: string, empresa: string, estado: number, encuesta:number, evtioSt?:any) {
    //Validar si ya existe el log
    
    const exiteEstado = await TblLogEmpresas.query().where(
      {
        'tle_empresa': empresa,
        'tle_vigilado': vigilado,
        'tle_estado':estado,
        'tle_encuesta':encuesta
      })
      .first()


    if (!exiteEstado) {
      const logEmpresa = new TblLogEmpresas()
      logEmpresa.idEmpresa = empresa
      logEmpresa.idVigilado = vigilado
      logEmpresa.estado = estado
      logEmpresa.fechaEnviost = evtioSt
      await logEmpresa.save()
    }

  }


}
